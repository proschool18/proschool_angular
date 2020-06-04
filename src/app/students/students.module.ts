import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchModuleModule } from '../search-module/search-module.module';
import { TeacherSearchModule } from '../teacher-search/teacher-search.module';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';

import { StudentsRoutingModule } from './students-routing.module';
import { InformationComponent } from './information/information.component';
import { AdmissionComponent } from './admission/admission.component';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';

@NgModule({
  declarations: [InformationComponent, AdmissionComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TeacherSearchModule,
    NgxPaginationModule,
    SearchModuleModule,
    MatDialogModule,
    MatDatepickerModule, MatInputModule, MatNativeDateModule
  ],
  entryComponents: [AdmissionComponent],
  exports: [
    AdmissionComponent,
  ]
})
export class StudentsModule { }
