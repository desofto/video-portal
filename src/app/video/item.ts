import { Component } from '@angular/core';
import { VideoApi } from '../api/index';

@Component({
  selector: 'video-item',
  templateUrl: './item.html'
})

export class VideoItem {
  constructor(
    private video_api: VideoApi
  ) { }
}
