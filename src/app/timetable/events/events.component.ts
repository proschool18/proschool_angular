import { Component, OnInit } from '@angular/core';
import { TimetableService } from '../../_services/timetable.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { EventlistsComponent } from '../../_alert/events/events.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  constructor(private service: TimetableService, private fb: FormBuilder, public dialog: MatDialog) { }
        
  user: User;
  Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  selected_event;

  currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
  selectedMonth = this.currentMonth;
  selectedYear = this.currentYear;
  private monthNumber;
  private month = this.Months[this.currentMonth];
  private year = this.currentDate.getFullYear();
  private date = this.currentDate.getDate();
  days: Number = new Date(this.year, this.selectedMonth + 1, 0).getDate();
  dummy_days = new Date(this.year, this.selectedMonth, 1).getDay();
  i;j;
  getdate;
  daylist = [];
  chunked_data = [];
  dayslist = [];
  events = [];

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.getMonth_days();
    console.log(this.date)
  }

  eventForm: FormGroup = this.fb.group({
    event_title: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    description: ['', Validators.required],
  });

  alert_message: string;
  event: string;

  getMonth_days() {
    this.daylist = [];
     for(this.i = 1; this.i <= this.days; this.i++) {
     this.daylist.push(this.i)
    }
    for(this.j = 0; this.j < this.dummy_days; this.j++) {
      this.daylist.unshift('')
    }
    console.log('Days: ' + this.daylist)
    this.chunk(this.daylist, 7)
  }

  
  chunk(array, size) {
    this.dayslist = [];
    for (let i = 0; i < array.length; i += size) {
      this.chunked_data = array.slice(i, i+size);
      this.dayslist.push(this.chunked_data);
    }
    console.log(this.dayslist)
  }

  getEvents(day) {
    this.monthNumber = this.currentDate.getMonth() + 1 ;
    if(this.monthNumber < 10) {
      this.monthNumber = '0' + this.monthNumber;
    }
    if(day < 10) {
      day = '0' + day;
    }
    this.getdate = this.year + '-' + this.monthNumber + '-' + day;
    this.service.getEvents(this.getdate)
    .subscribe(
      res => { this.events = res.school_events }
    )
  }

  getPrevious() {
    if(this.currentMonth == 0) {
      this.currentMonth = 11
      this.month = this.Months[this.currentMonth];
      this.year = this.year - 1
    } else {
      this.currentMonth = this.currentMonth - 1;
      this.month = this.Months[this.currentMonth];
    }
    this.selectedMonth = this.currentMonth;
    this.selectedYear = this.year;
    this.days = new Date(this.year, this.selectedMonth + 1, 0).getDate();
    this.dummy_days = new Date(this.year, this.selectedMonth, 1).getDay();
    this.getMonth_days();
  }

  getNext() {
    if(this.currentMonth == 11) {
      this.currentMonth = 0
      this.month = this.Months[this.currentMonth];
      this.year = this.year + 1
    } else {
      this.currentMonth = this.currentMonth + 1;
      this.month = this.Months[this.currentMonth];
    }
    this.selectedMonth = this.currentMonth;
    this.selectedYear = this.year;
    this.days = new Date(this.year, this.selectedMonth + 1, 0).getDate();
    this.dummy_days = new Date(this.year, this.selectedMonth, 1).getDay();
    console.log(this.dummy_days)
    this.getMonth_days();
  }

  addEvent() {
    this.opendialog('', 'add');
  }

  editEvent(event_id) {
    this.selected_event = this.events.filter(data => data.event_id === event_id)
    this.opendialog(this.selected_event, 'edit');
  }

  opendialog(selected_event, dialog_type) {
    const eventConfig = new MatDialogConfig();

    eventConfig.autoFocus = true;
    eventConfig.width = '60%';

    eventConfig.data = {
      selected_event: selected_event,
      dialog_type: dialog_type,
    };

    const eventRef = this.dialog.open(EventlistsComponent, eventConfig);

    eventRef.afterClosed().subscribe()
  }

  openAlert(alert_message) {
    const alertConfig = new MatDialogConfig();

    alertConfig.autoFocus = true;
    alertConfig.width = '40%';

    alertConfig.data = {
      message: alert_message,
    };

    const alertRef = this.dialog.open(AlertComponent, alertConfig);

    alertRef.afterClosed().subscribe()
  }

}
