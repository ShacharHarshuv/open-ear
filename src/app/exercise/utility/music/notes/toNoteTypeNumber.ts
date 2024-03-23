import { Note } from 'tone/Tone/core/type/NoteUnits';
import { NoteType } from './NoteType';
import { getNoteType } from './getNoteType';
import { toNoteName, toNoteNumber } from './toNoteName';

export function toNoteTypeNumber(noteType: NoteType | number): number {
  if (typeof noteType === 'number') {
    return noteType;
  }
  return toNoteNumber((noteType + '1') as Note) - toNoteNumber('C1');
}

export function toNoteTypeName(noteTypeNumber: NoteType | number): NoteType {
  if (typeof noteTypeNumber === 'string') {
    return noteTypeNumber;
  }
  return getNoteType(toNoteName(toNoteNumber('C1') + noteTypeNumber));
}
