import { testPureFunction } from '../../../shared/testing-utility/testPureFunction';
import { getRelativeKeyTonic } from './ChordsInRealSongsExercise';

describe('getRelativeKeyTonic', () => {
  testPureFunction(getRelativeKeyTonic, [
    {
      args: ['D', 'MAJOR'],
      returnValue: 'B',
    },
    {
      args: ['D', 'MINOR'],
      returnValue: 'F',
    },
  ])
});
