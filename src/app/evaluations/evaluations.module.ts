import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchModuleModule } from '../search-module/search-module.module';
import { TeacherSearchModule } from '../teacher-search/teacher-search.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { EvaluationsRoutingModule } from './evaluations-routing.module';
import { MarksListComponent } from './marks-list/marks-list.component';
import { CumulativeMarksComponent } from './cumulative-marks/cumulative-marks.component';
import { AddMarksComponent } from './add-marks/add-marks.component';

@NgModule({
  declarations: [MarksListComponent, CumulativeMarksComponent, AddMarksComponent],
  imports: [
    CommonModule,
    EvaluationsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SearchModuleModule,
    TeacherSearchModule
  ]
})
export class EvaluationsModule { }
