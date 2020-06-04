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
  selector: 'app-assignments-list-marks',
  templateUrl: './assignments-list-marks.component.html',
  styleUrls: ['./assignments-list-marks.component.css']
})
export class AssignmentsListMarksComponent implements OnInit {
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

  selected_class: string;
  selected_section: string;
  selected_subject: string;
  selected_chapter: string;
  selected_assignment: string;

  classes = [];
  class_sections = [];
  students = [];
  students_marks = [];
  subjects = [];
  chapters = [];
  assignments = [];
  assignment_marks = [];
  alert_message: string;
  i;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if(this.user.role === 'admin') {
      this.getClasses();
    } else if(this.user.role === 'teacher') {
      this.employee_id = this.user.employee_id;
      this.getTeacherClasses();
    }  
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  getTeacherClasses() {
    this.teacherservice.getTeacherClasses(this.employee_id)
      .subscribe(
        res => { this.classes = res.school_classes, console.log(res) }
      )
  }

  getClasses() {
    this.service.getClasses()
      .subscribe(
        res => { this.classes = res.school_classes, console.log(res) }
      )
  }

  getTeacherSections() {
    this.teacherservice.getTeacherSections(this.employee_id, this.selected_class)
      .subscribe(
        res => { this.class_sections = res.class_sections, console.log(res) }
      )
  }

  getSections() {
    this.service.getSections(this.selected_class)
      .subscribe(
        res => { this.class_sections = res.class_sections, console.log(res) }
      )
  }

  getTeacherSubjects() {
    this.teacherservice.getTeacherSubjects(this.employee_id, this.selected_section)
    .subscribe(
      res => { this.subjects = res.subjects, console.log(res) }
    )
  }

  getSubjects() {
    this.service.getSubjects(this.selected_section)
    .subscribe(
      res => { this.subjects = res.subjects, console.log(res) }
    )
  }

  getChapters() {
    console.log(this.selected_subject)
    this.academicservice.getChapters(this.selected_subject)
    .subscribe(
      res => { this.chapters = res.chapters, console.log(res) }
    )
  }

  getAssignments() {
    this.assignmentservice.getAssignments(this.selected_chapter)
    .subscribe(
      res => { this.assignments = res.assignments, console.log(res) }
    )
  }

  assMarks() {
    if(this.assignments.length == 0) {
      this.alert_message = "No Assignments Found";
      this.openAlert(this.alert_message)
    } else if(this.selected_assignment == undefined || this.selected_assignment == '') {
      this.alert_message = "Please Select Assignment";
      this.openAlert(this.alert_message)
    } else {
      this.assignmentservice.getAssignment_marks(this.selected_section, this.selected_subject, this.selected_chapter, this.selected_assignment)
      .subscribe(
        res => { this.assignment_marks = res.assignment_marks, console.log(res), this.getStudent_marks(); }
      )
    }
  }

  getStudent_marks() {
    if( this.assignment_marks.length > 0) {
      this.students = this.assignment_marks
    } else {
      this.students = [];
      this.alert_message = "Assignment Marks Not Yet Assigned";
      this.openAlert(this.alert_message)
    }
    console.log(this.students)
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
