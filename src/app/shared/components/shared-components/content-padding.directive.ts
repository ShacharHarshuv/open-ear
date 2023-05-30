import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ion-content[padding]',
  standalone: true,
})
export class ContentPaddingDirective {
  @HostBinding('class.--padding')
  @Input('padding')
  isWithPadding: boolean = false;
}
