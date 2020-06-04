import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchModuleModule } from '../search-module/search-module.module';
import { TeacherSearchModule } from '../teacher-search/teacher-search.module';

import { TimetableRoutingModule } from './timetable-routing.module';
import { ClassWiseComponent } from './class-wise/class-wise.component';
import { EventsComponent } from './events/events.component';
import { NoticeboardComponent } from './noticeboard/noticeboard.component';

@NgModule({
  declarations: [ClassWiseComponent, EventsComponent, NoticeboardComponent],
  imports: [
    CommonModule,
    TimetableRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SearchModuleModule,
    TeacherSearchModule
  ],
  entryComponents: [EventsComponent]
})
export class TimetableModule { }
