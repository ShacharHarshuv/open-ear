import { NoteType } from '../notes/NoteType';
import { Key } from '../keys/Key';
import { ScaleDegree, chromaticDegreeToScaleDegree } from './ScaleDegrees';
import { toNoteTypeNumber } from '../notes/toNoteTypeNumber';

export function noteTypeToScaleDegree(
  noteType: NoteType,
  key: Key
): ScaleDegree {
  const chromaticDegree: number =
    Math.abs(toNoteTypeNumber(noteType) - toNoteTypeNumber(key)) + 1;
  return chromaticDegreeToScaleDegree[chromaticDegree];
}
