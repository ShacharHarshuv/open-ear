export type OneOrMany<G> = G | G[];

export function toArray<G>(param: OneOrMany<G>): G[] {
  return Array.isArray(param) ? param : [param];
}
