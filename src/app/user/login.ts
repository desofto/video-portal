import { Component, OnInit } from '@angular/core';
import { UserApi } from '../api/index';

@Component({
  templateUrl: './login.html',
  styles: [`
    .form {
      margin: auto;
      width: 20em;
    }
  `]
})

export class UserLogin implements OnInit {
  username: string;
  password: string;

  constructor(
    private user_api: UserApi
  ) { }

  ngOnInit() {
    this.username = 'ali';
    this.password = 'password';
  }

  login() {
    this.user_api.login(this.username, this.password);
  }
}
