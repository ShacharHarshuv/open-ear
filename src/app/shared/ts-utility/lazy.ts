export function lazy<T>(factory: () => T): () => T {
  let cached: T | undefined;

  return () => {
    if (cached === undefined) {
      cached = factory();
    }
    return cached;
  };
}
