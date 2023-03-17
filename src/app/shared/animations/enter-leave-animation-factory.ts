import {
  animate,
  AnimationMetadata,
  AnimationStyleMetadata,
  keyframes,
  state,
  style,
  transition
} from "@angular/animations";
import * as CSS from "csstype";
import * as _ from "lodash";

function reverseSteps(
  steps: AnimationStyleMetadata[]
): AnimationStyleMetadata[] {
  return [...steps].reverse();
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
    animationStyleMetadataList.push(
      transition('visible => hidden', [
        animate(args.timing!, keyframes(reverseSteps(args.steps))),
      ]),
      transition(':leave', [
        animate(args.timing!, keyframes(reverseSteps(args.steps))),
      ])
    );
  }

  return animationStyleMetadataList;
}
