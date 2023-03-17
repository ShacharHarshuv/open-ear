/**
 * Additions to jasmine built in declaration
 * Used for custom matchers
 * */
import { spyMatchers } from "./spy-matchers/spy-matchers";
import { observableSpyMatchers } from "../../../ts-utility/rxjs/observable-spy/observable-spy-matchers";

declare global {
  namespace jasmine {
    interface MatchersUtil {
      equals(
        a: any,
        b: any,
        customTesters?: ReadonlyArray<CustomEqualityTester> | DiffBuilder
      ): boolean;
    }

    const matchers: {
      toEqual(util: MatchersUtil): CustomMatcher;
    };
  }
}

export function initCustomMatchers(): void {
  beforeAll(() => {
    jasmine.addMatchers({
      ...spyMatchers,
      ...observableSpyMatchers,
    });
  });
}
