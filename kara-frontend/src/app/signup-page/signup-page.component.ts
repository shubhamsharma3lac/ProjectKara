import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  public registerationFormGroup: FormGroup;
  public registerationFormControls = {};

  constructor(private authService: AuthenticationService) {
    let validators = [];
    this.registerationFormControls['firstName'] = new FormControl('', Validators.required);
    this.registerationFormControls['lastName'] = new FormControl('', Validators.required);
    this.registerationFormControls['birthday'] = new FormControl('', Validators.required);
    this.registerationFormControls['gender'] = new FormControl('', Validators.required);
    this.registerationFormControls['email'] = new FormControl('', [Validators.required, Validators.pattern(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)]);

    validators.push(Validators.required);
    validators.push(Validators.minLength(8));
    validators.push(Validators.maxLength(20));
    validators.push(Validators.pattern('[a-zA-Z0-9@_]+'));
    this.registerationFormControls['password'] = new FormControl('', validators);
    this.registerationFormControls['phone'] = new FormControl('', [Validators.required]);
    this.registerationFormControls['company'] = new FormControl('');
    this.registerationFormControls['country'] = new FormControl('', Validators.required);


    this.registerationFormGroup = new FormGroup(this.registerationFormControls);
  }

  ngOnInit() {
  }

  registerUser() {
    var data = {};
    Object.keys(this.registerationFormControls).forEach((key) => {
      data[key] = this.registerationFormGroup.value[key];
    })

    this.authService.registerUserAsync(data).then(function(res){
      var x = res;
    }, function(err){

    })
  }

}
