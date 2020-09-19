import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-emp-reports',
  templateUrl: './emp-reports.component.html',
  styleUrls: ['./emp-reports.component.css']
})
export class EmpReportsComponent implements OnInit {

  constructor(private service: ServicesService, public dialog: MatDialog) { }

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  ngOnInit() {
  }

  pageChange(x) {
    this.pageNo = x;
    this.page_start = (x - 1) * 10;
  } 

  attendance = {
    present: '',
    absent: '',
    onleave: '',
    employeeAttendence: '',
    count: '',
  };
  attendanceRange = [];
  showEmployeeTypeList: boolean = false;
  chart = [];
  category;
  date;
  end_date;
  attenBy_date: boolean;
  alert_message: string;

  chartData = [];
  chartType = 'pie';
  chartLabels = ['Present', 'Absent', 'On Leave'];
  public chartOptions: any = {
    responsive: true
  };
  public chartLegend: true;

  list: boolean = true;

  getEmployeeAttendance() {
    if(this.category == undefined || this.date == undefined || this.category == '' || this.date == '') {
      this.alert_message = "Please Select the Category and Date";
      this.openAlert(this.alert_message)
    } else {
      this.attenBy_date = true;
      this.service.getEmployeeAttendance(this.category ,this.date)
      .subscribe(
        res => { this.attendance = res, console.log(res) }
      )
    }
    this.pages = Math.ceil(this.attendance.employeeAttendence.length / 10);
  }

  getRangeAttendance() {
    if(this.category == undefined || this.category == '') {
      this.alert_message = "Please Select the Employee";
      this.openAlert(this.alert_message)
    } else {
      this.attenBy_date = false;
      this.service.getEmployeeRangeAttendance(this.category, this.date, this.end_date)
      .subscribe(
        res => { this.attendanceRange = res, console.log(res) }
      )
    }
    this.pages = Math.ceil(this.attendanceRange.length / 10);
  }

  View(select) {
    if(select == 'list') {
      this.list = true;
    } else {
      console.log(this.attendance)
      this.list = false;
      this.chartData = [];
      this.chartData.push(this.attendance.present);
      this.chartData.push(this.attendance.absent);
      this.chartData.push(this.attendance.onleave);
    }
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
