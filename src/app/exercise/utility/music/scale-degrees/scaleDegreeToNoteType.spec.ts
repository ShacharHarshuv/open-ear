import { testPureFunction } from '../../../../shared/testing-utility/testPureFunction';
import { scaleDegreeToNoteType } from './scaleDegreeToNoteType';

describe('scaleDegreeToNoteType', () => {
  testPureFunction(scaleDegreeToNoteType, [
    {
      args: ['1', 'C'],
      returnValue: 'C',
    },
    {
      args: ['4', 'Bb'],
      returnValue: 'D#',
    },
    {
      args: ['b2', 'F#'],
      returnValue: 'G',
    },
  ]);
});
