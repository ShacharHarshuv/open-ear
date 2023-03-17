import {
  Directive,
  HostBinding,
  Input
} from "@angular/core";

@Directive({
  selector: 'ion-content[padding]',
})
export class ContentPaddingDirective {
  @HostBinding('class.--padding')
  @Input('padding')
  isWithPadding: boolean;
}
