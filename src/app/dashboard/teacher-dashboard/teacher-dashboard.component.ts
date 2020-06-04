import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../_services/dashboard.service';
import { ClasessService } from '../../_services/clasess.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AttendanceComponent } from '../attendance/attendance.component';
import { AcademicsComponent } from '../academics/academics.component';
import { FeesComponent } from '../fees/fees.component';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {

  constructor(private service: DashboardService, private classService: ClasessService, public dialog: MatDialog) { }

  
  private currentDate;
  private day;
  private date;
  private month;
  private monthName;
  private year;
  private time;
  private current_date

  private tasks_tab = true;
  private events_tab = false;
  private notice_tab = false;
  private feedback_back = false;

  private tab_view = [];
  private tasks = [];
  private events = [];
  private noticeboard = [];
  private feedbacks = [];

  private classes = [];
  private sections = [];
  private selected_class;
  private selected_section;

  private studentAttendance = {};
  private employeeAttendance = {};

  private payments = {};
  private expenses = {};
  private fees = {
    "totalFees": '',
    "paidFees": '',
    "balanceFees": '',
  };

  private class_schedule = [];
  private section_schedule = [];

  view: any[] = [450, 180];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel: any;
  showYAxisLabel = true;
  yAxisLabel: 'Fees Amount';
  timeline = true;
  colorScheme = {
    domain: ['#5cb85c', '#d9534f', '#f0ad4e']
  };
  showLabels = true;
  public single: any;

  private months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  ngOnInit() {
    this.today_date();
    this.getTasks();
    this.getStudentAttendance();
    this.getEmployeeAttedance();
    this.getPayments();
    this.getExpenses();
    this.viewFees();
    this.getClasses();
  }

  today_date() {
    this.currentDate = new Date();
    this.date = this.currentDate.getDate();
    this.day = this.currentDate.getDay();
    this.month = this.currentDate.getMonth() + 1;
    this.monthName = this.months[this.month - 1];
    this.year = this.currentDate.getFullYear();
    if (this.month < 10) {
      this.month = '0' + this.month;
    }
    this.current_date = this.year + '-' + this.month + '-' + this.date;
    console.log(this.current_date)
  }

  // checkTime(i) {
  //   if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
  //   return i;
  // }

  // getTime() {
  //   var today = new Date();
  //   var h = today.getHours();
  //   var m = today.getMinutes();
  //   var s = today.getSeconds();
  //   m = this.checkTime(m);
  //   s = this.checkTime(s);
  //   this.time = h + ":" + m + ":" + s;
  //   var t = setTimeout(this.getTime, 500);
  // }

  select_tab(select) {
    if (select == 'tasks_tab') {
      this.getTasks();
      this.tasks_tab = true;
      this.events_tab = false;
      this.notice_tab = false;
      this.feedback_back = false;
    } else if (select == 'events_tab') {
      this.getEvents();
      this.tasks_tab = false;
      this.events_tab = true;
      this.notice_tab = false;
      this.feedback_back = false;
    } else if (select == 'notice_tab') {
      this.getNoticeBoard();
      this.tasks_tab = false;
      this.events_tab = false;
      this.notice_tab = true;
      this.feedback_back = false;
    } else if (select == 'feedback_back') {
      this.getTasks();
      this.tasks_tab = false;
      this.events_tab = false;
      this.notice_tab = false;
      this.feedback_back = true;
    }
  }

  getTasks() {
    this.service.getTasks(this.current_date)
      .subscribe(
        res => { this.tasks = res.tasks }
      )
  }

  getEvents() {
    this.service.getEvents(this.current_date)
      .subscribe(
        res => { this.events = res.school_events }
      )
  }

  getNoticeBoard() {
    this.service.getNoticeBoard(this.current_date)
      .subscribe(
        res => { this.noticeboard = res.noticeboard }
      )
  }

  getStudentAttendance() {
    this.service.getStudentAttendance(this.current_date)
      .subscribe(
        res => { this.studentAttendance = res.school_attendance }
      )
  }

  getEmployeeAttedance() {
    this.service.getEmployeeAttedance(this.current_date)
      .subscribe(
        res => { this.employeeAttendance = res.Employee_attendance }
      )
  }

  getPayments() {
    this.service.getPayments(this.current_date)
      .subscribe(
        res => { this.payments = res }
      )
  }

  getExpenses() {
    this.service.getExpenses(this.current_date)
      .subscribe(
        res => { this.expenses = res }
      )
  }

  getFeeCollection() {
    this.service.getFeeCollection()
      .subscribe(
        res => { this.fees = res, console.log(this.fees) } 
      )
  }

  getClasses() {
    this.classService.getClasses()
      .subscribe(
        res => { this.classes = res.school_classes, console.log(res)}
      )
  }

  getSections() {
    this.classService.getSections(this.selected_class)
      .subscribe(
        res => { this.sections = res.class_sections, console.log(res)}
      )
  }

  getSchedules() {
    this.service.getSchedules(this.day, this.current_date, this.selected_class)
      .subscribe(
        res => { this.class_schedule = res.timetable, console.log(res) }
      )
  }

  getSectionSchedule() {
    this.section_schedule = this.class_schedule.filter(data => data.section_id === this.selected_section)
  }

  viewFees() {
    this.getFeeCollection();
    console.log(this.fees)
    this.showXAxisLabel = false;
    // xAxisLabel = 'Fees Amount';  
    this.showYAxisLabel = true;
    this.yAxisLabel = 'Fees Amount';
    this.colorScheme = {
      domain: ['#5cb85c', '#d9534f', '#f0ad4e']
    };

    this.single = [
      { "name": "Total Fees", "value": this.fees.totalFees },
      { "name": "Collected Fees", "value": this.fees.paidFees },
      { "name": "Balance Fees", "value": this.fees.balanceFees }
    ];
  }

  getData(select) {
    this.openData(select)
  }

  openData(data_type) {
    const dataConfig = new MatDialogConfig();

    dataConfig.autoFocus = true;
    dataConfig.width = '80%';

    dataConfig.data = {
      data_type: data_type,
    };

    if(data_type == 'attendance') {
      const dataRef = this.dialog.open(AttendanceComponent, dataConfig);
      dataRef.afterClosed().subscribe()
    } else if(data_type == 'academics') {
      const dataRef = this.dialog.open(AcademicsComponent, dataConfig);
      dataRef.afterClosed().subscribe()
    } else if(data_type == 'fees') {
      const dataRef = this.dialog.open(FeesComponent, dataConfig);
      dataRef.afterClosed().subscribe()
    }    
  }

  //ngx charts  



  // data goes here

  // public multi = [  
  //   { "name": "China",    
  //     "series": [      
  //       { "name": "2018",        
  //         "value": 224      
  //       },      
  //       { "name": "2017",        
  //         "value": 122      
  //       }    
  //     ]  
  //   },  
  //   { "name": "USA",    
  //     "series": [      
  //       { "name": "2018",       
  //         "value": 112      
  //       },      
  //       { "name": "2017",        
  //         "value": 76      
  //       }    
  //     ]  
  //   }, 
  //   {    
  //     "name": "Norway",    
  //     "series": [      
  //       { "name": "2018",        
  //         "value": 29      
  //       },      
  //       { "name": "2017",        
  //         "value": 20      
  //       }    
  //     ]  
  //   }
  // ];

  // barchart graph
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  // public mbarChartLabels: string[] = ['Total Fees', 'Collected Fees', 'Balance Fees',];
  public barChartType: string = 'horizontalBar';
  public barChartLegend: boolean = true;

  public barChartColors: Array<any> = [
    {
      backgroundColor: '#5cb85c',
      borderColor: '#5cb85c',
      pointBackgroundColor: '#5cb85c',
      pointBorderColor: '#5cb85c',
      pointHoverBackgroundColor: '#5cb85c',
      pointHoverBorderColor: '#5cb85c',
    },
    {
      backgroundColor: '#f0ad4e',
      borderColor: '#f0ad4e',
      pointBackgroundColor: '#f0ad4e',
      pointBorderColor: '#f0ad4e',
      pointHoverBackgroundColor: '#f0ad4e',
      pointHoverBorderColor: '#f0ad4e',
    },
    {
      backgroundColor: '#d9534f',
      borderColor: '#d9534f',
      pointBackgroundColor: '#d9534f',
      pointBorderColor: '#d9534f',
      pointHoverBackgroundColor: '#d9534f',
      pointHoverBorderColor: '#d9534f',
    },
  ];
  public barChartData: any[] = [
    { data: [100], label: 'Total Fees' },
    { data: [70], label: 'Collected Fees' },
    { data: [40], label: 'Balance Fees' },
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }



  //barchart

  title = 'Bar Chart Example in Angular 4';

  // ADD CHART OPTIONS. 
  chartOptions = {
    responsive: true    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
  }

  labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  // STATIC DATA FOR THE CHART IN JSON FORMAT.
  chartData = [
    {
      label: '1st Year',
      data: [21, 56, 4, 31, 45, 15, 57, 61, 9, 17, 24, 59]
    },
    {
      label: '2nd Year',
      data: [47, 9, 28, 54, 77, 51, 24]
    }
  ];

  // CHART COLOR.
  colors = [
    { // 1st Year.
      backgroundColor: 'rgba(77,83,96,0.2)'
    },
    { // 2nd Year.
      backgroundColor: 'rgba(30, 169, 224, 0.8)'
    }
  ]

  // CHART CLICK EVENT.
  onChartClick(event) {
    console.log(event);
  }



  //base chart

  chartOptions1 = {
    responsive: true
  };

  chartData1 = [
    { data: [330, 600, 260, 700], label: 'Account A' },
    { data: [120, 455, 100, 340], label: 'Account B' },
    { data: [45, 67, 800, 500], label: 'Account C' }
  ];

  chartLabels = ['January', 'February', 'Mars', 'April'];

  //chart right box2
  public SystemName: string = "MF1";
  firstCopy = false;

  // data
  public lineChartData: Array<number> = [1, 8, 49];

  public labelMFL: Array<any> = [
    {
      data: this.lineChartData,
      label: this.SystemName
    }
  ];
  // labels
  public lineChartLabels: Array<any> = ["2018-01-29 10:00:00", "2018-01-29 10:27:00", "2018-01-29 10:28:00"];

  public lineChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          max: 60,
          min: 0,
        }
      }],
      xAxes: [{


      }],
    },
    plugins: {
      datalabels: {
        display: true,
        align: 'top',
        anchor: 'end',
        //color: "#2756B3",
        color: "#222",

        font: {
          family: 'FontAwesome',
          size: 14
        },

      },
      deferred: false

    },

  };

  _lineChartColors: Array<any> = [{
    backgroundColor: 'red',
    borderColor: 'red',
    pointBackgroundColor: 'red',
    pointBorderColor: 'red',
    pointHoverBackgroundColor: 'red',
    pointHoverBorderColor: 'red'
  }];



  public ChartType = 'bar';

  public chartClicked1(e: any): void {
    console.log(e);
  }
  public chartHovered1(e: any): void {
    console.log(e);
  }

}
