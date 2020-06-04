import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../../services.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { from } from 'rxjs';

@Component({
  selector: 'app-editschoolprofile',
  templateUrl: './editschoolprofile.component.html',
  styleUrls: ['./editschoolprofile.component.css']
})
export class EditschoolprofileComponent implements OnInit {

  schoolDetails: boolean = true;
  managementDetails: boolean = false;
  contactDetails: boolean = false;
  about: boolean = false;
  chairman_note: boolean = false;

  school_id;
  dialog_type: string;
  alert_message: string;

  schoolprofile = {
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
    about: '',
    chairman_note: '',
  };

  schoolprofileForm: FormGroup = this.fb.group({
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
    vice_principal: '',
    website: '',
    about: '',
    chairman_note: '',
  });

  constructor(
    private service: ServicesService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<EditschoolprofileComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.schoolprofile = data.schoolprofile;
  }

  ngOnInit() {
    this.schoolprofileForm.patchValue({
      academic_year: this.schoolprofile.academic_year,
      address: this.schoolprofile.address,
      affiliation: this.schoolprofile.affiliation,
      alternate_email: this.schoolprofile.alternate_email,
      alternate_phone: this.schoolprofile.alternate_phone,
      chairman: this.schoolprofile.chairman,
      class_from: this.schoolprofile.class_from,
      coordinator: this.schoolprofile.coordinator,
      description: this.schoolprofile.description,
      email: this.schoolprofile.email,
      est_on: this.schoolprofile.est_on,
      extra_curricular_activites: this.schoolprofile.extra_curricular_activites,
      facilities_available: this.schoolprofile.facilities_available,
      founder: this.schoolprofile.founder,
      medium: this.schoolprofile.medium,
      name: this.schoolprofile.name,
      phone: this.schoolprofile.phone,
      principal: this.schoolprofile.principal,
      school_id: this.schoolprofile.school_id,
      timings: this.schoolprofile.timings,
      vice_principal: this.schoolprofile.vice_principal,
      website: this.schoolprofile.website,
      about: this.schoolprofile.about,
      chairman_note: this.schoolprofile.chairman_note,
    });
  }

  showForm(select) {
    if(select === 'schoolDetails') {
      this.schoolDetails = true;
      this.managementDetails = false;
      this.contactDetails = false;
      this.about = false;
      this.chairman_note = false;
    } else if(select === 'managementDetails') {
      this.schoolDetails = false;
      this.managementDetails = true;
      this.contactDetails = false;
      this.about = false;
      this.chairman_note = false;
    } else if(select === 'contactDetails') {
      this.schoolDetails = false;
      this.managementDetails = false;
      this.contactDetails = true;
      this.about = false;
      this.chairman_note = false;
    } else if(select === 'about') {
      this.schoolDetails = false;
      this.managementDetails = false;
      this.contactDetails = false;
      this.about = true;
      this.chairman_note = false;
    } else if(select === 'chairman_note') {
      this.schoolDetails = false;
      this.managementDetails = false;
      this.contactDetails = false;
      this.about = false;
      this.chairman_note = true;
    }
  }

  editSchool() {
    this.service.editSchoolProfile(this.schoolprofileForm.value, this.schoolprofile.school_id)
      .subscribe(
        res => {
          if (res == true) {
            this.dialogRef.close(this.schoolprofileForm.value);
            this.alert_message = "School Edited Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "School Not Edited";
            this.openAlert(this.alert_message)
          }
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

  close() {
    this.dialogRef.close();
  }

}
