import * as _ from 'lodash';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { mod } from '../../../../shared/ts-utility/mod';
import { Interval } from '../intervals/Interval';
import { Key } from '../keys/Key';
import { getDistanceOfKeys } from '../keys/getDistanceOfKeys';
import { getNoteType } from '../notes/getNoteType';
import { noteTypeToNote } from '../notes/noteTypeToNote';
import { transpose } from '../transpose';

export enum Accidental {
  Natural = '',
  Sharp = '#',
  Flat = 'b',
}

export type DiatonicScaleDegree = 1 | 2 | 3 | 4 | 5 | 6 | 7;
// Each chromatic note is spelled once, for all enharmonic alternatives use EnharmonicScaleDegree
export type ScaleDegree =
  | '1'
  | 'b2'
  | '2'
  | 'b3'
  | '3'
  | '4'
  | '#4'
  | '5'
  | 'b6'
  | '6'
  | 'b7'
  | '7';
// Contains enharmonic alternative to ScaleDegree's values
export type EnharmonicScaleDegree =
  | ScaleDegree
  | '#1'
  | '#2'
  | 'b5'
  | '#5'
  | '#6'
  | 'bb7'
  | '8'
  | '9'
  | '#9'
  | '11';

export type ChromaticScaleDegree =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21;
export const scaleDegreeToChromaticDegree: Record<
  ScaleDegree,
  ChromaticScaleDegree
> = {
  '1': 1,
  b2: 2,
  '2': 3,
  b3: 4,
  '3': 5,
  '4': 6,
  '#4': 7,
  '5': 8,
  b6: 9,
  '6': 10,
  b7: 11,
  '7': 12,
};

export const expandedScaleDegreeToChromaticDegree: Record<
  EnharmonicScaleDegree,
  ChromaticScaleDegree
> = {
  ...scaleDegreeToChromaticDegree,
  '#1': 2,
  '#2': 4,
  b5: 7,
  '#5': 9,
  '#6': 11,
  bb7: 10,
  '8': 13,
  '9': 15,
  '#9': 16,
  '11': 18,
};

export const chromaticDegreeToScaleDegree = _.invert(
  scaleDegreeToChromaticDegree,
) as Record<ChromaticScaleDegree, ScaleDegree>;

export function getNoteFromScaleDegree(
  key: Key,
  scaleDegree: EnharmonicScaleDegree,
  octave: number = 4,
): Note {
  const chromaticDegree = expandedScaleDegreeToChromaticDegree[scaleDegree];
  if (chromaticDegree === undefined) {
    throw new Error(`Unknown Scale Degree ${scaleDegree}`)
  }
  return noteTypeToNote(
    transpose(key, mod((chromaticDegree - 1), 12)),
    octave,
  );
}

export function getScaleDegreeFromNote(key: Key, note: Note): ScaleDegree {
  const chromaticDegree: ChromaticScaleDegree = (mod(
    getDistanceOfKeys(getNoteType(note), key),
    Interval.Octave,
  ) + 1) as ChromaticScaleDegree;
  return chromaticDegreeToScaleDegree[chromaticDegree];
}

export function getDiatonicScaleDegreeWithAccidental(
  scaleDegree: ScaleDegree,
): {
  diatonicScaleDegree: DiatonicScaleDegree;
  accidental: Accidental;
} {
  const regexMatch: RegExpMatchArray | null =
    scaleDegree.match(/(b|#)?([1-7])/);
  if (!regexMatch) {
    throw new Error(`${scaleDegree} is not a valid scale degree`);
  }
  return {
    diatonicScaleDegree: +regexMatch[2] as DiatonicScaleDegree,
    accidental: (regexMatch[1] as Accidental) ?? Accidental.Natural,
  };
}

export function transposeScaleDegree(
  scaleDegree: ScaleDegree,
  interval: Interval,
) {
  if (!interval) {
    return scaleDegree;
  }
  const note = getNoteFromScaleDegree('C', scaleDegree);
  const transposedNote = transpose(note, interval);
  return getScaleDegreeFromNote('C', transposedNote);
}

export function isDiatonic(scaleDegree: ScaleDegree) {
  return !(scaleDegree.includes('b') || scaleDegree.includes('#'));
}
