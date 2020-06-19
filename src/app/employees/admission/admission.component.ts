import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EmployeesService } from '../../_services/employees.service';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})
export class AdmissionComponent implements OnInit {

  alert_message: string;
  dialog_type: string;

  //employeedetails: boolean = true;
  singleemployeedetails: boolean = true;
  employeeaddress: boolean = false;


  joined_on = new FormControl(new Date);
  date_of_birth = new FormControl(new Date);

  showTitleList: boolean = false;
  showGenderList: boolean = false;
  showBloodGroupList: boolean = false;
  showMaritalStatusList: boolean = false;
  showJobCategoryList: boolean = false;
                
  employee = {
    employee_id: '',
    title: '',
    employee_code: '',
    dob: '',
    blood_group: '',
    first_name: '',
    designation: '',
    gender: '',
    marital_status: '',
    last_name: '',
    //bus_route_id: ['', Validators.required],
    email: '',
    experience: '',
    basic_pay: '',
    phone: '',
    joined_on: '',
    salary_band: '',
    perm_address: '',
    cur_address: '',
    state: '',
    aadhar_no: '',
    qualification: '',
    country: '',
    pan_no: '',
    job_category: '',
    postal_code: '',
    passport_no: '',
    spoken_languages: '',
    employeeImage: '',
  }

  constructor(
    private fb: FormBuilder,
    private service: EmployeesService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AdmissionComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.dialog_type = data.dialog_type;
    if(this.dialog_type === 'edit') {
      this.employee = data.employee;
    }
  }

  employeeadmissionForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    employee_code: ['', Validators.required],
    dob: ['', Validators.required],
    blood_group: ['', Validators.required],
    first_name: ['', Validators.required],
    designation: ['', Validators.required],
    gender: ['', Validators.required],
    marital_status: ['', Validators.required],
    last_name: ['', Validators.required],
    //bus_route_id: ['', Validators.required],
    email: ['', Validators.required],
    experience: ['', Validators.required],
    basic_pay: ['', Validators.required],
    phone: ['', Validators.required],
    joined_on: ['', Validators.required],
    salary_band: ['', Validators.required],
    perm_address: ['', Validators.required],
    cur_address: ['', Validators.required],
    state: ['', Validators.required],
    aadhar_no: ['', Validators.required],
    qualification: ['', Validators.required],
    country: ['', Validators.required],
    pan_no: ['', Validators.required],
    job_category: ['', Validators.required],
    postal_code: ['', Validators.required],
    passport_no: ['', Validators.required],
    spoken_languages: ['', Validators.required],
    employeeImage: ['', Validators.required],
  });

  ngOnInit() {
    if(this.dialog_type === 'edit') {
      this.employeeadmissionForm.patchValue({
        title: this.employee.title,
        employee_code: this.employee.employee_code,
        dob: this.employee.dob,
        blood_group: this.employee.blood_group,
        first_name: this.employee.first_name,
        designation: this.employee.designation,
        gender: this.employee.gender,
        marital_status: this.employee.marital_status,
        last_name: this.employee.last_name,
        //bus_route_id: ['', Validators.required],
        email: this.employee.email,
        experience: this.employee.experience,
        basic_pay: this.employee.basic_pay,
        phone: this.employee.phone,
        joined_on: this.employee.joined_on,
        salary_band: this.employee.salary_band,
        perm_address: this.employee.perm_address,
        cur_address: this.employee.cur_address,
        state: this.employee.state,
        aadhar_no: this.employee.aadhar_no,
        qualification: this.employee.qualification,
        country: this.employee.country,
        pan_no: this.employee.pan_no,
        job_category: this.employee.job_category,
        postal_code: this.employee.postal_code,
        passport_no: this.employee.passport_no,
        spoken_languages: this.employee.spoken_languages,
      })
    }
  }

  onFileSelect(event) {
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    this.employeeadmissionForm.get('employeeImage').setValue(file);
    console.log(file);
  }

  close() {
    this.dialogRef.close();
  }

  get_employeeForm(select) {
    if(select === 'singleemployeedetails') {
      //this.employeedetails = false;
      this.singleemployeedetails = true;
      this.employeeaddress = false;
    } else if(select === 'employeeaddress') {
      //this.employeedetails = false;
      this.singleemployeedetails = false;
      this.employeeaddress = true;
    }
  }

  submitEmployee() {
    this.employeeadmissionForm.value.employee_id = this.employee.employee_id;
    this.dialogRef.close(this.employeeadmissionForm.value);

    if (this.dialog_type == 'add') {
      this.service.addEmployeeadmission(this.employeeadmissionForm.value)
      .subscribe(
        res => {
          if (res == true) {
            this.alert_message = "Employee Added Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Employee Not Added";
            this.openAlert(this.alert_message)
          }
        }
      )
    } else if (this.dialog_type == 'edit') {
      this.service.editEmployee(this.employeeadmissionForm.value, this.employee.employee_id)
        .subscribe(
          res => { 
            if(res == true) {
              this.alert_message = "Subject Edited Successfully";
              this.openAlert(this.alert_message)
            } else {
              this.alert_message = "Subject Not Edited";
              this.openAlert(this.alert_message)
            }
          }
        )
    }
  }

  openAlert(message) {
    const alertConfig = new MatDialogConfig();

    alertConfig.autoFocus = true;
    alertConfig.width = '40%';

    alertConfig.data = {
      message: message,
    };

    const alertRef = this.dialog.open(AlertComponent, alertConfig);

    alertRef.afterClosed().subscribe();
  }

}