import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { Router } from '@angular/router';
import { CurrentUser } from './services/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnDestroy {
  title = 'Crossover Video Portal';
  currentUser;

  private subscription: Subscription;

  constructor(
    private currentUserService: CurrentUser
  ) {
    this.currentUser = this.currentUserService.active;
    this.subscription = this.currentUserService.get().subscribe(currentUser => {
      setTimeout(() => this.currentUser = currentUser);
    });
  }

  unblur() {
    (document.activeElement as HTMLElement).blur();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
