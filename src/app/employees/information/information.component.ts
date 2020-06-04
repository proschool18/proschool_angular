import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../_services/employees.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AdmissionComponent } from '../admission/admission.component';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  constructor(private service: EmployeesService, public dialog: MatDialog) {}

  //employees = [];
  all_employees = [];
  alert_message: string;
  employee_type;
  status = 'active';
  employees = [];
  showStatusList: boolean = false;
  showEmployeeTypeList : boolean = false;
  employee_types = [{ 'name': 'All', 'value': 'all' }, 
    { 'name': 'Teaching', 'value': 'teaching' }, 
    { 'name': 'Non-Teaching', 'value': 'non-Teaching' }, 
    { 'name': 'Administrative', 'value': 'administrative' }]

  selected_employee;
  dialog_type;

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.service.getEmployees()
      .subscribe(
        res => { this.all_employees = this.employees = res.employee, console.log(res) }
      )
  }

  get_selectedemployees() {   
    if(this.employee_type == undefined || this.employee_type == '') {
      this.alert_message = "Please Select Employee Type";
      this.openAlert(this.alert_message)
    } else {
      if(this.employee_type === "teaching") {
        this.employees = this.all_employees.filter(emp => emp.job_category === "teaching")
      } else if(this.employee_type === "non-teaching") {
        this.employees = this.all_employees.filter(emp => emp.job_category === "non-teaching")
      } else if(this.employee_type === "administrative") {
        this.employees = this.all_employees.filter(emp => emp.job_category === "administrative")
      } else {
        this.employees = this.all_employees
      }
      this.getEmployeesByStatus();
    }
  }

  getEmployeesByStatus() {
    if(this.status === 'active') {
      this.employees = this.all_employees.filter(data => data.status === 1)
    } else if(this.status === 'inactive') {
      this.employees = this.all_employees.filter(data => data.status === 0)
    }   
  }

  deleteEmployee(employee_id) {
    this.service.deleteEmployee(employee_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.employees.filter(res => res.employee_id === employee_id)[0].status = 0;
            this.employees = this.employees.filter(res => res.employee_id !== employee_id)
            this.alert_message = "Employee Deleted Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Employee Not Deleted Successfully";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  restoreEmployee(employee_id) {
    this.service.restoreEmployee(employee_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.employees.filter(data => data.employee_id === employee_id)[0].status = 1;
            this.status = 'activated';
            this.getEmployeesByStatus();
            this.alert_message = "Employee Restored Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Employee Not Restored";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  addEmployee() {
    this.selected_employee = {
      name: '',
      textbook: '',
      author: '',
      publisher: '',
    };
    this.dialog_type = 'add';
    this.openDialog(this.selected_employee, this.dialog_type)
  }

  editEmployee(employee_id) {
    this.selected_employee = this.employees.filter(data => data.employee_id === employee_id)[0];
    this.dialog_type = 'edit';
    this.openDialog(this.selected_employee, this.dialog_type)
  }

  openDialog(selected_employee, dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';

    dialogConfig.data = {
      employee: selected_employee,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(AdmissionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(        
      data => {
        this.getEmployees();
        this.get_selectedemployees();
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
