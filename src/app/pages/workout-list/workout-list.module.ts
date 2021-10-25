import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutListPageRoutingModule } from './workout-list-routing.module';

import { WorkoutListPage } from './workout-list.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderByModule } from 'src/app/shared/order-by.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutListPageRoutingModule,
    Ng2SearchPipeModule,
    OrderByModule
  ],
  declarations: [WorkoutListPage]
})
export class WorkoutListPageModule {}
