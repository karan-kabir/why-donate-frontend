import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import {
  FormControl,
  Validators,
  MinLengthValidator,
  FormBuilder,
  FormGroup
} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide: any;
  loginForm!: FormGroup;
  //injected toastr service for alerts
  constructor(private toastr: ToastrService,private route: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
        Validators.pattern(/^(?:[a-zA-Z0-9\s]+)?$/)
      ])
    });
  }

  //method for error in login
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };

  // function call on submit login form
  public submitLoginForm = () => {
    if (this.loginForm.valid) {
      console.log("Form is Validate");
      (<any>this.route).navigate(['/search']);
    }else{
      this.toastr.error('Login Failed!', 'Login Error', {
        timeOut: 3000,
      });
    }
  };
}
