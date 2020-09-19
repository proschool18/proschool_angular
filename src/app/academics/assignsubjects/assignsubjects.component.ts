import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { AcademicsService } from '../../_services/academics.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../_models/user';

@Component({
  selector: 'app-assignsubjects',
  templateUrl: './assignsubjects.component.html',
  styleUrls: ['./assignsubjects.component.css']
})
export class AssignsubjectsComponent implements OnInit {

  constructor(private service: ServicesService, private academicservice: AcademicsService, private fb: FormBuilder, public dialog: MatDialog) {}
    
  user: User;
  
  ngOnInit() {
    this.getEmployees();
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if(this.user.role === 'parent') {
      console.log(this.user.users[0].section_id)
      this.selected_section = this.user.users[0].section_id;
      this.getTeachers();
    }
  }

  assigned_teachers = [];
  teachers = [];
  subjects = [];
  alert_message: string;

  teachersForm: FormGroup = this.fb.group({
    subject_id: [''],
    teacher_id: [''],
  });

  selected_class:string;
  selected_section:string;
  teacher_name:string;

  receiveClass($event) {
    this.selected_class = $event
    console.log(this.selected_class)
  }

  receiveSection($event) {
    this.selected_section = $event
    console.log(this.selected_section)
    this.getTeachers();
    this.getSubjects();
  }

  getEmployees() {
    this.service.getEmployees()
      .subscribe(
        res => { this.teachers = res.employee.filter(res => res.job_category == "teaching"), console.log(res) }
      )
  }

  getTeachers() {
    if(this.selected_section == undefined) {
      this.alert_message = 'Please Select the Class and Section';
      this.openAlert(this.alert_message)
    } else {
      this.academicservice.getTeachers(this.selected_section)
      .subscribe(
        res => { this.assigned_teachers = res.teachers, console.log(res) }
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

  getSubjects() {
    if(this.selected_section == undefined) {
      this.alert_message = 'Please Select the Class and Section';
      this.openAlert(this.alert_message)
    } else {
      this.academicservice.getSubjects(this.selected_section)
      .subscribe(
        res => { this.subjects = res.subjects, console.log(res) }
      )
    }
  }

  assignTeachers() {
    if(this.selected_section == undefined){
      this.alert_message = 'Please Select the Class and Section';
      this.openAlert(this.alert_message)
    } else if(this.teachersForm.value.subject_id == undefined || this.teachersForm.value.teacher_id == undefined){
      this.alert_message = 'Please Select the Subject and the Teacher';
      this.openAlert(this.alert_message)
    } else {
      // this.teacher_name = this.teachers.filter( tch => tch.employee_id === this.teachersForm.value.teacher_id)[0].first_name;
      this.academicservice.assignTeachers(this.teachersForm.value, this.selected_section)
        .subscribe(
          res => { 
            if(res == true) {
              this.getTeachers();
              // this.collection.assigned_teachers.filter( sub => sub.subject_id === this.teachersForm.value.subject_id)[0].teachers.push({teacher_name: this.teacher_name})
              this.alert_message = 'Teacher Assigned Successfully to the Subject';
              this.openAlert(this.alert_message)
            } else {
              this.alert_message = 'Teacher Not Assigned';
              this.openAlert(this.alert_message)
            }
          }
        )
    }    
  }

  deleteAssignsubject(teacher_id, subject_id, i, j) {
    this.academicservice.deleteAssignsubject(teacher_id, subject_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.assigned_teachers[i].teachers = this.assigned_teachers[i].teachers.filter( res => res.teacher_id !== teacher_id);
            this.alert_message = 'Teacher Successfully Unassigned from the Subject';
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = 'Teacher Not Unassigned from the Subject';
            this.openAlert(this.alert_message)
          }
        }
      )
  }

}
