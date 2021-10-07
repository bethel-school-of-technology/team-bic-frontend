import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewRoutinePageRoutingModule } from './view-routine-routing.module';

import { ViewRoutinePage } from './view-routine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewRoutinePageRoutingModule
  ],
  declarations: [ViewRoutinePage]
})
export class ViewRoutinePageModule {}
