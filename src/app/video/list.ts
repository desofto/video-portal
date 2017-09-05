import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { VideoStorage } from '../services';

// Main video list

@Component({
  selector: 'video-list',
  templateUrl: './list.html'
})

export class VideoList implements OnInit, OnDestroy {
  // current list of videos loaded from server
  private list: any = [];
  // to unsubscribe later
  private subscription: Subscription;

  constructor(
    private storage: VideoStorage
  ) { }

  ngOnInit() {
    // store current list of videos and subscribe on updates
    this.list = this.storage.list;

    this.subscription = this.storage.onChanged().subscribe(() => {
      this.list = this.storage.list;
    });
  }

  ngOnDestroy() {
    // to prevent memory leaks
    this.subscription.unsubscribe();
  }

  loadNext() {
    this.storage.load();
  }
}
