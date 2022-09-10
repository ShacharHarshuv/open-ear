import * as _ from 'lodash';

// todo: add unit tests
/**
 * Wrapping a pure function to make sure it's not called more than necessary,
 * and returns the same value reference if the input is the same.
 * */
export function pureFunction<GArgs extends any[], GReturnType>(fn: (...args: GArgs) => GReturnType): (...args: GArgs) => GReturnType {
  let lastArgs: GArgs | null = null;
  let lastResult: GReturnType | null = null;

  return (...args: GArgs): GReturnType => {
    console.log('args', args); // todo
    if (lastResult && _.isEqual(args, lastArgs)) {
      return lastResult;
    }
    lastArgs = args;
    lastResult = fn(...args);
    return lastResult;
  };
}
