import { Injectable } from '@angular/core';
import { UserInfo, CubaApp } from '@cuba-platform/rest';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { CubaIntegrationService } from './cuba-integration.service';
import { AlertService } from './alert.service';
import { StorageService } from './storage.service';

@Injectable()
export class UserService {
  private subject = new Subject<any>();
  private userInfo: UserInfo;
  private cubaApp: CubaApp;

  constructor(private alertService: AlertService,
              private storageService: StorageService,
              private cubaIntegrationService: CubaIntegrationService) {
    this.cubaApp = cubaIntegrationService.getCubaApp();
    this.userInfo = this.storageService.getCurrentUser();
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    this.cubaApp.getUserInfo()
      .then(value => {
        this.userInfo = value;
        this.storageService.setCurrentUser(value);
        this.subject.next({ userInfo: this.getCurrentUser() });
      })
      .catch(() => {
        this.alertService.error('Can\'t obtain UserInfo');
      });
  }

  isAnonymous(): boolean {
    return this.userInfo == null || this.userInfo.login === 'anonymous';
  }

  getCurrentUser(): UserInfo {
    return this.isAnonymous() ? null : this.userInfo;
  }

  onUserInfoChanged(): Observable<any> {
    return this.subject.asObservable();
  }
}
