import { Component, Input, ViewChild } from '@angular/core';
import { VideoApi } from '../api/index';

@Component({
  selector: 'video-item',
  templateUrl: './item.html',
  styles: [
    '.panel { margin-right: 20px; }',
    '.star { font-size: 1.5rem; color: #b0c4de; }',
    '.filled { color: #1e90ff; }',
    '.description { display: inline-block; height: 80px; overflow: hidden; }'
  ]
})

export class VideoItem {
  @Input('video') video: Object;
  @ViewChild('videoPlayer') videoplayer: any;

  constructor(
    private video_api: VideoApi
  ) { }

  rating(ratings): Number {
    let sum = ratings.reduce((previous, current) => current += previous);
    return sum / ratings.length;
  }

  toggleVideo(event: any) {
    this.videoplayer.play();
  }
}
