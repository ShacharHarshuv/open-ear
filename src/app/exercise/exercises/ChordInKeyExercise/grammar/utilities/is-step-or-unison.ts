import { ScaleDegree, scaleDegreeToChromaticDegree } from '../../../../utility';

export function isStepOrUnison(
  scaleDegree1: ScaleDegree,
  scaleDegree2: ScaleDegree,
) {
  return (
    Math.abs(
      scaleDegreeToChromaticDegree[scaleDegree1] -
        scaleDegreeToChromaticDegree[scaleDegree2],
    ) <= 2
  );
}
