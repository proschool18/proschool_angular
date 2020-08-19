import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ServicesService } from '../../services.service';
import { StudentsService } from '../../_services/students.service';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.css']
})
export class AdmissionComponent implements OnInit {

  classes = [];
  sections = [];
  alert_message: string;
  dialog_type: string;
  studentphoto: File;

  date_of_birth = new FormControl(new Date);
  date_of_admission = new FormControl(new Date);

  selectedGender:any;
  showGenderList: boolean = false;
        
   class: string;
  section: string;
  student = {
    student_id: '',
    admission_no: '',
    first_name: '',
    category: '',
    blood_group: '',
    roll_no: '',
    last_name: '',
    nationality: '',
    admission_date: '',
    class_id: '',
    gender: '',
    phone: '',
    bus_route_id: '',
    section_id: '',
    dob: '',
    aadhar_no: '',
    email: '',
    father_name: '',
    mother_name: '',
    gaurdian_name: '',
    gaurdian_relation: '',
    father_contact: '',
    mother_contact: '',
    gaurdian_contact: '',
    father_email: '',
    mother_email: '',
    gaurdian_email: '',
    father_occupation: '',
    mother_occupation: '',
    gaurdian_occupation: '',
    cur_address: '',
    perm_address: '',
    parents: [{
      "parent_name" : "",
      "parent_contact" : '',
      "parent_email" : "",
      "parent_relation" : "",
      "parent_address" : "",
      "occupation" : ""
    }],
    school_classes: [],
    sections: [],
  }

