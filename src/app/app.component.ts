import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core'
import { Observable, Subscription } from 'rxjs';
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

  username: any;

  constructor(public authService: AuthService, private router: Router, public actionCtrl: ActionSheetController) {}

  logout() {
    this.authService.doLogout()
  }
  isLoginRoute() {
    return this.router.url.includes("/login");
  }
  isRegisterRoute() {
    return this.router.url.includes("/register");
  }
  async presentActionSheet() {
    this.authService.userInfo.subscribe(user => {
      alert(user)
      if(user){
        this.username = user.username;
      }
    })
    const actionSheet = await this.actionCtrl.create({
      header: 'Are you done fighting for today,' + ' ' + this.username + '?',
      cssClass: 'action-css',
      mode: 'ios',
      buttons: [
        {
          text: 'Yes! Logout.',
          role: 'destructive',
          icon: 'log-out',
          handler: () =>{this.logout()}
        }, 
        {
          text: "No way, I'm still not sore!",
          icon: 'close',
          role: 'cancel'
        }
      ],
      animated: true,
      backdropDismiss: true,
      keyboardClose: false
    });
    actionSheet.present();
  }
}
