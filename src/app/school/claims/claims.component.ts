import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { ExpensesService } from '../../_services/expenses.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EditexpensesComponent } from '../editexpenses/editexpenses.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {

  constructor(private service: ServicesService, private expenseService: ExpensesService, private fb: FormBuilder, public dialog: MatDialog) {}

  pageNo: number = 1;
  page_start: number = 0;
  page_counter = Array;
  pages: number = 10;
  
  user: User;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user.role)
    if(this.user.role === 'admin') { 
      this.getClaims();
      this.getEmployees();
    } else if(this.user.role === 'teacher') { 
      this.getEmployeeClaims();
    }
  }

  pageChange(x) {
    this.pageNo = x;
    this.page_start = (x - 1) * 10;
  } 

  claims = [];
  merchants = [];
  all_employees = [];
  employees = [];
  selected_claim;
  dialog_type: string;
  alert_message: string;

  claimForm: FormGroup = this.fb.group({
    employee_type: ['', Validators.required],
    employee_id: ['', Validators.required],
    amount: ['', Validators.required],
    date: ['', Validators.required],
    category: ['', Validators.required],
  });

  getEmployees() {
    this.service.getEmployees()
      .subscribe(
        res => { this.all_employees = res.employee, console.log(res) }
      )
  }

  get_employees() {
    this.employees = this.all_employees.filter(emp => emp.job_category === this.claimForm.value.employee_type);
    console.log(this.employees)
  }

  getClaims() {
    this.expenseService.getClaims()
      .subscribe(
        res => { this.claims = res.claims, 
          this.pages = Math.ceil(this.claims.length / 10);
          console.log(res) 
        }
      )
  }

  getEmployeeClaims() {
    this.expenseService.getClaims()
      .subscribe(
        res => { this.claims = res.claims.filter(data => data.employee_id === this.user.employee_id), 
          this.pages = Math.ceil(this.claims.length / 10);
          console.log(this.claims) 
        }
      )
  }

  addClaims() {
    this.expenseService.addClaims(this.claimForm.value)
    .subscribe(
      res => { 
        if(res == true) {
          this.claims.push({
            first_name: this.employees.filter(res => res.employee_id === this.claimForm.value.employee_id)[0].first_name,
            amount: this.claimForm.value.amount,
            date: this.claimForm.value.date,
            category: this.claimForm.value.category,
            claim_status: 'pending'
          })
          this.alert_message = "Claim Added Successfully";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "Claim Not Added";
          this.openAlert(this.alert_message)
        }
      }
    )
  }

  update_claim(status, i) {
    if(status == "pending") {     
      this.claims[i].claim_status = "Approved";
    } else {
      this.claims[i].claim_status = "pending";
    }
    this.expenseService.update_claim(this.claims[i])
    .subscribe(
      res => { 
        if(res == true) {
          this.alert_message = "Claim Updated Successfully";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "Claim Not Updated";
          this.openAlert(this.alert_message)
        }
      }
    )
  }

  deleteClaim(claim_id) {
    this.expenseService.deleteClaims(claim_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.claims = this.claims.filter(res => res.claim_id !== claim_id)
            this.alert_message = "Claim Deleted Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Claim Not Deleted";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  addClaim() {
    this.selected_claim = {};
    this.dialog_type = 'add';
    this.openDialog(this.dialog_type)
  }

  editClaim(i) {
    this.selected_claim = this.claims[i];
    this.dialog_type = 'edit';
    this.openDialog(this.dialog_type)
  }

  openDialog(dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      selected_claim: this.selected_claim,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(EditexpensesComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if(this.user.role === 'admin') {
          this.getClaims();
        } else if(this.user.role === 'teacher') {
          this.getEmployeeClaims();
        }
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
