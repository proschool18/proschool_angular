import { Component, OnInit, Input } from '@angular/core';
import { HeaderService } from '../../_services/header.service';
import { AuthenticationServiceService } from '../../_services/authentication-service.service';
import { MessageService } from '../../_services/message.service';
import { ServicesService } from '../../services.service';
import { EmployeesService } from '../../_services/employees.service';
import { User } from '../../_models/user';
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { appConfig } from '../../app.config';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	constructor(private service: HeaderService, private authenticationservice: AuthenticationServiceService, private messageservice: MessageService, private employeeservice: EmployeesService, private serviceService: ServicesService, private router: Router) { }

	today = new Date();
	time;
	weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	viewNotifications: boolean = false;
	viewMailBox: boolean = false;

	currentModuleTitle: string = "Dashboard";
	user: User;
	heading;
	sent_to;
	notifications = [];
	unread_notifications;
	messages = [];
	unread_messages;
	profileName;

	school_details: any = {};
	employee_details: any = {};
	profile_name;

	ngOnInit() {
		this.formatAMPM();
		this.user = JSON.parse(localStorage.getItem('currentUser'));
		if (this.user.role === 'admin') {
			this.getAdminNotifications();
			this.sent_to = 'admin';
			this.getInbox();
			this.getSchools();
		} else if (this.user.role === 'teacher') {
			this.sent_to = this.user.employee_id;
			this.getNotifications();
			this.getInbox();
			this.getEmployeeDetails();
		}
		this.getRealTimeNotifications();
		this.getRealTimeMessages();
		this.getAllEmployeeMessages();
		this.getAllTeacherMessages();

	}

	formatAMPM() {
		var date = new Date();
		var hours = date.getHours();
		var minutes:any = date.getMinutes();
		var seconds:any = date.getSeconds();
		var ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = seconds < 10 ? '0' + seconds : seconds;
		var strTime:any = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
		this.time =  strTime;
	}

	getAdminNotifications() {
		this.service.getAdminNotifications()
			.subscribe(data => {
				this.notifications = data.notifications, this.unread_notifications = data.unread, console.log(data)
			})
	}

	getNotifications() {
		this.service.getNotifications()
			.subscribe(data => {
				this.notifications = data.notifications, this.unread_notifications = data.unread, console.log(data)
			})
	}

	getRealTimeNotifications() {
		this.service.getRealTimeNotifications()
			.subscribe(data => {
				this.notifications.push(data), this.unread_notifications++, console.log(data)
			})
	}

	openNotification(i) {
		if (this.notifications[i].notification_status === 'unread') {
			this.service.notificationStatus(this.notifications[i].notification_id)
				.subscribe(data => {
					if (data === true) {
						this.unread_notifications--;
						console.log(this.unread_notifications)
					}
				})
		}
	}

	getInbox() {
		this.messageservice.getInbox(this.sent_to)
			.subscribe(
				res => { this.messages = res.messages, this.unread_messages = res.unread, console.log(res) }
			)
	}

	getRealTimeMessages() {
		this.service.getRealTimeMessages()
			.subscribe(data => {
				this.messages.push(data), this.unread_messages++, console.log(data)
			})
	}

	getAllEmployeeMessages() {
		this.service.getAllEmployeeMessages()
			.subscribe(data => {
				this.messages.push(data), this.unread_messages++, console.log(data)
			})
	}

	getAllTeacherMessages() {
		this.service.getAllTeacherMessages()
			.subscribe(data => {
				this.messages.push(data), this.unread_messages++, console.log(data)
			})
	}

	getSchools() {
		this.serviceService.getSchools()
			.subscribe(
				res => { this.school_details = res.schools[0], this.profile_name = this.school_details.name, console.log(this.profile_name) }
			)
	}

	// getSchoolImage() {
	// 	this.profileImage = this.url + '/image/' + this.schoolprofile.SchoolImage[0].filename;
	// }

	// getSchoolLogo() {
	// 	this.schoolLogo = this.url + '/image/' + this.schoolprofile.SchoolLogo[0].filename;
	// }


	getEmployeeDetails() {
		this.employeeservice.getEmployeeDetails(this.user.employee_id)
			.subscribe(
				res => { this.employee_details = res.employee[0], this.profile_name = this.employee_details.first_name + ' ' + this.employee_details.last_name, console.log(this.profile_name) }
			)
	}

	logout() {
		this.authenticationservice.logout();
	}

	selectActiveModule() {
		if (this.router.url == "/main/main/dashboard/dashboard") {
			this.currentModuleTitle = "Dashboard";
		}

		if (this.router.url == "/main/main/students/information") {
			this.currentModuleTitle = "Students";
		}

		if (this.router.url == "/main/main/employees/information") {
			this.currentModuleTitle = "Employees";
		}

		if (this.router.url == "/main/main/admin/profile") {
			this.currentModuleTitle = "School Profile";
		}

		if (this.router.url == "/main/main/admin/messages") {
			this.currentModuleTitle = "Messenger";
		}

		if (this.router.url == "/main/main/admin/parentinfo") {
			this.currentModuleTitle = "Users Login Info";
		}

		if (this.router.url == "/main/main/admin/pendingTasks") {
			this.currentModuleTitle = "Task Management";
		}

		if (this.router.url == "/main/main/admin/materials") {
			this.currentModuleTitle = "Stock Management";
		}

		if (this.router.url == "/main/main/admin/payments") {
			this.currentModuleTitle = "Payments";
		}

		if (this.router.url == "/main/main/admin/expenses") {
			this.currentModuleTitle = "Expenses";
		}

		if (this.router.url == "/main/main/attendance/studentattendance") {
			this.currentModuleTitle = "Student Attendance";
		}

		if (this.router.url == "/main/main/attendance/employeeattendance") {
			this.currentModuleTitle = "Employee Attendance";
		}

		if (this.router.url == "/main/main/attendance/reports" || this.router.url == "/main/main/attendance/empreports") {
			this.currentModuleTitle = "Attendance Reports";
		}

		if (this.router.url == "/main/main/academics/subjects") {
			this.currentModuleTitle = "Subjects";
		}

		if (this.router.url == "/main/main/academics/chapters") {
			this.currentModuleTitle = "Chapters";
		}

		if (this.router.url == "/main/main/academics/topics") {
			this.currentModuleTitle = "Topics";
		}

		if (this.router.url == "/main/main/academics/assignsubjects") {
			this.currentModuleTitle = "Assigned Teachers";
		}

		if (this.router.url == "/main/main/academics/planner") {
			this.currentModuleTitle = "Academic Planner";
		}

		if (this.router.url == "/main/main/assignments/assignmentsByDate") {
			this.currentModuleTitle = "Assignments";
		}

		if (this.router.url == "/main/main/classtests/CTByDate") {
			this.currentModuleTitle = "Class Tests";
		}

		if (this.router.url == "/main/main/projectworks/PWByDate") {
			this.currentModuleTitle = "Project Works";
		}

		if (this.router.url == "/main/main/reports/assignmentreports") {
			this.currentModuleTitle = "Assessments Report";
		}

		if (this.router.url == "/main/main/examinations/schedules") {
			this.currentModuleTitle = "Examination";
		}

		if (this.router.url == "/main/main/examinations/listPapers") {
			this.currentModuleTitle = "Examination Schedules";
		}

		if (this.router.url == "/main/main/examinations/addMarks") {
			this.currentModuleTitle = "Examination Evaluations";
		}

		if (this.router.url == "/main/main/reports/evaluationreports") {
			this.currentModuleTitle = "Evaluation Reports";
		}

		if (this.router.url == "/main/main/timetable/classwise") {
			this.currentModuleTitle = "Timetable";
		}

		if (this.router.url == "/main/main/timetable/events") {
			this.currentModuleTitle = "School Events";
		}

		if (this.router.url == "/main/main/timetable/noticeboard") {
			this.currentModuleTitle = "Notice Board";
		}

		if (this.router.url == "/main/main/fee/studentfee") {
			this.currentModuleTitle = "Student Fees";
		}

		if (this.router.url == "/main/main/fee/feetype") {
			this.currentModuleTitle = "Fee Types";
		}

		if (this.router.url == "/main/main/fee/classfee") {
			this.currentModuleTitle = "Class Fees";
		}

		if (this.router.url == "/main/main/fee/feestructure") {
			this.currentModuleTitle = "Fee Structure";
		}

		if (this.router.url == "/main/transportation/stations" || this.router.url == "/main/transportation/vehicles" ||
			this.router.url == "/main/transportation/routes" || this.router.url == "/main/transportation/addroute" ||
			this.router.url == "/main/transportation/navigation") {
			this.currentModuleTitle = "Transport";
		}

		return this.currentModuleTitle;
	}

}
