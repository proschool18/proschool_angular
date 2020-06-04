import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { User } from '../../_models/user';
import { FormControl } from '@angular/forms';
// import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// import * as _moment from 'moment';



@Component({
  selector: 'app-studentattendance',
  templateUrl: './studentattendance.component.html',
  styleUrls: ['./studentattendance.component.css']
})
export class StudentattendanceComponent implements OnInit {

  constructor(private service: ServicesService, private fb: FormBuilder, public dialog: MatDialog) { }

  user: User;
  date = new FormControl(new Date);

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));    
  }

  attendance = [];
  students = [];
  dateValue:boolean = false;
  // date;
  current_date;
  current_month;
  current_year;
  i;

  selected_class:string;
  selected_section:string;
  alert_message: string;

  receiveClass($event) {
    this.selected_class = $event
    console.log(this.selected_class)
  }

  receiveSection($event) {
    this.selected_section = $event
    console.log(this.selected_section)
    this.getStudents();
  }

  att_date(i) {
    if(i == 1) {
      this.dateValue = true;
    } else {
      this.dateValue = false;
      var d = new Date();
      var month = d.getMonth() + 1;
      var day = d.getDate()
      var year = d.getFullYear();
      var current_date = year + '-' + month + '-' + day;
      // this.date = current_date;
    }
  }

  getStudents() {
    if(this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message)
    } else {
      this.service.getStudents(this.selected_section)
      .subscribe(
        res => { this.students = res.students, console.log(res)}
      )
    }
  }

  submit(i, status) {
    this.students[i].status = status;
  }

  allAttendance(status) {
    if(this.students.length > 0) {
      for(this.i = 0; this.i < this.students.length; this.i++) {
        this.students[this.i].status = status;
        console.log(this.students[this.i].status)
      }
    } else {
      this.alert_message = "No Students selected";
      this.openAlert(this.alert_message)
    }
  }

  addAttendance() {
    if(this.selected_section == undefined || this.selected_section == ''){
      this.alert_message = "Please Select the Class and the Section";
      this.openAlert(this.alert_message)
    } else if(this.students[0].status == 1) {
      this.alert_message = "Please Select Attendance Status";
      this.openAlert(this.alert_message)
    } else if(this.dateValue == false) {
      this.current_date = new Date().getDate();
      if (this.current_date <= 9) {
        this.current_date = '0' + this.current_date;
      }
      this.current_month = new Date().getMonth() + 1;
      this.current_year = new Date().getFullYear();
      if(this.current_month < 10) {
        this.current_month = '0' + this.current_month;
      }
      // this.date = this.current_year + '-' + this.current_month + '-' + this.current_date;
      console.log(this.date)
      this.service.addAttendance(this.students, this.date, this.selected_class, this.selected_section)
      .subscribe(
        res => { 
          console.log(res), 
          this.alert_message = "Attendance Submitted";
          this.openAlert(this.alert_message)
        }
      )
    } else {
      this.service.addAttendance(this.students, this.date, this.selected_class, this.selected_section)
      .subscribe(
        res => { 
          console.log(res), 
          this.alert_message = "Attendance Submitted";
          this.openAlert(this.alert_message)
        }
      )
    }
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

  // getAttendance() {
  //   for(this.i = 0; this.i < this.students.length; this.i++) {
  //     console.log(this.students[this.i])
  //     this.attendance[this.i].student_id = this.students[this.i].student_id;
  //     this.attendance[this.i].first_name = this.students[this.i].first_name;
  //     this.attendance[this.i].roll_no = this.students[this.i].roll_no;
  //     this.attendance[this.i].attendance = '';
  //   }
  //   console.log(this.students)
  // }

}
