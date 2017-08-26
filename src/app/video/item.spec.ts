import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { NgbModule, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

import { RouterLinkStubDirective, RouterOutletStubComponent } from '../testing';

import { VideoItem } from './';
import { VideoApi } from '../api';

let comp:    VideoItem;
let fixture: ComponentFixture<VideoItem>;

describe('VideoItem', () => {
  let el:      DebugElement;

  beforeEach(async(() => {
    var fakeVideoApi = {
      avgRating(ratings: Array<number>) {
        return 5;
      }
    }

    TestBed.configureTestingModule({
      declarations: [
        VideoItem,
        RouterLinkStubDirective, RouterOutletStubComponent
      ],
      imports: [
        NgbModule
      ],
      providers: [
        NgbRatingConfig,
        { provide: VideoApi, useValue: fakeVideoApi }
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(VideoItem);
      comp    = fixture.componentInstance;
    });
  }));

  beforeEach(() => {
    el = fixture.debugElement.query(By.css('.panel'));

    comp.video = {
      _id: '123',
      name: 'joke [1]',
      ratings: [1,2,3],
      description: 'test video description'
    }
    fixture.detectChanges();
  });

  it('should display title and description', () => {
    expect(el.nativeElement.textContent).toContain('joke [1]');

    expect(el.nativeElement.textContent).toContain('test video description');
  });
});
