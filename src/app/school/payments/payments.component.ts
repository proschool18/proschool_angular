import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { StoreService } from '../../_services/store.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  constructor(private service: ServicesService, private storeservice: StoreService) {}

  showVendorList = false;
  showMaterialList = false;

  ngOnInit() {
    this.getVendors();
    this.getMaterials();
    this.getPayments();
  }

  vendors = [];
  materials = [];
  all_payments = [];
  payments = [];

  vendor = {vendor_id: '', vendor_name: ''};
  material = {material_id: '', material: ''};

  getPayments() {
    this.service.getPayments()
      .subscribe(
        res => { this.payments = res.payments, this.all_payments = res.payments, console.log(res.payments) }
      )
  }

  getVendors() {
    this.storeservice.getVendors()
      .subscribe(
        res => { this.vendors = res.vendor, console.log(res) }
      )
  }

  getMaterials() {
    this.storeservice.getMaterials()
      .subscribe(
        res => { this.materials = res.material, console.log(res) }
      )
  }

  getVendor_Payments() {
    this.payments = this.all_payments.filter(pay => pay.vendor_id === this.vendor.vendor_id);
    console.log(this.payments)
  }

  getMaterial_payments() {
    this.payments = this.all_payments.filter(pay => pay.material_id === this.material.material_id);
  }

}
