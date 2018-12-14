import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public loginFormGroup: FormGroup;
  public loginFormControls = {};

  constructor() { 
    this.loginFormControls['email'] = new FormControl('', [ Validators.required, Validators.email ]);
    this.loginFormControls['password'] = new FormControl('', [ Validators.required, Validators.minLength(8) ]);

    this.loginFormGroup = new FormGroup(this.loginFormControls);
  }

  ngOnInit() {
  }

}
