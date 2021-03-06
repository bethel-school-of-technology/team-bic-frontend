import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage'
import { Subscription } from 'rxjs';
import { Routine } from 'src/app/models/routine';
import { RoutineWorkout } from 'src/app/models/routine-workout';
import { RoutineServiceService } from 'src/app/services/routine-service.service';
import { WorkoutServiceService } from 'src/app/services/workout-service.service';



@Component({
  selector: 'app-view-routine',
  templateUrl: './view-routine.page.html',
  styleUrls: ['./view-routine.page.scss'],
})
export class ViewRoutinePage implements OnInit {

  currentRoutine: Routine = new Routine();
  routineId: number;
  private receivedWorkouts: RoutineWorkout[] = [];
  private _subscription: Subscription;

  constructor(private actRoute: ActivatedRoute, private routineService: RoutineServiceService, private workoutService: WorkoutServiceService, private router: Router) {}

  ngOnInit() {
  }
  
  ionViewWillEnter(){
    this.routineId = parseInt(this.actRoute.snapshot.paramMap.get("routineId"));
    this.routineService.getRoutine(this.routineId).subscribe(response =>{
      this.currentRoutine = response;
      console.log(this.currentRoutine);
      this._subscription = this.workoutService.getWorkouts().subscribe((rWorkout:RoutineWorkout[]) => {
        this.receivedWorkouts = rWorkout;
      });
      console.log(this.receivedWorkouts);
    })
  }
  navigate(){
  this.router.navigate(["/e-routine" + "/" + this.currentRoutine.id]);
  }
  // timer
  public timeBegan = null
  public timeStopped:any = null
  public stoppedDuration:any = 0
  public started = null
  public running = false
  public blankTime = "00:00.000"
  public time = "00:00.000"
  start() {
    if(this.running) return;
    if (this.timeBegan === null) {
        this.reset();
        this.timeBegan = new Date();
    }
    if (this.timeStopped !== null) {
      let newStoppedDuration:any = (+new Date() - this.timeStopped)
      this.stoppedDuration = this.stoppedDuration + newStoppedDuration;
    }
    this.started = setInterval(this.clockRunning.bind(this), 10);
      this.running = true;
    }
    stop() {
      this.running = false;
      this.timeStopped = new Date();
      clearInterval(this.started);
   }
    reset() {
      this.running = false;
      clearInterval(this.started);
      this.stoppedDuration = 0;
      this.timeBegan = null;
      this.timeStopped = null;
      this.time = this.blankTime;
    }
    zeroPrefix(num, digit) {
      let zero = '';
      for(let i = 0; i < digit; i++) {
        zero += '0';
      }
      return (zero + num).slice(-digit);
    }
    clockRunning(){
      let currentTime:any = new Date()
      let timeElapsed:any = new Date(currentTime - this.timeBegan - this.stoppedDuration)
      let hour = timeElapsed.getUTCHours()
      let min = timeElapsed.getUTCMinutes()
      let sec = timeElapsed.getUTCSeconds()
      let ms = timeElapsed.getUTCMilliseconds();
    this.time =
      this.zeroPrefix(hour, 2) + ":" +
      this.zeroPrefix(min, 2) + ":" +
      this.zeroPrefix(sec, 2) + "." +
      this.zeroPrefix(ms, 3);
    };
}
