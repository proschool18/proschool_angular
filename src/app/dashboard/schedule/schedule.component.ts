import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor(private service: ServicesService) { }

  ngOnInit() {
    this.getClasses();
  }

  date; day; i;
  schedule = [];
  timetable = [];
  classes = [];
  sections = [];

  getClasses() {
    this.service.getClasses()
      .subscribe(
        res => { this.classes = res.school_classes, this.getSections(), this.getday_schedule(this.classes[0].class_id), console.log(res) }
      )
  }

  getSections() {
    this.service.getSections(this.classes[0].class_id)
      .subscribe(
        res => { this.sections = res.class_sections, console.log(res) }
      )
  }

  selected_class(class_id) {
    this.service.getSections(class_id)
      .subscribe(
        res => { this.sections = res.class_sections, console.log(res) }
      )
  }

  getday_schedule(class_id) {
    this.date = new Date();
    this.day = this.date.getDay();
    this.service.getday_schedule(this.day, this.date, class_id)
      .subscribe(
        res => { this.schedule = res.timetable,
                this.timetable = res.timetable.filter(data => data.section_id === this.sections[0].section_id)
                this.getday_timetable();
                console.log(res) 
            }
      )
  }

  getday_timetable() {
    this.timetable = [];
    for(this.i = 0; this.i < this.sections.length; this.i++) {
      this.timetable.push(this.schedule.filter(data => data.section_id === this.sections[this.i].section_id))
    }    
    console.log(this.timetable)
  }

}
