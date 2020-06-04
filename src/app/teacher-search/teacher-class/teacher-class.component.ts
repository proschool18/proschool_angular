import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TeacherService } from '../../_services/teacher.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-teacher-class',
  templateUrl: './teacher-class.component.html',
  styleUrls: ['./teacher-class.component.css']
})
export class TeacherClassComponent implements OnInit {

  constructor(private service: TeacherService, private fb: FormBuilder) { }

  @Output() classEvent = new EventEmitter<string>();
  @Output() sectionEvent = new EventEmitter<string>();
  @Output() subjectEvent = new EventEmitter<string>();

  employee_id = JSON.parse(localStorage.getItem('currentUser')).employee_id;

  selected_class;
  selected_section;

  classes = [];
  class_sections = [];
  selected_subject;

  ngOnInit() {
    this.getTeacherClasses();
  }

  getTeacherClasses() {
    this.service.getTeacherClasses(this.employee_id)
      .subscribe(
        res => { this.classes = res.school_classes, console.log(res)}
      )
  }

  getTeacherSections() {
    this.classEvent.emit(this.selected_class)
    this.service.getTeacherSections(this.employee_id, this.selected_class)
      .subscribe(
        res => { this.class_sections = res.class_sections, console.log(res)}
      )
  }

  receiveSubject($event) {
    this.selected_subject = $event
    console.log(this.selected_subject)
  }

  get_clsec() {
    this.classEvent.emit(this.selected_class);
    this.sectionEvent.emit(this.selected_section);
    this.subjectEvent.emit(this.selected_subject);
  }

}
