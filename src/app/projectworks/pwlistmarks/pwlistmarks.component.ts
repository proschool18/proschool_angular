import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { AssignmentsService } from '../../_services/assignments.service';
import { TeacherService } from '../../_services/teacher.service';
import { AcademicsService } from '../../_services/academics.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-pwlistmarks',
  templateUrl: './pwlistmarks.component.html',
  styleUrls: ['./pwlistmarks.component.css']
})
export class PwlistmarksComponent implements OnInit {
  config: any;
  collection = { count: '', students: [] };

  constructor( private service: ServicesService, private assignmentservice: AssignmentsService, private academicservice: AcademicsService, private teacherService: TeacherService, public dialog: MatDialog) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
   }
    
  user: User;
  employee_id;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if(this.user.role === 'admin') {
      this.getClasses();
    } else if(this.user.role === 'teacher') {
      this.employee_id = this.user.employee_id;
      this.getTeacherClasses();
    }
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  selected_class;
  selected_section;
  selected_subject;
  selected_chapter;
  selected_projectwork;
  alert_message: string;

  classes = [];
  class_sections = [];
  //students = [];
  students_marks = [];
  subjects = [];
  chapters = [];
  projectworks = [];
  PW_marks = [];

  getClasses() {
    this.service.getClasses()
      .subscribe(
        res => { this.classes = res.school_classes, console.log(res) }
      )
  }

  getTeacherClasses() {
    this.teacherService.getTeacherClasses(this.employee_id)
      .subscribe(
        res => { this.classes = res.school_classes, console.log(res) }
      )
  }
  
  getSections() {
    this.service.getSections(this.selected_class)
      .subscribe(
        res => { this.class_sections = res.class_sections, console.log(res) }
      )
  }

  getTeacherSections() {
    this.teacherService.getTeacherSections(this.employee_id, this.selected_class)
      .subscribe(
        res => { this.class_sections = res.class_sections, console.log(res) }
      )
  }
  
  getSubjects() {
    this.service.getSubjects(this.selected_section)
    .subscribe(
      res => { this.subjects = res.subjects, console.log(res) }
    )
  }

  getTeacherSubjects() {
    this.teacherService.getTeacherSubjects(this.employee_id, this.selected_section)
    .subscribe(
      res => { this.subjects = res.subjects, console.log(res) }
    )
  }

  // getChapters() {
  //   this.academicservice.getChapters(this.selected_subject)
  //   .subscribe(
  //     res => { this.chapters = res.chapters, console.log(res) }
  //   )
  // }

  getProjectworks() {
    this.assignmentservice.getProjectworks(this.selected_section, this.selected_subject)
    .subscribe(
      res => { this.projectworks = res.projectworks, console.log(res) }
    )
  }

  getProjectwork_marks() {
    if(this.projectworks.length == 0) {
      this.alert_message = "No Project Works Found";
      this.openAlert(this.alert_message)
    } else if(this.selected_projectwork == undefined || this.selected_projectwork == ''){
      this.alert_message = "Please Select Project Work";
      this.openAlert(this.alert_message)
    } else {
      this.assignmentservice.getProjectwork_marks(this.selected_section, this.selected_subject, this.selected_projectwork)
      .subscribe(
        res => { this.PW_marks = res.PW_marks, console.log(res), this.getStudent_marks(); }
      )
    }
  }

  getStudent_marks() {
    if( this.PW_marks.length > 0) {
      this.collection.students = this.PW_marks
    } else {
      this.collection.students = [];
      this.alert_message = "Projectwork Marks Not Yet Assigned";
      this.openAlert(this.alert_message)
    }
    console.log(this.collection.students)
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
