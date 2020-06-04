import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-academics',
  templateUrl: './academics.component.html',
  styleUrls: ['./academics.component.css']
})
export class AcademicsComponent implements OnInit {

  constructor(private service: ServicesService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    this.getStudentAcademics();
  }

  student_id = this.route.snapshot.paramMap.get('id');
  section_id = this.route.snapshot.paramMap.get('sec_id');
  i;

  allExams:boolean = true;
  alert_message: string;

  academics = [
    {
      exam_title: '',
      subjects: [],
      totalAllMarks: '',
      totalMaxMarks: '',
      percentage: '',
      Grade: '',
      GPA: '',
    },
  ]

  selected_exam;

  subjectMarks = [
    {
      subject_name: '',
      max_marks: '',
      total_marks: '',
      percentage: '',
      grade: '',
      gpa: '',
    }
  ]

  chartData = [{
    label: 'Marks Scored',
    data: [],
    order: 1
  },
  {
    label: 'Marks Scored',
    data: [],
    type: 'line',
    order: 2
  }];
  chartType = 'bar';
  chartLabels = [];
  public chartOptions: any = {
    responsive: true
  };
  public chartLegend: true;

  getStudentAcademics() {
    if (this.student_id == undefined || this.student_id == '') {
      this.alert_message = "Please Select the Student";
      this.openAlert(this.alert_message)
    } else {
      this.service.getStudentAcademics(this.student_id)
        .subscribe(
          res => { this.academics = res.students[0].exam_marks, this.View(), console.log(res) }
        )
    }
  }

  View() {

    this.chartData = [{
      label: 'Marks Scored',
      data: [],
      order: 1
    },
    {
      label: 'Marks Scored',
      data: [],
      type: 'line',
      order: 2
    }
    ];
    this.chartLabels = [];

    for (this.i = 0; this.i < this.academics.length; this.i++) {
      this.chartData[0].data.push(this.academics[this.i].percentage);
      this.chartData[1].data.push(this.academics[this.i].percentage);
      this.chartLabels.push(this.academics[this.i].exam_title)
    }
  }

  getExamAcademics() {

    if (this.selected_exam == "All") {
      this.allExams = true;
      this.View();

    } else {

      this.allExams = false;

      this.chartData = [{
        label: 'Marks Scored',
        data: [],
        order: 1
      },
      {
        label: 'Marks Scored',
        data: [],
        type: 'line',
        order: 2
      }
      ];
      this.chartLabels = [];
      this.subjectMarks = [];

      this.subjectMarks = this.academics.filter(data => data.exam_title === this.selected_exam)[0].subjects;

      for (this.i = 0; this.i < this.subjectMarks.length; this.i++) {
        this.chartData[0].data.push(this.subjectMarks[this.i].percentage);
        this.chartData[1].data.push(this.subjectMarks[this.i].percentage);
        this.chartLabels.push(this.subjectMarks[this.i].subject_name)
      }
    }

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
