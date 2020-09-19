import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchModuleModule } from '../search-module/search-module.module';
import { ChartsModule } from 'ng2-charts';
import { PipesModule } from '../_pipes/_pipes.module';
import { DirectivesModule } from '../_directives/_directives.module';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { StudentattendanceComponent } from './studentattendance/studentattendance.component';
import { EmployeeattendanceComponent } from './employeeattendance/employeeattendance.component';
import { ReportsComponent } from './reports/reports.component';
import { StuReportMonthComponent } from './stu-report-month/stu-report-month.component';
import { EmpReportsComponent } from './emp-reports/emp-reports.component';
import { EmpReportsMonthComponent } from './emp-reports-month/emp-reports-month.component';
import { StudentComponent } from './student/student.component';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';

@NgModule({
  declarations: [StudentattendanceComponent, EmployeeattendanceComponent, ReportsComponent, StuReportMonthComponent, EmpReportsComponent, EmpReportsMonthComponent, StudentComponent],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    MatDatepickerModule, MatInputModule, MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    SearchModuleModule,
    PipesModule,
    ChartsModule,
    DirectivesModule
  ]
})
export class AttendanceModule { }
