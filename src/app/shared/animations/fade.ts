import {
  AnimationTriggerMetadata,
  style,
  trigger,
} from '@angular/animations';
import {enterLeaveAnimationFactory} from "./enter-leave-animation-factory";

export const fade: AnimationTriggerMetadata = trigger('fade', enterLeaveAnimationFactory({
  steps: [
    style({
      opacity: 0,
    }),
    style({
      opacity: 1,
    }),
  ],
}));
