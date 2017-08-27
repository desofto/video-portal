import { ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { prepareFixture } from '../testing';
import { VideoList } from './';
import { VideoStorage } from '../services';

describe('VideoList', () => {
  let fixture: ComponentFixture<VideoList>;
  let el: DebugElement;

  beforeEach(async(() => {
    prepareFixture(VideoList).then((fix: any) => {
      fixture = fix;
      fixture.detectChanges();
      el = fixture.debugElement;
    });
  }));

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
