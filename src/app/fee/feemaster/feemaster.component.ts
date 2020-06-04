import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { FeeService } from '../../_services/fee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EditfeeComponent } from '../editfee/editfee.component';

@Component({
  selector: 'app-feemaster',
  templateUrl: './feemaster.component.html',
  styleUrls: ['./feemaster.component.css']
})
export class FeemasterComponent implements OnInit {

  constructor(private service: ServicesService, private feeservice: FeeService, private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit() {
    this.getFeeMaster();
    this.getClasses();
    this.getFeeTerms();
    this.getFeeTypes();
  }

  fee_master = [];
  all_feemaster = [];
  classes = [];
  fee_terms = [];
  fee_types = [];

  selected_feeMaster;
  dialog_type: string;
  alert_message: string;

  feemasterForm: FormGroup = this.fb.group({
    class_id: ['', Validators.required],
    fee_types_id: ['', Validators.required],
    fee_term_id: ['', Validators.required],
    fee_amount: ['', Validators.required],
    due_date: ['', Validators.required],
    fee_description: ['', Validators.required],
  });

  getFeeMaster() {
    this.feeservice.getFeeMaster()
      .subscribe(
        res => { this.fee_master = res.feemaster, this.all_feemaster = res.feemaster, console.log(res) }
      )
  }

  getClasses() {
    this.service.getClasses()
      .subscribe(
        res => { this.classes = res.school_classes, console.log(res) }
      )
  }

  getFeeTerms() {
    this.feeservice.getFeeTerms()
      .subscribe(
        res => { this.fee_terms = res.fee_term, console.log(res) }
      )
  }

  getFeeTypes() {
    this.feeservice.getFeeTypes()
      .subscribe(
        res => { this.fee_types = res.fee_type, console.log(res) }
      )
  }

  getFiltered_fee() {
    this.fee_master = this.all_feemaster.filter(fee => fee.class_id == this.feemasterForm.value.class_id);
  }

  addFeeMaster() {
    this.feeservice.addFeeMaster(this.feemasterForm.value)
    .subscribe(
      res => { 
        if(res == true) {
          this.getFeeMaster();
          this.getFiltered_fee();
          // this.collection.fee_master.push({
          //   class_name: this.classes.filter( res => res.class_id === this.feemasterForm.value.class_id)[0].name,
          //   fee_term: this.fee_terms.filter( res => res.fee_term_id === this.feemasterForm.value.fee_term_id)[0].fee_term,
          //   fee_type: this.fee_types.filter( res => res.fee_types_id === this.feemasterForm.value.fee_types_id)[0].fee_type,
          //   due_date: this.feemasterForm.value.due_date,
          //   fee_amount: this.feemasterForm.value.fee_amount,
          // })
          this.alert_message = "FeeMaster Added Successfully";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "FeeMaster Not Added";
          this.openAlert(this.alert_message)
        }
      }
    ) 
  }

  deleteFeeMaster(fee_master_id) {
    this.feeservice.deleteFeeMaster(fee_master_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.fee_master = this.fee_master.filter(res => res.fee_master_id !== fee_master_id)
            this.alert_message = "FeeMaster Deleted Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "FeeMaster Not Deleted";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  editFeeMaster(i) {
    this.selected_feeMaster = this.fee_master[i];
    this.openDialog(this.selected_feeMaster, this.dialog_type)
  }

  openDialog(selected_feeMaster, dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      feeMaster: selected_feeMaster,
      classes: this.classes,
      fee_terms: this.fee_terms,
      fee_types: this.fee_types,
      dialog_type: 'feeMaster',
    };

    const dialogRef = this.dialog.open(EditfeeComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data),
        this.getFeeMaster();
        this.getFiltered_fee();
        // this.collection.fee_master.filter(res => res.fee_master_id == data.fee_master_id)[0].fee_amount = data.fee_amount;
        // this.collection.fee_master.filter(res => res.fee_master_id == data.fee_master_id)[0].due_date = data.due_date;
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
