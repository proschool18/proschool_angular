import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { StudentsService } from '../../_services/students.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { appConfig } from '../../app.config';

@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit {

  constructor(private service: ServicesService, private studentservice: StudentsService, private route: ActivatedRoute, public dialog: MatDialog) { }

  student_details: any = {};
  profileImage;

  private url = appConfig.apiUrl;

  ngOnInit() {
    this.getStudentFees();
    this.getStudentDetails();
  }

  barProgress = [80, 70, 60, 100, 70, 30, 65, 30, 10];
  student_id = this.route.snapshot.paramMap.get('id');
  section_id = this.route.snapshot.paramMap.get('sec_id');
  i;

  allFees:boolean = true;
  alert_message: string;

  fees = [
    {
      totalFee: '',
      BalanceFee: '',
      PaidFee: '',
      Discount: '',
      Fine: '',
      TermwiseFee: [{
        FeeTerm: '',
        fee_term_id: '',
        TotalTermFees: '',
        PaidTermFees: '',
        BalanceTermFee: '',
        TotalDiscount: '',
        TotalFine: '',
      }],
    },
  ];

  selected_term: any = '';

  termwiseFee: [{
    fee_term: '',
    termBalance: '',
    termFeePaid: '',
    termFee: '',
    termDiscount: '',
    termFine: '',
    studentFeeDetails: [{
      TotalTypeFees: '',
      PaidTermFees: '',
      BalanceFee: '',
      TotalDiscount: '',
      TotalFine: '',
      FeeType: '',
    }],
  }];

  chartData = [
    { data: [], label: 'Total Fee' },
    { data: [], label: 'Paid Fee' },
    { data: [], label: 'Balance Fee' }
  ];
  chartType = 'bar';
  chartLabels = [];
  public chartOptions: any = {
    responsive: true
  };
  public chartLegend: true;

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

  getStudentFees() {
    if (this.student_id == undefined || this.student_id == '') {
      this.alert_message = "Please Select the Student";
      this.openAlert(this.alert_message)
    } else {
      if(this.selected_term.FeeTerm == 'All TermFees' || this.selected_term.FeeTerm == undefined || this.selected_term.FeeTerm == '') {
        this.allFees = true;
        this.service.getStudentFees(this.student_id)
          .subscribe(
            res => { this.fees = res.TermFeeDetails, this.View(), console.log(res) }
          )
      } else {
        this.allFees = false;
        this.service.getStudentTermFees(this.student_id, this.selected_term.fee_term_id)
          .subscribe(
            res => { this.termwiseFee = res.TermFeeDetails, this.ViewTerms(), console.log(res) }
          )
      }
      
    }
  }

  View() {

    this.chartData = [
      { data: [], label: 'Total Fee' },
      { data: [], label: 'Paid Fee' },
      { data: [], label: 'Balance Fee' }
    ];
    this.chartLabels = [];

    for(this.i = 0; this.i < this.fees[0].TermwiseFee.length; this.i++) {        
      this.chartData[0].data.push(this.fees[0].TermwiseFee[this.i].TotalTermFees);
      this.chartData[1].data.push(this.fees[0].TermwiseFee[this.i].PaidTermFees);
      this.chartData[2].data.push(this.fees[0].TermwiseFee[this.i].BalanceTermFee);
      console.log(this.chartData)
      this.chartLabels.push(this.fees[0].TermwiseFee[this.i].FeeTerm);
    }
  }

  ViewTerms() {

    if (this.selected_term == "All Terms Fee") {
      this.allFees = true;
      this.View();

    } else {

      this.allFees = false;

      this.chartData = [
        { data: [], label: 'Total Fee' },
        { data: [], label: 'Paid Fee' },
        { data: [], label: 'Balance Fee' }
      ];
      this.chartLabels = [];

      for(this.i = 0; this.i < this.termwiseFee[0].studentFeeDetails.length; this.i++) {        
        this.chartData[0].data.push(this.termwiseFee[0].studentFeeDetails[this.i].TotalTypeFees);
        this.chartData[1].data.push(this.termwiseFee[0].studentFeeDetails[this.i].PaidTermFees);
        this.chartData[2].data.push(this.termwiseFee[0].studentFeeDetails[this.i].BalanceFee);
        console.log(this.chartData)
        this.chartLabels.push(this.termwiseFee[0].studentFeeDetails[this.i].FeeType);
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
