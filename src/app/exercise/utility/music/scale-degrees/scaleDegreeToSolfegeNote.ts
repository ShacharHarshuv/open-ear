import * as _ from 'lodash';
import { EnharmonicScaleDegree, ScaleDegree } from './ScaleDegrees';
import { SolfegeNote } from './SolfegeNote';

export const scaleDegreeToSolfegeNote: Record<
  EnharmonicScaleDegree,
  SolfegeNote
> = {
  '1': 'Do',
  '#1': 'Di',
  b2: 'Ra',
  '2': 'Re',
  '#2': 'Ri',
  b3: 'Me',
  '3': 'Mi',
  '4': 'Fa',
  '#4': 'Fi',
  b5: 'Se',
  '5': 'Sol',
  '#5': 'Si',
  b6: 'Le',
  '6': 'La',
  '#6': 'Li',
  b7: 'Te',
  '7': 'Ti',
  8: 'Do',
  9: 'Re',
  '#9': 'Ri',
  11: 'Fa',
  bb7: 'La',
};
export const solfegeNoteToScaleDegree: Record<SolfegeNote, ScaleDegree> =
  _.invert(scaleDegreeToSolfegeNote) as Record<SolfegeNote, ScaleDegree>;
