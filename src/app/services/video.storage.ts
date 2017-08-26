import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { VideoApi } from '../api/index';

@Injectable()

export class VideoStorage {
  private subject = new Subject<any>();
  public list: any = null;

  constructor(
    private video_api: VideoApi
  ) {
    this.video_api.list().then(list => {
      this.list = list;
      this.subject.next();
    });
  }

  load() {
    this.video_api.list(this.list.length).then(list => {
      this.list = this.list.concat(list);
      this.subject.next();
    });
  }

  onChanged(): Observable<any> {
    return this.subject.asObservable();
  }
}
