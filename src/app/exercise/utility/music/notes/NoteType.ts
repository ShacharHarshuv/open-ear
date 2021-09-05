export type NoteType = 'C' | 'F' | 'A#' | 'Bb' | 'D#' | 'Eb' | 'G#' | 'Ab' | 'C#' | 'Db' | 'F#' | 'Gb' | 'B' | 'E' | 'A' | 'D' | 'G';
const noteTypeMap: {[noteType in NoteType]: true} = {
  'A#': true,
  'C#': true,
  'D#': true,
  'F#': true,
  'G#': true,
  A: true,
  B: true,
  C: true,
  D: true,
  E: true,
  F: true,
  G: true,
  Ab: true,
  Bb: true,
  Db: true,
  Eb: true,
  Gb: true,
}
export const ALL_NOTE_TYPES: NoteType[] = Object.keys(noteTypeMap) as NoteType[];
