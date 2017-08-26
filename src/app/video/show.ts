import { Component, ViewChild, OnInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VideoApi } from '../api/index';

@Component({
  templateUrl: './show.html',
  styles: [`
    .star {
      font-size: 3rem;
      color: #b0c4de;
    }
    .filled {
      color: #1e90ff;
    }
  `]
})

export class VideoShow implements OnInit, AfterViewChecked {
  private video: any;
  private myRate: Number;
  private autoPlay: boolean = false;

  @ViewChild('videoPlayer') videoplayer: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private video_api: VideoApi
  ) { }

  ngOnInit() {
    this.route.params.subscribe((p: any) => {
      this.video_api.one(p.id).then(video => {
        this.autoPlay = true;
        this.video = video;
        window.scrollTo(0, 0);
      }, () => {
        // navigate to video list if video was not found
        this.router.navigate(['/']);
      });
    });
  }

  ngAfterViewChecked() {
    if(this.autoPlay && this.videoplayer) {
      this.videoplayer.nativeElement.play();
      this.autoPlay = false;
    }
  }

  toggleVideo() {
    if(this.videoplayer.nativeElement.paused) {
      this.videoplayer.nativeElement.play();
    } else {
      this.videoplayer.nativeElement.pause();
    }
  }

  avgRating(): Number {
    return this.video_api.avgRating(this.video);
  }

  rate(rating) {
    (document.activeElement as HTMLElement).blur();
    if(this.myRate) return;
    this.myRate = rating;
    this.video_api.rate(this.video._id, rating).then(video => {
      this.video = video;
    });
  }
}
