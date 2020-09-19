import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../../_services/assignments.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { PwassignComponent } from '../pwassign/pwassign.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-pwbydate',
  templateUrl: './pwbydate.component.html',
  styleUrls: ['./pwbydate.component.css']
})
export class PwbydateComponent implements OnInit {

  constructor(private service: AssignmentsService, public dialog: MatDialog) {}

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;
    
  user: User;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  pageChange(x) {
    this.pageNo = x;
    this.page_start = (x - 1) * 10;
  } 

  projectworks = [];
  all_projectworks = [];

  selected_class:string;
  selected_section:string;
  selected_subject:string;
  selected_projectwork;
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
    this.getProjectworks_byDate();
  }

  getProjectworks_byDate() {
    console.log(this.selected_subject);
    if(this.selected_subject == undefined || this.selected_subject == '') {
      this.alert_message = "Please Select Class, Section and Subject";
      this.openAlert(this.alert_message)
    } else {
      this.service.getProjectworks(this.selected_section, this.selected_subject)
      .subscribe(
        res => { this.all_projectworks = this.projectworks = res.projectworks, 
          this.pages = Math.ceil(this.projectworks.length / 10);
          console.log(res) 
        }
      )
    }
  }

  deleteprojectwork(projectwork_id) {
    this.service.deleteProjectwork(projectwork_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.projectworks = this.projectworks.filter(res => res.projectwork_id !== projectwork_id)
            this.alert_message = "Projectwork Deleted Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Projectwork Not Deleted";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  addprojectwork() {
    if(this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class, Section and Subject";
      this.openAlert(this.alert_message)
    } else {
      this.selected_projectwork = {
        projectwork_id: '',
        section_id: '',
        subject_id: '',
        project_work: '',
        due_date: '',
        assign_date: '',
        maxMarks: '',
        description: '',
      };
      this.dialog_type = 'add';
      this.openDialog(this.selected_projectwork, this.dialog_type)
    }
  }

  editprojectwork(i) {
    this.selected_projectwork = this.projectworks[i];
    this.dialog_type = 'edit';
    this.openDialog(this.selected_projectwork, this.dialog_type)
  }

  openDialog(selected_projectwork, dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      class: this.selected_class,
      section: this.selected_section,
      subject: this.selected_subject,
      projectwork: selected_projectwork,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(PwassignComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data)          
        if (this.dialog_type == 'add') {
          this.getProjectworks_byDate();
          // this.collection.projectworks.push(data);           
        } else if (this.dialog_type == 'edit') {
          this.getProjectworks_byDate();
          // this.collection.projectworks.filter(res => res.projectwork_id == data.projectwork_id)[0].project_work = data.project_work;
          // this.collection.projectworks.filter(res => res.projectwork_id == data.projectwork_id)[0].maxMarks = data.maxMarks;
          // this.collection.projectworks.filter(res => res.projectwork_id == data.projectwork_id)[0].assign_date = data.assign_date;
          // this.collection.projectworks.filter(res => res.projectwork_id == data.projectwork_id)[0].due_date = data.due_date;
          // this.collection.projectworks.filter(res => res.projectwork_id == data.projectwork_id)[0].description = data.description;
        }
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
