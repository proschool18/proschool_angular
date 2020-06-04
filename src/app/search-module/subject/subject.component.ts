import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServicesService } from '../../services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  constructor(private service: ServicesService, private fb: FormBuilder) { }

  @Output() classEvent = new EventEmitter<string>();
  @Output() sectionEvent = new EventEmitter<string>();
  @Output() subjectEvent = new EventEmitter<string>();

  selected_class;
  selected_section;
  selected_subject;

  classes = [];
  all_sections = [];
  class_sections = [];
  subjects = [];

  ngOnInit() {
    this.getClasses();
  }

  getClasses() {
    this.service.getClasses()
      .subscribe(
        res => { this.classes = res.school_classes.filter(data => data.status === 1), console.log(res) }
      )
  }

  getSections() {
    this.classEvent.emit(this.selected_class)
    this.service.getSections(this.selected_class)
      .subscribe(
        res => { this.class_sections = res.class_sections, console.log(res) }
      )
  }
  
  getSubjects() {
    this.service.getSubjects(this.selected_section)
      .subscribe(
        res => { this.subjects = res.subjects, console.log(res) }
      )
  }

  get_sub() {
    this.classEvent.emit(this.selected_class);
    this.sectionEvent.emit(this.selected_section);
    this.subjectEvent.emit(this.selected_subject);
  }

}
