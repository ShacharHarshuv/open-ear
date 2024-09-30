import { testPureFunction } from '../../../../shared/testing-utility/testPureFunction';
import { simplifyExtensions } from './simplifyExtensions';

function noChange<const T>(value: T) {
  return {
    args: [value] as const,
    returnValue: value,
  };
}

function simplify<const T>(value: T) {
  return {
    to: <const U>(newValue: U) => ({
      args: [value] as const,
      returnValue: newValue,
    }),
  };
}

describe('simplifyExtensions', () => {
  testPureFunction(simplifyExtensions, [
    noChange('I'),
    noChange('ii'),
    noChange('IV/6'),
    noChange('III'),
    noChange('IV7'),
    noChange('V7#9'),
    simplify('Imaj7').to('I'),
    simplify('Imaj7/3').to('I/3'),
    simplify('vi7').to('vi'),
    simplify('III7').to('III'),
    simplify('V9').to('V'),
    simplify('IV9').to('IV7'),
    noChange('V11'),
  ]);
});
