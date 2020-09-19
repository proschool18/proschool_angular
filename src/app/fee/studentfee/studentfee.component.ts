import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../_services/students.service';
import { FeeService } from '../../_services/fee.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

import { User } from '../../_models/user';

@Component({
  selector: 'app-studentfee',
  templateUrl: './studentfee.component.html',
  styleUrls: ['./studentfee.component.css']
})
export class StudentfeeComponent implements OnInit {

  constructor(private service: StudentsService, private feeservice: FeeService, public dialog: MatDialog) {}

  user: User;

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  selected_student;
  dialog_type;
  alert_message: string;

  selected_class: string;
  selected_section: string;
  status = 'active';
  all_students:any = [];
  students:any = [];

  showPaymentList: boolean = false;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  pageChange(x) {
    this.pageNo = x;
    this.page_start = (x - 1) * 10;
  } 

  receiveClass($event) {
    this.selected_class = $event
    console.log(this.selected_class)
  }

  receiveSection($event) {
    this.selected_section = $event
    console.log(this.selected_section)
    this.getStudents();
  }

  getStudents() {
    if (this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message)
    } else {
      this.service.getStudents(this.selected_section)
        .subscribe(
          res => { 
            this.all_students = res.students, 
            this.students = res.students.filter(data => data.status === 1), 
            console.log(res),
            this.pages = Math.ceil(this.students.length / 10)
          }
        )
    }
  }

  addPaymentMode(student_id, installment_type, phone, email) {
    var student_payment = {
      class_id: this.selected_class,
      section_id: this.selected_section,
      installment_type: installment_type,
      phone: phone,
      email: email,
    }
    this.feeservice.addPaymentMode(student_payment, student_id)
    .subscribe(
      res => { 
        if(res == true) {
          this.alert_message = "Payment Mode Updated Successfully";
          this.openAlert(this.alert_message);
        } else {
          this.alert_message = "Payment Mode Not Updated";
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
