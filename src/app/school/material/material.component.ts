import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../_services/store.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EditstoreComponent } from '../editstore/editstore.component';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  config: any;
  collection = { count: '', materials: [] };

  constructor(private service: StoreService, private fb: FormBuilder, public dialog: MatDialog) { 
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }

  ngOnInit() {
    this.getMaterials();
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  //materials = [];
  selected_material;
  dialog_type: string;
  alert_message: string;
  data;

  materialForm: FormGroup = this.fb.group({
    material: ['', Validators.required],
    category: ['', Validators.required],
    quantity: 0
  });

  getMaterials() {
    this.service.getMaterials()
      .subscribe(
        res => { this.collection.materials = res.material, console.log(res) }
      )
  }

  addMaterials() {
    this.service.addMaterials(this.materialForm.value)
    .subscribe(
      res => { 
        if(res == true) {
          this.collection.materials.push(this.materialForm.value)
          this.alert_message = "Material Added Successfully";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "Material Not Added";
          this.openAlert(this.alert_message)
        }
      }
    )
  }

  deleteMaterial(material_id) {
    this.service.deleteMaterials(material_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.collection.materials = this.collection.materials.filter(res => res.material_id !== material_id)
            this.alert_message = "Material Deleted Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Material Not Deleted";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  editMaterial(i) {
    this.selected_material = this.collection.materials[i];
    this.dialog_type = 'material';
    this.openDialog(this.dialog_type)
  }

  openDialog(dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      selected_material: this.selected_material,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(EditstoreComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if(data) {
          this.collection.materials.filter( res => res.material_id == data.material_id)[0].material = data.material,
          this.collection.materials.filter( res => res.material_id == data.material_id)[0].category = data.category,
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
