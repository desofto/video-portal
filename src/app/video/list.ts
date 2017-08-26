import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { VideoStorage } from '../services/index';

@Component({
  selector: 'video-list',
  templateUrl: './list.html'
})

export class VideoList implements OnInit, OnDestroy {
  private list: any = [];
  private subscription: Subscription;

  constructor(
    private storage: VideoStorage
  ) { }

  ngOnInit() {
    this.list = this.storage.list;

    this.subscription = this.storage.onChanged().subscribe(() => {
      this.list = this.storage.list;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    if(window.scrollY + window.innerHeight >= document.body.scrollHeight) {
      this.storage.load();
    }
  }
}
