import {
  ScaleDegree,
  scaleDegreeToChromaticDegree,
} from './ScaleDegrees';
import { Key } from '../keys/Key';
import { transpose } from '../transpose';

export function scaleDegreeToNoteType(scaleDegree: ScaleDegree, key: Key) {
  return transpose(key, scaleDegreeToChromaticDegree[scaleDegree] - 1);
}
