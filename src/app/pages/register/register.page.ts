import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  signupForm: FormGroup;

  constructor(public fb: FormBuilder, public authService: AuthService, public router: Router) 
  {this.signupForm = this.fb.group({
    username: [''],
    email: [''],
    mobile: [''],
    password: ['']

   })
  }

  ngOnInit() {
  }
  
  registerUser() {
    this.authService.signUp(this.signupForm.value);
        this.router.navigate(['/login']);
      }

}
