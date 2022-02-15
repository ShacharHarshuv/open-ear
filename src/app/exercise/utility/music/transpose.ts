import { NoteEvent } from '../../../services/player.service';
import { Frequency } from 'tone/Tone/core/type/Units';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import {
  toNoteName,
  toNoteNumber
} from './notes/toNoteName';
import * as _ from 'lodash';
import {
  NoteType,
  ALL_NOTE_TYPES
} from './notes/NoteType';
import {
  toNoteTypeName,
  toNoteTypeNumber
} from './notes/toNoteTypeNumber';
import { OneOrMany } from '../../../shared/ts-utility';
import { Interval } from './intervals/Interval';

export function transpose(partOrNotes: Note, semitones: number): Note;
export function transpose(partOrNotes: NoteType, semitones: number): NoteType;
export function transpose(partOrNotes: Note[], semitones: number): Note[];
export function transpose(partOrNotes: Note | Note[], semitones: number): Note | Note[];
export function transpose(partOrNotes: NoteEvent[], semitones: number): NoteEvent[];
export function transpose(partOrNotes: NoteEvent[] | OneOrMany<Note>, semitones: number): NoteEvent[] | OneOrMany<Note>;
export function transpose(partOrNotes: NoteEvent[] | Note[] | Note | NoteType, semitones: number): NoteEvent[] | Frequency[] | Frequency | NoteType;
export function transpose(partOrNotes: NoteEvent[] | Note[] | Note | NoteType, semitones: number): NoteEvent[] | Frequency[] | Frequency | NoteType {
  if (!Array.isArray(partOrNotes)) {
    const note: Note | NoteType = partOrNotes;
    if (ALL_NOTE_TYPES.includes(note as NoteType)) {
      return toNoteTypeName((toNoteTypeNumber(note as NoteType) + semitones) % Interval.Octave)
    }

    const newNoteNumber: number = toNoteNumber(note as Note) + semitones;
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
