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

  ngOnInit() {
  }

  attendance = {
    present: '',
    absent: '',
    onleave: '',
    donutchart: ''
  };
  chart = [];
  category;
  date;
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
      this.service.getEmployeeAttendance(this.category ,this.date)
      .subscribe(
        res => { this.attendance = res, console.log(res) }
      )
    }
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
