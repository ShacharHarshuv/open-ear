import * as _ from 'lodash';
import { Key } from '../keys/Key';
import { Note } from 'tone/Tone/core/type/NoteUnits';
import { transpose } from '../transpose';
import { noteTypeToNote } from '../notes/noteTypeToNote';

export type DiatonicScaleDegree = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type ScaleDegree = '1' | 'b2' | '2' | 'b3' | '3' | '4' | '#4' | '5' | 'b6' | '6' | 'b7' | '7';
export type ChromaticScaleDegree = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const scaleDegreeToChromaticDegree: Record<ScaleDegree, ChromaticScaleDegree> = {
  '1': 1,
  'b2': 2,
  '2': 3,
  'b3': 4,
  '3': 5,
  '4': 6,
  '#4': 7,
  '5': 8,
  'b6': 9,
  '6': 10,
  'b7': 11,
  '7': 12,
}

export const chromaticDegreeToScaleDegree = _.invert(scaleDegreeToChromaticDegree) as Record<ChromaticScaleDegree, ScaleDegree>;

export function getScaleDegreeNote(key: Key, scaleDegree: ScaleDegree, octave: number = 4): Note {
  return noteTypeToNote(transpose(key, scaleDegreeToChromaticDegree[scaleDegree] - 1), octave);
}
