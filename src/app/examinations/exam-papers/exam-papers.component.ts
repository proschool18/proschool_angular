import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EditPapersComponent } from '../edit-papers/edit-papers.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-exam-papers',
  templateUrl: './exam-papers.component.html',
  styleUrls: ['./exam-papers.component.css']
})
export class ExamPapersComponent implements OnInit {

  constructor(private service: ServicesService, private fb: FormBuilder, public dialog: MatDialog) { }

  exam_papers = [];
  assessment_patterns = [];
  inner_assessments = [];
    
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
  selected_subject:string;
  selected_exam;
  selected_exam_id;
  alert_message: string;

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
    console.log(this.selected_schedule);
    this.getExam_papers();
    this.getinner_assessments();
  }

  getassessment_patterns() {
    this.service.getassessment_patterns()
      .subscribe(
        res => { this.assessment_patterns = res.assessment, console.log(res) }
      )
  }

  getinner_assessments() {
    if(this.selected_schedule == undefined || this.selected_schedule == '') {
      this.alert_message = "Please Select Exam Schedule";
      this.openAlert(this.alert_message)
    } else {
      this.service.getinner_assessments(this.selected_schedule)
      .subscribe(
        res => { this.inner_assessments = res.assessment[0].assMarks, console.log(this.inner_assessments) }
      )
    }
  }

  getExam_papers() {
    if(this.selected_schedule == undefined || this.selected_section == undefined ||
      this.selected_schedule == '' || this.selected_section == '') {
      this.alert_message = "Please Select Class, Section, Subject and Schedule";
      this.openAlert(this.alert_message)
    } else {
      this.service.getExam_papers(this.selected_schedule, this.selected_section)
      .subscribe(
        res => { this.exam_papers = res.exams, console.log(res) }
      )
    }
  }

  addExamPaper() {
    if(this.selected_schedule == undefined || this.selected_section == undefined ||
      this.selected_schedule == '' || this.selected_section == '') {
      this.alert_message = "Please Select Class, Section, Subject and Schedule";
      this.openAlert(this.alert_message)
    } else {
      this.selected_exam_id = '';
      this.selected_subject = '';
      this.selected_exam = this.inner_assessments;
      this.openDialog(this.selected_exam, this.selected_subject, this.selected_exam_id, 'add')
    }
  }

  editExamPaper(i) {
    if(this.selected_schedule == undefined || this.selected_section == undefined ||
      this.selected_schedule == '' || this.selected_section == '') {
      this.alert_message = "Please Select Class, Section, Subject and Schedule";
      this.openAlert(this.alert_message)
    } else {
      this.selected_exam_id = this.exam_papers[i].exam_paper_id;
      this.selected_subject = this.exam_papers[i].subject_id;
      this.selected_exam = this.exam_papers[i].exams;
      this.openDialog(this.selected_exam, this.selected_subject, this.selected_exam_id, 'edit')
    }
  }

  openDialog(selected_exam, selected_subject, selected_exam_id, dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';

    dialogConfig.data = {
      selected_class: this.selected_class,
      selected_section: this.selected_section,
      selected_schedule: this.selected_schedule,
      selected_subject: selected_subject,
      exam: selected_exam,
      selected_exam_id: selected_exam_id,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(EditPapersComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => {
          console.log("Dialog output:", data)      
          this.getExam_papers();
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
