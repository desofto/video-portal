import { ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { Router } from '@angular/router';

import { prepareFixture, newEvent } from '../testing';
import { UserLogin } from './';
import { UserApi } from '../api';

describe('UserLogin', () => {
  let fixture: ComponentFixture<UserLogin>;
  let el: DebugElement;
  let page: Page;

  beforeEach(async(() => {
    prepareFixture(UserLogin).then((fix: any) => {
      fixture = fix;

      fixture.detectChanges();
      el = fixture.debugElement;
    });
  }));

  it('calls logout from UserApi', fakeAsync(() => {
    let userApi = el.injector.get(UserApi);
    let spyUserApi = spyOn(userApi, 'login').and.callThrough();
    let router = el.injector.get(Router);
    let spyRouter = spyOn(router, 'navigate').and.callThrough();

    fixture.whenStable().then(() => {
      let page: Page = new Page();

      console.log(page.username.value);
      page.username.value = 'uuu';
      page.username.dispatchEvent(newEvent('input'))
      page.password.value = 'ppp';
      page.password.dispatchEvent(newEvent('input'))
      page.button.click();

      tick();

      expect(spyUserApi.calls.any()).toBe(true);
      expect(spyUserApi.calls.first().args).toEqual(['uuu', 'ppp']);
      expect(spyRouter.calls.any()).toBe(true);
      expect(spyRouter.calls.first().args[0]).toEqual(['/']);
    });
  }));

  class Page {
    username: HTMLInputElement;
    password: HTMLInputElement;
    button: HTMLElement;

    constructor() {
      this.username = el.query(By.css('input[name=username]')).nativeElement;
      this.password = el.query(By.css('input[name=password]')).nativeElement;
      this.button = el.query(By.css('button')).nativeElement;
    }
  }
});
