import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectfeeComponent } from './collectfee/collectfee.component';
import { FeetermComponent } from './feeterm/feeterm.component';
import { FeetypeComponent } from './feetype/feetype.component';
import { FeemasterComponent } from './feemaster/feemaster.component';

const routes: Routes = [
  {path:'',redirectTo:'collectfee',pathMatch:'full'},
  {path:"collectfee",component:CollectfeeComponent},
  {path:"feeterm",component:FeetermComponent},
  {path:"feetype",component:FeetypeComponent},
  {path:"feemaster",component:FeemasterComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeeRoutingModule { }
