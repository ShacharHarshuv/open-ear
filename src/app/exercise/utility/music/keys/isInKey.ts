import { NoteNumberOrName } from '../notes/NoteNumberOrName';
import { Key } from './Key';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import {
  toNoteName,
  toNoteNumber
} from '../notes/toNoteName';
import { transpose } from '../transpose';
import { getDistanceOfKeys } from './getDistanceOfKeys';
import { mod } from '../../../../shared/ts-utility/mod';
import { Interval } from '../intervals/Interval';

const CMajorFirstOctave: Note[] =  ['C1', 'D1', 'E1', 'F1', 'G1', 'A1', 'B1'];

export function isInKey(note: NoteNumberOrName, key: Key) {
  function transposeToFirstOctave(note: NoteNumberOrName): Note {
    return toNoteName(mod(toNoteNumber(note) - toNoteNumber('C1'), Interval.Octave) + toNoteNumber('C1'));
  }
  const noteTransposedToFirstOctave: Note = transposeToFirstOctave(note);
  const distanceOfKeyFromC: number = mod(getDistanceOfKeys(key, 'C'), Interval.Octave);
  const scaleOfKey: Note[] = transpose(CMajorFirstOctave, distanceOfKeyFromC);
  const scaleOfKeyInFirstOctave = scaleOfKey.map(transposeToFirstOctave);
  return scaleOfKeyInFirstOctave.map(toNoteNumber).includes(toNoteNumber(noteTransposedToFirstOctave));
}
