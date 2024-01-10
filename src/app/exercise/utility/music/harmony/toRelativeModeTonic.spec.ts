import { testPureFunction } from '../../../../shared/testing-utility/testPureFunction';
import { toNoteTypeNumber } from '../notes/toNoteTypeNumber';
import { Mode } from './Mode';
import { toRelativeModeTonic } from './toRelativeModeTonic';

describe(toRelativeModeTonic.name, () => {
  testPureFunction(
    (...args: Parameters<typeof toRelativeModeTonic>) =>
      toNoteTypeNumber(toRelativeModeTonic(...args)),
    [
      {
        args: ['C', Mode.Major, Mode.Minor],
        returnValue: toNoteTypeNumber('A'),
      },
      {
        args: ['Db', Mode.Mixolydian, Mode.Major],
        returnValue: toNoteTypeNumber('Gb'),
      },
      {
        args: ['D', Mode.Minor, Mode.Major],
        returnValue: toNoteTypeNumber('F'),
      },
      {
        args: ['G', Mode.Dorian, Mode.Major],
        returnValue: toNoteTypeNumber('F'),
      },
      {
        args: ['D', Mode.Phrygian, Mode.Major],
        returnValue: toNoteTypeNumber('Bb'),
      },
    ],
  );
});
