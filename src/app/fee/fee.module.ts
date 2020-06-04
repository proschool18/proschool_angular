import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchModuleModule } from '../search-module/search-module.module';
import { TeacherSearchModule } from '../teacher-search/teacher-search.module';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';

import { FeeRoutingModule } from './fee-routing.module';
import { CollectfeeComponent } from './collectfee/collectfee.component';
import { FeetermComponent } from './feeterm/feeterm.component';
import { FeetypeComponent } from './feetype/feetype.component';
import { FeemasterComponent } from './feemaster/feemaster.component';
import { EditfeeComponent } from './editfee/editfee.component';

@NgModule({
  declarations: [CollectfeeComponent, FeetermComponent, FeetypeComponent, FeemasterComponent, EditfeeComponent],
  imports: [
    CommonModule,
    FeeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SearchModuleModule,
    TeacherSearchModule,
    NgxPaginationModule,
    MatDialogModule
  ],
  entryComponents: [EditfeeComponent]
})
export class FeeModule { }
