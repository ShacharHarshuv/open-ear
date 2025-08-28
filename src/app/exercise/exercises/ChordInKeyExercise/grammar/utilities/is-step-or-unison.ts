import {
  EnharmonicScaleDegree,
  scaleDegreeToChromaticDegree,
} from '../../../../utility';

export function isStepOrUnison(
  scaleDegree1: EnharmonicScaleDegree,
  scaleDegree2: EnharmonicScaleDegree,
) {
  return (
    Math.abs(
      scaleDegreeToChromaticDegree[scaleDegree1] -
        scaleDegreeToChromaticDegree[scaleDegree2],
    ) <= 2
  );
}
