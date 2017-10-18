import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent {
  credentials: any = { username: 'demo', password: 'demo' };

  constructor(private location: Location,
              private authenticationService: AuthenticationService) {
  }

  login() {
    this.authenticationService.login(this.credentials.username, this.credentials.password)
      .then(() => {
        this.location.back();
      });
  }
}
