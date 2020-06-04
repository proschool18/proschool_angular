import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatDialogModule } from '@angular/material/dialog';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { AcademicsComponent } from './academics/academics.component';
import { FeesComponent } from './fees/fees.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { ParentDashboardComponent } from './parent-dashboard/parent-dashboard.component';

@NgModule({
  declarations: [DashboardComponent, AttendanceComponent, ScheduleComponent, AcademicsComponent, FeesComponent, TeacherDashboardComponent, ParentDashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartsModule,
    NgxChartsModule,
    MatDialogModule,
    FormsModule
  ]
})
export class DashboardModule { }
