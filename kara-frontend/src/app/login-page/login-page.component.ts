import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthenticationService } from "../authentication.service";
import { Router } from "@angular/router";
import { User } from "../models/user";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"]
})
export class LoginPageComponent implements OnInit {
  public loginFormGroup: FormGroup;
  public loginFormControls = {};

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.loginFormControls["email"] = new FormControl("", [
      Validators.required,
      Validators.email
    ]);
    this.loginFormControls["password"] = new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ]);

    this.loginFormGroup = new FormGroup(this.loginFormControls);
  }

  ngOnInit() {}

  loginUser() {
    var email = this.loginFormGroup.value["email"];
    var password = this.loginFormGroup.value["password"];

    this.authService.loginAsync({ email: email, password: password }).subscribe(
      user => {
        localStorage.setItem("user", JSON.stringify(user));
        this.router.navigate(["home"]);
      },
      err => {
        return console.log(err.message);
      }
    );
  }
}
