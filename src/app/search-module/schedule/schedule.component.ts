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
          this.getassessment_patterns(),
          console.log(res)
        }
      )
  }

  getassessment_patterns() {
    this.service.getassessment_patterns()
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
