import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { VideoStorage } from '../services';

// Sidebar for show video page

@Component({
  selector: 'video-sidebar',
  templateUrl: './sidebar.html'
})

export class VideoSidebar implements OnInit, OnDestroy {
  // list of currently loaded videos
  private list: any = [];
  // we will unsubscribe from updates later
  private subscription: Subscription;

  constructor(
    private storage: VideoStorage
  ) { }

  ngOnInit() {
    // get current video list and subscribe for updates
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
