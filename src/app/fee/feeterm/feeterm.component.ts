import { Component, OnInit } from '@angular/core';
import { FeeService } from '../../_services/fee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EditfeeComponent } from '../editfee/editfee.component';

@Component({
  selector: 'app-feeterm',
  templateUrl: './feeterm.component.html',
  styleUrls: ['./feeterm.component.css']
})
export class FeetermComponent implements OnInit {

  constructor(private service: FeeService, private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit() {
    this.getFeeTerms();
  }

  fee_terms = [];
  selected_feeTerm;
  dialog_type: string;
  alert_message: string;

  feetermForm: FormGroup = this.fb.group({
    fee_term: ['', Validators.required],
  });

  getFeeTerms() {
    this.service.getFeeTerms()
      .subscribe(
        res => { this.fee_terms = res.fee_term, console.log(res) }
      )
  }

  addFeeTerms() {
    this.service.addFeeTerms(this.feetermForm.value)
    .subscribe(
      res => { 
        if(res == true) {
          this.fee_terms.push(this.feetermForm.value)
          this.alert_message = "FeeTerm Added Successfully";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "FeeTerm Not Added";
          this.openAlert(this.alert_message)
        }
      }
    ) 
  }

  deleteFeeTerm(fee_term_id) {
    this.service.deleteFeeTerms(fee_term_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.fee_terms = this.fee_terms.filter(res => res.fee_term_id !== fee_term_id)
            this.alert_message = "FeeTerm Deleted Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "FeeTerm Not Deleted";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  editFeeTerm(i) {
    this.selected_feeTerm = this.fee_terms[i];
    this.openDialog(this.selected_feeTerm, this.dialog_type)
  }

  openDialog(selected_feeTerm, dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      feeTerm: selected_feeTerm,
      dialog_type: 'feeTerm',
    };

    const dialogRef = this.dialog.open(EditfeeComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data),
        this.fee_terms.filter(res => res.fee_term_id == data.fee_term_id)[0].fee_term = data.fee_term;
      }
    );

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
