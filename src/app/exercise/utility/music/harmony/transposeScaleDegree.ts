import { Interval } from '../intervals/Interval';
import {
  ScaleDegree,
  getNoteFromScaleDegree,
  getScaleDegreeFromNote,
} from '../scale-degrees';
import { transpose } from '../transpose';

export function transposeScaleDegree(
  scaleDegree: ScaleDegree,
  interval: Interval,
) {
  const note = getNoteFromScaleDegree('C', scaleDegree);
  const transposedNote = transpose(note, interval);
  return getScaleDegreeFromNote('C', transposedNote);
}
