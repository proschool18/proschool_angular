import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../_models/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router) { }

  user: User;
  menu = [];
  menu_click = false;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if(this.user.role === 'admin') {
      this.menu = this.adminMenu;
    } else if(this.user.role === 'teacher') {
      this.menu = this.teacherMenu;
    }
    console.log(this.menu)
  }

  get_click() {
    this.menu_click == true;
    this.router.navigate(['/main/dashboard']);
    console.log(this.menu_click)
  }

  adminMenu = [
    {
      title: 'Dashboard',
      imageSrc: 'grid-white.svg',
      click: false,
      imageSrcOnClick: 'grid-blue.svg',
      link: '/main/dashboard',
      submenu: [],
    },
    {
      title: 'Admin',
      imageSrc: 'assets/images/administrator.png',
      submenu: [
        {
          sub_title: 'School Profile',
          link: '/main/admin/profile',
        },
        {
          sub_title: 'Settings',
          link: '/main/admin/addclass',
        },
        {
          sub_title: 'Users',
          link: '/main/admin/parentinfo',
        },
        {
          sub_title: 'Task Management',
          link: '/main/admin/tasks/pending',
        },
        {
          sub_title: 'Store Management',
          link: '/main/admin/materials',
        },
        {
          sub_title: 'Payments',
          link: '/main/admin/payments',
        },
        {
          sub_title: 'Expenses',
          link: '/main/admin/expenses',
        }
      ],
    },
    {
      title: 'Students',
      imageSrc: 'student-white.svg',
      click: false,
      imageSrcOnClick: 'student-blue.svg',
      link: '/main/students/information',
      submenu: [],
    },
    {
      title: 'Employees',
      imageSrc: 'whiteboard-white.svg',
      click: false,
      imageSrcOnClick: 'whiteboard-blue.svg',
      link: "/main/employees/information",
      submenu: [],
    },
    {
      title: 'Attendance',
      imageSrc: 'calendar-white.svg',
      click: false,
      imageSrcOnClick: 'calendar-blue.svg',
      link: "",
      submenu: [
        {
          sub_title: 'Student',
          link: '/main/attendance/studentattendance',
        },
        {
          sub_title: 'Employee',
          link: '/main/attendance/employeeattendance',
        },
        {
          sub_title: 'Student Reports',
          link: '/main/attendance/reports',
        },
        {
          sub_title: 'Attendance Reports',
          link: '/main/attendance/empreports',
        }
      ],
    },
    {
      title: 'Academics',
      imageSrc: 'assets/images/Academics.png',
      submenu: [
        {
          sub_title: 'Subjects',
          link: '/main/academics/subjects',
        },
        {
          sub_title: 'Chapters',
          link: '/main/academics/chapters',
        },
        {
          sub_title: 'Topics',
          link: '/main/academics/topics',
        },
        {
          sub_title: 'Assign Subjects',
          link: '/main/academics/assignsubjects',
        },
        {
          sub_title: 'Lesson Planner',
          link: '/main/academics/planner',
        },
        {
          sub_title: 'Lesson Tracker',
          link: '/main/academics/tracker',
        },
      ],
    },
    {
      title: 'Assignments',
      imageSrc: 'assets/images/Assignments.png',
      submenu: [
        {
          sub_title: 'Assignments',
          link: '/main/assignments',
        },
        {
          sub_title: 'Class Tests',
          link: '/main/classtests',
        },
        {
          sub_title: 'Project Works',
          link: '/main/projectworks',
        },
        {
          sub_title: 'Reports',
          link: '/main/reports/assignmentreports',
        }
      ],
    },
    {
      title: 'Examinations',
      imageSrc: 'assets/images/Examination.png',
      submenu: [
        {
          sub_title: 'Schedules',
          link: '/main/examinations',
        },
        {
          sub_title: 'Papers',
          link: '/main/examinations/listPapers',
        },
        {
          sub_title: 'Evaluations',
          link: '/main/evaluations',
        },
        {
          sub_title: 'Reports',
          link: '/main/reports/evaluationreports',
        }
      ],
    },
    {
      title: 'Timetable',
      imageSrc: 'assets/images/Timetable.png',
      submenu: [
        {
          sub_title: 'Class-wise',
          link: '/main/timetable/classwise',
        },
        {
          sub_title: 'Events',
          link: '/main/timetable/events',
        },
        {
          sub_title: 'Notice Board',
          link: '/main/timetable/noticeboard',
        }
      ],
    },
    {
      title: 'Fee',
      imageSrc: 'assets/images/money.png',
      submenu: [
        {
          sub_title: 'Collect Fee',
          link: '/main/fee/collectfee',
        },
        {
          sub_title: 'Parameters',
          link: '/main/fee/feeterm',
        },
        {
          sub_title: 'Reports',
          link: '/main/reports/studentfee',
        }
      ],
    },
    {
      title: 'Transport',
      imageSrc: 'assets/images/Transport.png',
      submenu: [
        {
          sub_title: 'Stations',
          link: '/main/transportation/stations',
        },
        {
          sub_title: 'Vehicles',
          link: '/main/transportation/vehicles',
        },
        {
          sub_title: 'Bus Route',
          link: '/main/transportation/routes',
        },
        {
          sub_title: 'Route Geolocation',
          link: '/main/transportation/navigation',
        },
      ],
    },
  ];

  teacherMenu = [
    {
      title: 'Dashboard',
      imageSrc: 'assets/images/analytics.png',
      submenu: [],
    },
    {
      title: 'Admin',
      imageSrc: 'assets/images/administrator.png',
      submenu: [
        {
          sub_title: 'School Profile',
          link: '/main/admin/profile',
        },
        {
          sub_title: 'Settings',
          link: '/main/admin/addclass',
        },
        {
          sub_title: 'Users',
          link: '/main/admin/parentinfo',
        },
        {
          sub_title: 'Task Management',
          link: '/main/admin/tasks/pending',
        },
        {
          sub_title: 'Store Management',
          link: '/main/admin/materials',
        },
        {
          sub_title: 'Payments',
          link: '/main/admin/payments',
        },
        {
          sub_title: 'Expenses',
          link: '/main/admin/expenses',
        }
      ],
    },
    {
      title: 'Students',
      imageSrc: 'assets/images/staff.png',
      submenu: [
        {
          sub_title: 'Information',
          link: '/main/students/information',
        },
        {
          sub_title: 'Admission',
          link: '/main/students/admission',
        }
      ],
    },
    {
      title: 'Employees',
      imageSrc: 'assets/images/student.png',
      submenu: [
        {
          sub_title: 'Information',
          link: '/main/employees/information',
        },
        {
          sub_title: 'Admission',
          link: '/main/employees/admission',
        }
      ],
    },
    {
      title: 'Attendance',
      imageSrc: 'assets/images/Attendance.png',
      submenu: [
        {
          sub_title: 'Information',
          link: '/main/attendance/studentattendance',
        },
        {
          sub_title: 'Admission',
          link: '/main/attendance/employeeattendance',
        },
        {
          sub_title: 'Information',
          link: '/main/attendance/reports',
        },
        {
          sub_title: 'Admission',
          link: '/main/attendance/empreports',
        }
      ],
    },
    {
      title: 'Academics',
      imageSrc: 'assets/images/Academics.png',
      submenu: [
        {
          sub_title: 'Subjects',
          link: '/main/academics/subjects',
        },
        {
          sub_title: 'Chapters',
          link: '/main/academics/chapters',
        },
        {
          sub_title: 'Topics',
          link: '/main/academics/topics',
        },
        {
          sub_title: 'Assign Subjects',
          link: '/main/academics/assignsubjects',
        },
        {
          sub_title: 'Lesson Planner',
          link: '/main/academics/planner',
        },
        {
          sub_title: 'Lesson Tracker',
          link: '/main/academics/tracker',
        },
      ],
    },
    {
      title: 'Assignments',
      imageSrc: 'assets/images/Assignments.png',
      submenu: [
        {
          sub_title: 'Assignments',
          link: '/main/assignments',
        },
        {
          sub_title: 'Class Tests',
          link: '/main/classtests',
        },
        {
          sub_title: 'Project Works',
          link: '/main/projectworks',
        },
        {
          sub_title: 'Reports',
          link: '/main/reports/assignmentreports',
        }
      ],
    },
    {
      title: 'Examinations',
      imageSrc: 'assets/images/Examination.png',
      submenu: [
        {
          sub_title: 'Schedules',
          link: '/main/examinations',
        },
        {
          sub_title: 'Papers',
          link: '/main/examinations/listPapers',
        },
        {
          sub_title: 'Evaluations',
          link: '/main/evaluations',
        },
        {
          sub_title: 'Reports',
          link: '/main/reports/evaluationreports',
        }
      ],
    },
    {
      title: 'Timetable',
      imageSrc: 'assets/images/Timetable.png',
      submenu: [
        {
          sub_title: 'Class-wise',
          link: '/main/timetable/classwise',
        },
        {
          sub_title: 'Events',
          link: '/main/timetable/events',
        },
        {
          sub_title: 'Notice Board',
          link: '/main/timetable/noticeboard',
        }
      ],
    },
    {
      title: 'Fee',
      imageSrc: 'assets/images/money.png',
      submenu: [
        {
          sub_title: 'Collect Fee',
          link: '/main/fee/collectfee',
        },
        {
          sub_title: 'Parameters',
          link: '/main/fee/feeterm',
        },
        {
          sub_title: 'Reports',
          link: '/main/reports/studentfee',
        }
      ],
    },
    {
      title: 'Transport',
      imageSrc: 'assets/images/Transport.png',
      submenu: [
        {
          sub_title: 'Stations',
          link: '/main/transportation/stations',
        },
        {
          sub_title: 'Vehicles',
          link: '/main/transportation/vehicles',
        },
        {
          sub_title: 'Bus Route',
          link: '/main/transportation/routes',
        },
        {
          sub_title: 'Route Geolocation',
          link: '/main/transportation/navigation',
        },
      ],
    },
  ]

}
