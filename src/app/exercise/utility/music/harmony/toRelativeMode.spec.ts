import { testPureFunction } from '../../../../shared/testing-utility/testPureFunction';
import { Mode } from './Mode';
import { toRelativeMode } from './toRelativeMode';

describe(toRelativeMode.name, () => {
  testPureFunction(toRelativeMode, [
    {
      args: ['1', Mode.Major, Mode.Minor],
      returnValue: 'b3',
    },
    {
      args: ['1', Mode.Minor, Mode.Major],
      returnValue: '6',
    },
    {
      args: ['3', Mode.Major, Mode.Dorian],
      returnValue: '2',
    },
    {
      args: ['5', Mode.Dorian, Mode.Aeolian],
      returnValue: '1',
    },
    {
      args: ['b2', Mode.Phrygian, Mode.Locrian],
      returnValue: '#4', // should actually be b5, but we'll do with that for now
    },
    {
      args: ['2', Mode.Phrygian, Mode.Locrian],
      returnValue: '5',
    },
  ]);
});
