import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServicesService } from '../../services.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor(private service: ServicesService, private fb: FormBuilder) { }

  @Output() classEvent = new EventEmitter<string>();
  @Output() sectionEvent = new EventEmitter<string>();
  @Output() scheduleEvent = new EventEmitter<string>();

  selected_class;
  selected_section;
  selected_schedule;

  classes = [];
  all_sections = [];
  class_sections = [];
  assessment_patterns = [];

  ngOnInit() {
    this.getassessment_patterns();
    this.getClasses();
  }

  getClasses() {
    this.service.getClasses()
      .subscribe(
        res => { this.classes = res.school_classes.filter(data => data.status === 1), console.log(res) }
      )
  }

  getSections() {
    // this.classEvent.emit(this.classForm.value.selected_class)
    this.service.getSections(this.selected_class)
      .subscribe(
        res => { this.class_sections = res.class_sections, console.log(res) }
      )
  }

  getassessment_patterns() {
    // this.sectionEvent.emit(this.classForm.value.selected_section);
    this.service.getassessment_patterns()
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
