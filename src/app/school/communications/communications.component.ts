import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../_services/message.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { AddMessageComponent } from './../add-message/add-message.component';
import { OpenMessageComponent } from './../open-message/open-message.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-communications',
  templateUrl: './communications.component.html',
  styleUrls: ['./communications.component.css']
})
export class CommunicationsComponent implements OnInit {

  config: any;
  collection = { count: '', messages: [] };

  constructor(private service: MessageService, public dialog: MatDialog) { 
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }

  user: User;
  employee_id;
  student_id;
  sent_to;
  title = 'Inbox Messages';
  confirm_msg;

  ngOnInit() { 
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if(this.user.role === 'parent') {
      console.log(this.user.users[0].section_id)
      this.student_id = this.user.users[0].student_id;
      this.sent_to = this.user.users[0].student_id;
      this.getParentsInbox();
    } else if(this.user.role === 'teacher') {
      this.employee_id = this.user.employee_id;
      this.sent_to = this.user.employee_id;
      this.getInbox();
    } else {
      this.sent_to = 'admin';
      this.getInbox();
    }
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  selected_class: string;
  selected_section: string;
  dialog_type: string;
  alert_message: string;

  getInbox() {
    this.title = 'Inbox Messages';
    this.service.getInbox(this.sent_to)
    .subscribe(
      res => { this.collection.messages = res.messages, console.log(res) }
    )
  }

  getParentsInbox() {
    this.title = 'Inbox Messages';
    this.service.getParentsInbox(this.sent_to, this.selected_class, this.selected_section)
    .subscribe(
      res => { this.collection.messages = res.messages, console.log(res) }
    )
  }

  getOutbox() {
    this.title = 'Outbox Messages';
    this.service.getOutbox(this.sent_to)
    .subscribe(
      res => { this.collection.messages = res.messages, console.log(res) }
    )
  }

  addMessage() {
    this.openDialog()
  }

  openMessage(message_id) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      message: this.collection.messages.filter(data => data.message_id === message_id),
      title: this.title
    };

    const dialogRef = this.dialog.open(OpenMessageComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(); 
  }

  openDialog(): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {

    };

    const dialogRef = this.dialog.open(AddMessageComponent, dialogConfig);

    dialogRef.afterClosed().subscribe();    

  }

}
