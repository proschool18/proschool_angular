import { Component, OnInit } from '@angular/core';
import { FeeService } from '../../_services/fee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EditfeeComponent } from '../editfee/editfee.component';

@Component({
  selector: 'app-feetype',
  templateUrl: './feetype.component.html',
  styleUrls: ['./feetype.component.css']
})
export class FeetypeComponent implements OnInit {

  constructor(private service: FeeService, private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit() {
    this.getFeeTypes();
  }

  fee_types = [];
  selected_feeType;
  dialog_type: string;
  alert_message: string;

  feetypeForm: FormGroup = this.fb.group({
    fee_type: ['', Validators.required],
  });

  getFeeTypes() {
    this.service.getFeeTypes()
      .subscribe(
        res => { this.fee_types = res.fee_type, console.log(res) }
      )
  }

  addFeeTypes() {
    this.service.addFeeTypes(this.feetypeForm.value)
    .subscribe(
      res => { 
        if(res == true) {
          this.fee_types.push(this.feetypeForm.value)
          this.alert_message = "FeeType Added Successfully";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "FeeType Not Added";
          this.openAlert(this.alert_message)
        }
      }
    ) 
  }

  deleteFeeType(fee_types_id) {
    this.service.deleteFeeTypes(fee_types_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.fee_types = this.fee_types.filter(res => res.fee_types_id !== fee_types_id)
            this.alert_message = "FeeType Deleted Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "FeeType Not Deleted";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  editFeeType(i) {
    this.selected_feeType = this.fee_types[i];
    this.openDialog(this.selected_feeType, this.dialog_type)
  }

  openDialog(selected_feeType, dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      feeType: selected_feeType,
      dialog_type: 'feeType',
    };

    const dialogRef = this.dialog.open(EditfeeComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data),
        this.fee_types.filter(res => res.fee_types_id == data.fee_types_id)[0].fee_type = data.fee_type;
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
