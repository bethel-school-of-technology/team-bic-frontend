import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core'
import { Observable } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Create Routine', url: '/c-routine', icon: 'hammer' },
    { title: 'Workouts', url: '/workout-list', icon: 'barbell' },
  ];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.doLogout()
  }
  isLoginRoute() {
    return this.router.url.includes("/login");
  }
  isRegisterRoute() {
    return this.router.url.includes("/register");
  }
}
