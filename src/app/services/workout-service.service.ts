import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Workout } from '../models/workout';

@Injectable({
  providedIn: 'root'
})
export class WorkoutServiceService {

  baseUrl = 'http://localhost:3000/bic/';
  

  constructor(private http: HttpClient) { }
  
  getWorkoutList(): Observable<Workout[]> {
    return this.http.get<Workout[]>(this.baseUrl);
}
getWorkout(Id: number):  Observable<Workout> {
  return this.http.get<Workout>(this.baseUrl + Id)
};

public selectedWorkouts:Workout[]= [];
 
    addWorkout(item: Workout) {
        this.selectedWorkouts.push(item);
    }
 
    getItems(): Workout[] {
        return this.selectedWorkouts;
    }

    // testing
    private _subject = new BehaviorSubject([]);
 
    sendWorkout(bWorkout: Workout[]) {
        this._subject.next(bWorkout);
        console.log(bWorkout);
    }
 
    getMessage(): Observable<any> {
      console.log(this._subject);
        return this._subject.asObservable();
    }
}

// public selectedWorkouts:Workout[]= [];
 
//     addWorkout(item: Workout) {
//         this.selectedWorkouts.push(item);
//     }
 
//     getItems(): Workout[] {
//         return this.selectedWorkouts;
//     }