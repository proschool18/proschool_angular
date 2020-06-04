import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-studentfee-reports',
  templateUrl: './studentfee-reports.component.html',
  styleUrls: ['./studentfee-reports.component.css']
})
export class StudentfeeReportsComponent implements OnInit {

  constructor(private service: ServicesService, public dialog: MatDialog) { }

  user: User;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if(this.user.role === 'parent') {
      this.selected_student = this.user.users[0].student_id;
      this.selected_section = this.user.users[0].section_id;
      this.getStudent_fee();
    }
  }

  students = [];
  student_fee = [{
    'TermwiseFee': []
  }];
  i; j;
  chartData = [];
  chartType = 'horizontalBar';
  chartLabels = [];
  public chartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public chartLegend: true;

  list: boolean = true;

  selected_class:string;
  selected_section:string;
  selected_student:string;
  alert_message: string;

  receiveClass($event) {
    this.selected_class = $event
    console.log(this.selected_class)
  }

  receiveSection($event) {
    this.selected_section = $event
    console.log(this.selected_section)
    this.getStudents();
  }

  getStudents() {
    if(this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message)
    } else {
      this.service.getStudents(this.selected_section)
      .subscribe(
        res => { this.students = res.students, console.log(res) }
      )
    }
  }

  getStudent_fee() {
    if(this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message)
    } else {
      this.service.getStudent_fee(this.selected_student)
      .subscribe(
        res => { this.student_fee = res.TermFeeDetails, console.log(res) }
      )
    }
  }

  View(select) {
    if(select == 'list') {
      this.list = true;
    } else {
      console.log(this.student_fee)
      this.list = false;
      this.chartData = [
        { data: [], label: 'Total Fee' },
        { data: [], label: 'Paid Fee' },
        { data: [], label: 'Balance Fee' }
      ];
      this.chartLabels = [];

      for(this.i = 0; this.i < this.student_fee[0].TermwiseFee.length; this.i++) {        
        this.chartData[0].data.push(this.student_fee[0].TermwiseFee[this.i].TotalTermFees);
        this.chartData[1].data.push(this.student_fee[0].TermwiseFee[this.i].PaidTermFees);
        this.chartData[2].data.push(this.student_fee[0].TermwiseFee[this.i].BalanceTermFee);
        console.log(this.chartData)
        this.chartLabels.push(this.student_fee[0].TermwiseFee[this.i].FeeTerm);
      }
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
