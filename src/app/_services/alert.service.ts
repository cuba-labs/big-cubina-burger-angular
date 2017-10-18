import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          this.keepAfterNavigationChange = false;
        } else {
          this.subject.next();
        }
      }
    });
  }

  success(message: string, keepAfterNavigationChange = false): void {
    this.propagateMessage(message, 'success', keepAfterNavigationChange);
  }

  error(message: string, keepAfterNavigationChange = false): void {
    this.propagateMessage(message, 'error', keepAfterNavigationChange);
  }

  propagateMessage(message: string, type: string, keepAfterNavigationChange = false): void {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: type, text: message });
  }

  onMessageChanged(): Observable<any> {
    return this.subject.asObservable();
  }
}
