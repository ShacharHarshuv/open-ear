import { testPureFunction } from '../../../shared/testing-utility/testPureFunction';
import { getRelativeKeyTonic } from './ChordsInRealSongsExercise';

describe('getRelativeKeyTonic', () => {
  testPureFunction(getRelativeKeyTonic, [
    {
      args: ['D', 'major'],
      returnValue: 'B',
    },
    {
      args: ['D', 'minor'],
      returnValue: 'F',
    },
  ])
});
