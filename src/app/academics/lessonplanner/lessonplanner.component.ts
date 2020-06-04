import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-lessonplanner',
  templateUrl: './lessonplanner.component.html',
  styleUrls: ['./lessonplanner.component.css']
})
export class LessonplannerComponent implements OnInit {

  constructor(private service: ServicesService, public dialog: MatDialog) {}

  user: User;

  ngOnInit() { 
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.user.role === 'parent') {
      console.log(this.user.users[0].section_id)
      this.selected_section = this.user.users[0].section_id;
      this.getSubjects();
    }
  }

  subjects = [];
  chapters = [];
  start_date;
  end_date;

  selected_class:string;
  selected_section:string;
  selected_subject:string;
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
    if(this.selected_subject == undefined || this.selected_subject == '') {
      this.alert_message = "Please Select Class, Section and Subject";
      this.openAlert(this.alert_message)
    } else {
      this.service.getChapters(this.selected_subject)
      .subscribe(
        res => { this.chapters = res.chapters, console.log(res) }
      )
    }
  }

  getDays(i) {
    this.start_date = new Date(this.chapters[i].start_date);
    this.end_date = new Date(this.chapters[i].end_date);
    console.log(this.start_date)
    this.chapters[i].days = ((this.end_date.getTime() - this.start_date.getTime()) / (1000 * 24 * 60 * 60)) + 1;
    console.log(this.chapters[i].days)
  }

  addPlanner() {
    this.service.addPlanner(this.chapters)
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "Lesson-Plan Updated Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Lesson-Plan Not Updated";
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
