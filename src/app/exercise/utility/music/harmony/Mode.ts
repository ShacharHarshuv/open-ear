import {
  ScaleDegree,
  scaleDegreeToChromaticDegree,
  chromaticDegreeToScaleDegree,
} from './ScaleDegrees';
import { mod } from '../../../../shared/ts-utility/mod';

export enum Mode {
  Ionian = 1,
  Dorian,
  Phrygian,
  Lydian,
  Mixolydian,
  Aeolian,
  Locrian,
  Major = Ionian,
  Minor = Aeolian,
}

export function toRelativeMode(scaleDegree: ScaleDegree, source: Mode, target: Mode): ScaleDegree {
  if (source === target) {
    return scaleDegree;
  }
  let distance: number = scaleDegreeToChromaticDegree[source] - scaleDegreeToChromaticDegree[target];
  const chromaticScaleDegree: number = scaleDegreeToChromaticDegree[scaleDegree];
  return chromaticDegreeToScaleDegree[mod(chromaticScaleDegree + distance - 1, 12) + 1];
}
