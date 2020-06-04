import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PwassignComponent } from './pwassign/pwassign.component';
import { PwbydateComponent } from './pwbydate/pwbydate.component';
import { PwlistmarksComponent } from './pwlistmarks/pwlistmarks.component';
import { PwaddmarksComponent } from './pwaddmarks/pwaddmarks.component';

const routes: Routes = [
  {path:'',redirectTo:'PWByDate',pathMatch:'full'},
  {path:"PWByDate",component:PwbydateComponent},
  {path:"PWassign",component:PwassignComponent},
  {path:"PWListMarks",component:PwlistmarksComponent},
  {path:"PWAddMarks",component:PwaddmarksComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectworksRoutingModule { }
