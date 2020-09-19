import { Component, OnInit, Inject } from '@angular/core';
import { AssignmentsService } from '../../_services/assignments.service';
import { AcademicsService } from '../../_services/academics.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-ctassign',
  templateUrl: './ctassign.component.html',
  styleUrls: ['./ctassign.component.css']
})
export class CTAssignComponent implements OnInit {

  class: string;
  section: string;
  subject: string;
  classtest = {
    classTest_id: '',
    section_id: '',
    subject_id: '',
    title: '',
    date: '',
    assign_date: '',
    maxMarks: '',
  };
  chapters = [];
  dialog_type: string;
  alert_message: string;

  constructor(
    private service: AssignmentsService, 
    private academicService: AcademicsService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<CTAssignComponent>,
    @Inject(MAT_DIALOG_DATA) data) { 

      this.class = data.class;
      this.section = data.section;
      this.subject = data.subject;
      this.classtest = data.classtest;
      this.dialog_type = data.dialog_type;
    }

  classTestForm: FormGroup = this.fb.group({
    classTest_id: '',
    lession_id: ['', Validators.required],
    title: ['', Validators.required],
    date: ['', Validators.required],
    maxMarks: ['', Validators.required],
  });

  ngOnInit() {
    this.classTestForm.patchValue({
      classTest_id: this.classtest.classTest_id,
      title: this.classtest.title,
      date: this.classtest.date,
      maxMarks: this.classtest.maxMarks,
    });
    this.getChapters();
  }

  close() {
    this.dialogRef.close();
  }

  getChapters() {
    if (this.subject == undefined || this.subject == '') {
      this.alert_message = "Please Select Subject";
      this.openAlert(this.alert_message)
    } else {
      this.academicService.getChapters(this.subject)
        .subscribe(
          res => { this.chapters = res.chapters, console.log(res) }
        )
    }
  }

  submitClassTest() {
    this.classTestForm.value.classTest_id = this.classtest.classTest_id;
    this.dialogRef.close(this.classTestForm.value);
    if(this.subject == undefined || this.subject == ''){
      this.alert_message = "Please Select the Class, Section & Subject";
      this.openAlert(this.alert_message)
    } else {
      if (this.dialog_type == 'add') {
        this.service.addClassTest(this.classTestForm.value, this.section, this.subject)
          .subscribe(
            res => { 
              if(res == true) {
                this.alert_message = "ClassTest Added Successfully";
                this.openAlert(this.alert_message)
              } else {
                this.alert_message = "ClassTest Not added";
                this.openAlert(this.alert_message)
              }
            }
          )
      } else if (this.dialog_type == 'edit') {
        this.service.editClassTest(this.classTestForm.value, this.classtest.classTest_id)
          .subscribe(
            res => {
              if (res == true) {
                this.alert_message = "Subject Edited Successfully";
                this.openAlert(this.alert_message)
              } else {
                this.alert_message = "Subject Not Edited";
                this.openAlert(this.alert_message)
              }
            }
          )
      }
      console.log(this.subject);      
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
