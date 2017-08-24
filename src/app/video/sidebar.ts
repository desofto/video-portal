import { Component, OnInit } from '@angular/core';
import { VideoApi } from '../api/index';

@Component({
  selector: 'video-sidebar',
  templateUrl: './sidebar.html'
})

export class VideoSidebar implements OnInit {
  constructor(
    private video_api: VideoApi
  ) { }

  private list: any = [];

  ngOnInit() {
    this.video_api.list().then(list => {
      this.list = list;
    });
  }
}
