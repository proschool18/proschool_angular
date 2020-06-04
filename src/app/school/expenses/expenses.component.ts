import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../../_services/expenses.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { User } from '../../_models/user';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ServicesService } from '../../services.service';
// import { EditexpensesComponent } from '../editexpenses/editexpenses.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  config: any;
  collection = { count: '', expenses: [] };

  constructor(private expenseService: ExpensesService, public dialog: MatDialog) { 
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }

  user: User;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user.role)
    if(this.user.role === 'admin') { 
      this.getExpenses();
    } else if(this.user.role === 'teacher') { 
      this.getEmployeeExpenses();
    }
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  //expenses = [];
  all_expenses = [];
  merchants = [];
  // all_employees = [];
  // employees = [];
  selected_expense;
  dialog_type;
  alert_message: string;

  getExpenses() {
    this.expenseService.getExpenses()
      .subscribe(
        res => { this.collection.expenses = this.all_expenses = res.expenses, console.log(res) }
      )
  }

  getEmployeeExpenses() {
    this.expenseService.getExpenses()
      .subscribe(
        res => { this.collection.expenses = this.all_expenses = res.expenses.filter(data => data.employee_id === this.user.employee_id), console.log(this.all_expenses) }
      )
  }

  update_expense(status, i) {
    if(status == "pending") {     
      this.collection.expenses[i].payment_status =  this.all_expenses[i].payment_status = "completed";
    } else {
      this.collection.expenses[i].payment_status =  this.all_expenses[i].payment_status = "pending";
    }
    this.expenseService.update_expense(this.collection.expenses[i].payment_status, this.collection.expenses[i].expense_id)
    .subscribe(
      res => { 
        if(res == true) {
          this.alert_message = "Expense Updated Successfully";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "Expense Not Updated";
          this.openAlert(this.alert_message)
        }
      }
    )
  }

  // deleteExpense(expense_id) {
  //   this.expenseService.deleteExpenses(expense_id)
  //     .subscribe(
  //       res => { 
  //         if(res == true) {
  //           this.collection.expenses = this.collection.expenses.filter(res => res.expense_id !== expense_id);
  //           this.all_expenses = this.all_expenses.filter(res => res.expense_id !== expense_id)
  //           this.alert_message = "Expense Deleted Successfully";
  //           this.openAlert(this.alert_message)
  //         } else {
  //           this.alert_message = "Expense Not Deleted";
  //           this.openAlert(this.alert_message)
  //         }
  //       }
  //     )
  // }

  // editExpense(i) {
  //   this.selected_expense = this.collection.expenses[i];
  //   this.dialog_type = 'expenses';
  //   this.openDialog(this.dialog_type)
  // }

  // openDialog(dialog_type): void {

  //   const dialogConfig = new MatDialogConfig();

  //   dialogConfig.autoFocus = true;
  //   dialogConfig.width = '40%';

  //   dialogConfig.data = {
  //     selected_expense: this.selected_expense,
  //     dialog_type: dialog_type,
  //   };

  //   const dialogRef = this.dialog.open(EditexpensesComponent, dialogConfig);

  //   dialogRef.afterClosed().subscribe(
  //     data => {
  //       this.collection.expenses.filter( res => res.expense_id == data.expense_id)[0].amount = this.all_expenses.filter( res => res.expense_id == data.expense_id)[0].amount = data.amount,
  //       this.collection.expenses.filter( res => res.expense_id == data.expense_id)[0].date = this.all_expenses.filter( res => res.expense_id == data.expense_id)[0].date = data.date,
  //       this.collection.expenses.filter( res => res.expense_id == data.expense_id)[0].category = this.all_expenses.filter( res => res.expense_id == data.expense_id)[0].category = data.category,
  //       console.log("Dialog output:", data)
  //     }
  //   );

  // }

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
