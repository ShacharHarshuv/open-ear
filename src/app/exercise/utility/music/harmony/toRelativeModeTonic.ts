import { NoteType } from '../notes/NoteType';
import { scaleDegreeToChromaticDegree } from '../scale-degrees';
import { transpose } from '../transpose';
import { Mode } from './Mode';

export function toRelativeModeTonic(
  note: NoteType,
  source: Mode,
  target: Mode,
) {
  // we can treat the modes like scale degrees in the major scale
  // and convert them to chromatic degrees to calculate the chromatic difference between the modes
  function modeToChromaticDegree(mode: Mode): number {
    return scaleDegreeToChromaticDegree[mode];
  }

  const distance: number =
    (modeToChromaticDegree(target) - modeToChromaticDegree(source)) % 12;

  return transpose(note, distance);
}
