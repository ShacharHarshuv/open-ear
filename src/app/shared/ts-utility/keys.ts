export function keys<G extends object>(object: G): (keyof G)[] {
  return Object.keys(object) as (keyof G)[];
}
