import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
import { stringify } from 'querystring';
import { Subscription } from 'rxjs';
import { RoutineWorkout } from 'src/app/models/routine-workout';
import { Workout } from 'src/app/models/workout';
import { WorkoutServiceService } from 'src/app/services/workout-service.service';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-create-routine',
  templateUrl: './create-routine.page.html',
  styleUrls: ['./create-routine.page.scss'],
})
export class CreateRoutinePage implements OnInit {
  modalDataResponse: any;
  workoutR: any[];
  routineWorkouts: RoutineWorkout[] = [];
  sets = [2, 3, 4];
  reps = [4, 6, 8, 10, 12, 16, 20];
  copy: any[];
  selectedSet = null;
  
  constructor(public modalCtrl: ModalController, private workoutService: WorkoutServiceService) {
    
   }
  
  ngOnInit(){
  }

  async initModal() {


    const modal = await this.modalCtrl.create({
      component: ModalPage,
      cssClass: 'routine-settings'
    });

    modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse !== null) {
        this.modalDataResponse = modalDataResponse.data;
        console.log('Modal Sent Data : '+ modalDataResponse.data);
      }
    });
    return await modal.present();
  }

  private _receivedWorkouts: Workout[] = [];
  private _subscription: Subscription;

 ionViewWillEnter(): void{
   this._subscription = this.workoutService.getMessage().subscribe((bWorkout:Workout[]) => {
     this._receivedWorkouts = bWorkout;
   });
   console.log(this._receivedWorkouts);

  this.receivedWorkouts.map(item => {
    return {
        id: item.id,
        name: item.name,
        sets: 0,
        reps: 0
    }}).forEach(item => this.routineWorkouts.push(item));
   console.log(this.routineWorkouts);
   
 }

 compareWith(item) {
}
 consoleArray(){
  console.log(this.routineWorkouts);
  console.log(this.selectedSet)
 }

 ionViewWillLeave(): void {
  this._subscription.unsubscribe();
}
 
  public get receivedWorkouts():Workout[]{
    return this._receivedWorkouts;
  }
}
