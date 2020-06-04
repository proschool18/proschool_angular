import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AcademicsComponent } from './academics/academics.component';
import { FeesComponent } from './fees/fees.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { ParentDashboardComponent } from './parent-dashboard/parent-dashboard.component';

const routes: Routes = [
  {path:'',redirectTo:'dashboard',pathMatch:'full'},
  {path:"dashboard",component:DashboardComponent},
  {path:"attendance",component:AttendanceComponent},
  {path:"schedule",component:ScheduleComponent},
  {path:"academics",component:AcademicsComponent},
  {path:"fees",component:FeesComponent},
  {path:"teacherdashboard",component:TeacherDashboardComponent},
  {path:"parentdashboard",component:ParentDashboardComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
