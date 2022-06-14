import { testPureFunction } from '../../../../shared/testing-utility/testPureFunction';
import { noteTypeToScaleDegree } from './noteTypeToScaleDegree';

describe('noteTypeToScaleDegree', function() {
  testPureFunction(noteTypeToScaleDegree, [
    {
      args: ['Ab', 'C'],
      returnValue: 'b6',
    },
    {
      args: ['F', 'D'],
      returnValue: 'b3',
    },
    {
      args: ['F#', 'F#'],
      returnValue: '1',
    },
    {
      args: ['Ab', 'Db'],
      returnValue: '5',
    },
  ])
});
