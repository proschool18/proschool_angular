import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { User } from '../../_models/user';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private service: ServicesService) { }

  user: User;
  student_id;
  attendance = [];

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.user.role === 'parent') {
      console.log(this.user.users[0].section_id)
      this.student_id = this.user.users[0].student_id;
    }
  }

  getstudentMonthAttendance() {
    this.service.getStudentAttendance(this.select_month, this.student_id)
      .subscribe(
        res => { this.attendance = res, console.log(res) }
      )
  }

  select_month;

  months = [
    {
      month: 'January',
      value: 1,
    },
    {
      month: 'February',
      value: 2,
    },
    {
      month: 'March',
      value: 3,
    },
    {
      month: 'April',
      value: 4,
    },
    {
      month: 'May',
      value: 5,
    },
    {
      month: 'June',
      value: 6,
    },
    {
      month: 'July',
      value: 7,
    },
    {
      month: 'August',
      value: 8,
    },
    {
      month: 'September',
      value: 9,
    },
    {
      month: 'October',
      value: 10,
    },
    {
      month: 'November',
      value: 11,
    },
    {
      month: 'December',
      value: 12,
    },
  ]

}
