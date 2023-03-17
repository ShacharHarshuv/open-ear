export type StaticOrGetter<GValue, GParam extends any[] = []> =
  | GValue
  | ((...param: GParam) => GValue);

export type ResolvedValueOf<G> = G extends StaticOrGetter<infer U> ? U : never;

export function toGetter<GValue, GParam extends any[]>(
  staticOrGetter: StaticOrGetter<GValue, GParam>
): (...param: GParam) => GValue {
  return (...param: GParam) =>
    staticOrGetter instanceof Function
      ? staticOrGetter(...param)
      : staticOrGetter;
}
