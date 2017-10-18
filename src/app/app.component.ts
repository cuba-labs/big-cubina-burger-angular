import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';
import { UserInfo } from 'cuba-rest-js/dist-node/model';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  userInfo: UserInfo;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userService.onUserInfoChanged().subscribe(() => {
      this.userInfo = this.userService.getCurrentUser();
    });
  }

  login(): void {
    this.router.navigate([ '/login' ]);
  }

  logout(): void {
    this.authenticationService.logout()
      .then(() => this.router.navigate([ '/' ]));
  }

  showOrders(): void {
    this.router.navigate([ '/orders' ]);
  }
}
