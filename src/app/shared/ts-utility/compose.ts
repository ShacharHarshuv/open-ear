import * as _ from 'lodash';

export type ComposableFunction = (params: object) => object;

type ComposedParamsForTwoFns<MergeMap extends PropertiesMergeConfig<object>, Fn1 extends ComposableFunction, Fn2 extends ComposableFunction> =
  Parameters<Fn1>[0] &
  Omit<Parameters<Fn2>[0], keyof ReturnType<Fn1>> &  // require parameters that Fn2 needs and Fn1 doesn't supply
  Partial<Pick<Parameters<Fn2>[0], keyof MergeMap & keyof Parameters<Fn2>[0]>>; // optional parameters that Fn2 needs even if Fn1 supplies them as long as they can be merged

type ComposedReturnForTwoFns<Fn1 extends ComposableFunction, Fn2 extends ComposableFunction> = ReturnType<Fn1> & ReturnType<Fn2>;

type ComposedFunctionForTwoFns<MergeMap extends PropertiesMergeConfig<object>, Fn1 extends ComposableFunction, Fn2 extends ComposableFunction> = (params: ComposedParamsForTwoFns<MergeMap, Fn1, Fn2>) => ComposedReturnForTwoFns<Fn1, Fn2>;

type ComposedParams<MergeMap extends PropertiesMergeConfig<object>, Fn1 extends ComposableFunction, Fn2 extends ComposableFunction, FnList extends ComposableFunction[]> = FnList extends [infer Fn3, ...infer FnListRest] ?
  Fn3 extends ComposableFunction ? FnListRest extends ComposableFunction[] ? ComposedParams<MergeMap, ComposedFunctionForTwoFns<MergeMap, Fn1, Fn2>, Fn3, FnListRest> : never : never :
  ComposedParamsForTwoFns<MergeMap, Fn1, Fn2>;

type ComposedReturn<MergeMap extends PropertiesMergeConfig<object>, Fn1 extends ComposableFunction, Fn2 extends ComposableFunction, FnList extends ComposableFunction[]> = FnList extends [infer Fn3, ...infer FnListRest] ?
  Fn3 extends ComposableFunction ? FnListRest extends ComposableFunction[] ? ComposedReturn<MergeMap, ComposedFunctionForTwoFns<MergeMap, Fn1, Fn2>, Fn3, FnListRest> : 'never' : 'never' :
  ComposedReturnForTwoFns<Fn1, Fn2>;

type MergeFunction<Value> = (a: Value, b: Value) => Value;

export type PropertiesMergeConfig<Params extends object> = {[Key in keyof Params]?: MergeFunction<Params[Key]>};

export function composeWithMerge<MergeMap extends PropertiesMergeConfig<object>>(keyToMergeFn: MergeMap) {
  return function compose<Fn1 extends ComposableFunction, Fn2 extends ComposableFunction, FnList extends ComposableFunction[]>(fn1: Fn1, fn2: Fn2, ...fnList: FnList) {
    function mergeValues(value1: object, value2: object): object {
      let returnValue = _.cloneDeep(value1);
      for(let key in value2) {
        if (value1[key] && keyToMergeFn[key]) {
          returnValue[key] = keyToMergeFn[key](value2[key], value1[key]);
        } else {
          returnValue[key] = value2[key];
        }
      }
      return returnValue;
    }

    return (params: ComposedParams<MergeMap, Fn1, Fn2, FnList>): ComposedReturn<MergeMap, Fn1, Fn2, FnList> => {
      if (fnList.length) {
        return compose(compose(fn1, fn2), fnList[0], ...fnList.slice(1))(params) as ComposedReturn<MergeMap, Fn1, Fn2, FnList>;
      }

      const fn1Return = fn1(params);
      const fn2Params = mergeValues(params, fn1Return);
      const fn2Return = fn2(fn2Params);

      return mergeValues(fn1Return, fn2Return) as ComposedReturn<MergeMap, Fn1, Fn2, FnList>;
    }
  }
}

export const compose = composeWithMerge({});
