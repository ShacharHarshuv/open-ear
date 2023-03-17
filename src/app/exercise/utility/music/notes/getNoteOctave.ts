import { Note } from 'tone/Tone/core/type/NoteUnits';

export function getNoteOctave(note: Note): number {
  return +note.match(/\d+/g)![0];
}
