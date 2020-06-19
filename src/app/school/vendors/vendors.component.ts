import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../_services/store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EditstoreComponent } from '../editstore/editstore.component';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {

  constructor(private service: StoreService, private fb: FormBuilder, public dialog: MatDialog) {}

  showMaterialList: boolean = false;

  ngOnInit() {
    this.getVendors();
    this.getMaterials();
  }

  vendors = [];
  materials = [];
  selected_vendor;
  dialog_type: string;
  alert_message: string;

  vendorForm: FormGroup = this.fb.group({
    vendor_name: ['', Validators.required],
    material: ['', Validators.required],
    contact_no: ['', Validators.required],
    email: ['', Validators.required],
    address: ['', Validators.required],
    location: ['', Validators.required],
  });

  getVendors() {
    this.service.getVendors()
      .subscribe(
        res => { this.vendors = res.vendor, console.log(res) }
      )
  }

  getMaterials() {
    this.service.getMaterials()
      .subscribe(
        res => { this.materials = res.material, console.log(res) }
      )
  }

  addVendor() {
    this.service.addVendor(this.vendorForm.value)
    .subscribe(
      res => { 
        if(res == true) {
          this.vendors.push({
            vendor_name: this.vendorForm.value.vendor_name,
            material: this.materials.filter(res => res.material_id === this.vendorForm.value.material)[0].material,
            material_id: this.vendorForm.value.material,
            contact_no: this.vendorForm.value.contact_no,
            email: this.vendorForm.value.email,
            address: this.vendorForm.value.address,
            location: this.vendorForm.value.location,
          })
          this.alert_message = "Vendor Added Successfully";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "Vendor Not Added";
          this.openAlert(this.alert_message)
        }
      }
    )
  }

  deleteVendor(vendor_id) {
    this.service.deleteVendor(vendor_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.vendors = this.vendors.filter(res => res.vendor_id !== vendor_id)
            this.alert_message = "Vendor Deleted Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Vendor Not Deleted";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  editVendor(i) {
    this.selected_vendor = this.vendors[i];
    this.dialog_type = 'vendor';
    this.openDialog(this.dialog_type)
  }

  openDialog(dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      selected_vendor: this.selected_vendor,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(EditstoreComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if(data) {
          this.vendors.filter( res => res.vendor_id == data.vendor_id)[0].vendor_name = data.vendor_name,
          this.vendors.filter( res => res.vendor_id == data.vendor_id)[0].material = this.materials.filter(res => res.material_id === data.material)[0].material,
          this.vendors.filter( res => res.vendor_id == data.vendor_id)[0].contact_no = data.contact_no,
          this.vendors.filter( res => res.vendor_id == data.vendor_id)[0].email = data.email,
          this.vendors.filter( res => res.vendor_id == data.vendor_id)[0].location = data.location,
          console.log("Dialog output:", data)
        }
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
