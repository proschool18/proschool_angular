import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchModuleModule } from '../search-module/search-module.module';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';

import { EmployeesRoutingModule } from './employees-routing.module';
import { InformationComponent } from './information/information.component';
import { AdmissionComponent } from './admission/admission.component';

@NgModule({
  declarations: [InformationComponent, AdmissionComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SearchModuleModule,
    MatDialogModule
  ],
  entryComponents: [AdmissionComponent],
  exports: [AdmissionComponent]
})
export class EmployeesModule { }
