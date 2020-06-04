import { Component, OnInit, Inject } from '@angular/core';
import { StoreService } from '../../_services/store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EmployeesService } from '../../_services/employees.service';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-editstore',
  templateUrl: './editstore.component.html',
  styleUrls: ['./editstore.component.css']
})
export class EditstoreComponent implements OnInit {

  materials = {
    material_id: '',
    material: '',
    category: '',
  };
  vendors = {
    vendor_id: '',
    vendor_name: '',
    material: '',
    material_id: '',
    contact_no: '',
    email: '',
    address: '',
    location: '',
  };
  materialsIn = {
    material_in_id: '',
    vendor: '',
    material: '',
    vendor_id: '',
    material_id: '',
    price: '',
    purchased_date: '',
    no_of_units: '',
    payment_dueDate: '',
    payment_paid: '',
  };
  materialsOut = {
    material_out_id: '',
    material_id: '',
    employee_type: '',
    employee_id: '',
    received_date: '',
    no_of_units: '',
  };
  alert_message: string;
  all_employees = [];
  employees = [];

  materialForm: FormGroup = this.fb.group({
    material_id: '',
    material: ['', Validators.required],
    category: ['', Validators.required],
  });
  vendorForm: FormGroup = this.fb.group({
    vendor_id: '',
    vendor_name: ['', Validators.required],
    material: [''],
    material_id: [''],
    contact_no: ['', Validators.required],
    email: ['', Validators.required],
    address: ['', Validators.required],
    location: ['', Validators.required],
  });
  materialInForm: FormGroup = this.fb.group({
    material_in_id: '',
    material: ['', Validators.required],
    vendor: [''],
    price: ['', Validators.required],
    purchased_date: ['', Validators.required],
    no_of_units: ['', Validators.required],
    payment_duedate: ['', Validators.required],
    payment_paid: '',
    previous_quantity: '',
  });
  materialOutForm: FormGroup = this.fb.group({
    material_out_id: '',
    material: ['', Validators.required],
    employee_type: ['', Validators.required],
    receiver: ['', Validators.required],
    received_date: ['', Validators.required],
    no_of_units: ['', Validators.required],
    previous_quantity: '',
  });
  dialog_type: string;

  constructor(
    private service: StoreService,
    private employeeservice: EmployeesService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<EditstoreComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.materials = data.selected_material;
    this.vendors = data.selected_vendor;
    this.materialsIn = data.selected_materialIn;
    this.materialsOut = data.selected_materialOut;
    this.dialog_type = data.dialog_type;
  }

  ngOnInit() {

    if(this.dialog_type === 'material') {
      this.materialForm.patchValue({
        material_id: this.materials.material_id,
        material: this.materials.material,
        category: this.materials.category,
      });
    } else if(this.dialog_type === 'vendor') {
      this.getMaterials();
      this.vendorForm.patchValue({
        vendor_id: this.vendors.vendor_id,
        vendor_name: this.vendors.vendor_name,
        material: this.vendors.material_id,
        material_id: this.vendors.material_id,
        contact_no: this.vendors.contact_no,
        email: this.vendors.email,
        address: this.vendors.location,
        location: this.vendors.address,
      });
    } else if(this.dialog_type === 'material-in') {
      this.getVendors();
      this.getMaterials();
      this.materialInForm.patchValue({
        material_in_id: this.materialsIn.material_in_id,
        material: this.materialsIn.material_id,
        vendor: this.materialsIn.vendor_id,
        price: this.materialsIn.price,
        purchased_date: this.materialsIn.purchased_date,
        no_of_units: this.materialsIn.no_of_units,
        payment_duedate: this.materialsIn.payment_dueDate,
        payment_paid: this.materialsIn.payment_paid,
        previous_quantity: this.materialsIn.no_of_units,
      });
    } else if(this.dialog_type === 'material-out') {
      this.getMaterials();
      this.getEmployees();
      this.materialOutForm.patchValue({
        material_out_id: this.materialsOut.material_out_id,
        material: this.materialsOut.material_id,
        employee_type: this.materialsOut.employee_type,
        receiver: this.materialsOut.employee_id,
        received_date: this.materialsOut.received_date,
        no_of_units: this.materialsOut.no_of_units,
        previous_quantity: this.materialsOut.no_of_units,
      });
    }

    // this.materialOutForm.value.material_out_id = this.materialsOut.material_out_id;
    // this.materialOutForm.value.material = this.materialsOut.material;
    // this.materialOutForm.value.received_date = this.materialsOut.received_date;
    // this.materialOutForm.value.no_of_units = this.materialsOut.no_of_units;

    // this.vendorForm.value.vendor_id = this.vendors.vendor_id;
    // this.vendorForm.value.vendor_name = this.vendors.vendor_name;
    // this.vendorForm.value.material = this.vendors.material;
    // this.vendorForm.value.contact_no = this.vendors.contact_no;
    // this.vendorForm.value.email = this.vendors.email;
    // this.vendorForm.value.address = this.vendors.address;
    // this.vendorForm.value.location = this.vendors.location;
  }

