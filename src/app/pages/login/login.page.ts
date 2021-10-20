import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  signinForm: FormGroup;

  constructor(public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public menuCtrl: MenuController) {
      this.signinForm = this.fb.group({
        email: [''],
        password: ['']
      },
      )
     }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    
  }

  loginUser() {
    this.authService.signIn(this.signinForm.value);
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }
}
