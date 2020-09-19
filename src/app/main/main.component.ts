import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { EmployeesService } from '../_services/employees.service';
import { User } from '../_models/user';
import { appConfig } from '../app.config';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private service: ServicesService, private employeeservice: EmployeesService) { }

  user: User;
  employee_id;
  schoolprofile: any;
  employee_details: any;
  profileImage;
  schoolLogo;
  private url = appConfig.apiUrl;
  profileData;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));    
  }

}
