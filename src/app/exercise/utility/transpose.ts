import { NoteEvent } from '../../services/player.service';
import { Frequency } from 'tone/Tone/core/type/Units';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import {
  toNoteName,
  toNoteNumber
} from './toNoteName';
import * as _ from 'lodash';

export function transpose(partOrNotes: Note, semitones: number): Note;
export function transpose(partOrNotes: Note[], semitones: number): Note[];
export function transpose(partOrNotes: Note | Note[], semitones: number): Note | Note[];
export function transpose(partOrNotes: NoteEvent[], semitones: number): NoteEvent[];
export function transpose(partOrNotes: NoteEvent[] | Note[] | Note, semitones: number): NoteEvent[] | Frequency[] | Frequency {
  if (!Array.isArray(partOrNotes)) {
    const note: Note = partOrNotes;
    const newNoteNumber: number = toNoteNumber(note) + semitones;
    if (newNoteNumber > 127 || newNoteNumber < 21) {
      throw new Error(`Out of range. Cannot transpose ${partOrNotes} by ${semitones} semitones`);
    }
    return toNoteName(newNoteNumber);
  }

  if (_.isEmpty(partOrNotes)) {
    return [];
  }

  if (typeof partOrNotes[0] === 'string') {
    const noteList: Note[] = partOrNotes as Note[];
    return _.map(noteList, (note: Note) => transpose(note, semitones));
  }

  const noteEventList: NoteEvent[] = partOrNotes as NoteEvent[];
  return _.map(noteEventList, (noteEvent: NoteEvent): NoteEvent => ({
    ...noteEvent,
    notes: transpose(noteEvent.notes, semitones),
  }));
}
