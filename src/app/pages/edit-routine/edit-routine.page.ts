import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Routine } from 'src/app/models/routine';
import { RoutineWorkout } from 'src/app/models/routine-workout';
import { Workout } from 'src/app/models/workout';
import { RoutineServiceService } from 'src/app/services/routine-service.service';
import { WorkoutServiceService } from 'src/app/services/workout-service.service';

@Component({
  selector: 'app-edit-routine',
  templateUrl: './edit-routine.page.html',
  styleUrls: ['./edit-routine.page.scss'],
})
export class EditRoutinePage implements OnInit {

  currentRoutine: Routine = new Routine();
  routineId: number;
  private _receivedWorkouts: Workout[] = [];
  routineWorkouts: RoutineWorkout[] = [];
  sets = [2, 3, 4];
  reps = [4, 6, 8, 10, 12, 16, 20];
  private _subscription: Subscription;

  constructor(private actRoute: ActivatedRoute, private routineService: RoutineServiceService, private workoutService: WorkoutServiceService, public router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.routineId = parseInt(this.actRoute.snapshot.paramMap.get("routineId"));
    this.routineService.getRoutine(this.routineId).subscribe(response =>{
      this.currentRoutine = response;
    });
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
  }
  uncheckAll(){
    this.routineWorkouts = [];
    console.log(this.routineWorkouts);
  }
  trackByFn(index, item) {
    return index;
  }
  editRoutine(){
    this.routineService.updateRoutine(this.currentRoutine).subscribe(response => {
      console.log(response);
      this.router.navigate(["/v-routine/" + this.currentRoutine.id]);
    })
  }
  ionViewWillLeave(): void {
    this._subscription.unsubscribe();
    this.workoutService.stopGettingWorkouts();
    this.routineWorkouts = [];
  }
  navigate(){
    this.router.navigate(["/workouts" + "/" + this.currentRoutine.id]);
    }
}
