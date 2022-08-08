type ComposableFunction = (params: object) => object;

type ComposedParamsForTwoFns<Fn1 extends ComposableFunction, Fn2 extends ComposableFunction> = Parameters<Fn1>[0] & Omit<Parameters<Fn2>[0], keyof ReturnType<Fn1>>;

type ComposedReturnForTwoFns<Fn1 extends ComposableFunction, Fn2 extends ComposableFunction> = ReturnType<Fn1> & ReturnType<Fn2>;

type ComposedFunctionForTwoFns<Fn1 extends ComposableFunction, Fn2 extends ComposableFunction> = (params: ComposedParamsForTwoFns<Fn1, Fn2>) => ComposedReturnForTwoFns<Fn1, Fn2>;

type ComposedParams<Fn1 extends ComposableFunction, Fn2 extends ComposableFunction, FnList extends ComposableFunction[]> = FnList extends [infer Fn3, ...infer FnListRest] ?
  Fn3 extends ComposableFunction ? FnListRest extends ComposableFunction[] ? ComposedParams<ComposedFunctionForTwoFns<Fn1, Fn2>, Fn3, FnListRest> : never : never :
  ComposedParamsForTwoFns<Fn1, Fn2>;

type ComposedReturn<Fn1 extends ComposableFunction, Fn2 extends ComposableFunction, FnList extends ComposableFunction[]> = FnList extends [infer Fn3, ...infer FnListRest] ?
  Fn3 extends ComposableFunction ? FnListRest extends ComposableFunction[] ? ComposedReturn<ComposedFunctionForTwoFns<Fn1, Fn2>, Fn3, FnListRest> : 'never' : 'never' :
  ComposedReturnForTwoFns<Fn1, Fn2>;

type MergeFunction<Value> = (a: Value, b: Value) => Value;

export function composeWithMerge<Params extends object>(keyToMergeFn: {[Key in keyof Params]?: MergeFunction<Params[Key]>}) {
  return function compose<Fn1 extends ComposableFunction, Fn2 extends ComposableFunction, FnList extends ComposableFunction[]>(fn1: Fn1, fn2: Fn2, ...fnList: FnList) {
    return (params: ComposedParams<Fn1, Fn2, FnList>): ComposedReturn<Fn1, Fn2, FnList> => {
      if (fnList.length) {
        return compose(compose(fn1, fn2), fnList[0], ...fnList.slice(1))(params) as ComposedReturn<Fn1, Fn2, FnList>;
      }
      const fn1Return = fn1(params);
      const fn2Return = fn2({
        ...params,
        ...fn1Return,
      })
      let returnValue = fn1Return;
      for(let key in fn2Return) {
        if (fn1Return[key] && keyToMergeFn[key]) {
          returnValue[key] = keyToMergeFn[key](fn1Return[key], fn2Return[key]);
        } else {
          returnValue[key] = fn2Return[key];
        }
      }
      return returnValue as ComposedReturn<Fn1, Fn2, FnList>;
    }
  }
}

export const compose = composeWithMerge({});
