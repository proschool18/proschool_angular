import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';

@Component({
  selector: 'app-academics',
  templateUrl: './academics.component.html',
  styleUrls: ['./academics.component.css']
})
export class AcademicsComponent implements OnInit {

  constructor(private service: ServicesService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getClasses();
  }

  classes = [];
  class_sections = [];
  academics = [];
  i; j; bad; average; good; excellent;
  good_percentage;
  avg_percentage;
  bad_percentage;
  excel_percentage;
  alert_message: string;

  chart_object = {
    subject: '',
    data: [],
    percentage: [],
  };

  chartData = [];
  chartType = 'horizontalBar';
  chartLabels = [];
  public chartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public chartLegend: true;

  selected_assessment = 'Assignments';
  className: string;
  sectioName: string;
  selected_section: string;

  getClasses() {
    this.service.getClasses()
      .subscribe(
        res => { this.classes = res.school_classes, this.getSections(this.classes[0].class_id), console.log(res) }
      )
  }

  getSections(class_id) {
    this.className = this.classes.filter( res => res.class_id === class_id)[0].name;
    this.service.getSections(class_id)
      .subscribe(
        res => { this.class_sections = res.class_sections, this.selected_section = this.class_sections[0].section_id, this.getdashboard_academics() }
      )
  }

  getdashboard_academics() {
    console.log(this.selected_section)
    console.log(this.selected_assessment)
    this.sectioName = this.class_sections.filter( res => res.section_id === this.selected_section)[0].name;
    if (this.selected_assessment == 'Assignments') {
      this.service.getdashboard_assignments(this.selected_section)
        .subscribe(
          res => { this.academics = res.students, this.View(), console.log(res) }
        )
    } else if (this.selected_assessment == 'Class Tests') {
      this.service.getdashboard_classtests(this.selected_section)
        .subscribe(
          res => { this.academics = res.students, this.View(), console.log(res) }
        )
    } else if (this.selected_assessment == 'Project Works') {
      this.service.getdashboard_projectworks(this.selected_section)
        .subscribe(
          res => { this.academics = res.students, this.View(), console.log(res) }
        )
    }
  }

  getSelected_section(selected_section) {
    this.selected_section = selected_section;
    this.getdashboard_academics();
  }

  getSelected_assessment(selected_assessment) {
    this.selected_assessment = selected_assessment;
    this.getdashboard_academics();
  }

  // View() {
  //   console.log(this.academics)
  //   this.chartData = [
  //     { data: [], label: 'Excellent' },
  //     { data: [], label: 'Good' },
  //     { data: [], label: 'Average' },
  //     { data: [], label: 'Bad' }
  //   ];
  //   this.chartLabels = [];

  //   for (this.i = 0; this.i < this.academics[0].subjects.length; this.i++) {
  //     this.good = 0;
  //     this.excellent = 0;
  //     this.average = 0;
  //     this.bad = 0;

  //     for (this.j = 0; this.j < this.academics.length; this.j++) {
  //       if (this.academics[this.j].subjects[this.i].grade == "Excellent") {
  //         this.excellent++;
  //       } else if (this.academics[this.j].subjects[this.i].grade == "Good") {
  //         this.good++;
  //       } else if (this.academics[this.j].subjects[this.i].grade == "Average") {
  //         this.average++;
  //       } else if (this.academics[this.j].subjects[this.i].grade == "Bad") {
  //         this.bad++;
  //       }
  //     }

  //     this.chartData[0].data.push(this.excellent);
  //     this.chartData[1].data.push(this.good);
  //     this.chartData[2].data.push(this.average);
  //     this.chartData[3].data.push(this.bad);

  //     this.chartLabels.push(this.academics[0].subjects[this.i].subject_name)
  //   }

  //   console.log(this.chartData);
  //   console.log(this.chartLabels)
  // }

  View() {
    console.log(this.academics)
    this.chartData = [];

    if (this.academics[0].subjects) {
      for (this.i = 0; this.i < this.academics[0].subjects.length; this.i++) {
        this.good = 0;
        this.average = 0;
        this.bad = 0;
        this.excellent = 0;
        this.good_percentage = 0;
        this.avg_percentage = 0;
        this.bad_percentage = 0;
        this.excel_percentage = 0;

        this.chart_object = {
          subject: '',
          data: [],
          percentage: [],
        };

        for (this.j = 0; this.j < this.academics.length; this.j++) {
          if (this.academics[this.j].subjects[this.i].grade == "Excellent") {
            this.excellent++;
          } else if (this.academics[this.j].subjects[this.i].grade == "Good") {
            this.good++;
          } else if (this.academics[this.j].subjects[this.i].grade == "Average") {
            this.average++;
          } else if (this.academics[this.j].subjects[this.i].grade == "Bad") {
            this.bad++;
          }
        }

        this.chart_object.data.push(this.good);
        this.chart_object.data.push(this.excellent);
        this.chart_object.data.push(this.average);
        this.chart_object.data.push(this.bad);
        this.excel_percentage = ((this.excellent / (this.excellent + this.good + this.average + this.bad)) * 100).toFixed(2);
        this.good_percentage = ((this.good / (this.excellent + this.good + this.average + this.bad)) * 100).toFixed(2);
        this.avg_percentage = ((this.average / (this.excellent + this.good + this.average + this.bad)) * 100).toFixed(2);
        this.bad_percentage = ((this.bad / (this.excellent + this.good + this.average + this.bad)) * 100).toFixed(2);
        this.chart_object.percentage.push(this.excel_percentage);
        this.chart_object.percentage.push(this.good_percentage);
        this.chart_object.percentage.push(this.avg_percentage);
        this.chart_object.percentage.push(this.bad_percentage);

        this.chart_object.subject = this.academics[0].subjects[this.i].subject_name;
        console.log(this.chart_object.subject)

        this.chartData.push(this.chart_object)
      }
    } else {
      this.alert_message = "No Assignments for " + this.className + " " + this.sectioName ;
      this.openAlert(this.alert_message)
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
