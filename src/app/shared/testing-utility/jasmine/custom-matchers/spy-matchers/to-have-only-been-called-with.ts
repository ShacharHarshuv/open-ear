import Func = jasmine.Func;
import MatchersUtil = jasmine.MatchersUtil;
import CustomEqualityTester = jasmine.CustomEqualityTester;
import CustomMatcher = jasmine.CustomMatcher;
import MatchableArgs = jasmine.MatchableArgs;
import CustomMatcherResult = jasmine.CustomMatcherResult;

declare global {
  namespace jasmine {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface SpyMatchers<Fn extends Func> extends jasmine.FunctionMatchers<Fn> {
      toHaveOnlyBeenCalledWith(...params: MatchableArgs<Fn>): boolean;
    }
  }
}

export function toHaveOnlyBeenCalledWith<Fn extends Func>(util: MatchersUtil, customEqualityTester: CustomEqualityTester[]): CustomMatcher {
  return {
    // @ts-ignore // type declaration for this function are too strict
    compare: function(actual: jasmine.Spy<Fn>, ...expectedArgs: MatchableArgs<Fn>): CustomMatcherResult {
      if (actual.calls.count() !== 1) {
        return {
          pass: false,
          message: util.buildFailureMessage('toHaveOnlyBeenCalledWith', false, actual, expectedArgs) +
            '\n' +
            'but it was called ' + actual.calls.count() + ' times.',
        };
      }

      const lastCalledArgs = actual.calls.mostRecent().args;
      if (util.equals(lastCalledArgs, expectedArgs, customEqualityTester)) {
        return {
          pass: true,
        };
      } else {
        return {
          pass: false,
          message: util.buildFailureMessage('toHaveOnlyBeenCalledWith', false, actual, expectedArgs) +
            '\n' +
            'but actual last call was:\n' +
            util.pp(lastCalledArgs),
        };
      }
    },
  };
}
