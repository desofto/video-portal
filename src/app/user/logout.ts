import { Component, OnInit } from '@angular/core';
import { UserApi } from '../api/index';

@Component({
  template: ''
})

export class UserLogout implements OnInit {
  constructor(
    private user_api: UserApi
  ) { }

  ngOnInit() {
    this.user_api.logout();
  }
}
