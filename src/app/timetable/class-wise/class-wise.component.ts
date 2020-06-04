import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-class-wise',
  templateUrl: './class-wise.component.html',
  styleUrls: ['./class-wise.component.css']
})
export class ClassWiseComponent implements OnInit {

  constructor(private service: ServicesService, private fb: FormBuilder, public dialog: MatDialog) { }
        
  user: User;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.user.role === 'parent') {
      console.log(this.user.users[0].section_id)
      this.selected_section = this.user.users[0].section_id;
      this.getTimetable();
    }
    this.getTimings();
    console.log(this.user.role)
  }

  timetableForm: FormGroup = this.fb.group({
    subject_id: ['', Validators.required],
    teacher_id: ['', Validators.required],
    day: ['', Validators.required],
    session_id: ['', Validators.required],
    start_time: ['', Validators.required],
    end_time: ['', Validators.required],
  });

  timetable = [];
  subjects = [];
  teachers = [];
  timings = [];
  days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

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
    this.getTimetable();
    this.getSubjects();
  }

  getTimings() {
    this.service.getTimings()
      .subscribe(
        res => { this.timings = res.session_timings, console.log(res) }
      )
  }

  getSubjects() {
    if(this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message)
    } else {
      this.service.getSubjects(this.selected_section)
      .subscribe(
        res => { this.subjects = res.subjects, console.log(res) }
      )
    }
  }

  getSubject_teachers() {
    if(this.timetableForm.value.subject_id == undefined || this.timetableForm.value.subject_id == '') {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message)
    } else {
      this.service.getSubject_teachers(this.timetableForm.value.subject_id)
      .subscribe(
        res => { this.teachers = res.teachers, console.log(res) }
      )
    }
  }

  getTime() {
    this.timetableForm.value.start_time = this.timings.filter(time => time.session_id == this.timetableForm.value.session_id)[0].start_time;
    console.log(this.timetableForm.value.start_time)
    this.timetableForm.value.end_time = this.timings.filter(time => time.session_id == this.timetableForm.value.session_id)[0].end_time;
    console.log(this.timetableForm.value.end_time)
  }

  getTimetable() {
    if(this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message)
    } else {
      this.service.getTimetable(this.selected_section)
      .subscribe(
        res => { this.timetable = res.timetable, console.log(res) }
      )
    }
  }

  filtered_timetable(day, time) {
    return this.timetable.filter(x => x.day == day && x.start_time == time);
  }

  addTimetable() {
    if(this.selected_section == undefined || this.selected_section == ''){
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message)
    } else {
      console.log(this.selected_section);
      this.service.addTimetable(this.timetableForm.value, this.selected_section)
      .subscribe(
        res => { console.log(res) }
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
