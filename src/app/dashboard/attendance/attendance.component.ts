import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  constructor(private service: ServicesService) { }

  ngOnInit() {
    this.getday_attendance();
  }

  all_attendance = [];
  day_attendance = [{
    sections: [

    ]
  }];
  selected_class;
  date; i;

  chartData = [];
  chartType = 'bar';
  chartLabels = [];
  public chartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public chartLegend: true;

  getday_attendance() {
    this.date = new Date();
    this.service.getday_attendance(this.date)
      .subscribe(
        res => { this.all_attendance = res.students, 
                 this.getDay_attendance(res.students[0])
                 // this.day_attendance = res.students.filter(res => res[0].classId === "SCH-1-CL-1")[0],
                console.log(res) 
            }
      )
  }

  getDay_attendance(class_id) {
    console.log(class_id)
    console.log(this.date)
    this.day_attendance = this.all_attendance.filter(res => res[0].classId === class_id)[0]
    console.log(this.day_attendance[0].sections)
  }

}
