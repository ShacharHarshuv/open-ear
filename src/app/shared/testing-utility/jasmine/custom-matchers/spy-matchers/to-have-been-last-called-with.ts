import MatchersUtil = jasmine.MatchersUtil;
import CustomEqualityTester = jasmine.CustomEqualityTester;
import CustomMatcher = jasmine.CustomMatcher;
import CustomMatcherResult = jasmine.CustomMatcherResult;
import Func = jasmine.Func;
import MatchableArgs = jasmine.MatchableArgs;

declare global {
  function expect<T extends jasmine.Func>(spy: jasmine.Spy<T>): jasmine.SpyMatchers<T>;

  namespace jasmine {
    interface SpyMatchers<Fn extends Func> extends jasmine.FunctionMatchers<Fn> {
      toHaveBeenLastCalledWith(...params: MatchableArgs<Fn>): boolean;
    }
  }
}

export function toHaveBeenLastCalledWith<Fn extends Func>(util: MatchersUtil, customEqualityTester: CustomEqualityTester[]): CustomMatcher {
  return {
    // @ts-ignore // type declaration for this function are too strict
    compare: function(actual: jasmine.Spy<Fn>, ...expectedArgs: MatchableArgs<Fn>): CustomMatcherResult {
      const lastCalledArgs = actual.calls.mostRecent().args;
      if (util.equals(lastCalledArgs, expectedArgs, customEqualityTester)) {
        return {
          pass: true,
        };
      } else {
        return {
          pass: false,
          message: util.buildFailureMessage('toHaveBeenLastCalledWith', false, actual, expectedArgs) +
            '\n' +
            'but actual last call was:\n' +
            util.pp(lastCalledArgs),
        };
      }
    },
  };
}
