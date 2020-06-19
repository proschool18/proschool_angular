import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchModuleModule } from '../search-module/search-module.module';
import { TeacherSearchModule } from '../teacher-search/teacher-search.module';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { DirectivesModule } from '../_directives/_directives.module';

import { ExaminationsRoutingModule } from './examinations-routing.module';
import { SchedulesComponent } from './schedules/schedules.component';
import { ExamPapersComponent } from './exam-papers/exam-papers.component';
import { AddPapersComponent } from './add-papers/add-papers.component';
import { EditschedulesComponent } from './editschedules/editschedules.component';
import { EditPapersComponent } from './edit-papers/edit-papers.component';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';

@NgModule({
  declarations: [SchedulesComponent, ExamPapersComponent, AddPapersComponent, EditschedulesComponent, EditPapersComponent],
  imports: [
    CommonModule,
    ExaminationsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SearchModuleModule,
    TeacherSearchModule,
    NgxPaginationModule,
    MatDialogModule,
    DirectivesModule,
    MatDatepickerModule, MatInputModule, MatNativeDateModule,
  ],
  entryComponents: [EditschedulesComponent, EditPapersComponent]
})
export class ExaminationsModule { }
