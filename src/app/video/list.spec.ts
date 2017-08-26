import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { RouterLinkStubDirective, RouterOutletStubComponent, NgbRatingStubDirective } from '../testing';
import { fakeVideoApi } from '../testing';

import { VideoList, VideoItem } from './';
import { VideoStorage } from '../services';
import { VideoApi } from '../api';

let comp: VideoList;
let fixture: ComponentFixture<VideoList>;

describe('VideoList', () => {
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VideoList, VideoItem,
        RouterLinkStubDirective, RouterOutletStubComponent,
        NgbRatingStubDirective
      ],
      imports: [
      ],
      providers: [
        { provide: VideoApi, useValue: fakeVideoApi },
        VideoStorage
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(VideoList);
      comp    = fixture.componentInstance;
    });
  }));

  beforeEach(() => {
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should show 3 video', () => {
    expect(el.queryAll(By.css('video-item')).length).toBe(3, 'should show 3 videos');
  });

  it('updates video list on event', fakeAsync(() => {
    let videoStorage = el.injector.get(VideoStorage);
    let spy = spyOn(videoStorage.list, 'concat').and.callThrough();

    videoStorage.load();
    tick();
    fixture.detectChanges();

    expect(spy.calls.any()).toBe(true, 'it calls concat to append items to existen array');
    expect(videoStorage.list.length).toBe(6, 'next part of videos are added to storage');
    expect(el.queryAll(By.css('video-item')).length).toBe(6, 'should show additionally loaded 3 videos');
  }));
});
