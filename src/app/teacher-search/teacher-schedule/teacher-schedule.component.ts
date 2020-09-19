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

  showClassList: boolean = false;
  showSectionList: boolean = false;
  showScheduleList: boolean = false;

  selected_class:any = {class_id: '', name: ''};
  selected_section:any = {section_id: '', name: ''};
  selected_schedule:any = {code: ''};

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
        res => { 
          this.classes = res.school_classes, 
          this.selected_class = this.classes[0],
          this.getTeacherSections(),
          console.log(res) 
        }
      )
  }

  getTeacherSections() {
    this.classEvent.emit(this.selected_class.class_id)
    this.service.getTeacherSections(this.employee_id, this.selected_class.class_id)
      .subscribe(
        res => { 
          this.class_sections = res.class_sections, 
          this.selected_section = this.class_sections[0], 
          this.getassessment_patterns(),
          console.log(res)
        }
      )
  }

  getassessment_patterns() {
    this.sectionEvent.emit(this.selected_section.section_id);
    this.Service.getassessment_patterns()
      .subscribe(
        res => { this.assessment_patterns = res.assessment, 
          this.selected_schedule = this.assessment_patterns[0].assessment[0],
          this.get_sch(),
          console.log(res) }
      )
  }

  get_sch() {
    this.classEvent.emit(this.selected_class.class_id);
    this.sectionEvent.emit(this.selected_section.section_id);
    this.scheduleEvent.emit(this.selected_schedule.code);
  }

}
