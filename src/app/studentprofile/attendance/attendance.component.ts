import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { StudentsService } from '../../_services/students.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { appConfig } from '../../app.config';

import { User } from '../../_models/user';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  constructor(private service: ServicesService, private studentservice: StudentsService, private route: ActivatedRoute, public dialog: MatDialog) { }

  user: User;
  student_details: any = {};
  profileImage;

  private url = appConfig.apiUrl;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.selected_month = this.months[new Date().getMonth()]
    this.getStudentDetails();
  }

  getStudentDetails() {    
    this.studentservice.getStudentDetails(this.student_id)      
    .subscribe(        
      res => { this.student_details = res.students[0], this.getStudentImage(), console.log(res) 
      }      
    )  
  }

  getStudentImage() {
    this.profileImage = this.url + '/image/' + this.student_details.studentImage[0].filename;
  }

  selectedRowNum: number;
  student_id = this.route.snapshot.paramMap.get('id');
  section_id = this.route.snapshot.paramMap.get('sec_id');

  attendance = {
    attendance: [],
    present: '',
    absent: '',
    onleave: '',
  };
  selected_month: any = {month: '', value: ''};
  months = [{ 'month': 'January', 'value': '1' }, { 'month': 'February', 'value': '2' }, { 'month': 'March', 'value': '3' }, { 'month': 'April', 'value': '4' }, { 'month': 'May', 'value': '5' }, { 'month': 'June', 'value': '6' }, { 'month': 'July', 'value': '7' }, { 'month': 'August', 'value': '8' }, { 'month': 'September', 'value': '9' }, { 'month': 'October', 'value': '10' }, { 'month': 'November', 'value': '11' }, { 'month': 'December', 'value': '12' }]
  showMonthList: boolean = false;

  chartData = [];
  chartType = 'doughnut';
  chartLabels = ['Present', 'Absent', 'On Leave'];
  public chartOptions: any = {
    responsive: true
  };
  public chartLegend: true;
  alert_message: string;

  getstudentMonthAttendance() {
    if (this.student_id == undefined || this.student_id == '') {
      this.alert_message = "Please Select the Student";
      this.openAlert(this.alert_message)
    } else {
      this.service.getStudentAttendance(this.selected_month.value, this.student_id)
        .subscribe(
          res => { this.attendance = res, this.View(), console.log(res) }
        )
    }
  }

  View() {
    this.chartData = [];
    this.chartData.push(this.attendance.present);
    this.chartData.push(this.attendance.absent);
    this.chartData.push(this.attendance.onleave);
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
