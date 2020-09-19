import { Component, OnInit, Inject } from '@angular/core';
import { StoreService } from '../../_services/store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.css']
})
export class PaymentsListComponent implements OnInit {

  selected_payments: any = {};
  payment_date = new FormControl(new Date);

  constructor(
    private service: StoreService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<PaymentsListComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.selected_payments = data.selected_payment[0];
  }

  ngOnInit() {
    console.log(this.selected_payments)
  }

  all_payments = [];
  payments = [];
  dialog_type: string;
  alert_message: string;

  close() {
    this.dialogRef.close();
  }

  deletePayment(i) {
    this.service.deletePayments(this.selected_payments, this.selected_payments.payments[i].payment)
      .subscribe(
        res => { 
          if(res == true) {
            this.selected_payments.payments = this.selected_payments.payments.filter(res => res.payment !== this.selected_payments.payments[i].payment);
            this.alert_message = "Payment Deleted Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Payment Not Deleted";
            this.openAlert(this.alert_message)
          }
        }
      )
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
