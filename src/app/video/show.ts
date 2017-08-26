import { Component, ViewChild, OnInit, AfterViewChecked } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VideoApi } from '../api/index';

// Shows video

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
  // video object to show
  private video: any;
  // my rating to show (if present) instead of average
  private myRate: Number;
  // flag shows video should be automativally started when is loaded
  private autoPlay: boolean = false;

  @ViewChild('videoPlayer') videoplayer: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private video_api: VideoApi
  ) { }

  ngOnInit() {
    this.route.params.subscribe((p: any) => {
      // when we have video id -- load information about it
      this.video_api.one(p.id).then(video => {
        // and autoplay it later
        this.autoPlay = true;
        this.video = video;
        // in case it was a click in sidebar
        window.scrollTo(0, 0);
      }, () => {
        // navigate to video list if video was not found
        this.router.navigate(['/']);
      });
    });
  }

  ngAfterViewChecked() {
    // everything is initialized, it is time to autoplay our video
    if(this.autoPlay && this.videoplayer) {
      this.videoplayer.nativeElement.play();
      this.autoPlay = false;
    }
  }

  toggleVideo() {
    // when user click the video
    if(this.videoplayer.nativeElement.paused) {
      this.videoplayer.nativeElement.play();
    } else {
      this.videoplayer.nativeElement.pause();
    }
  }

  avgRating(): Number {
    // calls service to calculate avg rating. It could be done in html, but it is better to have complex code out of view
    return this.video_api.avgRating(this.video);
  }

  rate(rating) {
    // unfocus rating element. FIXME: search a way to pass some settings into directive
    (document.activeElement as HTMLElement).blur();
    // prevent re-rate. it will not work if user reload page (must be checked on backend).
    if(this.myRate) return;
    // show my rate instead of average
    this.myRate = rating;
    // save rate and update video (actually, not sure it is a good idea here)
    this.video_api.rate(this.video._id, rating).then(video => {
      this.video = video;
    });
  }
}
