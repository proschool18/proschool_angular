import { Component, OnInit } from '@angular/core';
import { ExamsService } from '../../_services/exams.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EditschedulesComponent } from '../editschedules/editschedules.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {

  constructor(private service: ExamsService, private fb: FormBuilder, public dialog: MatDialog) {}

  exam_schedules = [];
  assessment_patterns = [{
    assessment: []
  },{
    assessment: []
  }];

  selected_schedule;
  dialog_type: string;
  alert_message: string;

  scheduleForm: FormGroup = this.fb.group({
    exam_title: ['', Validators.required],
    from_date: ['', Validators.required],
    end_date: ['', Validators.required],
  });
      
  user: User;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getassessment_patterns();
    this.getExam_schedules();
  }

  getassessment_patterns() {
    this.service.getassessment_patterns()
      .subscribe(
        res => { this.assessment_patterns = res.assessment, console.log(res) }
      )
  }

  getExam_schedules() {
    this.service.getExam_schedules()
      .subscribe(
        res => { this.exam_schedules = res.exam_schedules, console.log(res) }
      )
  }

  addExam_schedules() {
    this.service.addExam_schedules(this.scheduleForm.value)
    .subscribe(
      res => { 
        if(res == true) {
          // this.collection.exam_schedules.push(this.scheduleForm.value)
          this.getExam_schedules();
          this.alert_message = "ExamSchedule Added Successfully";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "ExamSchedule Not Added";
          this.openAlert(this.alert_message)
        }
      }
    )
  }

  deleteSchedules(exam_sch_id) {
    this.service.deleteExam_schedules(exam_sch_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.exam_schedules = this.exam_schedules.filter(res => res.exam_sch_id !== exam_sch_id)
            this.alert_message = "ExamSchedule Deleted Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "ExamSchedule Not Deleted";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  editSchedules(i) {
    this.selected_schedule = this.exam_schedules[i];
    this.dialog_type = 'edit';
    this.openDialog(this.selected_schedule, this.dialog_type)
  }

  openDialog(selected_schedule, dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      schedule: selected_schedule,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(EditschedulesComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data),
        this.getExam_schedules();
        // this.collection.exam_schedules.filter(res => res.exam_sch_id == data.exam_sch_id)[0].exam_title = data.exam_title;
        // this.collection.exam_schedules.filter(res => res.exam_sch_id == data.exam_sch_id)[0].from_date = data.from_date;
        // this.collection.exam_schedules.filter(res => res.exam_sch_id == data.exam_sch_id)[0].end_date = data.end_date;
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
