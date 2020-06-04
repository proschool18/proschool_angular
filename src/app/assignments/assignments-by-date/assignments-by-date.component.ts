import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../../_services/assignments.service';
import { AcademicsService } from '../../_services/academics.service';
import { TeacherService } from '../../_services/teacher.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { AssignAssignmentsComponent } from '../assign-assignments/assign-assignments.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-assignments-by-date',
  templateUrl: './assignments-by-date.component.html',
  styleUrls: ['./assignments-by-date.component.css']
})
export class AssignmentsByDateComponent implements OnInit {

  constructor(private service: AssignmentsService, private academicsservice: AcademicsService,
  private teacherService: TeacherService, public dialog: MatDialog) { }

  user: User;
  employee_id;

  ngOnInit() { 
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if (this.user.role === 'parent') {
      console.log(this.user.users[0].section_id)
      this.selected_section = this.user.users[0].section_id;
      this.getAssignments_byDate();
    } else if(this.user.role === 'teacher') {
      this.employee_id = this.user.employee_id;
    }
  }

  assignments = [
    {
      name: '',
      subject_id: '',
      assignments: [
        {
          assignment_id: '',
          assignment_title: '',
          subject_id: '',
          lession_id: '',
          chapter_name: '',
          assign_date: '',
          due_date: '',
          maxMarks: '',
          description: '',
        }
      ]
    }
  ];

  SectionAssignments = [];
  section_assignments = true;
  subjects = [];

  selected_class:string;
  selected_section:string;
  selected_date;
  selected_assignment;
  dialog_type: string;
  alert_message: string;
  i;

  receiveClass($event) {
    this.selected_class = $event
    console.log(this.selected_class)
  }

  receiveSection($event) {
    this.selected_section = $event
    console.log(this.selected_section)
    // this.getSubjects();
    this.getAssignmentsBySection()
  }

  getAssignmentsBySection() {
    this.section_assignments = true;
    console.log(this.selected_section)
    if(this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message)
    } else {
      this.service.getAssignmentsBySection(this.selected_section)
      .subscribe(
        res => { this.assignments = res, console.log(this.assignments) }
      )
    }
  }

  getAssignments_byDate() {
    this.section_assignments = false;
    console.log(this.selected_date);
    if(this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class and Section";
      this.openAlert(this.alert_message)
    } else {
      this.service.getAssignments_byDate(this.selected_date, this.selected_section)
      .subscribe(
        res => { this.assignments = res, console.log(this.assignments) }
      )
    }
  }

  // getSubjects() {
  //   if(this.user.role === 'admin' || this.user.role === 'parent') {
  //     this.academicsservice.getSubjects(this.selected_section)
  //     .subscribe(
  //       res => { this.subjects = res.subjects, console.log(res) }
  //     )
  //   } else if(this.user.role === 'teacher') {
  //     this.teacherService.getTeacherSubjects(this.employee_id, this.selected_section)
  //     .subscribe(
  //       res => { this.subjects = res.subjects, console.log(res) }
  //     )
  //   }
  // }

  deleteAssignment(assignment_id, i) {
    this.service.deleteAssignment(assignment_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.getAssignmentsBySection();
            this.alert_message = "Assignment Deleted Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Assignment Not Deleted";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  addAssignment() {
    if(this.selected_section == undefined || this.selected_section == '') {
      this.alert_message = "Please Select Class, Section and Subject";
      this.openAlert(this.alert_message)
    } else {
      this.selected_assignment = {
        subjectName: '',
        assignments: [
          {
            assignment_id: '',
            assignment_title: '',
            subject_id: '',
            lession_id: '',
            assign_date: '',
            due_date: '',
            maxMarks: '',
            description: '',
          }
        ]
      };
      this.dialog_type = 'add';
      this.openDialog(this.selected_assignment, this.dialog_type)
    }    
  }

  editAssignment(i, j) {
    this.selected_assignment = this.assignments[i].assignments[j];
    // this.i = i;
    this.dialog_type = 'edit';
    this.openDialog(this.selected_assignment, this.dialog_type)
  }

  openDialog(selected_assignment, dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      class: this.selected_class,
      section: this.selected_section,
      assignment: selected_assignment,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(AssignAssignmentsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => {
          console.log("Dialog output:", data)          
          if (this.dialog_type == 'add') {
            this.getAssignmentsBySection();
            // if(data.assign_date == this.selected_date) {
            //   this.assignments.push(data);
            // }            
          } else if (this.dialog_type == 'edit') {
            this.getAssignmentsBySection();
            // this.assignments[this.i].assignments.filter(res => res.assignment_id == data.assignment_id)[0].assignment_title = data.assignment_title;
            // this.assignments[this.i].assignments.filter(res => res.assignment_id == data.assignment_id)[0].due_date = data.due_date;
            // this.assignments[this.i].assignments.filter(res => res.assignment_id == data.assignment_id)[0].description = data.description;
          }
        }
    );    

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
