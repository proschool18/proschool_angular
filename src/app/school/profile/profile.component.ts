import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { ServicesService } from '../../services.service';
import { EditschoolprofileComponent } from '../editschoolprofile/editschoolprofile.component';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { appConfig } from '../../app.config';
import { User } from '../../_models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  fileData: File = null;
  fileData1: File = null;
  profileImage:any = null;
  schoolLogo:any;
  image_url;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;

  private url = appConfig.apiUrl;
  alert_message;
  user: User;

  schoolprofile: any = {
    academic_year: '',
    address: '',
    affiliation: '',
    alternate_email: '',
    alternate_phone: '',
    chairman: '',
    class_from: '',
    coordinator: '',
    description: '',
    email: '',
    est_on: '',
    extra_curricular_activites: '',
    facilities_available: '',
    founder: '',
    medium: '',
    name: '',
    phone: '',
    principal: '',
    school_id: '',
    timings: '',
    status: '',
    vice_principal: '',
    website: '',
    SchoolImage: [{
      filename: '',
      originalname: '',
      imagePath: '',
      mimetype: '',
    }],
    SchoolLogo: [{
      filename: '',
      originalname: '',
      imagePath: '',
      imageSrc: '',
      mimetype: '',
    }],
  };

  constructor(private service : ServicesService, public dialog: MatDialog, private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() { 
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getSchools();
   }

  getSchools() {
    this.service.getSchools()
      .subscribe(
        res => { this.schoolprofile = res.schools[0], this.getSchoolImage(), this.getSchoolLogo(), console.log(this.schoolprofile) }
      )
  }

  getSchoolImage() {
    this.profileImage = this.url + '/image/' + this.schoolprofile.SchoolImage[0].filename;
  }

  getSchoolLogo() {
    this.schoolLogo = this.url + '/image/' + this.schoolprofile.SchoolLogo[0].filename;
  }

  editSchoolDetails() {
    this.openDialog('schoolDetails')
  }

  editManagementDetails() {
    this.openDialog('managementDetails')
  }

  editContactDetails() {
    this.openDialog('contactDetails')
  }

  profileProgress(file: File){
    this.fileData1 = file[0];
    this.onSubmitImg();
  }

  onSubmitImg() {
    var formData: any = new FormData();
    formData.append("name", this.fileData1.name);
    formData.append("file", this.fileData1);

    this.service.addProfileImage(formData)
    .subscribe(
      res => { 
        if(res == true) {
          this.getSchools();
          this.alert_message = "Profile Image Uploaded Successfully";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "Profile Image Not Uploaded";
          this.openAlert(this.alert_message)
        }
      }
    )
  }

  fileProgress(fileInput: any) {
    this.fileData1 = fileInput[0];
    this.onSubmit();
  }
 
  onSubmit() {
    var formData: any = new FormData();
    formData.append("name", this.fileData1.name);
    formData.append("file", this.fileData1);

    this.service.addSchoolLogo(formData)
    .subscribe(
      res => { 
        if(res == true) {
          this.getSchools();
          this.alert_message = "School Logo Uploaded Successfully";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "School Logo Not Uploaded";
          this.openAlert(this.alert_message)
        }
      }
    )
  }

  openDialog(dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      schoolprofile: this.schoolprofile,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(EditschoolprofileComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        console.log("Dialog output:", data);
        this.getSchools();
      }
    )
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
