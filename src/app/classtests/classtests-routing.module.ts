import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CTbyDateComponent } from './ctby-date/ctby-date.component';
import { CTAssignComponent } from './ctassign/ctassign.component';
import { CTlistmarksComponent } from './ctlistmarks/ctlistmarks.component';
import { CTaddmarksComponent } from './ctaddmarks/ctaddmarks.component';

const routes: Routes = [
  {path:'',redirectTo:'CTByDate',pathMatch:'full'},
  {path:"CTByDate",component:CTbyDateComponent},
  {path:"CTassign",component:CTAssignComponent},
  {path:"CTListMarks",component:CTlistmarksComponent},
  {path:"CTAddMarks",component:CTaddmarksComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClasstestsRoutingModule { }
