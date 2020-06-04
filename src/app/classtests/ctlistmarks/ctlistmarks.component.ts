import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../../_services/assignments.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-ctlistmarks',
  templateUrl: './ctlistmarks.component.html',
  styleUrls: ['./ctlistmarks.component.css']
})
export class CTlistmarksComponent implements OnInit {
  config: any;
  collection = { count: '', students: [] };

  constructor(private assignmentservice: AssignmentsService, private fb: FormBuilder, public dialog: MatDialog) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
   }
  
  user: User;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  classTests = [];
  ct_marks = [];
  //students = [];

  selected_ct:string;

  selected_class:string;
  selected_section:string;
  selected_subject:string;
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

  getClassTests_byDate() {
    console.log(this.selected_subject);
    if(this.selected_subject == undefined || this.selected_subject == '') {
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
    if(this.classTests.length == 0) {
      this.alert_message = "No Class Tests Found";
      this.openAlert(this.alert_message)
    } else if(this.selected_ct == undefined || this.selected_ct == '') {
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
    if( this.ct_marks.length > 0) {
      this.collection.students = this.ct_marks
    } else {
      this.collection.students = [];
      this.alert_message = "Class Marks Not Yet Assigned";
      this.openAlert(this.alert_message)
    }
    console.log(this.collection.students)
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

