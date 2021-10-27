import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { ModalController } from '@ionic/angular';
// import { ValueAccessor } from '@ionic/angular/directives/control-value-accessors/value-accessor';
// import { stringify } from 'querystring';
import { Subscription } from 'rxjs';
import { Routine } from 'src/app/models/routine';
import { RoutineWorkout } from 'src/app/models/routine-workout';
import { Workout } from 'src/app/models/workout';
import { RoutineServiceService } from 'src/app/services/routine-service.service';
import { WorkoutServiceService } from 'src/app/services/workout-service.service';
// import { ModalPage } from '../modal/modal.page';

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
  selectedSet: RoutineWorkout["sets"] = null;
  newRoutineWorkout: RoutineWorkout = new RoutineWorkout();
  newRoutine: Routine = new Routine();
  private _receivedWorkouts: Workout[] = [];
  private _subscription: Subscription;

  
  constructor( private workoutService: WorkoutServiceService, private routineService: RoutineServiceService,  public router: Router,
    // public modalCtrl: ModalController,
    ) {
    
   }
  
  ngOnInit(){
  }

 ionViewWillEnter(): void{
   this._subscription = this.workoutService.getWorkouts().subscribe((bWorkout:Workout[]) => {
     this._receivedWorkouts = bWorkout;
   });
   console.log(this._receivedWorkouts);

  this._receivedWorkouts.map(item => {
    return {
        routineWorkout_id: item.workout_id,
        routineWorkout_name: item.workout_name,
        sets: 0,
        reps: 0
    }}).forEach(item => this.routineWorkouts.push(item));
   console.log(this.routineWorkouts);
 }
 uncheckAll(){
  this.routineWorkouts = [];
  console.log(this.routineWorkouts);
}
trackByFn(index, item) {
  return index;
}
createRoutine(){
  this.routineService.createRoutine(this.newRoutine).subscribe(response => {
    console.log(response);
    this.router.navigate(["/home"]);
  })
}
//  consoleArray(){
//   console.log(this.routineWorkouts);
//   console.log(this.newRoutine);
//   console.log(this.newRoutineWorkout);
//  }

 ionViewWillLeave(): void {
  this._subscription.unsubscribe();
  this.workoutService.stopGettingWorkouts();
  this.routineWorkouts = [];
}

// async initModal() {
  //   this.workoutService.sendRoutineWorkout(this.routineWorkouts);

  //   const modal = await this.modalCtrl.create({
  //     component: ModalPage,
  //     cssClass: 'routine-settings',
  //     backdropDismiss: true
  //   });

  //   modal.onDidDismiss().then((modalDataResponse) => {
  //     if (modalDataResponse !== null) {
  //       this.modalDataResponse = modalDataResponse.data;
  //       console.log('Modal Sent Data : '+ modalDataResponse.data);
  //     }
  //   });
  //   return await modal.present();
  // }
}
