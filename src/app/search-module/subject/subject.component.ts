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

  selected_class:any = " ";
  selected_section:any = " ";
  selected_subject:any = " ";

  classes = [];
  all_sections = [];
  class_sections = [];
  subjects = [];

  showClassList: boolean = false;
  showSectionList: boolean = false;
  showSubjectList: boolean = false;

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
    this.classEvent.emit(this.selected_class.class_id)
    this.service.getSections(this.selected_class.class_id)
      .subscribe(
        res => { this.class_sections = res.class_sections, console.log(res) }
      )
  }
  
  getSubjects() {
    this.service.getSubjects(this.selected_section.section_id)
      .subscribe(
        res => { this.subjects = res.subjects, console.log(res) }
      )
  }

  get_sub() {
    this.classEvent.emit(this.selected_class.class_id);
    this.sectionEvent.emit(this.selected_section.section_id);
    this.subjectEvent.emit(this.selected_subject.subject_id);
  }

}
