import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../_services/students.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AdmissionComponent } from '../admission/admission.component';
import { AlertComponent } from '../../_alert/alert/alert.component';

import { User } from '../../_models/user';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  constructor(private service: StudentsService, public dialog: MatDialog) {}
    
  user: User;

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  selected_student;
  dialog_type;
  
  selected_class: string;
  selected_section: string;
  status = 'active';
  all_students = [];
  students = [];

  showStatusList: boolean = false;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if(this.user.role === 'parent') {
      console.log(this.user.users[0].section_id)
      this.selected_section = this.user.users[0].section_id;
      this.getStudents();
    }
  }

  pageChange(x) {
    this.pageNo = x;
    this.page_start = (x - 1) * 10;
  } 

  //students = [];
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

  getStudents() {
    if (this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message)
    } else {
      this.service.getStudents(this.selected_section)
        .subscribe(
          res => { this.all_students = res.students, this.students = res.students, this.getStudentsByStatus(), console.log(res) }
        )
    }
  }

  getStudentsByStatus() {
    if(this.status === 'active') {
      this.students = this.all_students.filter(data => data.status === 1);
    } else if(this.status === 'inactive') {
      this.students = this.all_students.filter(data => data.status === 0)
    }   
    this.pages = Math.ceil(this.students.length / 10)
  }

  deleteStudent(student_id) {
    this.service.deleteStudent(student_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.students.filter(res => res.student_id === student_id)[0].status = 0;
            this.students = this.students.filter(res => res.student_id !== student_id)
            this.alert_message = "Student Deleted Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Student Not Deleted";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  restoreStudent(student_id) {
    this.service.restoreStudent(student_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.students.filter(data => data.student_id === student_id)[0].status = 1;
            this.status = 'activated';
            this.getStudentsByStatus();
            this.alert_message = "Student Restored Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Student Not Restored";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  student_details = {};

  getStudentDetails() {
    this.service.getStudentDetails(this.student_id)
      .subscribe(res => { this.student_details = res.students[0], console.log(res) }
      )
  }

  student_id(student_id: any) {
    throw new Error("Method not implemented.");
  }

  addStudent() {
    this.selected_student = {
      name: '',
      textbook: '',
      author: '',
      publisher: '',
    };
    this.dialog_type = 'add';
    this.openDialog(this.selected_student, this.dialog_type)
  }

  
  editStudent(student_id) {
    this.selected_student = this.students.filter(data => data.student_id === student_id)[0];
    this.dialog_type = 'edit';
    this.openDialog(this.selected_student, this.dialog_type)
  }

  openDialog(selected_student, dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';

    dialogConfig.data = {
      class: this.selected_class,
      section: this.selected_section,
      student: selected_student,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(AdmissionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(        
      data => {
        console.log("Dialog output:", data)
      }
    );    

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
