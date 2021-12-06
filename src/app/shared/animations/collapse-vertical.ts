import {
  AnimationTriggerMetadata,
  style,
  trigger,
} from '@angular/animations';
import {enterLeaveAnimationFactory} from "./enter-leave-animation-factory";

export const collapseVertical: AnimationTriggerMetadata = trigger('collapseVertical', enterLeaveAnimationFactory({
  steps: [
    style({
      height: 0,
      opacity: 0,
      overflow: 'hidden',
      offset: 0,
      display: 'block',
    }),
    style({
      height: '*',
      opacity: 1,
      overflow: 'hidden',
      offset: 1.0,
      display: 'block',
    }),
  ],
}));
