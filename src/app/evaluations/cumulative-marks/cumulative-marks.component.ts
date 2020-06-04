import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-cumulative-marks',
  templateUrl: './cumulative-marks.component.html',
  styleUrls: ['./cumulative-marks.component.css']
})
export class CumulativeMarksComponent implements OnInit {

  constructor(private service: ServicesService, private fb: FormBuilder, public dialog: MatDialog) {}
    
  user: User;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  marks = [
    {
      exam_marks: [

      ]
    }
  ];

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
    this.getcum_Evaluations();
  }

  getcum_Evaluations() {
    if(this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class & Section";
      this.openAlert(this.alert_message)
    } else {
      this.service.getcum_Evaluations(this.selected_section)
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
