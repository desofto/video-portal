import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';

import { NgbModule, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

import { RouterLinkStubDirective, RouterOutletStubComponent, NgbRatingStubDirective } from './';
import { fakeVideoApi, fakeUserApi, fakeRouter } from './';

import { VideoList, VideoItem } from '../video';
import { VideoStorage } from '../services';
import { VideoApi, UserApi } from '../api';

import { AppComponent } from '../app.component';
import { CurrentUser } from '../services';

export function prepareFixture(componentClass) {
  return new Promise((resolve, reject) => {
    let currentUser = new CurrentUser();
    currentUser.set({ username: 'test user' });

    TestBed.configureTestingModule({
      declarations: [
        componentClass,
        VideoList, VideoItem,
        RouterLinkStubDirective, RouterOutletStubComponent,
        NgbRatingStubDirective // it speeds up testing 5-6 times
      ],
      imports: [
        // NgbModule -- NgbRatingStubDirective in use
        FormsModule
      ],
      providers: [
        //NgbRatingConfig, -- NgbRatingStubDirective in use
        { provide: Router, useValue: fakeRouter },
        { provide: UserApi, useValue: fakeUserApi },
        { provide: VideoApi, useValue: fakeVideoApi },
        { provide: CurrentUser, useValue: currentUser },
        VideoStorage,
      ]
    })
    .compileComponents()
    .then(() => {
      let fixture = TestBed.createComponent(componentClass);
      resolve(fixture);
    });
  });
}
