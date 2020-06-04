import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-classfee-reports',
  templateUrl: './classfee-reports.component.html',
  styleUrls: ['./classfee-reports.component.css']
})
export class ClassfeeReportsComponent implements OnInit {
  config: any;
  collection = { count: '', students_fee: [] };

  constructor(private service: ServicesService, public dialog: MatDialog) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
   }
  
  user: User;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getFeeTerms();
    this.getFeeTypes();
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  //students_fee = [];
  fee_terms = [];
  fee_types = [];
  i;
  totalpaid = 0;
  partialpaid = 0;
  nilpaid = 0;

  chartData = [];
  chartType = 'bar';
  chartLabels = [];
  public chartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public chartLegend: true;

  list: boolean = true;

  selected_class:string;
  selected_section:string;
  alert_message: string;
  fee_term = null;
  fee_type = null;

  receiveClass($event) {
    this.selected_class = $event
    console.log(this.selected_class)
  }

  receiveSection($event) {
    this.selected_section = $event
    console.log(this.selected_section)
  }

  getFeeTerms() {
    this.service.getFeeTerms()
      .subscribe(
        res => { this.fee_terms = res.fee_term, console.log(res) }
      )
  }

  getFeeTypes() {
    this.service.getFeeTypes()
      .subscribe(
        res => { this.fee_types = res.fee_type, console.log(res) }
      )
  }

  getClass_fee() {
    if(this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message)
    } else {
      console.log(this.fee_term);
      console.log(this.fee_type)
      this.service.getClass_fee(this.selected_section, this.fee_type, this.fee_term)
      .subscribe(
        res => { this.collection.students_fee = res.studentFee, console.log(res) }
      )
    }
  }

  View(select) {
    if(select == 'list') {
      this.list = true;
    } else {
      this.list = false;
      this.chartData = [{ data: [], label: 'Students Fee Paid' }];
      this.chartLabels = ['Total Paid', 'Partially Paid', 'Nil Paid'];
      this.totalpaid = 0;
      this.partialpaid = 0;
      this.nilpaid = 0;

      for(this.i = 0; this.i < this.collection.students_fee.length; this.i++) {    
        if(this.collection.students_fee[this.i].totalFee == this.collection.students_fee[this.i].paidAmount) {
          this.totalpaid++;
        } else if(this.collection.students_fee[this.i].totalFee == this.collection.students_fee[this.i].Balance) {
          this.nilpaid++;
        } else {
          this.partialpaid++;
        }
      }
      this.chartData[0].data.push(this.totalpaid);
      this.chartData[0].data.push(this.partialpaid);
      this.chartData[0].data.push(this.nilpaid);
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
