import { Component, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';

// Template for wrong url

@Component({
  selector: 'lazy-load',
  template: ''
})

export class LazyLoadComponent {
  @Output('load') load = new EventEmitter();

  constructor(
    private el: ElementRef
  ) { }


  checkVisible(el) {
    var rect = el.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight > 0);
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    if(this.checkVisible(this.el.nativeElement)) {
      this.load.emit();
    }
  }
}
