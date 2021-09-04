import { Key } from './Key';
import { toNoteNumber } from '../notes/toNoteName';
import { Note } from 'tone/Tone/core/type/NoteUnits';

export function getDistanceOfKeys(to: Key, from: Key): number {
  return (toNoteNumber(to + '1' as Note) - toNoteNumber(from + '1' as Note)) % 12;
}
