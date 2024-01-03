import { mod } from '../../../../shared/ts-utility/mod';
import {
  ScaleDegree,
  chromaticDegreeToScaleDegree,
  scaleDegreeToChromaticDegree,
} from '../scale-degrees';
import { Mode } from './Mode';

export function toRelativeMode(
  scaleDegree: ScaleDegree,
  source: Mode,
  target: Mode,
): ScaleDegree {
  if (source === target) {
    return scaleDegree;
  }
  let distance: number =
    scaleDegreeToChromaticDegree[source] - scaleDegreeToChromaticDegree[target];
  const chromaticScaleDegree: number =
    scaleDegreeToChromaticDegree[scaleDegree];
  return chromaticDegreeToScaleDegree[
    mod(chromaticScaleDegree + distance - 1, 12) + 1
  ];
}
