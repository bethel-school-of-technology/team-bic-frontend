import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderByPipe } from './order-by.pipe';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [OrderByPipe],
  imports: [
    CommonModule, IonicModule
  ],
  exports: [OrderByPipe]
})
export class OrderByModule { 
  static forRoot() {
    return {
        ngModule: OrderByModule,
        providers: [],
    };
  }
}