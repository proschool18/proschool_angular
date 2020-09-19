import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../_services/dashboard.service';
import { TeacherService } from '../../_services/teacher.service';
import { ClasessService } from '../../_services/clasess.service';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {

  constructor(private service: DashboardService, private teacherservice: TeacherService, private classService: ClasessService, public dialog: MatDialog) { }

  employee_id;

  private currentDate;
  private day;
  private date;
  private month;
  private monthName;
  private year;
  private time;
  private current_date

  private tasks_tab = true;
  private events_tab = false;
  private notice_tab = false;
  private feedback_back = false;

  private classTeacher:any = {};
  private section_attendance = [];
  private employeeAttendance = [];
  private employeeSchedule = [];

  private tab_view = [];
  private tasks = [];
  private events = [];
  private noticeboard = [];
  private expenses = [];

  private classes = [];
  private sections = [];
  private selected_class;
  private selected_section;

  private fees:any = {};

  private months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  ngOnInit() {
    this.employee_id = JSON.parse(localStorage.getItem('currentUser')).employee_id;
    this.today_date();
    this.getClassTeacher();
    this.getTasks();
    this.getEmployee_Attendance();
    this.getEmployee_Schedule();
    this.getExpenses();
  }

  today_date() {
    this.currentDate = new Date();
    this.date = this.currentDate.getDate();
    this.day = this.currentDate.getDay();
    this.month = this.currentDate.getMonth() + 1;
    this.monthName = this.months[this.month - 1];
    this.year = this.currentDate.getFullYear();
    if (this.date < 10) {
      this.date = '0' + this.date;
    }
    if (this.month < 10) {
      this.month = '0' + this.month;
    }
    this.current_date = this.year + '-' + this.month + '-' + this.date;
    console.log(this.current_date)
  }

  select_tab(select) {
    if (select == 'tasks_tab') {
      this.getTasks();
      this.tasks_tab = true;
      this.events_tab = false;
      this.notice_tab = false;
      this.feedback_back = false;
    } else if (select == 'events_tab') {
      this.getEvents();
      this.tasks_tab = false;
      this.events_tab = true;
      this.notice_tab = false;
      this.feedback_back = false;
    } else if (select == 'notice_tab') {
      this.getNoticeBoard();
      this.tasks_tab = false;
      this.events_tab = false;
      this.notice_tab = true;
      this.feedback_back = false;
    } else if (select == 'feedback_back') {
      this.getTasks();
      this.tasks_tab = false;
      this.events_tab = false;
      this.notice_tab = false;
      this.feedback_back = true;
    }
  }

  getClassTeacher() {
    this.teacherservice.getClassTeacher(this.employee_id)
    .subscribe(
      res => { 
        this.classTeacher = res.class_teacher[0],
        this.getSectionAttendance();
        this.getsectionFees();
      }
    )
  }

  getTasks() {
    this.teacherservice.getTeacherTasks(this.employee_id)
      .subscribe(
        res => { this.tasks = res.tasks.filter(data => data.due_date === this.current_date) }
      )
  }

  getEvents() {
    this.service.getEvents(this.current_date)
      .subscribe(
        res => { this.events = res.school_events }
      )
  }

  getNoticeBoard() {
    this.service.getNoticeBoard(this.current_date)
      .subscribe(
        res => { this.noticeboard = res.noticeboard }
      )
  }

  getSectionAttendance() {
    this.teacherservice.getSectionAttendance(this.current_date, this.classTeacher.section_id)
      .subscribe(
        res => { this.section_attendance = res }
      )
  }

  getEmployee_Attendance() {
    this.teacherservice.getEmployee_Attendance(this.month, this.employee_id)
      .subscribe(
        res => { this.employeeAttendance = res }
      )
  }

  getEmployee_Schedule() {
    this.teacherservice.getEmployee_Schedule(this.day, this.employee_id)
      .subscribe(
        res => { this.employeeSchedule = res.timetable }
      )
  }

  getExpenses() {
    this.service.getExpenses(this.current_date)
      .subscribe(
        res => { this.expenses = res }
      )
  }

  getsectionFees() {
    this.teacherservice.getsectionFees(this.classTeacher.section_id)
      .subscribe(
        res => { 
          this.fees = res, 
          console.log(this.fees) 
        } 
      )
  }

  // getClasses() {
  //   this.classService.getClasses()
  //     .subscribe(
  //       res => { this.classes = res.school_classes, console.log(res)}
  //     )
  // }

  // getSections() {
  //   this.classService.getSections(this.selected_class)
  //     .subscribe(
  //       res => { this.sections = res.class_sections, console.log(res)}
  //     )
  // }

}