  studentdetails: boolean = true;
  parentdetails: boolean = false;
  address: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: ServicesService,
    private studentservice: StudentsService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AdmissionComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.class = data.class;
    this.section = data.section;
    this.dialog_type = data.dialog_type;
    if(this.dialog_type === 'edit') {
      this.student = data.student;
    }
  }

  sudentadmissionForm: FormGroup = this.fb.group({
    admission_no: ['', Validators.required],
    first_name: ['', Validators.required],
    category: ['', Validators.required],
    blood_group: ['', Validators.required],
    roll_no: ['', Validators.required],
    last_name: ['', Validators.required],
    nationality: ['', Validators.required],
    admission_date: ['', Validators.required],
    class_id: ['', Validators.required],
    gender: ['', Validators.required],
    phone: ['', Validators.required],
    bus_route_id: ['', Validators.required],
    section_id: ['', Validators.required],
    dob: ['', Validators.required],
    aadhar_no: ['', Validators.required],
    email: ['', Validators.required],
    //exceluploadfile: ['', Validators.required],
    father_name: ['', Validators.required],
    mother_name: ['', Validators.required],
    gaurdian_name: ['', Validators.required],
    gaurdian_relation: ['', Validators.required],
    father_contact: ['', Validators.required],
    mother_contact: ['', Validators.required],
    gaurdian_contact: ['', Validators.required],
    father_email: ['', Validators.required],
    mother_email: ['', Validators.required],
    gaurdian_email: ['', Validators.required],
    father_occupation: ['', Validators.required],
    mother_occupation: ['', Validators.required],
    gaurdian_occupation: ['', Validators.required],
    cur_address: ['', Validators.required],
    perm_address: ['', Validators.required],
    file: [''],
    //parent_account_new: ['', Validators.required],
    //parent_account_create: ['', Validators.required],
    //docupload: ['', Validators.required]
  });
  
  ngOnInit() {
    this.getClasses();
    if(this.dialog_type === 'edit') {
      this.sudentadmissionForm.patchValue({
        admission_no: this.student.admission_no,
        first_name: this.student.first_name,
        category: this.student.category,
        blood_group: this.student.blood_group,
        roll_no: this.student.roll_no,
        last_name: this.student.last_name,
        nationality: this.student.nationality,
        admission_date: this.student.admission_date,
        class_id: this.student.school_classes[0].class_id,
        gender: this.student.gender,
        phone: this.student.phone,
        bus_route_id: this.student.bus_route_id,
        section_id: this.student.sections[0].section_id,
        dob: this.student.dob,
        aadhar_no: this.student.aadhar_no,
        email: this.student.email,
        //exceluploadfile: ['', Validators.required],
        father_name: this.student.parents[0].parent_name,
        mother_name: this.student.parents[1].parent_name,
        gaurdian_name: this.student.parents[2].parent_name,
        gaurdian_relation: this.student.parents[2].parent_relation,
        father_contact: this.student.parents[0].parent_contact,
        mother_contact: this.student.parents[1].parent_contact,
        gaurdian_contact: this.student.parents[2].parent_contact,
        father_email: this.student.parents[0].parent_email,
        mother_email: this.student.parents[1].parent_email,
        gaurdian_email: this.student.parents[2].parent_email,
        father_occupation: this.student.parents[0].occupation,
        mother_occupation: this.student.parents[1].occupation,
        gaurdian_occupation: this.student.parents[2].occupation,
        cur_address: this.student.cur_address,
        perm_address: this.student.perm_address,
        file: [''],
        //parent_account_new: ['', Validators.required],
        //parent_account_create: ['', Validators.required],
        //docupload: ['', Validators.required]
      });
    }
  }

  get_studentForm(select) {
    if (select === 'studentdetails') {
      this.studentdetails = true;
      this.parentdetails = false;
      this.address = false;
    } else if (select === 'parentdetails') {
      this.studentdetails = false;
      this.parentdetails = true;
      this.address = false;
    } else if (select === 'address') {
      this.studentdetails = false;
      this.parentdetails = false;
      this.address = true;
    }
  }

  fileProgress(event) {
    this.studentphoto = <File>event.target.files[0];
    this.sudentadmissionForm.patchValue({ file: this.studentphoto });
  }

  close() {
    this.dialogRef.close();
  }

  submitStudent() {
    this.sudentadmissionForm.value.student_id = this.student.student_id;
    this.dialogRef.close(this.sudentadmissionForm.value);
    if (this.dialog_type == 'add') {
      this.studentservice.addStudentadmission(this.sudentadmissionForm.value.section_id, this.sudentadmissionForm.value)
        .subscribe(
          res => {
            if (res == true) {
              this.alert_message = "Student Added Successfully";
              this.openAlert(this.alert_message)
            } else {
              this.alert_message = "Student Not Added";
              this.openAlert(this.alert_message)
            }
          }
        )
    } else if (this.dialog_type == 'edit') {
      this.studentservice.editStudent(this.sudentadmissionForm.value.student_id, this.sudentadmissionForm.value)
        .subscribe(
          res => {
            if (res == true) {
              this.alert_message = "Student Edited Successfully";
              this.openAlert(this.alert_message)
            } else {
              this.alert_message = "Student Not Edited";
              this.openAlert(this.alert_message)
            }
          }
        )
    }
  }

  getClasses() {
    this.service.getClasses()
      .subscribe(
        res => { this.classes = res.school_classes, console.log(res) }
      )
  }
  selectedClass: any;
  showClassList: boolean = false;

  selectedSection: any;
  showSectionList: boolean = false;

  selectedCategory: any
  showCategoryList: boolean = false;

  selectedBloodGroup: any;
  showBloodGroupList: boolean = false;

    
  classListbtnClicked() {
    this.showClassList = true;
  }
  sectionChange() {
    if (this.selectedClass.class_id == undefined || this.selectedClass.class_id == '') {
      this.alert_message = "Please Select Class";
      this.openAlert(this.alert_message)
    } else {
    this.service.getSections(this.selectedClass.class_id)
        .subscribe(
          res => { this.sections = res.class_sections, console.log(this.sections) }
        )
    }

  }

  validateDate(date) {
    var input = date;
    var re = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    var is_date_valid = re.test(date);
    var dateArray = date.split("/");
    if (is_date_valid) {
    if (parseInt(dateArray[0]) > 31 || parseInt(dateArray[0]) < 1 || (parseInt(dateArray[1]) === 2 
    && parseInt(dateArray[0]) > 29) || parseInt(dateArray[1]) > 12 || parseInt(dateArray[1]) < 1) {
      is_date_valid = false;
      }
    }

    if (parseInt(dateArray[2]) > new Date().getFullYear() ||
    parseInt(dateArray[2]) < ((new Date().getFullYear()) - 100)) {
    is_date_valid = false;
    }
    if (!is_date_valid) {
      // this.dobError = "Please enter a valid Date of Birth.";
    } else {
      // this.dobError = "";
    }
  }

  addSlashToDOB(e) {
    if (e.keyCode != 8) {
      if (this.student.dob.length == 2) {
      this.student.dob = this.student.dob + "/";
    } else if (this.student.dob.length == 5) {
      this.student.dob = this.student.dob + "/";
      } else {
        return true;
      }
    }
    return true;
  }

  addSlashToDOfAdmission(e) {
    if (e.keyCode != 8) {
      if (this.student.admission_date.length == 2) {
        this.student.admission_date = this.student.admission_date + "/";
      } else if (this.student.admission_date.length == 5) {
        this.student.admission_date = this.student.admission_date + "/";
      } else {
        return true;
      }
    }
    return true;
  }

  isMobileValid() {
    var re = /^[6789]\d{9}$/;
    var is_mobile = re.test(this.student.phone);
    if (is_mobile) {
      // this.mobileError = '';
    } else {
      // this.mobileError = 'Please enter a valid mobile number.';
    }
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