  vendorslist;
  materialslist;

  getVendors() {
    this.service.getVendors()
      .subscribe(
        res => { this.vendorslist = res.vendor }
      )
  }

  getMaterials() {
    this.service.getMaterials()
      .subscribe(
        res => { this.materialslist = res.material }
      )
  }

  getEmployees() {
    this.employeeservice.getEmployees()
      .subscribe(
        res => { this.all_employees = res.employee, this.get_selectedemployees(), console.log(res) }
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

  close() {
    this.dialogRef.close();
  }

  editMaterial() {
    this.materialForm.value.material_id = this.materials.material_id;
    this.dialogRef.close(this.materialForm.value);
    console.log(this.materials)
    this.service.editMaterials(this.materialForm.value, this.materials.material_id)
    .subscribe(
      res => { 
        if(res == true) {
          this.alert_message = "Material Edited Successfully";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "Material Not Edited";
          this.openAlert(this.alert_message)
        }
      }
    )
  }

  editVendor() {
    this.vendorForm.value.vendor_id = this.vendors.vendor_id;
    this.dialogRef.close(this.vendorForm.value);
    this.service.editVendor(this.vendorForm.value, this.vendors.vendor_id)
    .subscribe(
      res => { 
        if(res == true) {
          this.alert_message = "Vendor Edited Successfully";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "Vendor Not Edited";
          this.openAlert(this.alert_message)
        }
      }
    )
  }
  
  editMaterialIn() {
    this.materialInForm.value.material_in_id = this.materialsIn.material_in_id;
    this.materialInForm.value.previous_quantity = this.materialsIn.no_of_units;
    this.materialInForm.value.payment_paid = this.materialsIn.payment_paid;
    this.dialogRef.close(this.materialInForm.value);
    this.service.editMaterialsIn(this.materialInForm.value, this.materialsIn.material_in_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.alert_message = "Material-In Edited Successfully";
            this.openAlert(this.alert_message)
          } else if(res == null) {
            this.alert_message = "Edited Quantity is less than the Quantity Out";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Material-In Not Edited";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  editMaterialOut() {
    this.materialOutForm.value.material_out_id = this.materialsOut.material_out_id;
    this.materialOutForm.value.previous_quantity = this.materialsOut.no_of_units;
    this.dialogRef.close(this.materialOutForm.value);
    this.service.editMaterialsOut(this.materialOutForm.value, this.materialsOut.material_out_id)
      .subscribe(
        res => { 
          if(res == true) {
            console.log(this.materialOutForm.value)
            this.alert_message = "Material-Out Edited Successfully";
            this.openAlert(this.alert_message)
          } else if(res == null) {
            this.alert_message = "Edited Quantity is More than the Quantity Available";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Material-Out Not Edited";
            this.openAlert(this.alert_message)
          }
        }
      )
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
