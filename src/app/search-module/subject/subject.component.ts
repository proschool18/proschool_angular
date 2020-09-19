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

  selected_class:any = {class_id: '', name: ''};
  selected_section:any = {section_id: '', name: ''};
  selected_subject:any = {subject_id: '', name: ''};

  showClassList: boolean = false;
  showSectionList: boolean = false;
  showSubjectList: boolean = false;

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
        res => { this.classes = res.school_classes.filter(data => data.status === 1), 
          this.selected_class = this.classes[0], 
          this.getSections(),
          console.log(res)
        }
      )
  }

  getSections() {
    this.classEvent.emit(this.selected_class.class_id)
    this.service.getSections(this.selected_class.class_id)
      .subscribe(
        res => { this.class_sections = res.class_sections, 
          this.selected_section = this.class_sections[0], 
          this.getSubjects(),
          console.log(res)
        }
      )
  }
  
  getSubjects() {
    this.service.getSubjects(this.selected_section.section_id)
      .subscribe(
        res => { this.subjects = res.subjects, 
          this.selected_subject = this.subjects[0],
          this.get_sub(),
          console.log(res) 
        }
      )
  }

  get_sub() {
    this.classEvent.emit(this.selected_class.class_id);
    this.sectionEvent.emit(this.selected_section.section_id);
    this.subjectEvent.emit(this.selected_subject.subject_id);
  }

}
