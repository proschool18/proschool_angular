import { Component, OnInit, Inject } from '@angular/core';
import { ClasessService } from '../../_services/clasess.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-editclass',
  templateUrl: './editclass.component.html',
  styleUrls: ['./editclass.component.css']
})
export class EditclassComponent implements OnInit {

  // classes = {
  //   class_id: '',
  //   name: '',
  // };
  // sections = {
  //   section_id: '',
  //   class_id: '',
  //   name: '',
  //   // pattern: '',
  //   employee_id: '',
  //   teacher_name: '',
  // };
  classes = [];
  sections = [];
  teachers = [];
  class_id;
  section_id;
  dialog_type: string;

  classForm: FormGroup = this.fb.group({
    class_id: '',
    name: ['', Validators.required],
  });

  sectionForm: FormGroup = this.fb.group({
    section_id: '',
    selected_class: ['', Validators.required],
    name: ['', Validators.required],
    // pattern: [''],
    employee_id: [''],
    teacher_name: [''],
  });
  alert_message: string;

  constructor(
    private service: ClasessService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<EditclassComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.dialog_type = data.dialog_type;
    
    if(this.dialog_type === 'class') {
      this.classForm.patchValue({
        class_id: data.selected_class.class_id,
        name: data.selected_class.name,
      })
    } else if(this.dialog_type === 'section') {
      this.sectionForm.patchValue({
        section_id: data.selected_section.section_id,
        selected_class: data.selected_section.class_id,
        name: data.selected_section.name,
        employee_id: data.selected_section.employee_id,
        teacher_name: data.selected_section.employee_id,
      })
    }

    this.classes = data.selected_class;

    this.sections = data.selected_section;
    this.teachers = data.teachers;

  }

  ngOnInit() {
    // console.log(this.sections)
  }

  close_class() {
    this.dialogRef.close();
  }

  close_section() {
    this.dialogRef.close();
  }

  editClass() {    
    // this.classForm.value.class_id = this.classes.class_id;
    // this.class_id = this.classes.class_id;
    this.class_id = this.classForm.value.class_id;
    this.dialogRef.close(this.classForm.value);
    this.service.editClass(this.classForm.value, this.class_id)
    .subscribe(
      res => { 
        if(res == true) {
          this.alert_message = "Class Edited Successfully";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "Class Not Edited";
          this.openAlert(this.alert_message)
        }
      }
    )
  }

  editSection() {
    // this.sectionForm.value.section_id = this.sections.section_id;
    this.dialogRef.close(this.sectionForm.value);
    // this.section_id = this.sections.section_id;    
    this.section_id = this.sectionForm.value.section_id; 
    this.service.editSection(this.sectionForm.value, this.section_id)
    .subscribe(
      res => { 
        if(res == true) {
          this.alert_message = "Section Edited Successfully";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "Section Not Edited";
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

}
