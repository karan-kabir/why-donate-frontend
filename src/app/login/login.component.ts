import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

import {
  FormControl,
  Validators,
  MinLengthValidator,
  FormBuilder,
  FormGroup
} from "@angular/forms";
import { AppHttpService } from "../shared/app-http.service";
import { GenericResponse } from "../shared/generic";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  hide: any;
  loginForm!: FormGroup;
  //injected toastr service for alerts
  constructor(
    private toastr: ToastrService,
    private route: Router,
    private http: AppHttpService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
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
  async submitLoginForm(): Promise<any> {
    try {
      let x = {
        username: this.loginForm.get("email")?.value,
        password: this.loginForm.get("password")?.value
      };
      if (this.loginForm.valid) {
        console.log("Form is Validate");
        let res:any=await this.http.post("/authentication/log-in", x);
        
        res.success==true?(this.route.navigate(["/search"]),localStorage.setItem("access_token",res?.data?.token.toString()),this.toastr.show("login success")):this.toastr.error("Invalid Credentials");
      
      } else {
        this.toastr.error("Login Failed!", "Login Error", {
          timeOut: 3000
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
