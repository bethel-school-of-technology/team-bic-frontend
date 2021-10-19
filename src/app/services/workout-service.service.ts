import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Workout } from '../models/workout';

@Injectable({
  providedIn: 'root'
})
export class WorkoutServiceService {

  baseUrl = 'http://localhost:3000/bic/';
  selectedWorkouts: Workout[] = [];

  constructor(private http: HttpClient) { }
  
  getWorkoutList(): Observable<Workout[]> {
    return this.http.get<Workout[]>(this.baseUrl);
}
getWorkout(Id: number):  Observable<Workout> {
  return this.http.get<Workout>(this.baseUrl + Id)
};


}
