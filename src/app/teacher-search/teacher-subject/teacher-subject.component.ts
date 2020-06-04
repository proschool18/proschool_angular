import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeacherService } from '../../_services/teacher.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-teacher-subject',
  templateUrl: './teacher-subject.component.html',
  styleUrls: ['./teacher-subject.component.css']
})
export class TeacherSubjectComponent implements OnInit {

  constructor(private service: TeacherService, private fb: FormBuilder) { }

  @Output() classEvent = new EventEmitter<string>();
  @Output() sectionEvent = new EventEmitter<string>();
  @Output() subjectEvent = new EventEmitter<string>();

  employee_id = JSON.parse(localStorage.getItem('currentUser')).employee_id;

  classForm: FormGroup = this.fb.group({
    selected_class: [''],
    selected_section: [''],
    selected_subject: [''],
  });

  classes = [];
  all_sections = [];
  class_sections = [];
  subjects = [];

  ngOnInit() {
    this.getTeacherClasses();
  }

  getTeacherClasses() {
    this.service.getTeacherClasses(this.employee_id)
      .subscribe(
        res => { this.classes = res.school_classes, console.log(res) }
      )
  }

  getTeacherSections() {
    this.classEvent.emit(this.classForm.value.selected_class)
    this.service.getTeacherSections(this.employee_id, this.classForm.value.selected_class)
      .subscribe(
        res => { this.class_sections = res.class_sections, console.log(res) }
      )
  }
  
  getTeacherSubjects() {
    this.service.getTeacherSubjects(this.employee_id, this.classForm.value.selected_section)
      .subscribe(
        res => { this.subjects = res.subjects, console.log(res) }
      )
  }

  get_sub() {
    this.classEvent.emit(this.classForm.value.selected_class);
    this.sectionEvent.emit(this.classForm.value.selected_section);
    this.subjectEvent.emit(this.classForm.value.selected_subject);
  }

}
