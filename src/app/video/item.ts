import { Component, Input, ViewChild } from '@angular/core';
import { VideoApi } from '../api';

// A single video item (preview). Used both for main list and sidebar

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
  // Video object to show
  @Input('video') video: Object;

  constructor(
    private video_api: VideoApi
  ) { }

  avgRating(): Number {
    // returns average rating of video
    return this.video_api.avgRating(this.video);
  }
}
