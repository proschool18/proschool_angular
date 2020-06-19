import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchModuleModule } from '../search-module/search-module.module';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { DirectivesModule } from '../_directives/_directives.module';

import { SchoolRoutingModule } from './school-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { AddClassComponent } from './add-class/add-class.component';
import { TimingsComponent } from './timings/timings.component';
import { PatternsComponent } from './patterns/patterns.component';
import { ParentinfoComponent } from './parentinfo/parentinfo.component';
import { EmployeeinfoComponent } from './employeeinfo/employeeinfo.component';
import { TasksComponent } from './tasks/tasks.component';
import { AddtasksComponent } from './addtasks/addtasks.component';
import { VendorsComponent } from './vendors/vendors.component';
import { MaterialComponent } from './material/material.component';
import { MaterialInComponent } from './material-in/material-in.component';
import { MaterialOutComponent } from './material-out/material-out.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { PaymentsComponent } from './payments/payments.component';
import { AddpaymentsComponent } from './addpayments/addpayments.component';
import { ClaimsComponent } from './claims/claims.component';
import { EditclassComponent } from './editclass/editclass.component';
import { EditstoreComponent } from './editstore/editstore.component';
import { EditpaymentsComponent } from './editpayments/editpayments.component';
import { EditexpensesComponent } from './editexpenses/editexpenses.component';
import { PendingTasksComponent } from './pending-tasks/pending-tasks.component';
import { EditschoolprofileComponent } from './editschoolprofile/editschoolprofile.component';
import { CommunicationsComponent } from './communications/communications.component';
import { AddMessageComponent } from './add-message/add-message.component';
import { OpenMessageComponent } from './open-message/open-message.component';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';

@NgModule({
  declarations: [ProfileComponent, AddClassComponent, TimingsComponent, PatternsComponent, ParentinfoComponent, EmployeeinfoComponent, TasksComponent, AddtasksComponent, VendorsComponent, MaterialComponent, MaterialInComponent, MaterialOutComponent, ExpensesComponent, PaymentsComponent, AddpaymentsComponent, ClaimsComponent, EditclassComponent, EditstoreComponent, EditpaymentsComponent, EditexpensesComponent, PendingTasksComponent, EditschoolprofileComponent, CommunicationsComponent, AddMessageComponent, OpenMessageComponent],
  imports: [
    CommonModule,
    SchoolRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SearchModuleModule,
    MatDialogModule,
    NgxPaginationModule,
    DirectivesModule,
    MatDatepickerModule, MatInputModule, MatNativeDateModule
  ],
  entryComponents: [EditclassComponent, EditstoreComponent, EditpaymentsComponent, EditexpensesComponent, AddtasksComponent, EditschoolprofileComponent, AddMessageComponent, OpenMessageComponent]
})
export class SchoolModule { }
