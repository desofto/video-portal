import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { VideoApi } from '../api';

@Injectable()

// Service for store already loaded videos, shared between components in application.
// Components could subscribe for update events and ask for load next part of videos.

export class VideoStorage {
  private subject = new Subject<any>();
  public list: any = null;

  constructor(
    private video_api: VideoApi
  ) {
    // Load first part of videos in the beginning
    this.video_api.list().then(list => {
      this.list = list;
      // Inform subscribers about changes
      this.subject.next();
    });
  }

  // Loads next part of videos
  load() {
    this.video_api.list(this.list.length).then(list => {
      this.list = this.list.concat(list);
      // and inform subscribers
      this.subject.next();
    });
  }

  // allows clients to subscribe on events
  onChanged(): Observable<any> {
    return this.subject.asObservable();
  }
}
