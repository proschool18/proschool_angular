import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	user: User;
	currentModuleTitle: string = "Dashboard";

	constructor(private router: Router) {}

    today = new Date();
	weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  ngOnInit() {
	 
  }

	viewNotifications: boolean = false;
	viewMailBox: boolean = false;

	formatAMPM(date) {
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0' + minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
		return strTime;
	}

	selectActiveModule() {
		if (this.router.url == "/main/dashboard/dashboard") {
			this.currentModuleTitle = "Dashboard";
		}
		
		if (this.router.url == "/main/students/information") {
			this.currentModuleTitle = "Students";
		}
		
		if (this.router.url == "/main/employees/information") {
			this.currentModuleTitle = "Employees";
		}
		
		if (this.router.url == "/main/admin/profile" || this.router.url == "/main/admin/messages" ||
		this.router.url == "/main/admin/parentinfo" || this.router.url == "/main/admin/pendingTasks" ||
		this.router.url == "/main/admin/materials" || this.router.url == "/main/admin/payments" ||
		this.router.url == "/main/admin/expenses" && this.user.role === 'admin') {
			this.currentModuleTitle = "Admin";
		}
		
		if (this.router.url == "/main/admin/profile" || this.router.url == "/main/admin/messages" ||
		this.router.url == "/main/admin/parentinfo" || this.router.url == "/main/admin/pendingTasks" ||
		this.router.url == "/main/admin/materials" || this.router.url == "/main/admin/payments" ||
		this.router.url == "/main/admin/expenses" 
		&& (this.user.role === 'teacher' || this.user.role === 'parent')) {
				this.currentModuleTitle = "School";
		}
		
		if (this.router.url == "/main/attendance/studentattendance" || this.router.url == "/main/attendance/employeeattendance" ||
		this.router.url == "/main/attendance/reports" || this.router.url == "/main/attendance/empreports") {
				this.currentModuleTitle = "Attendance";
		}
		
		if (this.router.url == "/main/academics/subjects" || this.router.url == "/main/academics/chapters" ||
		this.router.url == "/main/academics/topics" || this.router.url == "/main/academics/assignsubjects" ||
		this.router.url == "/main/academics/planner") {
				this.currentModuleTitle = "Academics";
		}
		
		if (this.router.url == "/main/assignments/assignmentsByDate" || this.router.url == "/main/classtests/CTByDate" ||
		this.router.url == "/main/projectworks/PWByDate" || this.router.url == "/main/reports/assignmentreports") {
			this.currentModuleTitle = "Assessments";
		}
		
		if (this.router.url == "/main/examinations/schedules" || this.router.url == "/main/examinations/listPapers" ||
		this.router.url == "/main/evaluations/marksList" || this.router.url == "/main/reports/evaluationreports") {
				this.currentModuleTitle = "Examinations";
		} 
		
		if (this.router.url == "/main/timetable/classwise" || this.router.url == "/main/timetable/events" ||
		this.router.url == "/main/timetable/noticeboard") {
			this.currentModuleTitle = "Timetable";
		}
		
		if (this.router.url == "/main/fee/collectfee" || this.router.url == "/main/fee/feeterm" ||
		this.router.url == "/main/fee/feetype" || this.router.url == "/main/fee/feemaster" ||
		this.router.url == "/main/fee/studentfee") {
			this.currentModuleTitle = "Fee";
		}
		
		if (this.router.url == "/main/transportation/stations" || this.router.url == "/main/transportation/vehicles" ||
		this.router.url == "/main/transportation/routes" || this.router.url == "/main/transportation/addroute" ||
		this.router.url == "/main/transportation/navigation") {
			this.currentModuleTitle = "Transport";
		}
				
		return this.currentModuleTitle;
	}

	// showCurrentModuleName() {
	// 	switch (this.currentModule) {
	// 		case "dashboard":
	// 			this.currentModuleTitle = "Dashboard";
	// 			break;

	// 		case "employees":
	// 			this.currentModuleTitle = "Employees";
	// 			break;

	// 		case "admin":
	// 			this.currentModuleTitle = "Admin";
	// 			break;

	// 		case "students":
	// 			this.currentModuleTitle = "Students";
	// 			break;

	// 		case "attendance":
	// 			this.currentModuleTitle = "Attendance";
	// 			break;

	// 		case "academics":
	// 			this.currentModuleTitle = "Academics";
	// 			break;

	// 		case "assignments":
	// 			this.currentModuleTitle = "Assessments";
	// 			break;
			
	// 		default:
	// 			// code...
	// 			break;
	// 	}
	// }

}