import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-employeeattendance',
  templateUrl: './employeeattendance.component.html',
  styleUrls: ['./employeeattendance.component.css']
})
export class EmployeeattendanceComponent implements OnInit {

  constructor(private service: ServicesService, private fb: FormBuilder, public dialog: MatDialog) { }

  ngOnInit() {
    this.getEmployees();
  }

  attendance = [];
  employees = [];
  all_employees = [];
  dateValue:boolean = false;
  current_date;
  current_month;
  current_year;
  alert_message: string;
  i;

  showEmployeeTypeList: boolean = false;
  employee_type;
  date = new FormControl(new Date);

  employeeForm: FormGroup = this.fb.group({
    employee_type: ['', Validators.required],
    date: [''],
  });

  att_date(i) {
    if(i == 1) {
      this.dateValue = true;
    } else {
      this.dateValue = false;
      var d = new Date();
      var month = d.getMonth() + 1;
      var day = d.getDate()
      var year = d.getFullYear();
      var date = year + '-' + month + '-' + day;
      this.employeeForm.value.date = date;
    }
  }

  getEmployees() {
    this.service.getEmployees()
      .subscribe(
        res => { this.all_employees = res.employee, console.log(this.employees) }
      )
  }

  get_selectedemployees() {   
    if(this.employee_type == undefined || this.employee_type == '') {
      this.alert_message = "Please Select Employee Type";
      this.openAlert(this.alert_message)
    } else {
      if(this.employee_type === "teaching") {
        this.employees = this.all_employees.filter(emp => emp.job_category === "teaching");
      } else if(this.employee_type === "non-teaching") {
        this.employees = this.all_employees.filter(emp => emp.job_category === "non-teaching");
      } else if(this.employee_type === "administrative") {
        this.employees = this.all_employees.filter(emp => emp.job_category === "administrative");
      } else {
        this.employees = this.all_employees;
      }
    }
  }

  submit(i, status) {
    this.employees[i].status = status;
  }

  allAttendance(status) {
    console.log(status)
    if(this.employees.length > 0) {
      for(this.i = 0; this.i < this.employees.length; this.i++) {
        this.employees[this.i].status = status;
      }
    } else {
      this.alert_message = "No Employees selected";
      this.openAlert(this.alert_message)
    }
  }

  addEmployeeAttendance() { 
    if(this.employee_type == undefined || this.employee_type == '') {
      this.alert_message = "Please Select the Employee Category";
      this.openAlert(this.alert_message)
    } else if(this.employees[0].status == 1) {
      this.alert_message = "Please Select Attendance Status";
      this.openAlert(this.alert_message)
    } else if(this.dateValue == false) {
      this.current_date = new Date().getDate();
      if (this.current_date <= 9) {
        this.current_date = '0' + this.current_date;
      }
      console.log(this.current_date)
      this.current_month = new Date().getMonth() + 1;
      if(this.current_month <= 9) {
        this.current_month = '0' + this.current_month;
      }
      this.current_year = new Date().getFullYear();
      this.employeeForm.value.date = this.current_year + '-' + this.current_month + '-' + this.current_date;
      this.service.addEmployeeAttendance(this.employees, this.date)
      .subscribe(
        res => { 
          console.log(res),
          this.alert_message = "Attendance Submitted";
          this.openAlert(this.alert_message)
        }
      )
    } else {
      this.service.addEmployeeAttendance(this.employees, this.date)
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

}
