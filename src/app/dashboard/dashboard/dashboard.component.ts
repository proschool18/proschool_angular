import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../_services/dashboard.service';
import { ClasessService } from '../../_services/clasess.service';
import { ServicesService } from '../../services.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AttendanceComponent } from '../attendance/attendance.component';
import { AcademicsComponent } from '../academics/academics.component';
import { FeesComponent } from '../fees/fees.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private allservice: ServicesService, private service: DashboardService, private classService: ClasessService, public dialog: MatDialog) { }

  private user: User;
  private currentDate;
  private day;
  private date;
  private month;
  private monthName;
  private year;
  private time;
  private current_date;
  i;

  private tasks_tab = true;
  private events_tab = false;
  private notice_tab = false;
  private feedback_back = false;

  private tab_view = [];
  private tasks = [];
  private events = [];
  private noticeboard = [];
  private feedbacks = [];

  private classes = [];
  private sections = [];
  private selected_class;
  private selected_section;
  private selected_month: any = 'all';

  private selectedTab: string = 'tasks';

  private class_attendance = {
    present: '',
    absent: '',
    onleave: '',
    donutchart: [],
  };

  private all_employee_attendance = {
    "totalDays": '',
    "totalAbsent": '',
    "totalOnLeave": '',
    "totalPresent": '',
    "employeeAttendence": [
      {
        "monthName": '',
        "month": '',
        "count": '',
        "attendance": {
          "present": '',
          "absent": '',
          "onLeave": '',
          "presentPercent": '',
          "absentPercent": '',
          "onLeavePercent": ''
        }
      },
    ],
    "designation": '',
    "employee_code": '',
    "job_category": '',
    "employeeName": '',
    "gender": ''
  }

  private monthly_attendance = [];

  private employee_attendance = {
    present: '',
    absent: '',
    onleave: '',
  }

  private classEvaluation = [];

  private studentAttendance = {};
  private employeeAttendance = {};

  private payments = {};
  private expenses = {};
  private fees = {
    "totalFees": '',
    "paidFees": '',
    "balanceFees": '',
  };

  private class_schedule = [];
  private section_schedule = [];

  view_fee = [400, 180];
  view_classAttendance = [220, 150]
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel: any;
  showYAxisLabel = true;
  yAxisLabel: any;
  timeline = true;
  colorScheme = {
    domain: ['#5cb85c', '#d9534f', '#f0ad4e']
  };
  AcademicsColorScheme = {
    domain: ['#5e81f4']
  }
  showLabels = true;
  public fee_data: any;
  public classAtt_data: any;
  public empAtt_data: any;
  public classAcademics = [];
  public classAca_data: any;

  private months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user);
    this.today_date();
    console.log(this.current_date)
    this.getTasks();
    if (this.user.role === "admin") {
      this.getClasses();
      this.getStudentAttendance();
      this.getEmployeeAttedance();
      this.getPayments();
      this.getExpenses();
      this.getFeeCollection();
    } else if (this.user.role === "teacher") {
      this.getClassTeacher_class();
      this.getEmployeeAttendance();
      this.getTeacherSchedule();
    }
  }

  today_date() {
    this.currentDate = new Date();
    this.date = this.currentDate.getDate();
    this.day = this.currentDate.getDay();
    this.month = this.currentDate.getMonth() + 1;
    this.monthName = this.months[this.month - 1];
    this.year = this.currentDate.getFullYear();
    if (this.month < 10) {
      this.month = '0' + this.month;
    }
    if (this.date < 10) {
      this.date = '0' + this.date;
    }
    this.current_date = this.year + '-' + this.month + '-' + this.date;
  }

  // checkTime(i) {
  //   if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
  //   return i;
  // }

  // getTime() {
  //   var today = new Date();
  //   var h = today.getHours();
  //   var m = today.getMinutes();
  //   var s = today.getSeconds();
  //   m = this.checkTime(m);
  //   s = this.checkTime(s);
  //   this.time = h + ":" + m + ":" + s;
  //   var t = setTimeout(this.getTime, 500);
  // }

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

  getClassTeacher_class() {
    this.service.getClassTeacher_class()
      .subscribe(
        res => { this.classes = res.school_classes, this.getClassTeacher_section(res.school_classes[0].class_id), console.log(this.classes) }
      )
  }

  getClassTeacher_section(class_id) {
    this.selected_class = class_id;
    this.service.getClassTeacher_section(this.selected_class)
      .subscribe(
        res => { this.sections = res.class_sections, this.selected_section = res.class_sections[0].section_id, this.getClassAttendance(), this.getClassAcademics(), console.log(res) }
      )
  }

  getClassAttendance() {
    this.allservice.getAttendance(this.current_date, this.selected_class, this.selected_section)
      .subscribe(
        res => { this.class_attendance = res, this.viewClassAttendance(), console.log(this.class_attendance) }
      )
  }

  getEmployeeAttendance() {
    this.service.getEmployeeAttendance()
      .subscribe(
        res => { this.all_employee_attendance = res,
            this.employee_attendance.present = res.totalPresent;
            this.employee_attendance.absent = res.totalAbsent;
            this.employee_attendance.onleave = res.totalOnLeave;
            this.viewEmployeeAttendance(), 
            console.log(this.all_employee_attendance) }
      )
  }

  getmonthlyEmployeeAttendance() {
    console.log(this.selected_month)
    if(this.month === 'all') {
      this.employee_attendance.present = this.all_employee_attendance.totalPresent;
      this.employee_attendance.absent = this.all_employee_attendance.totalAbsent;
      this.employee_attendance.onleave = this.all_employee_attendance.totalOnLeave;
    } else {
      this.selected_month = (this.selected_month)
      this.employee_attendance.present = this.all_employee_attendance.employeeAttendence.filter(data => data.month === (this.selected_month + 1))[0].attendance.present;
      this.employee_attendance.absent = this.all_employee_attendance.employeeAttendence.filter(data => data.month === (this.selected_month + 1))[0].attendance.absent;
      this.employee_attendance.onleave = this.all_employee_attendance.employeeAttendence.filter(data => data.month === (this.selected_month + 1))[0].attendance.onLeave;
      console.log(this.employee_attendance)
    }
    this.viewEmployeeAttendance();
  }

  getTeacherSchedule() {
    console.log(this.day)
    this.service.getTeacherSchedule(this.day)
    .subscribe(
      res => { this.section_schedule = res.teacherSchedule, console.log(this.section_schedule) }
    )
  }

  getClassAcademics() {
    this.service.getClassAcademics(this.selected_section)
    .subscribe(
      res => { this.classEvaluation = res.students, this.viewAcademics(), console.log(this.classEvaluation) }
    )
  }

  getTasks() {
    this.service.getTasks(this.current_date)
      .subscribe(
        res => { this.tasks = res.tasks }
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

  getStudentAttendance() {
    this.service.getStudentAttendance(this.current_date)
      .subscribe(
        res => { this.studentAttendance = res.school_attendance }
      )
  }

  getEmployeeAttedance() {
    this.service.getEmployeeAttedance(this.current_date)
      .subscribe(
        res => { this.employeeAttendance = res.Employee_attendance }
      )
  }

  getPayments() {
    this.service.getPayments(this.current_date)
      .subscribe(
        res => { this.payments = res, console.log(res) }
      )
  }

  getExpenses() {
    this.service.getExpenses(this.current_date)
      .subscribe(
        res => { this.expenses = res, console.log(res) }
      )
  }

  getFeeCollection() {
    this.service.getFeeCollection()
      .subscribe(
        res => { this.fees = res, this.viewFees() }
      )
  }

  getClasses() {
    this.classService.getClasses()
      .subscribe(
        res => { this.classes = res.school_classes, this.getSchedules(res.school_classes[0].class_id), console.log(res) }
      )
  }

  getSchedules(class_id) {
    this.selected_class = class_id;
    this.service.getSchedules(this.day, this.current_date, this.selected_class)
      .subscribe(
        res => { this.class_schedule = res.timetable, this.getSections(this.selected_class), console.log(res) }
      )
  }

  getSections(class_id) {
    this.selected_class = class_id;
    this.classService.getSections(this.selected_class)
      .subscribe(
        res => { this.sections = res.class_sections, this.getSectionSchedule(res.class_sections[0].section_id), console.log(res) }
      )
  }

  getSectionSchedule(section_id) {
    this.selected_section = section_id;
    this.section_schedule = this.class_schedule.filter(data => data.section_id === this.selected_section)
  }

  viewFees() {
    this.yAxisLabel = 'Fees Amount';
    this.colorScheme = {
      domain: ['#5cb85c', '#d9534f', '#f0ad4e']
    };

    // this.single = [this.fees.totalFees, this.fees.paidFees, this.fees.balanceFees];

    this.fee_data = [
      { "name": "Total", "value": this.fees.totalFees },
      { "name": "Collected", "value": this.fees.paidFees },
      { "name": "Balance", "value": this.fees.balanceFees }
    ];
  }

  viewAcademics() {
    this.yAxisLabel = 'Students';

    for(this.i = 0; this.i < this.classEvaluation.length; this.i++) {
      // this.AcademicsColorScheme.domain.push('#5e81f4');      
      this.classAcademics.push({name: this.classEvaluation[this.i].grade, value: this.classEvaluation[this.i].count})
    }
    this.classAca_data = this.classAcademics;
    console.log(this.classAca_data)
  }

  viewClassAttendance() {
    const isDoughnut: boolean = false;
    const legendPosition: string = 'below';
    this.showLegend = false;
    this.colorScheme = {
      domain: ['#5cb85c', '#d9534f', '#f0ad4e']
    };

    this.classAtt_data = [
      { "name": "Present", "value": this.class_attendance.present },
      { "name": "Absent", "value": this.class_attendance.absent },
      { "name": "Leave", "value": this.class_attendance.onleave }
    ];

  }

  viewEmployeeAttendance() {
    const isDoughnut: boolean = false;
    const legendPosition: string = 'below';
    this.showLegend = false;
    this.colorScheme = {
      domain: ['#5cb85c', '#d9534f', '#f0ad4e']
    };

    this.empAtt_data = [
      { "name": "Present", "value": this.employee_attendance.present },
      { "name": "Absent", "value": this.employee_attendance.absent },
      { "name": "Leave", "value": this.employee_attendance.onleave }
    ];

  }

  getData(select) {
    this.openData(select)
  }

  openData(data_type) {
    const dataConfig = new MatDialogConfig();

    dataConfig.autoFocus = true;
    dataConfig.width = '80%';

    dataConfig.data = {
      data_type: data_type,
    };

    if (data_type == 'attendance') {
      const dataRef = this.dialog.open(AttendanceComponent, dataConfig);
      dataRef.afterClosed().subscribe()
    } else if (data_type == 'academics') {
      const dataRef = this.dialog.open(AcademicsComponent, dataConfig);
      dataRef.afterClosed().subscribe()
    } else if (data_type == 'fees') {
      const dataRef = this.dialog.open(FeesComponent, dataConfig);
      dataRef.afterClosed().subscribe()
    }
  }
}
