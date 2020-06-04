import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../_services/tasks.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../../_alert/alert/alert.component';
import { AddtasksComponent } from '../addtasks/addtasks.component';
import { User } from '../../_models/user';

@Component({
  selector: 'app-pending-tasks',
  templateUrl: './pending-tasks.component.html',
  styleUrls: ['./pending-tasks.component.css']
})
export class PendingTasksComponent implements OnInit {
  config: any;
  collection = { count: '', tasks: [] };

  user: User;
  selected_task = {
    task: '',
    employee_id: '',
    employee_name: '',
    school_id: '',
    department: '',
    priority: '',
    assigned_to: '',
    completion_date: '',
    rating: '',
    task_status: '',
    assigned_on: '',
    status: '',
  };
  dialog_type;
  alert_message: string;

  constructor(private taskservice: TasksService, private fb: FormBuilder, public dialog: MatDialog) {
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };
   }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user.role)
    this.getTasks();
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  //tasks = [];
  all_tasks = [];

  getTasks() {
    this.taskservice.getTasks()
      .subscribe(
        res => { this.all_tasks = res.tasks, this.get_Tasks(), console.log(res) 
        }
      )
  }

  get_Tasks() {
    if(this.user.role === 'admin') {
      this.collection.tasks = this.all_tasks.filter(task => task.task_status === 'pending');
    } else if(this.user.role === 'teacher') {
      this.collection.tasks = this.all_tasks.filter(task => task.employee_id === this.user.employee_id && task.task_status === 'pending');
    }
  }

  addTask() {
    this.dialog_type = 'add';
    this.openDialog(this.dialog_type)
  }

  deleteTask(task_id) {
    this.taskservice.deleteTask(task_id)
      .subscribe(
        res => { 
          if(res == true) {
            this.collection.tasks = this.collection.tasks.filter(res => res.task_id !== task_id);
            this.all_tasks = this.all_tasks.filter(res => res.task_id !== task_id)
            this.alert_message = "Task Deleted Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Task Not Deleted";
            this.openAlert(this.alert_message)
          }
        }
      )
  }

  editTask(i) {
    this.selected_task = this.collection.tasks[i];
    this.dialog_type = 'edit';
    this.openDialog(this.dialog_type)
  }

  update_status(status, i) {    
    if(status == "pending") {     
      this.collection.tasks[i].task_status = "completed";
    } else {
      this.collection.tasks[i].task_status = "pending";
    }
    this.taskservice.updateStatus(this.collection.tasks[i].task_status, this.collection.tasks[i].task_id)
    .subscribe(
      res => { 
        if(res == true) {
          this.alert_message = "Task Updated Successfully";
          this.openAlert(this.alert_message)
        } else {
          this.alert_message = "Task Not Updated";
          this.openAlert(this.alert_message)
        }
      }
    )
  }

  openDialog(dialog_type): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = {
      selected_task: this.selected_task,
      dialog_type: dialog_type,
    };

    const dialogRef = this.dialog.open(AddtasksComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if(data) {
          if(dialog_type === 'edit') {
            this.getTasks();
            // this.collection.tasks.filter( res => res.task_id == data.task_id)[0].task = this.all_tasks.filter( res => res.task_id == data.task_id)[0].task = data.task;
            // this.collection.tasks.filter( res => res.task_id == data.task_id)[0].department = this.all_tasks.filter( res => res.task_id == data.task_id)[0].department = data.department;
            // this.collection.tasks.filter( res => res.task_id == data.task_id)[0].priority = this.all_tasks.filter( res => res.task_id == data.task_id)[0].priority = data.priority;
            // this.collection.tasks.filter( res => res.task_id == data.task_id)[0].assigned_on = this.all_tasks.filter( res => res.task_id == data.task_id)[0].assigned_on = data.assigned_on;
            // this.collection.tasks.filter( res => res.task_id == data.task_id)[0].employee_name = this.all_tasks.filter( res => res.task_id == data.task_id)[0].employee_name = data.employee_name;
            // this.collection.tasks.filter( res => res.task_id == data.task_id)[0].task = this.all_tasks.filter( res => res.task_id == data.task_id)[0].task = data.task;
          } else if(dialog_type === 'add') {
            this.getTasks();
            // this.collection.tasks.push({
            //   task: data.task,
            //   department: data.department,
            //   employee_name: data.employee_name,
            //   priority: data.priority,
            //   assigned_on: data.assigned_on,
            //   task_status: 'pending',
            // })
            console.log("Dialog output:", data)
          }
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
