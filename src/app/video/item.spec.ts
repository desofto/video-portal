import { ComponentFixture, async, fakeAsync, tick } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { prepareFixture } from '../testing';
import { VideoItem } from './';

describe('VideoItem', () => {
  let fixture: ComponentFixture<VideoItem>;
  let el: DebugElement;

  beforeEach(async(() => {
    prepareFixture(VideoItem).then((fix: any) => {
      fixture = fix;

      fixture.componentInstance.video = {
        _id: '123',
        name: 'joke [1]',
        ratings: [1,2,3],
        description: 'test video description'
      }

      fixture.detectChanges();
      el = fixture.debugElement;
    });
  }));

  it('should display title and description', () => {
    expect(el.query(By.css('.panel')).nativeElement.textContent).toContain('joke [1]');
    expect(el.query(By.css('.panel')).nativeElement.textContent).toContain('test video description');
  });
});
