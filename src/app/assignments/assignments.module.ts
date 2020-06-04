import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchModuleModule } from '../search-module/search-module.module';
import { TeacherSearchModule } from '../teacher-search/teacher-search.module';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';

import { AssignmentsRoutingModule } from './assignments-routing.module';
import { AssignmentsByDateComponent } from './assignments-by-date/assignments-by-date.component';
import { AssignAssignmentsComponent } from './assign-assignments/assign-assignments.component';
import { AssignmentsListMarksComponent } from './assignments-list-marks/assignments-list-marks.component';
import { AssignmentsAddMarksComponent } from './assignments-add-marks/assignments-add-marks.component';

@NgModule({
  declarations: [AssignmentsByDateComponent, AssignAssignmentsComponent, AssignmentsListMarksComponent, AssignmentsAddMarksComponent],
  imports: [
    CommonModule,
    AssignmentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SearchModuleModule,
    TeacherSearchModule,
    NgxPaginationModule,
    MatDialogModule
  ]
})
export class AssignmentsModule { }
