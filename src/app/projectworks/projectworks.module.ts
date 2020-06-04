import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchModuleModule } from '../search-module/search-module.module';
import { TeacherSearchModule } from '../teacher-search/teacher-search.module';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';

import { ProjectworksRoutingModule } from './projectworks-routing.module';
import { PwassignComponent } from './pwassign/pwassign.component';
import { PwbydateComponent } from './pwbydate/pwbydate.component';
import { PwlistmarksComponent } from './pwlistmarks/pwlistmarks.component';
import { PwaddmarksComponent } from './pwaddmarks/pwaddmarks.component';


@NgModule({
  declarations: [PwassignComponent, PwbydateComponent, PwlistmarksComponent, PwaddmarksComponent],
  imports: [
    CommonModule,
    ProjectworksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SearchModuleModule,
    TeacherSearchModule,
    NgxPaginationModule,
    MatDialogModule
  ]
})
export class ProjectworksModule { }
