import {
  compose,
  composeWithMerge,
} from './compose';

describe('compose', function() {
  function fn1(p: { a: number }): { b: number, d: number } {
    return {
      b: p.a + 1,
      d: p.a + 1,
    };
  }

  function fn2(p: { b: number, c: number }): { e: number } {
    return {
      e: p.b + p.c,
    };
  }

  function fn3(p: { d: number, c: number }): { c: number } {
    return {
      c: p.d + p.c,
    }
  }

  it('should work with 2 functions', () => {
    const returnedValue = compose(fn1, fn2)({
      a: 1,
      c: 1,
    });
    expect(returnedValue).toEqual({
      e: 3,
      d: 2,
      b: 2,
    })
  });

  it('should work with three functions', () => {
    const returnValue = compose(fn1, fn2, fn3)({
      a: 1,
      c: 1,
    });
    expect(returnValue).toEqual({
      c: 3,
      e: 3,
      d: 2,
      b: 2,
    });
  });
});

describe('compose with merge', function() {
  const compose = composeWithMerge({
    dictionary: (dic1: Record<string, number>, dic2: Record<string, number>): Record<string, number> => {
      return {
        ...dic1,
        ...dic2,
      }
    },
    array: (arr1: string[], arr2: string[]) => {
      return [...arr1, ...arr2]
    },
  });

  it('should use the merge function in case of a conflict', () => {
    const returnValue = compose(
      (p: { n: number }) => ({
        dictionary: {
          a: p.n,
        },
      }),
      () => ({
        dictionary: {
          b: 2,
        },
      }),
    )({n: 1});
    expect(returnValue).toEqual({
      dictionary: {
        a: 1,
        b: 2,
      }
    })
  })
});
