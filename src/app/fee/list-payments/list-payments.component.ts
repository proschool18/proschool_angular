import { Component, OnInit, Inject } from '@angular/core';
import { FeeService } from '../../_services/fee.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-list-payments',
  templateUrl: './list-payments.component.html',
  styleUrls: ['./list-payments.component.css']
})
export class ListPaymentsComponent implements OnInit {

  alert_message: string;
  FeePayments = {};

  constructor(
    private feeservice: FeeService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<ListPaymentsComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.FeePayments = data.FeePayments;
  }

  ngOnInit() {
    console.log(this.FeePayments)
  }

  close() {
    this.dialogRef.close();
  }

}
