import { Note } from 'tone/Tone/core/type/NoteUnits';
import { NoteType } from './NoteType';

export function noteTypeToNote(noteType: NoteType, octave: number): Note {
  return (noteType + octave) as Note;
}
