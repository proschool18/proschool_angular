import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MainComponent } from './main/main.component';
import { AuthguardGuard } from './_guards/authguard.guard';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'academics',loadChildren:'./academics/academics.module#AcademicsModule'},
  {path:'main',component:MainComponent, 
    children: [
      {path:'',redirectTo:'dashboard',pathMatch:'full'},
      {path:'dashboard',loadChildren:'./dashboard/dashboard.module#DashboardModule'},
      {path:'admin',loadChildren:'./school/school.module#SchoolModule'},
      {path:'students',loadChildren:'./students/students.module#StudentsModule'},
      {path:'studentprofile',loadChildren:'./studentprofile/studentprofile.module#StudentprofileModule'},
      {path:'employees',loadChildren:'./employees/employees.module#EmployeesModule'},
      {path:'employeeprofile',loadChildren:'./employeeprofile/employeeprofile.module#EmployeeprofileModule'},
      {path:'attendance',loadChildren:'./attendance/attendance.module#AttendanceModule'},
      {path:'academics',loadChildren:'./academics/academics.module#AcademicsModule'},
      {path:'assignments',loadChildren:'./assignments/assignments.module#AssignmentsModule'},
      {path:'classtests',loadChildren:'./classtests/classtests.module#ClasstestsModule'},
      {path:'projectworks',loadChildren:'./projectworks/projectworks.module#ProjectworksModule'},
      {path:'quiz',loadChildren:'./quiz/quiz.module#QuizModule'},
      {path:'examinations',loadChildren:'./examinations/examinations.module#ExaminationsModule'},
      {path:'evaluations',loadChildren:'./evaluations/evaluations.module#EvaluationsModule'},
      {path:'timetable',loadChildren:'./timetable/timetable.module#TimetableModule'},
      {path:'fee',loadChildren:'./fee/fee.module#FeeModule'},
      {path:'reports',loadChildren:'./reports/reports.module#ReportsModule'},
      {path:'transportation',loadChildren:'./transportation/transportation.module#TransportationModule'},
    ]
  },
  {path:'accessdenied',component:AccessDeniedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
