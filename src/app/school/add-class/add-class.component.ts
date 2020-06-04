import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { ClasessService } from '../../_services/clasess.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EditclassComponent } from '../editclass/editclass.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {
  config: any;
  collection = { count: '', classes: [] };

  
  constructor(private service: ClasessService, private fb: FormBuilder, public dialog: MatDialog) { 
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
  }

  user: User;
  status = 'active';
  classes = [];
  class_sections = [];
  teachers = [];
  selected_class;
  selected_section;
  dialog_type: string;
  alert_message: string;
  data;

  ngOnInit() {
    this.getClasses();
    this.getEmployees();
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user.role)
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  classForm: FormGroup = this.fb.group({
    class_id: '',
    name: ['', Validators.required],
    status: 'active'
  });

  sectionForm: FormGroup = this.fb.group({
    section_id: '',
    selected_class: ['', Validators.required],
    name: ['', Validators.required],
    teacher_name: [''],
  });

  getClasses() {
    this.service.getClasses()
      .subscribe(
        res => { this.classes = res.school_classes, 
          this.getClassesByStatus(), 
          this.sectionForm.value.selected_class = res.school_classes[0].class_id;
          this.getSections()
          console.log(res) }
      )
  }

  getClassesByStatus() {
    console.log(this.classForm.value.status)
    if(this.classForm.value.status === 'active') {
      this.collection.classes = this.classes.filter(data => data.status === 1)
    } else if(this.classForm.value.status === 'inactive') {
      this.collection.classes = this.classes.filter(data => data.status === 0)
    } 
    this.config.currentPage = 1;
    console.log(this.collection.classes)
  }

  restoreClass(class_id) {
    this.service.restoreClass(this.data, class_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.classForm.get('status').setValue('active');
            this.classes.filter(data => data.class_id === class_id)[0].status = 1;
            console.log(this.classForm.value.status)
            this.getClassesByStatus();
            this.alert_message = "Class Restored Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Class Not Restored";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  getEmployees() {
    this.service.getEmployees()
      .subscribe(
        res => { this.teachers = res.employee.filter(res => res.job_category === "teaching"), console.log(res) }
      )
  }

  getSections() {
    this.service.getSections(this.sectionForm.value.selected_class)
      .subscribe(
        res => { this.class_sections = res.class_sections, console.log(res) }
      )
  }

  addClass() {
    this.service.addClass(this.classForm.value)
    .subscribe(
      res => { 
        if(res == true) {
          // this.classes.push({name: this.classForm.value.name, status: 1});
          // this.classForm.get('status').setValue('active');
          this.getClasses();
          this.status = 'active';
          this.getClassesByStatus();
          this.alert_message = "Class Added Successfully";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "Class Not Added";
          this.openAlert(this.alert_message)
        }
        this.classForm.reset();
      }
    )
  }

  addSection() {
    this.service.addSection(this.sectionForm.value, this.sectionForm.value.selected_class)
    .subscribe(
      res => { 
        if(res == true) {
          // this.class_sections.push({
          //   class_name: this.collection.classes.filter(res => res.class_id === this.sectionForm.value.selected_class)[0].name,
          //   name: this.sectionForm.value.name,
          //   teacher_name: this.teachers.filter(res => res.employee_id === this.sectionForm.value.teacher_name)[0].first_name,
          // });
          this.getSections();
          this.alert_message = "Section Added Successfully";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "Section Not Added";
          this.openAlert(this.alert_message)
        }
        this.sectionForm.reset();
      }
    )
  }

  deleteClasses(class_id){
    this.service.deleteClass(this.data, class_id)
    .subscribe(
      res => { 
        if(res == true) {
          this.classes.filter(res => res.class_id === class_id)[0].status = 0;
          this.classForm.value.status = 'active';
          this.getClassesByStatus();
          // this.collection.classes = this.collection.classes.filter(res => res.class_id !== class_id)
          this.alert_message = "Class Deleted Successfully";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "Class Not Deleted";
          this.openAlert(this.alert_message)
        }
      }
    )
  }

  deleteSection(section_id) {
    this.service.deleteSection(this.data, section_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.class_sections = this.class_sections.filter(res => res.section_id !== section_id)
            this.alert_message = "Section Deleted Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Section Not Deleted";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  editClass(i) {
    this.selected_class = this.collection.classes[i];
    this.dialog_type = 'class';
    this.openDialog(this.dialog_type)
  }
  
  editSection(j) {
    this.selected_section = this.class_sections[j];
    this.dialog_type = 'section';
    this.openDialog(this.dialog_type)
  }

  openDialog(dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      selected_class: this.selected_class,
      selected_section: this.selected_section, 
      teachers: this.teachers,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(EditclassComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if(dialog_type == 'class') {
          this.collection.classes.filter( res => res.class_id == data.class_id)[0].name = data.name;
        } else if(dialog_type == 'section') {
          this.getSections();
          // this.class_sections.filter( res => res.section_id == data.section_id)[0].name = data.name;
          // this.class_sections.filter( res => res.section_id == data.section_id)[0].employee_id = data.employee_id;
          // this.class_sections.filter( res => res.section_id == data.section_id)[0].teacher_name = this.teachers.filter(res => res.employee_id === data.teacher_name)[0].first_name;
        }        
        console.log("Dialog output:", data)
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
