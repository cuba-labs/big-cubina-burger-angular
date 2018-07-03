import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { CubaApp } from '@cuba-platform/rest';
import { CubaIntegrationService } from './cuba-integration.service';
import { UserService } from './user.service';

@Injectable()
export class AuthenticationService {
  private cubaApp: CubaApp;

  constructor(private alertService: AlertService,
              private cubaIntegrationService: CubaIntegrationService,
              private userService: UserService) {
    this.cubaApp = cubaIntegrationService.getCubaApp();
  }

  login(username: string, password: string): Promise<{ access_token: string }> {
    return this.cubaApp.login(username, password)
      .then(result => {
        this.userService.loadUserInfo();
        return result;
      })
      .catch(() => {
        this.alertService.error('Login failed');
      });
  }

  logout(): Promise<any> {
    return this.cubaApp.logout()
      .then(() => {
        this.userService.loadUserInfo();
      });
  }
}
