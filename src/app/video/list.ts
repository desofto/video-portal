import { Component, OnInit } from '@angular/core';
import { VideoApi } from '../api/index';

@Component({
  selector: 'video-list',
  templateUrl: './list.html'
})

export class VideoList implements OnInit {
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