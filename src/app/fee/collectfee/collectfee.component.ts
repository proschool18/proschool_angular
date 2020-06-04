import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-collectfee',
  templateUrl: './collectfee.component.html',
  styleUrls: ['./collectfee.component.css']
})
export class CollectfeeComponent implements OnInit {

  constructor(private service: ServicesService, private fb: FormBuilder, public dialog: MatDialog) {}

  collect:boolean;        
  user: User;

  selected_class:string;
  selected_section:string;
  selected_student:string;
  alert_message: string;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getFeeTerms();
    this.getFeeTypes();
    if(this.user.role === 'admin') {
      this.collect = true;
    } else if(this.user.role === 'teacher' || this.user.role === 'parent') {
      this.collect = false;
    }
    if(this.user.role === 'parent') {
      this.selected_student = this.user.users[0].student_id;
      this.getCollectedFee();
    }
  }

  students = [];
  collected_fee = [];
  fee_terms = [];
  fee_types = [];
  student_fee = [
    {
      totalFee: '',
      totalStudentFee: '',
      totalBalanceFee: '',
    }
  ];

  collectfeeForm: FormGroup = this.fb.group({
    class_id: ['', Validators.required],
    fee_term_id: ['', Validators.required],
    fee_types_id: ['', Validators.required],
    total_fee: ['', Validators.required],
    fee_paid: ['', Validators.required],
    payment_mode: ['', Validators.required],
    discount: ['', Validators.required],
    fine: ['', Validators.required],
    phone: ['', Validators.required],
  });

  receiveClass($event) {
    this.selected_class = $event;
    this.collectfeeForm.value.class_id = this.selected_class;
    console.log(this.selected_class)
  }

  receiveSection($event) {
    this.selected_section = $event
    console.log(this.selected_section)
    this.getStudents();
  }

  getcollected_list(i) {
    if(i == 1) {
      this.collect = true 
    } else {
      this.collect = false
    }
  }

  getStudents() {
    if(this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message)
    } else {
      this.service.getStudents(this.selected_section)
      .subscribe(
        res => { this.students = res.students, console.log(res) }
      )
    }
  }

  getCollectedFee() {
    if(this.selected_student == undefined || this.selected_student == '') {
      this.alert_message = "Please Select Student";
      this.openAlert(this.alert_message)
    } else {
      this.service.getCollectedFee(this.selected_student)
      .subscribe(
        res => { this.collected_fee = res.student_fee_details, console.log(this.collected_fee) }
      )
    }
  }

  getFeeTerms() {
    this.service.getFeeTerms()
      .subscribe(
        res => { this.fee_terms = res.fee_term, console.log(res) }
      )
  }

  getFeeTypes() {
    this.service.getFeeTypes()
      .subscribe(
        res => { this.fee_types = res.fee_type, console.log(res) }
      )
  }

  getStudent_term_type_fee() {
    if(this.collectfeeForm.value.fee_term_id == undefined || this.collectfeeForm.value.fee_types_id == undefined ||
      this.collectfeeForm.value.fee_term_id == '' || this.collectfeeForm.value.fee_types_id == '') {
      this.alert_message = "Please Select Fee-Term & Fee-Type";
      this.openAlert(this.alert_message)
    } else {
      this.service.getStudent_term_type_fee(this.selected_student, this.collectfeeForm.value.fee_term_id, this.collectfeeForm.value.fee_types_id)
      .subscribe(
        res => { this.student_fee = res.StudentFeeDetails, console.log(res) }
      )
    }
  }

  addCollectedFee() {

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
