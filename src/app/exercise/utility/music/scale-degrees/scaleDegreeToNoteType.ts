import { Key } from '../keys/Key';
import { transpose } from '../transpose';
import { ScaleDegree, scaleDegreeToChromaticDegree } from './ScaleDegrees';

export function scaleDegreeToNoteType(scaleDegree: ScaleDegree, key: Key) {
  return transpose(key, scaleDegreeToChromaticDegree[scaleDegree] - 1);
}
