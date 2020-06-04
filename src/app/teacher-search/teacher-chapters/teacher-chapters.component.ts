import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeacherService } from '../../_services/teacher.service';
import { AcademicsService } from '../../_services/academics.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-teacher-chapter',
  templateUrl: './teacher-chapters.component.html',
  styleUrls: ['./teacher-chapters.component.css']
})
export class TeacherChaptersComponent implements OnInit {

  constructor(private service: TeacherService, private academics: AcademicsService, private fb: FormBuilder) { }

  @Output() classEvent = new EventEmitter<string>();
  @Output() sectionEvent = new EventEmitter<string>();
  @Output() subjectEvent = new EventEmitter<string>();
  @Output() chapterEvent = new EventEmitter<string>();

  employee_id = JSON.parse(localStorage.getItem('currentUser')).employee_id;

  selected_class;
  selected_section;
  selected_subject;
  selected_chapter;

  classes = [];
  all_sections = [];
  class_sections = [];
  subjects = [];
  chapters = [];

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
    this.classEvent.emit(this.selected_class)
    this.service.getTeacherSections(this.employee_id, this.selected_class)
      .subscribe(
        res => { this.class_sections = res.class_sections, console.log(res) }
      )
  }
  
  getTeacherSubjects() {
    this.service.getTeacherSubjects(this.employee_id, this.selected_section)
      .subscribe(
        res => { this.subjects = res.subjects, console.log(res) }
      )
  }

  getChapters() {
    this.academics.getChapters(this.selected_subject)
      .subscribe(
        res => { this.chapters = res.chapters, console.log(res) }
      )
  }

  get_sub() {
    this.classEvent.emit(this.selected_class);
    this.sectionEvent.emit(this.selected_section);
    this.subjectEvent.emit(this.selected_subject);
    this.chapterEvent.emit(this.selected_chapter);
  }

}
