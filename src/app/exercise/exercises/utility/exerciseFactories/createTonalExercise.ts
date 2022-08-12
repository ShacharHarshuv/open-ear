import { Exercise } from '../../../Exercise';
import {
  TonalExerciseParams,
  tonalExercise,
} from './tonalExercise';
import {
  CreateExerciseParams,
  createExercise,
} from './createExercise';

// todo: remove
// export function createTonalExercise<GAnswer extends string, GSettings extends Exercise.Settings>(
//   params: TonalExerciseParams<GAnswer, GSettings> &
//     Omit<CreateExerciseParams<GAnswer, GSettings>, 'getQuestion' | 'answerList'>
// ): Exercise.IExercise<GAnswer, GSettings> {
//   return createExercise({
//     ...tonalExercise(params),
//     ...params,
//   })
// }
