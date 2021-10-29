import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { RoutineWorkout } from '../models/routine-workout';
import { Workout } from '../models/workout';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WorkoutServiceService {

  baseUrl = 'http://localhost:8080';
  

  constructor(private http: HttpClient, private authService: AuthService) { }
  
  getWorkoutList(): Observable<Workout[]> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Authorization", this.authService.getToken());
    console.log(headers);
    return this.http.get<Workout[]>(this.baseUrl + '/getWorkouts', { headers: headers });
    
}
getWorkout(Id: number):  Observable<Workout> {
  return this.http.get<Workout>(this.baseUrl + Id)
};

public selectedWorkouts:Workout[]= [];
public selectedRoutineWorkout: RoutineWorkout[]= [];
 
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
 
    sendRoutineWorkout(rWorkout: RoutineWorkout[]) {
        this._subject.next(rWorkout);
        console.log(rWorkout);
    }
 
    getWorkouts(): Observable<any> {
      console.log(this._subject);
        return this._subject.asObservable();
    }

    stopGettingWorkouts() {
      this._subject = new BehaviorSubject([]);
    }
}
