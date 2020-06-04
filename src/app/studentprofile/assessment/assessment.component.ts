import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {

  constructor(private service: ServicesService, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    this.getStudentAssessments();
  }

  student_id = this.route.snapshot.paramMap.get('id');
  section_id = this.route.snapshot.paramMap.get('sec_id');
  i;

  assessment_type = "Assignments";

  allAssessments: boolean = true;
  alert_message: string;

  assessments: [{
    student_id: '',
    student_name: '',
    subjects: [{
      subject_id: '',
      subject_name: '',
      chapters: [{
        lession_id: '',
        title: '',
        assignments: [{
          assignment_title: '',
          marks: '',
        }],
        totalMarks: '',
        average: '',
        percentage: '',
        totalAssignments: '',
      }],
      subjectMarks: '',
      subjectmaxMarks: '',
      subjectpercentage: '',
      grade: '',
    }];
  }]

  subject_Assessments: [{
    lession_id: '',
    title: '',
    assignments: [{
      assignment_title: '',
      marks: '',
    }],
    totalMarks: '',
    average: '',
    percentage: '',
    totalAssignments: '',
  }];

  selected_subject;
  selected_chapter;

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
  chartType;
  chartLabels = [];
  public chartOptions: any = {
    responsive: true
  };
  public chartLegend: true;

  getStudentAssessments() {
    if (this.student_id == undefined || this.student_id == '') {
      this.alert_message = "lease Select the Student";
      this.openAlert(this.alert_message)
    } else {
      if (this.assessment_type == "Assignments") {
        this.service.getStudentAssignments(this.student_id, this.section_id)
          .subscribe(
            res => { this.assessments = res.students, this.View(), console.log(res) }
          )
      } else if (this.assessment_type == "Classtests") {
        this.service.getStudentClasstests(this.student_id, this.section_id)
          .subscribe(
            res => { this.assessments = res.students, this.View(), console.log(res) }
          )
      } else if (this.assessment_type == "Projectworks") {
        this.service.getStudentProjectworks(this.student_id, this.section_id)
          .subscribe(
            res => { this.assessments = res.students, this.View(), console.log(res) }
          )
      }
    }
  }

  View() {
    this.chartType = 'bar';

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

    for (this.i = 0; this.i < this.assessments[0].subjects.length; this.i++) {
      this.chartData[0].data.push(this.assessments[0].subjects[this.i].subjectpercentage);
      this.chartData[1].data.push(this.assessments[0].subjects[this.i].subjectpercentage);
      this.chartLabels.push(this.assessments[0].subjects[this.i].subject_name)
    }
  }

  getSubjectAssessments() {
    this.chartType = 'horizontalBar';

    if (this.selected_subject == "All") {
      this.allAssessments = true;
      this.View();

    } else {

      this.allAssessments = false;

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

      this.subject_Assessments = this.assessments[0].subjects.filter(data => data.subject_id === this.selected_subject)[0].chapters;

      for (this.i = 0; this.i < this.subject_Assessments.length; this.i++) {
        this.chartData[0].data.push(this.subject_Assessments[this.i].percentage);
        this.chartData[1].data.push(this.subject_Assessments[this.i].percentage);
        this.chartLabels.push(this.subject_Assessments[this.i].title)
      }
    }

  }

  select_assessment(select) {
    this.assessment_type = select;
    this.allAssessments = true;
    this.selected_subject = '';
    this.getStudentAssessments();
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
