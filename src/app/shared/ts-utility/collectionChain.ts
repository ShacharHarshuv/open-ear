import {
  map,
  filter,
  toPairs,
  orderBy,
  groupBy,
  sortBy,
  mapValues,
  keyBy,
} from 'lodash';

const collectionChainableFunctions = {
  map,
  filter,
  toPairs,
  orderBy,
  groupBy,
  sortBy,
  keyBy,
  mapValues,
};

// idea taken from: https://github.com/lodash/lodash/issues/3298#issuecomment-341685354
export const collectionChain = <G>(input: G[]) => {
  let value: any = input;
  const wrapper = {
    ...mapValues(collectionChainableFunctions, (f: any) => (...args: any[]) => {
      // lodash always puts input as the first argument
      value = f(value, ...args);
      return wrapper;
    }),
    value: () => value,
  } as const;
  return wrapper;
};
