import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-employeeinfo',
  templateUrl: './employeeinfo.component.html',
  styleUrls: ['./employeeinfo.component.css']
})
export class EmployeeinfoComponent implements OnInit {

  constructor(private service: ServicesService, private fb: FormBuilder, public dialog: MatDialog) {}

  ngOnInit() {
  }

  employees = [];
  alert_message: string;
  employee_type;

  employeeForm: FormGroup = this.fb.group({
    employee_type: ['', Validators.required],
  });

  getEmployeesInfo() {
    if(this.employee_type == undefined || this.employee_type == '') {
      this.alert_message = "Please Select Employee Type";
      this.openAlert(this.alert_message)
    } else {
      this.service.getEmployeesInfo(this.employee_type)
      .subscribe(
        res => { 
          this.employees = res.employees, console.log(res)
        },
      )
    }
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
