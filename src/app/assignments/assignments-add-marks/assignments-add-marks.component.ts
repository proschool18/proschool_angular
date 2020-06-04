import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { AcademicsService } from '../../_services/academics.service';
import { AssignmentsService } from '../../_services/assignments.service';
import { TeacherService } from '../../_services/teacher.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-assignments-add-marks',
  templateUrl: './assignments-add-marks.component.html',
  styleUrls: ['./assignments-add-marks.component.css']
})
export class AssignmentsAddMarksComponent implements OnInit {
  config: any;
  collection = { count: '', students: [] };

  constructor(private teacherservice: TeacherService, private service: ServicesService, private academicservice: AcademicsService, private assignmentservice: AssignmentsService, private fb: FormBuilder, public dialog: MatDialog) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }

  user: User;
  employee_id;
  marks_add: boolean;

  assMarksForm: FormGroup = this.fb.group({
    selected_class: [''],
    selected_section: [''],
    selected_subject: [''],
    selected_chapter: [''],
    selected_assignment: [''],
  });

  classes = [];
  class_sections = [];
  students = [];
  students_marks = [];
  subjects = [];
  chapters = [];
  assignments = [];
  assignment_marks = [];
  i;
  alert_message: string;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.user.role === 'admin') {
      this.getClasses();
    } else if (this.user.role === 'teacher') {
      this.employee_id = this.user.employee_id;
      this.getTeacherClasses();
    }
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  getClasses() {
    this.service.getClasses()
      .subscribe(
        res => { this.classes = res.school_classes, console.log(res) }
      )
  }

  getTeacherClasses() {
    this.teacherservice.getTeacherClasses(this.employee_id)
      .subscribe(
        res => { this.classes = res.school_classes, console.log(res) }
      )
  }

  getSections() {
    this.service.getSections(this.assMarksForm.value.selected_class)
      .subscribe(
        res => { this.class_sections = res.class_sections, console.log(res) }
      )
  }

  getTeacherSections() {
    this.teacherservice.getTeacherSections(this.employee_id, this.assMarksForm.value.selected_class)
      .subscribe(
        res => { this.class_sections = res.class_sections, console.log(res) }
      )
  }

  getStudents() {
    this.service.getStudents(this.assMarksForm.value.selected_section)
      .subscribe(
        res => { this.students = res.students, console.log(this.students) }
      )
  }

  getSubjects() {
    this.service.getSubjects(this.assMarksForm.value.selected_section)
      .subscribe(
        res => { this.subjects = res.subjects, console.log(res) }
      )
  }

  getTeacherSubjects() {
    this.teacherservice.getTeacherSubjects(this.employee_id, this.assMarksForm.value.selected_section)
      .subscribe(
        res => { this.subjects = res.subjects, console.log(res) }
      )
  }

  getChapters() {
    this.academicservice.getChapters(this.assMarksForm.value.selected_subject)
      .subscribe(
        res => { this.chapters = res.chapters, console.log(res) }
      )
  }

  getAssignments() {
    this.assignmentservice.getAssignments(this.assMarksForm.value.selected_chapter)
      .subscribe(
        res => { this.assignments = res.assignments, console.log(res) }
      )
  }

  assMarks() {
    if (this.assignments.length == 0) {
      this.alert_message = "No Assignments Found";
      this.openAlert(this.alert_message)
    } else if (this.assMarksForm.value.selected_assignment == undefined || this.assMarksForm.value.selected_assignment == '') {
      this.alert_message = "Please Select Assignment";
      this.openAlert(this.alert_message)
    } else {
      this.assignment_marks = [];
      this.assignmentservice.getAssignment_marks(this.assMarksForm.value.selected_section, this.assMarksForm.value.selected_subject, this.assMarksForm.value.selected_chapter, this.assMarksForm.value.selected_assignment)
        .subscribe(
          res => { this.assignment_marks = res.assignment_marks, console.log(res), this.getStudent_marks(); }
        )
    }
  }

  getStudent_marks() {
    if (this.assignment_marks.length > 0) {
      this.marks_add = false;
      this.students = this.assignment_marks;
      this.config.currentPage = 1;
    } else {
      this.marks_add = true;
      this.getStudents();
      this.config.currentPage = 1;
    }
    console.log(this.students)
  }

  addAssignment_marks() {
    if (this.assMarksForm.value.selected_assignment == undefined || this.assMarksForm.value.selected_assignment == '') {
      this.alert_message = "Please Select Assignment";
      this.openAlert(this.alert_message)
    } else {
      this.assignmentservice.addAssignment_marks(this.students, this.assMarksForm.value.selected_section, this.assMarksForm.value.selected_subject, this.assMarksForm.value.selected_chapter, this.assMarksForm.value.selected_assignment)
        .subscribe(
          res => {
            if (res == true) {
              this.assMarks();
              this.alert_message = "Marks Added Successfully";
              this.openAlert(this.alert_message)
            } else {
              this.alert_message = "Marks Not added";
              this.openAlert(this.alert_message)
            }
          }
        )
    }
  }

  editMarks(assignment_result_id, marks) {
    this.assignmentservice.editAssignment_marks(assignment_result_id, marks)
      .subscribe(
        res => {
          if (res == true) {
            this.assMarks();
            this.alert_message = 'Student Marks Edited Successfully';
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = 'Marks Not Edited';
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  openAlert(alert_message) {
    const alertConfig = new MatDialogConfig();

    alertConfig.autoFocus = true;
    alertConfig.width = '40%';

    alertConfig.data = {
      message: alert_message,
    };

    const alertRef = this.dialog.open(AlertComponent, alertConfig);

    alertRef.afterClosed().subscribe()
  }

}
