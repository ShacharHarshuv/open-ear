import { NoteNumberOrName } from '../notes/NoteNumberOrName';
import { toNoteNumber } from '../notes/toNoteName';

export function getInterval(
  note1: NoteNumberOrName,
  note2: NoteNumberOrName
): number {
  return Math.abs(toNoteNumber(note1) - toNoteNumber(note2));
}
