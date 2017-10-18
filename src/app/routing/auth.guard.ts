import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService,
              private router: Router) {
  }

  canActivate(): boolean {
    if (this.userService.getCurrentUser() != null) {
      return true;
    }

    this.router.navigate([ '/' ]);
    return false;
  }
}
