import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'ngb-rating'
})
export class NgbRatingStubDirective {
  @Input('rate') rate: any;
  @Input('readonly') readonly: any;
  @Input('max') max: any;
}
