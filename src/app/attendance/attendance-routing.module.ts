import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentattendanceComponent } from './studentattendance/studentattendance.component';
import { EmployeeattendanceComponent } from './employeeattendance/employeeattendance.component';
import { ReportsComponent } from './reports/reports.component';
import { StuReportMonthComponent } from './stu-report-month/stu-report-month.component';
import { EmpReportsComponent } from './emp-reports/emp-reports.component';
import { EmpReportsMonthComponent } from './emp-reports-month/emp-reports-month.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  {path:'',redirectTo:'studentattendance',pathMatch:'full'},
  {path:"studentattendance",component:StudentattendanceComponent},
  {path:"employeeattendance",component:EmployeeattendanceComponent},
  {path:"reports",component:ReportsComponent},
  {path:"stureportsmonth",component:StuReportMonthComponent},
  {path:"empreports",component:EmpReportsComponent},
  {path:"empreportsmonth",component:EmpReportsMonthComponent},
  {path:"student",component:StudentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
