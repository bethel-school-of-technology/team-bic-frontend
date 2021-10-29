import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  workout = new Workout;
  filterTerm: string;
  masterCheck:boolean;
  workoutList: Workout[] = [];

  constructor(private http: HttpClient, private workoutService: WorkoutServiceService, public router: Router) {

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
  createRoutine() {
    this.workoutService.sendWorkout(this.checkedItems);
    this.router.navigateByUrl('/c-routine', { replaceUrl: true });
    console.log(this.checkedItems);
    console.log(this.workoutService.selectedWorkouts);
  }
  uncheckAll(){
    this.bic.forEach(node => node.isSelected = false);
    console.log(this.checkedItems);
  }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.workoutService.getWorkoutList().subscribe(workoutList => {
      this.workoutList = workoutList;
      console.log(this.workoutList);
  })
}
}