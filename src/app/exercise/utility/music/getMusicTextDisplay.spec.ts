import { testPureFunction } from '../../../shared/testing-utility/testPureFunction';
import { toMusicalTextDisplay } from './getMusicTextDisplay';

describe('toMusicalTextDisplay', () => {
  testPureFunction(toMusicalTextDisplay, [
    {
      args: ['b3'],
      returnValue: '♭3',
    },
    {
      args: ['viidim'],
      returnValue: 'vii°',
    },
    {
      args: ['#IV'],
      returnValue: '♯IV',
    },
    {
      args: ['i bVII bVI'],
      returnValue: 'i ♭VII ♭VI',
    },
  ]);
});
