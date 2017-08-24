import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class CurrentUser {
  private subject = new Subject<any>();

  constructor() {
    this.user_changed();
  }

  private user_changed() {
    try {
      this.active = JSON.parse(localStorage.getItem('currentUser'));
    } catch(e) {
      this.active = null;
    }

    this.subject.next(this.active);
  }

  public active: any = null;

  set(user: Object) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.user_changed();
  }

  clear() {
    localStorage.removeItem('currentUser');
    this.user_changed();
  }

  get(): Observable<any> {
    return this.subject.asObservable();
  }
}
