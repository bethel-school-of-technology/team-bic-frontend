import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.page.html',
  styleUrls: ['./workouts.page.scss'],
})
export class WorkoutsPage implements OnInit {

  bic: any[];
  autoClose = false;
  
  constructor(private http: HttpClient) {
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
  ngOnInit() {
  }

}
