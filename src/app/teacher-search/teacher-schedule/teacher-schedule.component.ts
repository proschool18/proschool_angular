import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TeacherService } from '../../_services/teacher.service';
import { ServicesService } from '../../services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-teacher-schedule',
  templateUrl: './teacher-schedule.component.html',
  styleUrls: ['./teacher-schedule.component.css']
})
export class TeacherScheduleComponent implements OnInit {

  constructor(private service: TeacherService, private Service: ServicesService, private fb: FormBuilder) { }

  @Output() classEvent = new EventEmitter<string>();
  @Output() sectionEvent = new EventEmitter<string>();
  @Output() scheduleEvent = new EventEmitter<string>();

  employee_id = JSON.parse(localStorage.getItem('currentUser')).employee_id;

  selected_class;
  selected_section;
  selected_schedule;

  classes = [];
  all_sections = [];
  class_sections = [];
  assessment_patterns = [];

  ngOnInit() {
    this.getassessment_patterns();
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

  getassessment_patterns() {
    this.sectionEvent.emit(this.selected_section);
    this.Service.getassessment_patterns()
      .subscribe(
        res => { this.assessment_patterns = res.assessment, console.log(res) }
      )
  }

  get_sch() {
    this.classEvent.emit(this.selected_class);
    this.sectionEvent.emit(this.selected_section);
    this.scheduleEvent.emit(this.selected_schedule);
  }

}
