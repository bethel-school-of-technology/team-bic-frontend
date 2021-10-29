import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Routine } from 'src/app/models/routine';
import { RoutineWorkout } from 'src/app/models/routine-workout';
import { RoutineServiceService } from 'src/app/services/routine-service.service';
import { WorkoutServiceService } from 'src/app/services/workout-service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  routineForm: FormGroup;
  private receivedWorkouts: RoutineWorkout[] = [];
  private _subscription: Subscription;
  newRoutine: Routine = new Routine();


  constructor(private modalCtrl: ModalController, private workoutService: WorkoutServiceService, private routineService: RoutineServiceService, private router: Router, public fb: FormBuilder,)
    {this.routineForm = this.fb.group({
      routine_name: [''],
      subtitle: [''],
      muscle_group: ['']
     })
   }

 

  ngOnInit() {
  }

  ionViewWillEnter(): void{
    this._subscription = this.workoutService.getWorkouts().subscribe((rWorkout:RoutineWorkout[]) => {
      this.receivedWorkouts = rWorkout;
    });
    console.log(this.receivedWorkouts);
  }
  ionViewWillLeave(): void {
    this._subscription.unsubscribe();
  }
  async close() {
    const closeModal: string = "Modal Closed";
    await this.modalCtrl.dismiss(closeModal);
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  consoleArray(){
    console.log(this.newRoutine);

   }
  // routine creation
  createRoutine(){
    this.routineService.createRoutine(this.newRoutine).subscribe(response => {
      console.log(response);
      this.router.navigate(["/home"]);
    })
  //  this.close();
  }
}
