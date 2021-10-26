import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Routine } from '../models/routine';

@Injectable({
  providedIn: 'root'
})
export class RoutineServiceService {

  baseUrl = 'http://localhost:3000/routines/';

  constructor(private http: HttpClient) { }
  
  getRoutineList(): Observable<Routine[]> {
    return this.http.get<Routine[]>(this.baseUrl);
  };
  getRoutine(Id: number):  Observable<Routine> {
    return this.http.get<Routine>(this.baseUrl + Id)
  };
  createRoutine(newRoutine: Routine) {
    return this.http.post(this.baseUrl, newRoutine);
  };
  updateRoutine(routine: Routine) {
    const url = this.baseUrl + routine.id;
    return this.http.put(url, routine);
  };
  deleteRoutine(id: number) {
    const url = this.baseUrl + id;
    return this.http.delete(url);
  };
}
