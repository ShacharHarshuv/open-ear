import { NoteType } from "./NoteType";
import { Note } from "tone/Tone/core/type/NoteUnits";

export function noteTypeToNote(noteType: NoteType, octave: number): Note {
  return (noteType + octave) as Note;
}
