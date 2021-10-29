import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutsPageRoutingModule } from './workouts-routing.module';

import { WorkoutsPage } from './workouts.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderByModule } from 'src/app/shared/order-by.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutsPageRoutingModule,
    Ng2SearchPipeModule,
    OrderByModule
  ],
  declarations: [WorkoutsPage]
})
export class WorkoutsPageModule {}
