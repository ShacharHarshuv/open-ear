import { testPureFunction } from '../../../shared/testing-utility/testPureFunction';
import { getRelativeKeyTonic } from './ChordsInRealSongsExercise';
import { Mode } from '../../utility';

describe(getRelativeKeyTonic.name, () => {
  testPureFunction(getRelativeKeyTonic, [
    {
      args: ['D', Mode.Major],
      returnValue: 'B',
    },
    {
      args: ['D', Mode.Minor],
      returnValue: 'F',
    },
  ])
});
