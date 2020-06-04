import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-marks-list',
  templateUrl: './marks-list.component.html',
  styleUrls: ['./marks-list.component.css']
})
export class MarksListComponent implements OnInit {

  constructor(private service: ServicesService, private fb: FormBuilder, public dialog: MatDialog) {}
      
  user: User;

  ngOnInit() {
    this.getassessment_patterns();
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.user.role === 'parent') {
      console.log(this.user.users[0].section_id)
      this.selected_section = this.user.users[0].section_id;
    }
  }

  selected_class:string;
  selected_section:string;
  selected_schedule:string;
  alert_message: string;

  assessment_patterns = [];

  marks = [
    {
      assessments: [

      ]
    }
  ];

  receiveClass($event) {
    this.selected_class = $event
    console.log(this.selected_class)
  }

  receiveSection($event) {
    this.selected_section = $event
    console.log(this.selected_section)
  }

  receiveSchedule($event) {
    this.selected_schedule = $event
    console.log(this.selected_schedule)
    this.getEvaluations();
  }

  getassessment_patterns() {
    this.service.getassessment_patterns()
      .subscribe(
        res => { this.assessment_patterns = res.assessment, console.log(res) }
      )
  }

  getEvaluations() {
    if(this.selected_section == undefined || this.selected_schedule == undefined ||
      this.selected_section == '' || this.selected_schedule == '') {
      this.alert_message = "Please Select Class, Section and Exam Schedule";
      this.openAlert(this.alert_message)
    } else {
      this.service.getEvaluations(this.selected_schedule, this.selected_section)
      .subscribe(
        res => { this.marks = res.students, console.log(res) }
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
