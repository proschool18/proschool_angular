import { Component, OnInit } from '@angular/core';
import { AcademicsService } from '../../_services/academics.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { AddchapterComponent } from '../addchapter/addchapter.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent implements OnInit {

  constructor(private service: AcademicsService, public dialog: MatDialog) {}

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  user: User;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.user.role === 'parent') {
      console.log(this.user.users[0].section_id)
      this.selected_section = this.user.users[0].section_id;
      this.getSubjects();
    }
  }

  pageChange(x) {
    this.pageNo = x;
    this.page_start = (x - 1) * 10;
  } 

  subjects = [];
  chapters = [];

  selected_class: string;
  selected_section: string;
  selected_subject: string;
  selected_chapter;
  dialog_type: string;
  alert_message: string;

  receiveClass($event) {
    this.selected_class = $event
    console.log(this.selected_class)
  }

  receiveSection($event) {
    this.selected_section = $event
    console.log(this.selected_section)
  }

  receiveSubject($event) {
    this.selected_subject = $event
    console.log(this.selected_subject)
    this.getChapters();
  }

  getSubjects() {
    this.service.getSubjects(this.selected_section)
      .subscribe(
        res => { this.subjects = res.subjects, console.log(res) }
      )
  }

  getChapters() {
    if (this.selected_subject == undefined || this.selected_subject == '') {
      this.alert_message = "Please Select Subject";
      this.openAlert(this.alert_message)
    } else {
      this.service.getChapters(this.selected_subject)
        .subscribe(
          res => { this.chapters = res.chapters, console.log(res) }
        )
    }
    this.pages = Math.ceil(this.chapters.length / 10);
  }

  deleteChapter(lession_id) {
    this.service.deleteChapter(lession_id)
      .subscribe(
        res => {
          if (res == true) {
            this.chapters = this.chapters.filter(res => res.lession_id !== lession_id)
            this.alert_message = "Chapter Deleted Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Chapter Not Deleted";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  updateChapter(status, lession_id, i) { 
    this.service.updateChapter(status, lession_id)
    .subscribe(
      res => {
        if(res == true) {
          this.alert_message = "Chapter Updated Successfully";
          this.openAlert(this.alert_message);
          if(status === 'started') {
            this.chapters[i].start_check = true;
            this.chapters[i].start_disable = true;
            this.chapters[i].end_disable = false;
          } else if(status === 'completed') {
            this.chapters[i].end_check = true;
            this.chapters[i].end_disable = true;
          }
        } else {
          this.alert_message = "Chapter Not Updated";
          this.openAlert(this.alert_message)
        }
      }
    )
  }

  addchapter() {
    if (this.selected_subject == undefined || this.selected_subject == '') {
      this.alert_message = "Please Select Class, Section and Subject";
      this.openAlert(this.alert_message)
    } else { 
      this.selected_chapter = {
        title: '',
        chapter_code: '',
        description: '',
      };
      this.dialog_type = 'add';
      this.openDialog(this.selected_chapter, this.dialog_type)
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

  editchapter(i) {
    this.selected_chapter = this.chapters[i];
    this.dialog_type = 'edit';
    this.openDialog(this.selected_chapter, this.dialog_type)
  }

  openDialog(selected_chapter, dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      class: this.selected_class,
      section: this.selected_section,
      subject: this.selected_subject,
      chapter: selected_chapter,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(AddchapterComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data)
        if (this.dialog_type == 'add') {
          this.getChapters();
          // this.collection.chapters.push(data);
        } else if (this.dialog_type == 'edit') {
          this.getChapters();
          // this.collection.chapters.filter(res => res.lession_id == data.lession_id)[0].title = data.title;
          // this.collection.chapters.filter(res => res.lession_id == data.lession_id)[0].chapter_code = data.chapter_code;
          // this.collection.chapters.filter(res => res.lession_id == data.lession_id)[0].description = data.description;
        }

      }
    );

  }

}
