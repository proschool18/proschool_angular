import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit {

  constructor(private service: ServicesService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getClasses();
  }

  classes = [];
  class_sections = [];
  student_fee = [];
  fee_terms = [];
  i; j; total; partial; nil;
  total_percentage;
  partial_percentage;
  nil_percentage;

  fee_details = [];

  chart_object = {
    term: '',
    data: [],
    percentage: [],
  };

  chartData = [];
  className: string;
  sectioName: string;
  alert_message: string;

  getClasses() {
    this.service.getClasses()
      .subscribe(
        res => { this.classes = res.school_classes, this.getSections(this.classes[0].class_id)}
      )
  }

  getSections(class_id) {
    this.className = this.classes.filter( res => res.class_id === class_id)[0].name;
    this.service.getSections(class_id)
      .subscribe(
        res => { this.class_sections = res.class_sections, this.getdashboard_fees(this.class_sections[0].section_id) }
      )
  }

  getdashboard_fees(section_id) {
    this.sectioName = this.class_sections.filter( res => res.section_id === section_id)[0].name;
    this.service.getdashboard_fees(section_id)
      .subscribe(
        res => { this.fee_details = res.studentFee,
                this.View()
            }
      )
  }

  View() {
    this.chartData = [];

    if(this.fee_details) {

      for (this.i = 0; this.i < this.fee_details.length; this.i++) {
        this.total = 0;
        this.partial = 0;
        this.nil = 0;
        this.total_percentage = 0;
        this.partial_percentage = 0;
        this.nil_percentage = 0;
  
        this.chart_object = {
          term: '',
          data: [],
          percentage: [],
        };

        this.student_fee = this.fee_details[this.i].students;

        for(this.j = 0; this.j < this.student_fee.length; this.j++) {
          console.log(this.student_fee.length)

          if (this.student_fee[this.j].totalFee == this.student_fee[this.j].totalPaidFee) {
            this.total++;
          } else if (this.student_fee[this.j].totalFee == this.student_fee[this.j].totalBalance) {
            this.nil++;
          } else {
            this.partial++;
          }
          
        }

        this.chart_object.term = this.fee_details[this.i].fee_term;

        this.chart_object.data.push(this.total);
        this.chart_object.data.push(this.partial);
        this.chart_object.data.push(this.nil);
        this.total_percentage = ((this.total / (this.total + this.partial + this.nil)) * 100).toFixed(2);
        this.partial_percentage = ((this.partial / (this.total + this.partial + this.nil)) * 100).toFixed(2);
        this.nil_percentage = ((this.nil / (this.total + this.partial + this.nil)) * 100).toFixed(2);
        this.chart_object.percentage.push(this.total_percentage);
        this.chart_object.percentage.push(this.partial_percentage);
        this.chart_object.percentage.push(this.nil_percentage);
  
        this.chartData.push(this.chart_object)
      }
      
    } else {
      this.alert_message = "No Fee Details Found for " + this.className + " " + this.sectioName ;
      this.openAlert(this.alert_message)
    }
    
    console.log(this.chartData);
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
