import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarksListComponent } from './marks-list/marks-list.component';
import { CumulativeMarksComponent } from './cumulative-marks/cumulative-marks.component';
import { AddMarksComponent } from './add-marks/add-marks.component';

const routes: Routes = [
  {path:'',redirectTo:'marksList',pathMatch:'full'},
  {path:"marksList",component:MarksListComponent},
  {path:"cumulativeMarks",component:CumulativeMarksComponent},
  {path:"addMarks",component:AddMarksComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluationsRoutingModule { }
