import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TimetableService } from '../../_services/timetable.service';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-add-notice',
  templateUrl: './add-notice.component.html',
  styleUrls: ['./add-notice.component.css']
})
export class AddNoticeComponent implements OnInit {

  selected_notice;
  dialog_type: string;
  alert_message: string;

  constructor(
    private service: TimetableService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddNoticeComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

      this.dialog_type = data.dialog_type;
      this.selected_notice = data.selected_notice;
    }

  noticeForm: FormGroup = this.fb.group({
    issuing_Authority: ['', Validators.required],
    title: ['', Validators.required],
    body: ['', Validators.required],
    signatory_name: ['', Validators.required],
    date_of_issue: ['', Validators.required],
  });

  ngOnInit() {
    this.noticeForm.patchValue({
      issuing_Authority: this.selected_notice.issuing_Authority,
      title: this.selected_notice.title,
      body: this.selected_notice.body,
      signatory_name: this.selected_notice.signatory_name,
      date_of_issue: this.selected_notice.date_of_issue,
    })
  }

  close() {
    this.dialogRef.close();
  }

  submitNotice() {
    if(this.dialog_type === 'add') { 
      this.service.addNotice(this.noticeForm.value)
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "Notice Added Successfully";
            this.openAlert(this.alert_message);
            this.dialogRef.close();
          } else {
            this.alert_message = "Notice Not Added";
            this.openAlert(this.alert_message);
          }
        }
      )
    } else if(this.dialog_type === 'edit') {
      this.service.editNotice(this.noticeForm.value, this.selected_notice.notice_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "Notice Added Successfully";
            this.openAlert(this.alert_message);
            this.dialogRef.close();
          } else {
            this.alert_message = "Notice Not Added";
            this.openAlert(this.alert_message);
          }
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
