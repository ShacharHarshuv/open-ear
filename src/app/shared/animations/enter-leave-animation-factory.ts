import {
  animate,
  AnimationMetadata,
  AnimationStyleMetadata,
  keyframes,
  state,
  style,
  transition,
} from '@angular/animations';
import * as CSS from 'csstype';
import * as _ from 'lodash';

function reverseSteps(
  steps: AnimationStyleMetadata[]
): AnimationStyleMetadata[] {
  return [...steps].reverse().map((step, i) => ({
    ...step,
    offset: step.offset ? 1.0 - step.offset : i * (1.0 / steps.length),
  }));
}

export function enterLeaveAnimationFactory(args: {
  steps: AnimationStyleMetadata[];
  timing?: string | number;
  animateOnLeave?: boolean;
  hiddenStyle?: CSS.StandardProperties;
}): AnimationMetadata[] {
  _.defaults(args, {
    timing: '200ms ease-out',
    animateOnLeave: true,
  });

  const hiddenStyle: CSS.StandardProperties = args.hiddenStyle || {
    display: 'none',
  };

  const animationStyleMetadataList: AnimationMetadata[] = [
    state('hidden', style(hiddenStyle as any)),
    transition('hidden => visible', [
      animate(args.timing!, keyframes(args.steps)),
    ]),
    transition(':enter', [animate(args.timing!, keyframes(args.steps))]),
  ];

  if (args.animateOnLeave) {
    const reversedSteps = reverseSteps(args.steps);
    animationStyleMetadataList.push(
      transition('visible => hidden', [
        animate(args.timing!, keyframes(reversedSteps)),
      ]),
      transition(':leave', [animate(args.timing!, keyframes(reversedSteps))])
    );
  }

  return animationStyleMetadataList;
}
