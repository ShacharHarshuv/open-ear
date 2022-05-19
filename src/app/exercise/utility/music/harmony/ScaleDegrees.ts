import * as _ from 'lodash';

export type DiatonicScaleDegree = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type ScaleDegree = '1' | 'b2' | '2' | 'b3' | '3' | '4' | '#4' | '5' | 'b6' | '6' | 'b7' | '7';
export type ChromaticScaleDegree = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const scaleDegreeToSemitone: Record<ScaleDegree, ChromaticScaleDegree> = {
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

export const semitoneToScaleDegree = _.invert(scaleDegreeToSemitone) as Record<ChromaticScaleDegree, ScaleDegree>;
