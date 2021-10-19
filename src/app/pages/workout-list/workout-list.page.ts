import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Workout } from 'src/app/models/workout';
import { WorkoutServiceService } from 'src/app/services/workout-service.service';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.page.html',
  styleUrls: ['./workout-list.page.scss'],
})
export class WorkoutListPage implements OnInit {

  bic: any[];
  autoClose = false;
  checkedItems: Workout[] = [];

  constructor(private http: HttpClient, private workoutService: WorkoutServiceService) {
    this.http.get('assets/bic.json').subscribe(res => {
      this.bic = res['workouts'];
    });
   }

   toggleSection(index) {
     this.bic[index].open = !this.bic[index].open;

     if (this.autoClose && this.bic[index].open) {
       this.bic.filter((workoutIndex) => workoutIndex != index).map(workout => workout.open = false);
     }
   }
   toggleWorkout (index, childIndex) {
     this.bic[index].children[childIndex].open = !this.bic[index].children[childIndex].open;
   }

   onChange(item) {
    if(this.checkedItems.includes(item)) {
      this.checkedItems = this.checkedItems.filter((value)=>value!=item);
    } else {
      this.checkedItems.push(item)
    }
  }
    createRoutine() {
      this.workoutService.selectedWorkouts = this.checkedItems;
      console.log(this.checkedItems);
    }

  ngOnInit() {
  }

}
