import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  constructor(private service: ServicesService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
  }

  employee_id = this.route.snapshot.paramMap.get('id');

  showMonthList: boolean = false;

  attendance = [{
    monthName: '',
    month: '',
    count: '',
    attendance: {
      present: '',
      absent: '',
      onLeave: '',
      presentPercent: '',
      absentPercent: '',
      onLeavePercent: '',
    }
  }];
  month: any = {'month': '', 'value': ''};
  months = [{ 'month': 'January', 'value': 1 }, { 'month': 'February', 'value': 2 }, { 'month': 'March', 'value': 3 }, { 'month': 'April', 'value': 4 }, { 'month': 'May', 'value': 5 }, { 'month': 'June', 'value': 6 }, { 'month': 'July', 'value': 7 }, { 'month': 'August', 'value': 8 }, { 'month': 'September', 'value': 9 }, { 'month': 'October', 'value': 10 }, { 'month': 'November', 'value': 11 }, { 'month': 'December', 'value': 12 }]

  chartData = [];
  chartType = 'doughnut';
  chartLabels = ['Present', 'Absent', 'On Leave'];
  public chartOptions: any = {
    responsive: true
  };
  public chartLegend: true;
  alert_message: string;

  getEmployeeMonthlyAttendance() {
    console.log(this.month)
    if (this.employee_id == undefined || this.employee_id == '') {
      this.alert_message = "Please Select the Employee";
      this.openAlert(this.alert_message)
    } else {
        this.service.getEmployeeMonthlyAttendance(this.employee_id)
          .subscribe(
            res => { this.attendance = res.employeeAttendence.filter(data => data.month === parseInt(this.month.value)), this.View(), console.log(this.attendance) }
          )
    }
  }

  View() {
    this.chartData = [];
    if (this.month.value === 'all') {

    } else {
      this.chartData.push((this.attendance[0].attendance.present).toString());
      this.chartData.push((this.attendance[0].attendance.absent).toString());
      this.chartData.push((this.attendance[0].attendance.onLeave).toString());
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
