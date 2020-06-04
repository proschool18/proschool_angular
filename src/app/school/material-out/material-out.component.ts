import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../_services/store.service';
import { EmployeesService } from '../../_services/employees.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EditstoreComponent } from '../editstore/editstore.component';

@Component({
  selector: 'app-material-out',
  templateUrl: './material-out.component.html',
  styleUrls: ['./material-out.component.css']
})
export class MaterialOutComponent implements OnInit {
  config: any;
  collection = { count: '', materialsOut: [] };

  constructor(private service: StoreService, private employeeservice: EmployeesService, private fb: FormBuilder, public dialog: MatDialog) { 
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }

  ngOnInit() {    
    this.getMaterialsOut();
    this.getEmployees();
    this.getMaterials();
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  employees = [];
  all_employees = [];
  materials = [];
  //materialsOut = [];
  selected_materialOut;
  dialog_type: string;
  alert_message: string;

  materialOutForm: FormGroup = this.fb.group({
    material: ['', Validators.required],
    employee_type: ['', Validators.required],
    receiver: ['', Validators.required],
    received_date: ['', Validators.required],
    no_of_units: ['', Validators.required],
  });

  getMaterialsOut() {
    this.service.getMaterialsOut()
      .subscribe(
        res => { this.collection.materialsOut = res.material_out, console.log(res) }
      )
  }

  getEmployees() {
    this.employeeservice.getEmployees()
      .subscribe(
        res => { this.all_employees = res.employee, console.log(res) }
      )
  }

  get_selectedemployees() {   
    if(this.materialOutForm.value.employee_type === "teaching") {
      this.employees = this.all_employees.filter(emp => emp.job_category === "teaching")
    } else if(this.materialOutForm.value.employee_type === "non-teaching") {
      this.employees = this.all_employees.filter(emp => emp.job_category === "non-teaching")
    } else if(this.materialOutForm.value.employee_type === "administrative") {
      this.employees = this.all_employees.filter(emp => emp.job_category === "administrative")
    } else {
      this.employees = this.all_employees
    }
  }

  getMaterials() {
    this.service.getMaterials()
      .subscribe(
        res => { this.materials = res.material, console.log(res) }
      )
  }

  addMaterialsOut() {
    // this.collection.materialsOut.push({
    //   material: this.materials.filter(res => res.material_id === this.materialOutForm.value.material)[0].material,
    //   first_name: this.employees.filter(res => res.employee_id === this.materialOutForm.value.receiver)[0].first_name,
    //   no_of_units: this.materialOutForm.value.no_of_units,
    //   received_date: this.materialOutForm.value.received_date,
    // })
    this.service.addMaterialsOut(this.materialOutForm.value)
      .subscribe(
        res => { 
          if(res == true) {
            this.getMaterialsOut();
            this.alert_message = "Material-Out Added Successfully";
            this.openAlert(this.alert_message)
          } else if(res == null) {
            this.alert_message = "Added Quantity is More than the Quantity Available";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Material-Out Not Added";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  deleteMaterialOut(material_out_id) {
    this.service.deleteMaterialsOut(material_out_id, this.collection.materialsOut.filter(data => data.material_out_id === material_out_id)[0])
      .subscribe(
        res => { 
          if(res == true) {
            this.collection.materialsOut = this.collection.materialsOut.filter(res => res.material_out_id !== material_out_id)
            this.alert_message = "Material-Out Deleted Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Material-Out Not Deleted";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  editMaterialOut(i) {
    this.selected_materialOut = this.collection.materialsOut[i];
    this.dialog_type = 'material-out';
    this.openDialog(this.dialog_type)
  }

  openDialog(dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      selected_materialOut: this.selected_materialOut,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(EditstoreComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if(data) {
          this.getMaterialsOut();
          // this.collection.materialsOut.filter( res => res.material_out_id == data.material_out_id)[0].material = this.materials.filter(res => res.material_id === data.material)[0].material,
          // this.collection.materialsOut.filter( res => res.material_out_id == data.material_out_id)[0].received_date = data.received_date,
          // this.collection.materialsOut.filter( res => res.material_out_id == data.material_out_id)[0].no_of_units = data.no_of_units,
          console.log("Dialog output:", data)
        }
      }
    );

  }

  openAlert(alert_message) {
    const alertConfig = new MatDialogConfig();

    alertConfig.autoFocus = true;
    alertConfig.width = '60%';

    alertConfig.data = {
      message: alert_message,
    };

    const alertRef = this.dialog.open(AlertComponent, alertConfig);

    alertRef.afterClosed().subscribe()
  }

}
