import { ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { prepareFixture } from './testing';
import { AppComponent } from './app.component';
import { CurrentUser } from './services';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    prepareFixture(AppComponent).then((fix: any) => {
      fixture = fix;
      fixture.detectChanges();
      el = fixture.debugElement;
    });
  }));

  it('when not logged in', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    let currentUser = el.injector.get(CurrentUser);
    currentUser.clear();
    tick();
    fixture.detectChanges();

    expect(el.query(By.css('.panel')).nativeElement.textContent).not.toContain('Logged in as:');
  }));

  it('when logged in shows username', fakeAsync(() => {
    expect(el.query(By.css('.panel')).nativeElement.textContent).toContain('Logged in as: test user');
    expect(el.query(By.css('.panel')).nativeElement.textContent).toContain('Logout', 'Has link to logout');
  }));
});
