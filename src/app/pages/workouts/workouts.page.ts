import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Routine } from 'src/app/models/routine';
import { Workout } from 'src/app/models/workout';
import { RoutineServiceService } from 'src/app/services/routine-service.service';
import { WorkoutServiceService } from 'src/app/services/workout-service.service';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.page.html',
  styleUrls: ['./workouts.page.scss'],
})
export class WorkoutsPage implements OnInit {

  bic: any[];
  autoClose = false;
  checkedItems: Workout[] = [];
  workout = new Workout;
  filterTerm: string;
  masterCheck:boolean;
  workoutList: Workout[] = [];
  currentRoutine: Routine = new Routine();
  routineId: number;

  constructor(private http: HttpClient, private workoutService: WorkoutServiceService, public router: Router, private actRoute: ActivatedRoute, private routineService: RoutineServiceService) {

   }

// known bug: if searchbar is used while items are checked, they will still be stored as checkitems, but the checkboxes will uncheck
  onChange(item) {
    if (this.checkedItems.includes(item)) {
      this.checkedItems = this.checkedItems.filter((value) => value != item);
    } else {
      this.checkedItems.push(item)
    }
    console.log(this.checkedItems);
  }
  editRoutine() {
    this.workoutService.sendWorkout(this.checkedItems);
    this.router.navigateByUrl('/e-routine/' + this.routineId, { replaceUrl: true });
    console.log(this.checkedItems);
    console.log(this.workoutService.selectedWorkouts);
  }
  uncheckAll(){
    this.bic.forEach(node => node.isSelected = false);
    console.log(this.checkedItems);
  }

  ngOnInit() {
  }
  async ionViewWillEnter(){
    this.workoutService.getWorkoutList().subscribe(workoutList => {
      this.workoutList = workoutList;
      console.log(this.workoutList);
  });
  this.routineId = parseInt(this.actRoute.snapshot.paramMap.get("routineId"));
    this.routineService.getRoutine(this.routineId).subscribe(response =>{
      this.currentRoutine = response;
      console.log(this.currentRoutine);
    });
}
}