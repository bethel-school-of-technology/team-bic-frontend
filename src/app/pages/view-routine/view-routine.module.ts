import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewRoutinePageRoutingModule } from './view-routine-routing.module';

import { TranslateModule } from '@ngx-translate/core';

import { ViewRoutinePage } from './view-routine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewRoutinePageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [ViewRoutinePage]
})
export class ViewRoutinePageModule {}
