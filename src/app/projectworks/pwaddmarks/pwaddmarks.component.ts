import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../../_services/assignments.service';
import { TeacherService } from '../../_services/teacher.service';
import { AcademicsService } from '../../_services/academics.service';
import { ServicesService } from '../../services.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-pwaddmarks',
  templateUrl: './pwaddmarks.component.html',
  styleUrls: ['./pwaddmarks.component.css']
})
export class PwaddmarksComponent implements OnInit {
  config: any;
  collection = { count: '', students: [] };

  constructor(private service: ServicesService, private assignmentservice: AssignmentsService, private academicservice: AcademicsService, private teacherService: TeacherService, public dialog: MatDialog) { 
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }
    
  user: User;
  marks_add;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  selected_class:string;
  selected_section:string;
  selected_subject:string;
  selected_projectwork:string;
  alert_message: string;

  //students = [];
  students_marks = [];

  projectworks = [];
  PW_marks = [];
  i;

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
    console.log(this.selected_subject);
    this.getProjectworks_byDate();
  }

  getStudents() {
    this.service.getStudents(this.selected_section)
      .subscribe(
        res => { this.collection.students = res.students, console.log(this.collection.students) }
      )
  }

  getProjectworks_byDate() {
    console.log(this.selected_subject);
    if(this.selected_subject == undefined || this.selected_subject == '') {
      this.alert_message = "Please Select Class, Section and Subject";
      this.openAlert(this.alert_message)
    } else {
      this.service.getProjectworks_byDate(this.selected_section, this.selected_subject)
      .subscribe(
        res => { this.projectworks = res.projectworks, console.log(res) }
      )
    }
  }

  getProjectwork_marks() {
    if(this.projectworks.length == 0) {
      this.alert_message = "No Project Works Found";
      this.openAlert(this.alert_message)
    } else if(this.selected_projectwork == undefined || this.selected_projectwork == ''){
      this.alert_message = "Please Select Project Work";
      this.openAlert(this.alert_message)
    } else {
      this.service.getProjectwork_marks(this.selected_section, this.selected_subject, this.selected_projectwork)
      .subscribe(
        res => { this.PW_marks = res.PW_marks, console.log(res), this.getStudent_marks(); }
      )
    }
  }

  getStudent_marks() {
    if( this.PW_marks.length > 0) {
      this.marks_add = false;
      this.collection.students = this.PW_marks
    } else {
      this.marks_add = true;
      this.getStudents();
    }
    console.log(this.collection.students)
  }

  addProjectwork_marks() {
    if(this.projectworks.length == 0) {
      this.alert_message = "No Project Works Found";
      this.openAlert(this.alert_message)
    } else if(this.selected_projectwork == undefined || this.selected_projectwork == '') {
      this.alert_message = "Please Select Project Work";
      this.openAlert(this.alert_message)
    } else {
      this.service.addProjectwork_marks(this.collection.students, this.selected_section, this.selected_subject, this.selected_projectwork)
      .subscribe(
        res => {
          if (res == true) {
            this.getProjectwork_marks();
            this.alert_message = "Marks Added Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Marks Not added";
            this.openAlert(this.alert_message)
          }
        }
      )
    }    
  }
  
  editMarks(projectwork_result_id, marks) {
    this.assignmentservice.editProjectwork_marks(projectwork_result_id, marks)
      .subscribe(
        res => {
          if (res == true) {
            this.getProjectwork_marks();
            this.alert_message = 'Student Marks Edited Successfully';
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = 'Marks Not Edited';
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
