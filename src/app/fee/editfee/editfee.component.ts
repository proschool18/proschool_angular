import { Component, OnInit, Inject } from '@angular/core';
import { FeeService } from '../../_services/fee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-editfee',
  templateUrl: './editfee.component.html',
  styleUrls: ['./editfee.component.css']
})
export class EditfeeComponent implements OnInit {

  fee_terms = {
    fee_term_id: '',
    fee_term: '',
  };
  fee_types = {
    fee_types_id: '',
    fee_type: '',
  };
  fee_master = {
    fee_master_id: '',
    class_id: '',
    fee_types_id: '',
    fee_term_id: '',
    fee_amount: '',
    due_date: '',
    fee_description: '',
  };
  classes = [];
  feeTerms = [];
  feeTypes = [];
  dialog_type: string;
  alert_message: string;
  
  feetermForm: FormGroup = this.fb.group({
    fee_term_id: '',
    fee_term: ['', Validators.required],
  });
  feetypeForm: FormGroup = this.fb.group({
    fee_types_id: '',
    fee_type: ['', Validators.required],
  });
  feemasterForm: FormGroup = this.fb.group({
    fee_master_id: '',
    class_id: ['', Validators.required],
    fee_types_id: ['', Validators.required],
    fee_term_id: ['', Validators.required],
    fee_amount: ['', Validators.required],
    due_date: ['', Validators.required],
  });

  constructor(
    private service: FeeService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<EditfeeComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.fee_terms = data.feeTerm;
    this.fee_types = data.feeType;
    this.fee_master = data.feeMaster;
    this.classes = data.classes;
    this.feeTerms = data.fee_terms;
    this.feeTypes = data.fee_types;
    this.dialog_type = data.dialog_type;
  }

  ngOnInit() {
    if(this.dialog_type === 'feeTerm') {
      this.feetermForm.patchValue({
        fee_term_id: this.fee_terms.fee_term_id,
        fee_term: this.fee_terms.fee_term,
      })
    } else if(this.dialog_type === 'feeType') {
      this.feetypeForm.patchValue({
        fee_types_id: this.fee_types.fee_types_id,
        fee_type: this.fee_types.fee_type,
      })
    } else if(this.dialog_type === 'feeMaster') {
      console.log(this.fee_master)
      this.feemasterForm.patchValue({
        fee_master_id: this.fee_master.fee_master_id,
        class_id: this.fee_master.class_id,
        fee_types_id: this.fee_master.fee_types_id,
        fee_term_id: this.fee_master.fee_term_id,
        fee_amount: this.fee_master.fee_amount,
        due_date: this.fee_master.due_date,
      })
    }
  }

  close_feeTerm() {
    this.dialogRef.close();
  }

  close_feeType() {
    this.dialogRef.close();
  }

  close_feeMaster() {
    this.dialogRef.close();
  }

  editFeeTerms() {
    this.feetermForm.value.fee_term_id = this.fee_terms.fee_term_id;
    this.dialogRef.close(this.feetermForm.value);
    this.service.editFeeTerms(this.feetermForm.value, this.fee_terms.fee_term_id)
    .subscribe(
      res => { 
        if(res == true) {
          this.alert_message = "FeeTerm Edited Successfully";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "FeeTerm Not Edited";
          this.openAlert(this.alert_message)
        }
      }
    )
  }

  editFeeTypes() {
    this.feetypeForm.value.fee_types_id = this.fee_types.fee_types_id;
    this.dialogRef.close(this.feetypeForm.value);
    this.service.editFeeTypes(this.feetypeForm.value, this.fee_types.fee_types_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "FeeType Edited Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "FeeType Edited Successfully";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  editFeeMaster() {
    this.feemasterForm.value.fee_master_id = this.fee_master.fee_master_id;
    this.dialogRef.close(this.feemasterForm.value);
    this.service.editFeeMaster(this.feemasterForm.value, this.fee_master.fee_master_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "FeeMaster Edited Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "FeeMaster Edited Successfully";
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
