import { Component, OnInit, Inject } from '@angular/core';
import { TimetableService } from '../../_services/timetable.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddeventComponent implements OnInit {

  selected_event;
  dialog_type;
  alert_message: string;

  constructor(
    private service: TimetableService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddeventComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

      this.dialog_type = data.dialog_type;
      this.selected_event = data.selected_event;
    }

  eventForm: FormGroup = this.fb.group({
    event_title: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    description: ['', Validators.required],
  });

  ngOnInit() {
  }

  addEvents() {
    this.service.addEvents(this.eventForm.value)
    .subscribe(
      res => { 
        if(res == true) {
          this.alert_message = "Event Added Successfully";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "Event Not Added";
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
