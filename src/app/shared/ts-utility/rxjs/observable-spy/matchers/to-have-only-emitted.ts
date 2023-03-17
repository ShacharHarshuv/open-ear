import { Observable } from "rxjs";
import { ObservableSpy } from "../observable-spy";
import { compareEquality } from "../../../../testing-utility/jasmine/custom-matchers/utility";
import MatchersUtil = jasmine.MatchersUtil;
import CustomEqualityTester = jasmine.CustomEqualityTester;
import CustomMatcher = jasmine.CustomMatcher;
import CustomMatcherResult = jasmine.CustomMatcherResult;

declare global {
  namespace jasmine {
    interface ObservableMatchers<G> extends jasmine.Matchers<any> {
      toHaveOnlyEmitted(value: G): boolean;
    }
  }
}

export function toHaveOnlyEmitted<G>(
  util: MatchersUtil,
  customEqualityTester: CustomEqualityTester[]
): CustomMatcher {
  return {
    compare: function (
      actual: Observable<G>,
      expected: G
    ): CustomMatcherResult {
      const observableSpy = ObservableSpy.getSpy(actual);
      const calls = observableSpy.spy.calls;
      if (calls.count() === 0) {
        return {
          pass: false,
          message: `Expected observable to emit but it had no emissions.`,
        };
      }
      if (calls.count() > 1) {
        return {
          pass: false,
          message: `Expected observable to emit only once but it emitted ${calls.count()} time.`,
        };
      }

      const actualEmission: G = calls.mostRecent().args[0];

      return compareEquality(
        util,
        expected,
        actualEmission,
        `Expected observable to emit:
        ${util.pp(expected)}
        but actual emission was:
        ${util.pp(actualEmission)}\n\n`
      );
    },
  };
}
