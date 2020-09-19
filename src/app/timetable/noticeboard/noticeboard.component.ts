import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TimetableService } from '../../_services/timetable.service';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { AddNoticeComponent } from '../add-notice/add-notice.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-noticeboard',
  templateUrl: './noticeboard.component.html',
  styleUrls: ['./noticeboard.component.css']
})
export class NoticeboardComponent implements OnInit {

  constructor(public service: TimetableService, public dialog: MatDialog) { }

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  dialog_type: string;
  alert_message: string;
  user: User;

  selected_notice: any;
  notices = [];

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getNotice();
  }

  pageChange(x) {
    this.pageNo = x;
    this.page_start = (x - 1) * 10;
  }

  getNotice() {
    this.service.getNotice()
    .subscribe(
      res => { 
        this.notices = res.noticeboard, 
        this.pages = Math.ceil(this.notices.length / 10),
        console.log(res) }
    )
  }

  addNotice() {
    this.selected_notice = '';
    this.dialog_type = 'add';
    this.openDialog(this.selected_notice, this.dialog_type)
  }

  viewNotice(i) {
    this.selected_notice = this.notices[i];
    this.dialog_type = 'view';
    this.openDialog(this.selected_notice, this.dialog_type)
  }

  editNotice(i) {
    this.selected_notice = this.notices[i];
    this.dialog_type = 'edit';
    this.openDialog(this.selected_notice, this.dialog_type)
  }

  deleteNotice(notice_id) {
    this.service.deleteNotice(notice_id)
    .subscribe(
      res => { 
        if(res == true) {
          this.alert_message = "Notice Deleted Successfully";
          this.openAlert(this.alert_message)
          this.getNotice();
        } else {
          this.alert_message = "Notice Not Deleted";
          this.openAlert(this.alert_message)
        }
      }
    )
  }

  openDialog(selected_notice, dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '55%';

    dialogConfig.data = {
      selected_notice: selected_notice,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(AddNoticeComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        this.getNotice();
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
