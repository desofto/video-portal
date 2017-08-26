import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { VideoStorage } from '../services/index';

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

  // this allows to load next part of videos when scrolled down: lazy load
  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    if(window.scrollY + window.innerHeight >= document.body.scrollHeight) {
      this.storage.load();
    }
  }
}
