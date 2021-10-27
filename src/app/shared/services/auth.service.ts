import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of, from, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Storage} from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint: string = 'http://localhost:8080';
  error: string;
  token: string = '';
  data: any;
  user: User = new User();
  private _subject = new BehaviorSubject(null);

  
  constructor(
    private http: HttpClient,
    public router: Router,
    private readonly storage: Storage
  ) {
  }

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/register`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }
  onLogin(user: User) {
    return this.http.post(this.endpoint + '/login', { username: user.username, password: user.password }, { observe: 'response' })
    .subscribe(res => {
        this.token = res.headers.get("Authorization");
        localStorage.setItem('access_token', this.token);
        localStorage.setItem('current_user', user.username);
        this.user.username = user.username;
        console.log(this.user.username);
        this.router.navigateByUrl('/home');
    },
      error => this.error = "Unable to login with username and password."
    );
    
  }

  getUsername() {
    return localStorage.getItem('current_user');
  }

  getToken() {
    return localStorage.getItem('access_token');
    
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    localStorage.removeItem('current_user');
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['/login']);
    }
  }

  
  getUserRoutines() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append("Authorization", this.token);
    this.http.get(this.endpoint + "/routines", { headers: headers })
      .subscribe(res => this.data = res, error => this.error = "Unable to retrieve data.");
      this.http.get(this.endpoint + "/getWorkouts", { headers: headers })
      .subscribe(res => this.data = res, error => this.error = "Unable to retrieve data.");
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}