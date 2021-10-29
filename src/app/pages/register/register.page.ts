import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  signupForm: FormGroup;
  invalidRegister = false;
  errorMessage = '';
  pass1 = '';
  pass2 = '';
  userName: string;
  emailAddress: string;
  user: User;

  constructor(public fb: FormBuilder, public authService: AuthService, public router: Router) 
  {this.signupForm = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmpassword: ['', [Validators.required]]

   })
  }

  ngOnInit() {
  }
  
  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe((res) => {
      if (res) {
        this.signupForm.reset()
        this.router.navigate(['/login']);
      }
    })
  }

      // test
      onSignup(form: FormGroup) {
      if (this.signupForm.valid === false) {
        this.invalidRegister = true;
        this.errorMessage = 'You must fill in all the fields!';
      } else if (this.pass1 !== this.pass2) {
        this.invalidRegister = true;
        this.errorMessage = 'The passwords do not match!';
      } else {
        this.user = new User();
        console.log(this.user);
        this.authService.signUp(this.user).subscribe(
          data => {
            console.log(data);
          }, 
          error => {
            if (error.email === "duplicated") {
              this.invalidRegister = true;
              this.errorMessage = 'The email address you have used is already registered!';
            } else if (error.username === "duplicated") {
              this.invalidRegister = true;
              this.errorMessage = 'The username is not available!';
            }
          },
          () => {
            this.invalidRegister = false;
            this.router.navigate(['login'], {queryParams: { registered: 'true' } });
          })
      }
    }
}
