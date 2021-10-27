import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  signinForm: FormGroup;
  user: User = new User()
  token: string;

  constructor(public fb: FormBuilder, public authService: AuthService, public router: Router) {
      this.signinForm = this.fb.group({
        username: [''],
        password: ['']
      },
      )
     }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.token = this.authService.token;
    console.log(this.token);
  }

  loginUser() {
    this.authService.onLogin(this.user);
    
    
  }
}
