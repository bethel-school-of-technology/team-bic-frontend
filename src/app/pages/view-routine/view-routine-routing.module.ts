import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewRoutinePage } from './view-routine.page';

const routes: Routes = [
  {
    path: '',
    component: ViewRoutinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRoutinePageRoutingModule {}
