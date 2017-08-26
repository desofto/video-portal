import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApi } from '../api';

// Login form

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
    private user_api: UserApi,
    private router: Router
  ) { }

  ngOnInit() {
    // Default login and password. Only for DEMO.
    this.username = 'ali';
    this.password = 'password';
  }

  login() {
    // Login user, store user data and redirect to root at end
    this.user_api.login(this.username, this.password).then(() => this.router.navigate(['/']));
  }
}
