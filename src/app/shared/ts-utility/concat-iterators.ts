export function* concatIterators<T>(
  iter1: Iterable<T>,
  iter2: Iterable<T>,
): Generator<T, void, undefined> {
  yield* iter1;
  yield* iter2;
}
