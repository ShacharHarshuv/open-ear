import { NoteType } from './NoteType';
import { Note } from 'tone/Tone/core/type/NoteUnits';

export function noteTypeToNote(noteType: NoteType, octave: 1 | 2 | 3 | 4 | 5 | 6 | 7): Note {
  return noteType + octave as Note;
}
