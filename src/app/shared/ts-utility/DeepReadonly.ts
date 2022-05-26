export type DeepReadonly<G> =
  G extends Array<infer U> ? ReadonlyArray<DeepReadonly<U>> :
    G extends Function ? G :
      (G extends object ? { readonly [p in keyof G]: DeepReadonly<G[p]> } : G);
