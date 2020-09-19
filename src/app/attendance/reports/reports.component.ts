import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

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

  alert_message: string;
  attendance = {
    present: '',
    absent: '', 
    onleave: '',
    donutchart: ''
  };
  chart = [];
  date;
  end_date;
  attenBy_date: boolean;
  months = [{'month': 'January', 'value': '01'}, {'month': 'February', 'value': '02'}, {'month': 'March', 'value': '03'}, {'month': 'April', 'value': '04'}, {'month': 'May', 'value': '05'}, {'month': 'June', 'value': '06'}, {'month': 'July', 'value': '07'}, {'month': 'August', 'value': '08'}, {'month': 'September', 'value': '09'}, {'month': 'October', 'value': '10'}, {'month': 'November', 'value': '11'}, {'month': 'December', 'value': '12'}]

  chartData = [];
  chartType = 'doughnut';
  chartLabels = ['Present', 'Absent', 'On Leave'];
  public chartOptions: any = {
    responsive: true
  };
  public chartLegend: true;

  list: boolean = true;

  selected_class:string;
  selected_section:string;

  receiveClass($event) {
    this.selected_class = $event
    console.log(this.selected_class)
  }

  receiveSection($event) {
    this.selected_section = $event
    console.log(this.selected_section)
  }

  getAttendance() {
    if(this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select the Class and Section";
      this.openAlert(this.alert_message)
    } else {
      this.attenBy_date = true;
      this.service.getAttendance(this.date, this.selected_class, this.selected_section)
      .subscribe(
        res => { this.attendance = res, console.log(res) }
      )
    }
    this.pages = Math.ceil(this.attendance.donutchart.length / 10);
  }

  getRangeAttendance() {
    if(this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select the Class and Section";
      this.openAlert(this.alert_message)
    } else {
      this.attenBy_date = false;
      this.service.getRangeAttendance(this.selected_class, this.selected_section, this.date, this.end_date)
      .subscribe(
        res => { this.attendance = res, console.log(res) }
      )
    }
    this.pages = Math.ceil(this.attendance.donutchart.length / 10);
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
