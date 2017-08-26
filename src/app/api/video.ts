import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { CurrentUser }    from '../services/index';
import 'rxjs/add/operator/map';

@Injectable()

// Api for access video
// We are using promises instead of observable here because there are one time events

export class VideoApi {
  constructor (
    private http: Http,
    // for sessionId
    private currentUser: CurrentUser
  ) {}

  // Load next part of video
  list(skip?: Number, limit?: Number) {
    return new Promise((resolve, reject) => {
      let sessionId = this.currentUser.active.sessionId;
      this.http.get(`http://localhost:3000/videos?sessionId=${sessionId}&skip=${skip || ''}&limit=${limit || ''}`)
        .map(res => res.json())
        .subscribe(res => {
          if(res.status == 'success') {
            resolve(res.data);
          } else {
            reject();
          }
        }, () => reject())
    });
  }

  // Get information about a video
  one(id: string) {
    return new Promise((resolve, reject) => {
      let sessionId = this.currentUser.active.sessionId;

      this.http.get(`http://localhost:3000/video?sessionId=${sessionId}&videoId=${id}`)
        .map(res => res.json())
        .subscribe(res => {
          if(res.status == 'success') {
            resolve(res.data);
          } else {
            reject();
          }
        }, () => reject())
    });
  }

  // Rate a video
  rate(id: string, rating: Number) {
    return new Promise((resolve, reject) => {
      let sessionId = this.currentUser.active.sessionId;

      const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      const options = new RequestOptions({ headers: headers });
      const body: URLSearchParams = new URLSearchParams();
      body.set('videoId', id);
      body.set('rating', rating.toString());

      this.http.post(`http://localhost:3000/video/ratings?sessionId=${sessionId}`, body.toString(), options)
        .map(res => res.json())
        .subscribe(res => {
          if(res.status == 'success') {
            resolve(res.data);
          } else {
            reject();
          }
        }, () => reject())
    });
  }

  // Helper function to calculate average rating of video
  avgRating(video): Number {
    let sum = video.ratings.reduce((previous, current) => current += previous);
    return sum / video.ratings.length;
  }
}
