import { Component, OnInit } from '@angular/core';
import { AcademicsService } from '../../_services/academics.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EdittopicComponent } from '../edittopic/edittopic.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

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
  topics = [];
  topic_name;

  selected_class:string;
  selected_section:string;
  selected_subject:string;
  selected_chapter:string;
  selected_topic_status: string;

  selected_topic;
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
  }

  receiveChapter($event) {
    this.selected_chapter = $event
    console.log(this.selected_chapter)
    this.getTopics();
  }

  getSubjects() {
    this.service.getSubjects(this.selected_section)
      .subscribe(
        res => { this.subjects = res.subjects, console.log(res) }
      )
  }

  getChapters() {
    this.service.getChapters(this.selected_subject)
      .subscribe(
        res => { this.chapters = res.chapters, console.log(res) }
      )
  }
  
  getTopics() {
    if(this.selected_subject == undefined || this.selected_subject == '') {
      this.alert_message = "Please Select Subject and the Chapter";
      this.openAlert(this.alert_message)
    } else {
      this.service.getTopics(this.selected_chapter)
      .subscribe(
        res => { this.topics = res.topics, console.log(res) }
      )
    }
    this.pages = Math.ceil(this.topics.length / 10);
  }

  // addTopics() {
  //   if(this.selected_chapter == undefined || this.selected_chapter == ''){
  //     this.alert_message = "Please Select Subject and the Chapter";
  //     this.openAlert(this.alert_message)
  //   } else {      
  //     this.service.addTopics(this.topic_name, this.selected_chapter, this.selected_subject)
  //     .subscribe(
  //       res => { 
  //         if(res == true) {
  //           this.getTopics();
  //           this.alert_message = "Topic Added Successfully";
  //           this.openAlert(this.alert_message)
  //         } else {
  //           this.alert_message = "Topic Not added";
  //           this.openAlert(this.alert_message)
  //         }
  //       }
  //     )
  //   }  
  // }

  update_status(status, i) {    
    if(status == "pending") {     
      this.topics[i].topic_status = "completed";
    } else {
      this.topics[i].topic_status = "pending";
    }
    this.service.updateStatus(this.topics[i].topic_status, this.selected_chapter, this.topics[i].topic_id)
    .subscribe(
      res => { 
        if(res == true) {
          this.alert_message = "Topic Updated Successfully";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "Topic Not Updated";
          this.openAlert(this.alert_message)
        }
      }
    )
  }

  deleteTopic(topic_id) {
    this.selected_topic_status = this.topics.filter(topic => topic.topic_id === topic_id)[0].topic_status;
    this.service.deleteTopic( this.selected_chapter, topic_id, this.selected_topic_status)
      .subscribe(
        res => { 
          if(res == true) {
            this.topics = this.topics.filter(res => res.topic_id !== topic_id)
            this.alert_message = "Topic Deleted Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Topic Not Deleted";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  addTopic() {
    this.selected_topic = '';
    this.openDialog(this.selected_topic, 'add')
  }

  editTopic(i) {
    this.selected_topic = this.topics[i];
    this.openDialog(this.selected_topic, 'edit')
  }

  openDialog(selected_topic, dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      class: this.selected_class,
      section: this.selected_section,
      subject: this.selected_subject,
      chapter: this.selected_chapter,
      topic: selected_topic,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(EdittopicComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data)
        this.getTopics();
        // this.collection.topics.filter(res => res.topic_id == data.topic_id)[0].topic_name = data.topic_name;
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
