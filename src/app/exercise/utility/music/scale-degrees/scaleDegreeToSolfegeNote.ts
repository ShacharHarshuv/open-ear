import { SolfegeNote } from './SolfegeNote';
import { ScaleDegree } from './ScaleDegrees';
import * as _ from 'lodash';

export const scaleDegreeToSolfegeNote: Record<ScaleDegree, SolfegeNote> = {
  '1': 'Do',
  'b2': 'Ra',
  '2': 'Re',
  'b3': 'Me',
  '3': 'Mi',
  '4': 'Fa',
  '#4': 'Fi',
  '5': 'Sol',
  'b6': 'Le',
  '6': 'La',
  'b7': 'Te',
  '7': 'Ti',
}
export const solfegeNoteToScaleDegree: Record<SolfegeNote, ScaleDegree> = _.invert(scaleDegreeToSolfegeNote) as Record<SolfegeNote, ScaleDegree>;
