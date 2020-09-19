import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private teacherservice: TeacherService, private service: ServicesService, private route: ActivatedRoute, private academicservice: AcademicsService, private assignmentservice: AssignmentsService, private fb: FormBuilder, public dialog: MatDialog) {}

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  section_id = this.route.snapshot.paramMap.get('sec_id');
  subject_id = this.route.snapshot.paramMap.get('sub_id');
  lession_id = this.route.snapshot.paramMap.get('les_id');
  assignment_id = this.route.snapshot.paramMap.get('ass_id');
  data_type = this.route.snapshot.paramMap.get('data_type');

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

  students = [];
  students_marks = [];
  assignment_marks = [];
  i; alert_message: string;
  
  pageChange(x) {
    this.pageNo = x;
    this.page_start = (x - 1) * 10;
  } 

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if(this.data_type === 'add') {
      this.getStudents();
    } else if(this.data_type === 'view') {
      this.assMarks();
    }
    this.pages = Math.ceil(this.students.length / 10);
    console.log(this.data_type)
  }

  getStudents() {
    this.service.getStudents(this.section_id)
      .subscribe(
        res => { this.students = res.students.filter(std => std.status === 1), 
          this.pages = Math.ceil(this.students.length / 10),
          console.log(this.students) 
        }
      )
  }

  assMarks() {
    if (this.assignment_id == undefined || this.assignment_id == '') {
      this.alert_message = "Please Select Assignment";
      this.openAlert(this.alert_message)
    } else {
      this.assignment_marks = [];
      this.assignmentservice.getAssignment_marks(this.assignment_id)
        .subscribe(
          res => { this.students = res.assignment_marks, 
            this.pages = Math.ceil(this.students.length / 10),
            console.log(res) 
          }
        )
    }
  }

  addAssignment_marks() {
    if (this.assignment_id == undefined || this.assignment_id == '') {
      this.alert_message = "Please Select Assignment";
      this.openAlert(this.alert_message)
    } else {
      this.assignmentservice.addAssignment_marks(this.students, this.students[0].max_marks, this.section_id, this.subject_id, this.lession_id, this.assignment_id)
        .subscribe(
          res => {
            if (res == true) {
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
            // this.assMarks();
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
