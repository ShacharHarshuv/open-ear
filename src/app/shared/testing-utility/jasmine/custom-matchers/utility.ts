import CustomMatcherResult = jasmine.CustomMatcherResult;
import MatchersUtil = jasmine.MatchersUtil;

export function compareEquality<G>(
  util: MatchersUtil,
  expected: G,
  actual: G,
  failureMessage: string = '',
): CustomMatcherResult {
  const result: CustomMatcherResult = jasmine.matchers
    .toEqual(util)
    .compare<G>(actual, expected);
  if (!result.pass && failureMessage) {
    result.message = failureMessage + '\n' + result.message;
  }
  return result;
}
