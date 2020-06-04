import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../_services/store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EditpaymentsComponent } from '../editpayments/editpayments.component';

@Component({
  selector: 'app-addpayments',
  templateUrl: './addpayments.component.html',
  styleUrls: ['./addpayments.component.css']
})
export class AddpaymentsComponent implements OnInit {
  config: any;
  collection = { count: '', payments: [] };

  constructor(private service: StoreService, private fb: FormBuilder, public dialog: MatDialog) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
   }

  ngOnInit() {
    this.getVendors();
    this.getMaterials();
    this.getPayments();
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  vendors = [];
  materials = [];
  all_payments = [];
  //payments = [];
  filtered_payments = []; i; j;
  total_payment = 0;
  balance_payment = 0;
  selected_payment;
  dialog_type: string;
  alert_message: string;

  paymentForm: FormGroup = this.fb.group({
    vendor: ['', Validators.required],
    material: ['', Validators.required],
    payment_id: ['', Validators.required],
    payment_toPay: [{value: '', disabled: true}, Validators.required],
    balance_payment: [{value: '', disabled: true}, Validators.required],
    payment: ['', Validators.required],
    payment_date: ['', Validators.required],
  });

  getPayments() {
    this.service.getPayments()
      .subscribe(
        res => { this.collection.payments = res.payments[0].payments, this.all_payments = res.payments, console.log(res) }
      )
  }

  getVendors() {
    this.service.getVendors()
      .subscribe(
        res => { this.vendors = res.vendor, this.paymentForm.value.vendor = this.vendors[0].vendor_id, console.log(res) }
      )
  }

  getMaterials() {
    this.service.getMaterials()
      .subscribe(
        res => { this.materials = res.material, this.paymentForm.value.material = this.materials[0].material_id, console.log(res) }
      )
  }

  getVendorPayments() {
    this.filtered_payments = this.all_payments.filter(res => res.vendor_id === this.paymentForm.value.vendor)
    this.collection.payments = [];
    this.total_payment = 0;
    this.balance_payment = 0;
    for(this.i = 0; this.i < this.filtered_payments.length; this.i++) {
      this.total_payment += this.filtered_payments[this.i].payment_toPay;
      this.balance_payment += this.filtered_payments[this.i].payment_balance;
      for(this.j = 0; this.j < this.filtered_payments[this.i].payments.length; this.j++) {
        this.collection.payments.push({
          payment: this.filtered_payments[this.i].payments[this.j].payment,
          payment_date: this.filtered_payments[this.i].payments[this.j].payment_date,
        })
        console.log(this.collection.payments)
      }      
    }
  }

  get_payments() {
    this.filtered_payments = this.all_payments.filter(res => res.vendor_id === this.paymentForm.value.vendor && res.material_id === this.paymentForm.value.material)
    this.collection.payments = [];
    this.total_payment = 0;
    this.balance_payment = 0;
    for(this.i = 0; this.i < this.filtered_payments.length; this.i++) {
      this.total_payment += this.filtered_payments[this.i].payment_toPay;
      this.balance_payment += this.filtered_payments[this.i].payment_balance;
      for(this.j = 0; this.j < this.filtered_payments[this.i].payments.length; this.j++) {
        this.collection.payments.push({
          payment: this.filtered_payments[this.i].payments[this.j].payment,
          payment_date: this.filtered_payments[this.i].payments[this.j].payment_date,
        })
        console.log(this.collection.payments)
      }      
    }
    this.paymentForm.patchValue({
      payment_toPay: this.total_payment,
      balance_payment: this.balance_payment,
    })
  }

  addPayments() {
    if(this.total_payment > 0) {
      this.paymentForm.value.payment_id = this.filtered_payments[0].payment_id;
      this.paymentForm.value.payment_toPay = this.filtered_payments[0].payment_toPay;
      this.paymentForm.value.balance_payment = this.filtered_payments[0].payment_balance;
      // this.collection.payments.push({
      //   payment: this.paymentForm.value.payment,
      //   payment_date: this.paymentForm.value.payment_date,
      // })
      this.balance_payment -= this.paymentForm.value.payment;
      // this.filtered_payments[0].payments.push({
      //   payment: this.paymentForm.value.payment,
      //   payment_date: this.paymentForm.value.payment_date,
      // })
      this.service.addPayments(this.paymentForm.value)
      .subscribe(
        res => { 
          if(res == true) {
            this.getPayments();
            this.get_payments();
            // this.collection.payments.push(this.paymentForm.value)
            this.alert_message = "Payment Added Successfully";
            this.openAlert(this.alert_message)
          } else if(res == null) {
            this.alert_message = "Added Payment is More than the Balance Payment";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Payment Not Added";
            this.openAlert(this.alert_message)
          }
          this.paymentForm.reset();
        }
      )
    }    
  }

  deletePayment(i) {
    console.log(this.filtered_payments)
    this.service.deletePayments(this.filtered_payments[0], this.collection.payments[i].payment)
      .subscribe(
        res => { 
          if(res == true) {
            // this.collection.payments = this.collection.payments.filter(res => res.payment !== this.collection.payments[i].payment);
            // this.balance_payment += this.collection.payments[i].payment;
            this.getPayments();
            this.get_payments();
            this.alert_message = "Payment Deleted Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Payment Not Deleted";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  editPayment(i) {
    this.selected_payment = this.collection.payments[i];
    console.log(this.selected_payment)
    this.dialog_type = 'payment';
    this.openDialog(this.dialog_type)
  }

  openDialog(dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';

    dialogConfig.data = {
      selected_payment: this.selected_payment,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(EditpaymentsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        this.collection.payments.filter( res => res.payment_id == data.payment_id)[0].payment = data.payment,
        this.collection.payments.filter( res => res.payment_id == data.payment_id)[0].payment_date = data.payment_date,
        console.log("Dialog output:", data)
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
