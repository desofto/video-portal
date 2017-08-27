import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { NgbModule, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

import { RouterLinkStubDirective, RouterOutletStubComponent, NgbRatingStubDirective } from './';
import { fakeVideoApi } from './';

import { VideoList, VideoItem } from '../video';
import { VideoStorage } from '../services';
import { VideoApi } from '../api';

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
      ],
      providers: [
        //NgbRatingConfig, -- NgbRatingStubDirective in use
        VideoStorage,
        { provide: CurrentUser, useValue: currentUser },
        { provide: VideoApi, useValue: fakeVideoApi },
      ]
    })
    .compileComponents()
    .then(() => {
      let fixture = TestBed.createComponent(componentClass);
      resolve(fixture);
    });
  });
}
