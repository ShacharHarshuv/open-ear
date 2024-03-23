import { Key } from '../keys/Key';
import { NoteType } from '../notes/NoteType';
import { toNoteTypeNumber } from '../notes/toNoteTypeNumber';
import { ScaleDegree, chromaticDegreeToScaleDegree } from './ScaleDegrees';

export function noteTypeToScaleDegree(
  noteType: NoteType,
  key: Key,
): ScaleDegree {
  const chromaticDegree: number =
    Math.abs(toNoteTypeNumber(noteType) - toNoteTypeNumber(key)) + 1;
  return chromaticDegreeToScaleDegree[chromaticDegree];
}
