import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { StoreService } from '../../_services/store.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  config: any;
  collection = { count: '', payments: [] };

  constructor(private service: ServicesService, private storeservice: StoreService) { 
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }

  ngOnInit() {
    this.getVendors();
    this.getMaterials();
    this.getPayments();
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  vendors = [];
  materials = [];
  all_payments = [];
  //payments = [];

  vendor;
  material;

  getPayments() {
    this.service.getPayments()
      .subscribe(
        res => { this.collection.payments = res.payments, this.all_payments = res.payments, console.log(res.payments) }
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
    this.collection.payments = this.all_payments.filter(pay => pay.vendor_id === this.vendor);
    console.log(this.collection.payments)
  }

  getMaterial_payments() {
    this.collection.payments = this.all_payments.filter(pay => pay.material_id === this.material);
  }

}
