import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { CurrentUser } from '../services';
import { Md5 } from 'ts-md5/dist/md5';
import 'rxjs/add/operator/map';

@Injectable()

export class UserApi {
  constructor (
    private http: Http,
    private router: Router,
    private currentUserService: CurrentUser
  ) {
  }

  login(username: string, password: string) {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const options = new RequestOptions({ headers: headers });
    const body: URLSearchParams = new URLSearchParams();
    body.set('username', username);
    body.set('password', Md5.hashStr(password).toString());

    return this.http.post('http://localhost:3000/user/auth', body.toString(), options)
      .subscribe((response: Response) => {
        // login successful if there are both correct status and session id
        let user = response.json();
        if(user && user.status == 'success' && user.sessionId) {
          // store user details in local storage to keep user logged in between page refreshes
          this.currentUserService.set(user);
        }
        this.router.navigate(['/']);
      });
  }

  logout() {
    let sessionId = this.currentUserService.active.sessionId;
    this.currentUserService.clear();
    return this.http.get(`http://localhost:3000/user/logout?sessionId=${sessionId}`)
      .subscribe((response: Response) => {
        // remove user from local storage to log user out
        this.router.navigate(['/']);
      });
  }
}
