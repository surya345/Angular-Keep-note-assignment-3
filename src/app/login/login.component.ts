import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
    username = new FormControl('', [ Validators.required ]);
    password = new FormControl('', [ Validators.required ]);

    public bearerToken: any;
    submitMessage = '';

    constructor(private authservice: AuthenticationService, private routerService: RouterService) { }

    loginSubmit() {
      const requestParams = {
        'username' : this.username.value,
        'password' : this.password.value
      };

      this.authservice.authenticateUser(requestParams).subscribe( res => {
        this.bearerToken = res['token'];
        this.authservice.setBearerToken(this.bearerToken);
        this.routerService.routeToDashboard();
      }, err => {
        this.submitMessage = err.error ? err.error.message : err.message;
      });
    }

    get_username_error() {
      return this.username.hasError('required') ? 'username is required' : '';
    }

    get_password_error() {
      return this.password.hasError('required') ? 'password is required' : '';
    }
}