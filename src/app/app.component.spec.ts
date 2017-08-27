import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { RouterLinkStubDirective, RouterOutletStubComponent } from './testing';
import { fakeVideoApi, emptyCurrentUser } from './testing';

import { AppComponent } from './app.component';
import { CurrentUser } from './services';

describe('AppComponent not logged in', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterLinkStubDirective, RouterOutletStubComponent
      ],
      imports: [
      ],
      providers: [
        { provide: CurrentUser, useValue: emptyCurrentUser },
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp    = fixture.componentInstance;
    });
  }));

  beforeEach(() => {
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('when not logged in', () => {
    expect(el.query(By.css('.panel')).nativeElement.textContent).not.toContain('Logged in as:');
  });
});

describe('AppComponent logged in', () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    let currentUser = new CurrentUser();
    currentUser.set({ username: 'test user' });

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterLinkStubDirective, RouterOutletStubComponent
      ],
      imports: [
      ],
      providers: [
        { provide: CurrentUser, useValue: currentUser },
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(AppComponent);
      comp    = fixture.componentInstance;
    });
  }));

  beforeEach(() => {
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('shows username', fakeAsync(() => {
    expect(el.query(By.css('.panel')).nativeElement.textContent).toContain('Logged in as: test user');
    expect(el.query(By.css('.panel')).nativeElement.textContent).toContain('Logout', 'Has link to logout');
  }));
});
