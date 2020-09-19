import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { FeeService } from '../../_services/fee.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EditfeeComponent } from '../editfee/editfee.component';

@Component({
  selector: 'app-class-fee',
  templateUrl: './class-fee.component.html',
  styleUrls: ['./class-fee.component.css']
})
export class ClassFeeComponent implements OnInit {

  constructor(private service: ServicesService, private feeservice: FeeService, public dialog: MatDialog) { }

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;

  ngOnInit() {
    this.getClasses();
  }

  pageChange(x) {
    this.pageNo = x;
    this.page_start = (x - 1) * 10;
  } 

  classes = [];
  class_fee = [];
  selected_class = {class_id: '', name: ''};
  selected_classFee:any = {};
  dialog_type: string;
  alert_message: string;

  getClasses() {
    this.service.getClasses()
      .subscribe(
        res => { 
          this.classes = res.school_classes, 
          this.selected_class = this.classes[0],
          this.getClassFee(),
          console.log(res) 
        }
      )
  }

  getClassFee() {
    this.feeservice.getClassFee(this.selected_class.class_id)
      .subscribe(
        res => { 
          if(res.class_fee.length === 0) {
            this.alert_message = 'No ClassFee Found';
            this.openAlert(this.alert_message);
          } else {
            this.class_fee = res.class_fee, 
            console.log(res) 
          }
        }
      )
  }

  deleteClassFee(fee_type_id) {
    this.feeservice.deleteClassFee(fee_type_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "ClassFee Deleted Successfully";
            this.openAlert(this.alert_message);
            this.getClassFee();
          } else {
            this.alert_message = "ClassFee Not Deleted";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  addClassFee() {
    this.selected_classFee = {class_id: this.selected_class.class_id};
    this.openDialog(this.selected_classFee, 'add')
  }

  editClassFee(i) {
    this.selected_classFee = this.class_fee[i];
    this.openDialog(this.selected_classFee, 'edit')
  }

  openDialog(selected_feeMaster, submit_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      class_fee: this.selected_classFee,
      dialog_type: 'ClassFee',
      submit_type: submit_type,
    };

    const dialogRef = this.dialog.open(EditfeeComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data),
        this.getClassFee();
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
