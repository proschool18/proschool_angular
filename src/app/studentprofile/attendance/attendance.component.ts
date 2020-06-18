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

  selectedRowNum: number;
  student_id = this.route.snapshot.paramMap.get('id');
  section_id = this.route.snapshot.paramMap.get('sec_id');

  attendance = {
    donutchart: [],
    present: '',
    absent: '',
    onleave: '',
  };
  selected_month: any = {month: '', value: ''};
  months = [{ 'month': 'January', 'value': '01' }, { 'month': 'February', 'value': '02' }, { 'month': 'March', 'value': '03' }, { 'month': 'April', 'value': '04' }, { 'month': 'May', 'value': '05' }, { 'month': 'June', 'value': '06' }, { 'month': 'July', 'value': '07' }, { 'month': 'August', 'value': '08' }, { 'month': 'September', 'value': '09' }, { 'month': 'October', 'value': '10' }, { 'month': 'November', 'value': '11' }, { 'month': 'December', 'value': '12' }]
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
