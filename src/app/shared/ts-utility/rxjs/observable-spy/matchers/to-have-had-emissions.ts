import { Observable } from 'rxjs';
import MatchersUtil = jasmine.MatchersUtil;
import CustomEqualityTester = jasmine.CustomEqualityTester;
import CustomMatcherResult = jasmine.CustomMatcherResult;
import CustomMatcher = jasmine.CustomMatcher;
import { ObservableSpy } from '../observable-spy';

declare global {
  namespace jasmine {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface ObservableMatchers<G> extends jasmine.Matchers<any> {
      toHaveHadEmissions(): boolean;
    }
  }
}

export function toHaveHadEmissions<G>(util: MatchersUtil, customEqualityTester: CustomEqualityTester[]): CustomMatcher {
  return {
    compare: function(actual: Observable<G>): CustomMatcherResult {
      const observableSpy = ObservableSpy.getSpy(actual);
      if (observableSpy.spy.calls.count()) {
        return {
          pass: true,
        };
      }

      return {
        pass: false,
        message: `Expected observable to have had emissions, but it has never emitted.`,
      };
    },
    negativeCompare: function(actual: Observable<G>): jasmine.CustomMatcherResult {
      const observableSpy = ObservableSpy.getSpy(actual);
      if (!observableSpy.spy.calls.count()) {
        return {
          pass: true,
        };
      }

      return {
        pass: false,
        message: `Expected observable not to have had emissions, but it had the following emissions: ` +
          util.pp(observableSpy.spy.calls.all().map(call => call.args[0])),
      };
    },
  };
}
