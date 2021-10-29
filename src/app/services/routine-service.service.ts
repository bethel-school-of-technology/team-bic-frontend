import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Routine } from '../models/routine';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoutineServiceService {

  // baseUrl = 'http://localhost:8080';
  baseUrl = 'http://localhost:3000/routines/';
  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient, private authService: AuthService) { }
  
  getRoutineList(): Observable<Routine[]> {
    
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Authorization", this.authService.getToken());
    return this.http.get<Routine[]>(this.baseUrl 
      // + '/getRoutines'
      ,{ headers: headers });
  };
  getRoutine(Id: number):  Observable<Routine> {
    return this.http.get<Routine>(this.baseUrl + Id)
  };
  createRoutine(newRoutine: Routine) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Authorization", this.authService.getToken());
    return this.http.post(this.baseUrl
      //  + '/createRoutine'
    , newRoutine, { headers: headers });
  };
  updateRoutine(routine: Routine) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Authorization", this.authService.getToken());
    const url = this.baseUrl + routine.id;
    return this.http.put(url, routine,{ headers: headers });
  };
  deleteRoutine(id: number) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Authorization", this.authService.getToken());
    const url = this.baseUrl + id;
    return this.http.delete(url,{ headers: headers });
  };
}
