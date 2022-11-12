import { NoteEvent } from '../../../services/player.service';
import { Frequency } from 'tone/Tone/core/type/Units';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import {
  toNoteName,
  toNoteNumber,
} from './notes/toNoteName';
import * as _ from 'lodash';
import {
  NoteType,
  ALL_NOTE_TYPES,
} from './notes/NoteType';
import {
  toNoteTypeName,
  toNoteTypeNumber,
} from './notes/toNoteTypeNumber';
import {
  OneOrMany,
  isValueTruthy,
} from '../../../shared/ts-utility';
import { Interval } from './intervals/Interval';
import { NotesRange } from './NotesRange';
import {
  MAX_NOTE_NUMBER,
  MIN_NOTE_NUMBER,
} from './notes/consts';

export function transpose(partOrNotes: Note, semitones: number): Note;
export function transpose(partOrNotes: NoteType, semitones: number): NoteType;
export function transpose(partOrNotes: Note[], semitones: number): Note[];
export function transpose(partOrNotes: Note | Note[], semitones: number): Note | Note[];
export function transpose(partOrNotes: NoteEvent[], semitones: number): NoteEvent[];
export function transpose(partOrNotes: NoteEvent[] | OneOrMany<Note>, semitones: number): NoteEvent[] | OneOrMany<Note>;
export function transpose(partOrNotes: NotesRange, semitones: number): NotesRange;
export function transpose(partOrNotes: NoteEvent[] | Note[] | Note | NoteType, semitones: number): NoteEvent[] | Frequency[] | Frequency | NoteType;
export function transpose(partOrNotes: NoteEvent[] | Note[] | Note | NoteType | NotesRange, semitones: number): NoteEvent[] | Frequency[] | Frequency | NoteType | NotesRange {
  if (partOrNotes instanceof NotesRange) {
    // in the case the range goes out of available range, we'll trim it
    const minSemitonesToTranspose = MIN_NOTE_NUMBER - partOrNotes.lowestNoteNumber;
    const maxSemitonesToTranspose = MAX_NOTE_NUMBER - partOrNotes.highestNoteNumber;
    const semitonesToTranspose = Math.max(minSemitonesToTranspose, Math.min(maxSemitonesToTranspose, semitones));
    return new NotesRange(transpose(partOrNotes.lowestNoteName, semitonesToTranspose), transpose(partOrNotes.highestNoteName, semitonesToTranspose))
  }

  if (!Array.isArray(partOrNotes)) {
    const note: Note | NoteType = partOrNotes;
    if (ALL_NOTE_TYPES.includes(note as NoteType)) {
      return toNoteTypeName((toNoteTypeNumber(note as NoteType) + semitones) % Interval.Octave)
    }

    const newNoteNumber: number = toNoteNumber(note as Note) + semitones;
    if (newNoteNumber > MAX_NOTE_NUMBER || newNoteNumber < MIN_NOTE_NUMBER) {
      throw new Error(`Out of range. Cannot transpose ${partOrNotes} by ${semitones} semitones`);
    }
    return toNoteName(newNoteNumber);
  }

  if (_.isEmpty(partOrNotes)) {
    return [];
  }

  if (typeof partOrNotes[0] === 'string') {
    const noteList: Note[] = partOrNotes as Note[];
    const errors: any[] = [];
    const transposedNotes = _.map(noteList, (note: Note) => {
      try {
        return transpose(note, semitones)
      } catch(e) {
        errors.push(e);
        return null;
      }
    }).filter(isValueTruthy);
    if (_.isEmpty(transposedNotes)) {
      throw errors[0];
    } else {
      for (let error of errors) {
        console.error(error);
      }
      return transposedNotes;
    }
  }

  const noteEventList: NoteEvent[] = partOrNotes as NoteEvent[];
  return _.map(noteEventList, (noteEvent: NoteEvent): NoteEvent => ({
    ...noteEvent,
    notes: transpose(noteEvent.notes, semitones),
  }));
}
