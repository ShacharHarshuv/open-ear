import { testPureFunction } from '../../../../shared/testing-utility/testPureFunction';
import {
  getNoteFromScaleDegree,
  getScaleDegreeFromNote,
} from './ScaleDegrees';

describe('getNoteFromScaleDegree', () => {
  testPureFunction(getNoteFromScaleDegree, [
    {
      args: ['C', '1'],
      returnValue: 'C4',
    },
    {
      args: ['C', '2'],
      returnValue: 'D4',
    },
    {
      args: ['C', '#4'],
      returnValue: 'F#4',
    },
    {
      args: ['Eb', '3'],
      returnValue: 'G4',
    },
    {
      args: ['F', 'b7'],
      returnValue: 'D#4', // currently, sharps are always returned, but preferably we'll return Eb here
    },
  ])
});

describe('getScaleDegreeFromNote', function() {
  testPureFunction(getScaleDegreeFromNote, [
    {
      args: ['C', 'D4'],
      returnValue: '2',
    },
    {
      args: ['C', 'Eb4'],
      returnValue: 'b3',
    },
    {
      args: ['D', 'Eb4'],
      returnValue: 'b2',
    }
  ])
});
