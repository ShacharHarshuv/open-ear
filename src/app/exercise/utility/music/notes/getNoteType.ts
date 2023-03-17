import { NoteType } from "./NoteType";
import { Note } from "tone/Tone/core/type/NoteUnits";

export function getNoteType(note: Note): NoteType {
  return note
    .split('')
    .filter((c) => ['A', 'B', 'C', 'D', 'E', 'F', 'G', '#', 'b'].includes(c))
    .join('') as NoteType;
}
