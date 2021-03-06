import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()

// Storage that holds information about currently logged in user.
// Allows to subscribe on changes.

export class CurrentUser {
  private subject = new Subject<any>();

  constructor() {
    // Load user from localStorage
    this.user_changed();
  }

  // Load user from localStorage (between sessions) and inform subscribers
  private user_changed() {
    try {
      this.active = JSON.parse(localStorage.getItem('currentUser'));
    } catch(e) {
      this.active = null;
    }

    this.subject.next(this.active);
  }

  // currently active user
  public active: any = null;

  // Used from user API to store information
  set(user: Object) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.user_changed();
  }

  // Used from user API to clear information
  clear() {
    localStorage.removeItem('currentUser');
    this.user_changed();
  }

  // Allows to subscribe on changes
  onChange(): Observable<any> {
    return this.subject.asObservable();
  }
}
