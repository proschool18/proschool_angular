import { Component, OnInit, Inject } from '@angular/core';
import { ServicesService } from '../../services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-papers',
  templateUrl: './edit-papers.component.html',
  styleUrls: ['./edit-papers.component.css']
})
export class EditPapersComponent implements OnInit {

  subjects = [];
  exampapers = [
    {
      Assessment: '',
      Exam_date: '',
      Start_time: '',
      End_time: '',
    }
  ]
  selected_class: string;
  selected_section: string;
  selected_schedule: string;
  selected_subject: string;
  selected_exam_id: string;
  dialog_type: string;
  alert_message: string;

  constructor(
    private service: ServicesService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<EditPapersComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.selected_class = data.selected_class,
    this.selected_section = data.selected_section,
    this.selected_schedule = data.selected_schedule,
    this.selected_subject = data.selected_subject,
    this.dialog_type = data.dialog_type;
    this.exampapers = data.exam;
    this.selected_exam_id = data.selected_exam_id;
  }

  ngOnInit() {
    this.getSubjects();
    console.log(this.exampapers)
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

  submit() {
    if(this.selected_subject == undefined || this.selected_subject == '') {
      this.alert_message = "Please Select Subject";
      this.openAlert(this.alert_message)
    } else {
      if(this.dialog_type === 'add') {
        this.service.addExam_papers(this.exampapers, this.selected_section, this.selected_schedule, this.selected_subject)
        .subscribe(
          res => { 
            this.dialogRef.close();
            if(res == true) {
              this.alert_message = "ExamPaper Added Successfully";
              this.openAlert(this.alert_message)
            } else {
              this.alert_message = "ExamPaper Not Added";
              this.openAlert(this.alert_message)
            }
          }
        )
      } else if(this.dialog_type === 'edit') {
        this.service.editExam_papers(this.exampapers, this.selected_exam_id)
        .subscribe(
          res => { 
            this.dialogRef.close();
            if(res == true) {
              this.alert_message = "ExamPaper Updated Successfully";
              this.openAlert(this.alert_message)
            } else {
              this.alert_message = "ExamPaper Not Updated";
              this.openAlert(this.alert_message)
            }
          }
        )
      }

    }    
  }

  close() {
    this.dialogRef.close();
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
