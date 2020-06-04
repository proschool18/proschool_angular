import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { AssignmentsService } from '../../_services/assignments.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-ctaddmarks',
  templateUrl: './ctaddmarks.component.html',
  styleUrls: ['./ctaddmarks.component.css']
})
export class CTaddmarksComponent implements OnInit {
  config: any;
  collection = { count: '', students: [] };

  constructor(private service: ServicesService, private assignmentservice: AssignmentsService, private fb: FormBuilder, public dialog: MatDialog) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }

  user: User;
  marks_add;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  pageChanged(event) {
    this.config.currentPage = event;
  }

  classTests = [];
  ct_marks = [];
  //students = [];

  selected_ct: string;

  selected_class: string;
  selected_section: string;
  selected_subject: string;
  alert_message: string;

  receiveClass($event) {
    this.selected_class = $event
    console.log(this.selected_class)
  }

  receiveSection($event) {
    this.selected_section = $event
    console.log(this.selected_section)
  }

  receiveSubject($event) {
    this.selected_subject = $event
    console.log(this.selected_subject)
    this.getClassTests_byDate();
  }

  getStudents() {
    this.service.getStudents(this.selected_section)
      .subscribe(
        res => { this.collection.students = res.students, console.log(this.collection.students) }
      )
  }

  getClassTests_byDate() {
    console.log(this.selected_subject);
    if (this.selected_subject == undefined || this.selected_subject == '') {
      this.alert_message = "Please Select Class, Section and Subject";
      this.openAlert(this.alert_message)
    } else {
      this.assignmentservice.getClassTests_byDate(this.selected_section, this.selected_subject)
        .subscribe(
          res => { this.classTests = res.classTests, console.log(res) }
        )
    }
  }

  ctMarks() {
    if (this.classTests.length == 0) {
      this.alert_message = "No Class Tests Found";
      this.openAlert(this.alert_message)
    } else if (this.selected_ct == undefined || this.selected_ct == '') {
      this.alert_message = "Please Select Class Test";
      this.openAlert(this.alert_message)
    } else {
      this.assignmentservice.getClassTest_marks(this.selected_section, this.selected_subject, this.selected_ct)
        .subscribe(
          res => { this.ct_marks = res.CT_marks, console.log(res), this.getStudent_marks(); }
        )
    }
  }

  getStudent_marks() {
    if (this.ct_marks.length > 0) {
      this.marks_add = false;
      this.collection.students = this.ct_marks;
      this.config.currentPage = 1;
    } else {
      this.marks_add = true;
      this.getStudents();
      this.config.currentPage = 1;
    }
    console.log(this.collection.students)
  }

  addClassTest_marks() {
    if (this.classTests.length == 0) {
      this.alert_message = "No Class Tests Found";
      this.openAlert(this.alert_message)
    } else if (this.selected_ct == undefined || this.selected_ct == '') {
      this.alert_message = "Please Select Class Test";
      this.openAlert(this.alert_message)
    } else {
      this.assignmentservice.addClassTest_marks(this.collection.students, this.selected_section, this.selected_subject, this.selected_ct)
        .subscribe(
          res => {
            if (res == true) {
              this.ctMarks();
              this.alert_message = 'Student Marks Added Successfully';
              this.openAlert(this.alert_message)
            } else {
              this.alert_message = 'Marks Not Added';
              this.openAlert(this.alert_message)
            }
          }
        )
    }
  }

  editMarks(classTest_result_id, marks) {
    this.assignmentservice.editClassTest_marks(classTest_result_id, marks)
      .subscribe(
        res => {
          if (res == true) {
            this.ctMarks();
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
