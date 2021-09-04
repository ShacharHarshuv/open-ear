import { NoteType } from './NoteType';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { getNoteType } from './getNoteType';
import {
  toNoteNumber,
  toNoteName
} from './toNoteName';

export function toNoteTypeNumber(noteType: NoteType | number): number {
  if (typeof noteType === 'number') {
    return noteType;
  }
  return toNoteNumber(noteType + '1' as Note) - toNoteNumber('C1');
}

export function toNoteTypeName(noteTypeNumber: NoteType | number): NoteType {
  if (typeof noteTypeNumber === 'string') {
    return noteTypeNumber;
  }
  return getNoteType(toNoteName(toNoteNumber('C1') + noteTypeNumber))
}
