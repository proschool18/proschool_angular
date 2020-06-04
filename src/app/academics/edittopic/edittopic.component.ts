import { Component, OnInit, Inject } from '@angular/core';
import { AcademicsService } from '../../_services/academics.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edittopic',
  templateUrl: './edittopic.component.html',
  styleUrls: ['./edittopic.component.css']
})
export class EdittopicComponent implements OnInit {

  topic = {
    topic_id: '',
    topic_name: '',
  };
  chapter;
  alert_message: string;

  constructor(
    private service: AcademicsService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<EdittopicComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.chapter = data.chapter;
    this.topic = data.topic;
  }

  topicForm: FormGroup = this.fb.group({
    topic_id: '',
    topic_name: ['', Validators.required],
  });
  
  ngOnInit() {
    this.topicForm.patchValue({
      topic_id: this.topic.topic_id,
      topic_name: this.topic.topic_name,
    });
  }

  close() {
    this.dialogRef.close();
  }

  submitTopic() {
    this.topicForm.value.topic_id = this.topic.topic_id;
    if (this.chapter == undefined) {
      this.alert_message = "Please Select Class, Section, Subject and Chapter";
      this.openAlert(this.alert_message)
    } else {
      this.service.editTopic(this.topicForm.value, this.topic.topic_id)
        .subscribe(
          res => {
            if (res == true) {
              this.dialogRef.close(this.topicForm.value);
              this.alert_message = "Topic Edited Successfully";
              this.openAlert(this.alert_message)
            } else {
              this.alert_message = "Topic Not Edited";
              this.openAlert(this.alert_message)
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
