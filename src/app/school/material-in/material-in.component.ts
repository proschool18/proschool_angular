import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../_services/store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EditstoreComponent } from '../editstore/editstore.component';

@Component({
  selector: 'app-material-in',
  templateUrl: './material-in.component.html',
  styleUrls: ['./material-in.component.css']
})
export class MaterialInComponent implements OnInit {
  config: any;
  collection = { count: '', materialsIn: [] };

  constructor(private service: StoreService, private fb: FormBuilder, public dialog: MatDialog) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
   }

  ngOnInit() {
    this.getVendors();
    this.getMaterials();
    this.getMaterialsIn();
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  vendors = [];
  materials = [];
  //materialsIn = [];
  selected_materialIn;
  dialog_type: string;
  alert_message: string;

  materialInForm: FormGroup = this.fb.group({
    vendor: ['', Validators.required],
    material: ['', Validators.required],
    price: ['', Validators.required],
    purchased_date: ['', Validators.required],
    no_of_units: ['', Validators.required],
    payment_duedate: ['', Validators.required],
  });

  getMaterialsIn() {
    this.service.getMaterialsIn()
      .subscribe(
        res => { this.collection.materialsIn = res.material_in, console.log(res) }
      )
  }

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

  addMaterialsIn() {
    this.service.addMaterialsIn(this.materialInForm.value)
      .subscribe(
        res => { 
          if(res == true) {
            this.getMaterialsIn();
            // this.collection.materialsIn.push({
            //   vendor: this.vendors.filter(res => res.vendor_id === this.materialInForm.value.vendor)[0].vendor_name,
            //   material: this.materials.filter(res => res.material_id === this.materialInForm.value.material)[0].material,
            //   price: this.materialInForm.value.price,
            //   no_of_units: this.materialInForm.value.no_of_units,
            //   purchased_date: this.materialInForm.value.purchased_date,
            // })
            console.log(this.collection.materialsIn)
            this.alert_message = "Material-In Added Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Material-In Added Successfully";
            this.openAlert(this.alert_message)
          }
          this.materialInForm.reset();
        }
      )
  }

  deleteMaterialIn(material_in_id) {
    this.service.deleteMaterialsIn(material_in_id, this.collection.materialsIn.filter(data => data.material_in_id === material_in_id)[0])
      .subscribe(
        res => { 
          if(res == true) {
            this.collection.materialsIn = this.collection.materialsIn.filter(res => res.material_in_id !== material_in_id)
            this.alert_message = "Material-In Deleted Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Material-In Deleted Successfully";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  editMaterialIn(i) {
    this.selected_materialIn = this.collection.materialsIn[i];
    this.dialog_type = 'material-in';
    this.openDialog(this.dialog_type)
  }

  openDialog(dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      selected_materialIn: this.selected_materialIn,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(EditstoreComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if(data) {
          this.getMaterialsIn();
          // this.collection.materialsIn.filter( res => res.material_in_id == data.material_in_id)[0].vendor_name = data.vendor_name,
          // this.collection.materialsIn.filter( res => res.material_in_id == data.material_in_id)[0].material = this.materials.filter(res => res.material_id === data.material)[0].material,
          // this.collection.materialsIn.filter( res => res.material_in_id == data.material_in_id)[0].price = data.price,
          // this.collection.materialsIn.filter( res => res.material_in_id == data.material_in_id)[0].purchased_date = data.purchased_date,
          // this.collection.materialsIn.filter( res => res.material_in_id == data.material_in_id)[0].no_of_units = data.no_of_units,
          // this.collection.materialsIn.filter( res => res.material_in_id == data.material_in_id)[0].payment_duedate = data.payment_duedate,
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
