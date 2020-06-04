import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeesService } from '../../_services/employees.service';
import { ServicesService } from '../../services.service';
import { AdmissionComponent } from '../../employees/admission/admission.component';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { appConfig } from '../../app.config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private service: EmployeesService, public dialog: MatDialog, private route: ActivatedRoute, private services: ServicesService) { }

  ngOnInit() {
    this.getEmployeeDetails()
  }

  fileData: File = null;
  profileImage:any = null;

  private url = appConfig.apiUrl;
  alert_message;

  edit_content = false;

  perInfoPannel: boolean = true;
  profInfoPannel: boolean = false;
  addrPannel: boolean = false;
  contPannel: boolean = false;

  employee_id = this.route.snapshot.paramMap.get('id');
  employee_details = {
    employee_id: '',
    first_name:'',
    employeeImage: [{
      filename: '',
      originalname: '',
      imagePath: '',
      mimetype: '',
    }],
  };  

  getEmployeeDetails() {
    this.service.getEmployeeDetails(this.employee_id)
      .subscribe(
        res => { this.employee_details = res.employee[0], this.getEmployeeImage(), console.log(res) }
      )
  }

  getEmployeeImage() {
    this.profileImage = this.url + '/image/' + this.employee_details.employeeImage[0].filename;
  }

  profile_info(pannel) {
    if(pannel == "perInfo") {
      this.perInfoPannel = true;
      this.profInfoPannel = false;
      this.addrPannel = false;
      this.contPannel = false;
    } else if(pannel == "profInfo") {
      this.profInfoPannel = true;
      this.addrPannel = false;
      this.contPannel = false;
      this.perInfoPannel = false;
    } else if(pannel == "empaddress") {
      this.addrPannel = true;
      this.profInfoPannel = false;
      this.contPannel = false;
      this.perInfoPannel = false;
    }else {
      this.contPannel = true;
      this.perInfoPannel = false;
      this.profInfoPannel = false;
      this.addrPannel = false;
    }
  }

  
  employeProfPic(fileImg: any){
    this.fileData = fileImg[0];
    this.onSubmitImg();
  }

  onSubmitImg() {
    const formData = new FormData();
    formData.append('files', this.fileData);

    this.service.addProfileImage(formData, this.employee_id)
    .subscribe(
      res => { 
        if(res == true) {
          this.getEmployeeDetails();
          this.alert_message = "Profile Image Uploaded Successfully";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "Profile Image Not Uploaded";
          this.openAlert(this.alert_message)
        }
      }
    )
  }

  editEmployee() {
    this.openDialog(this.employee_details, 'edit')
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
        console.log("Dialog output:", data)
        this.getEmployeeDetails();
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
