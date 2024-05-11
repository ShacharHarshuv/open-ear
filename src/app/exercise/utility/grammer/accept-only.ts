export function acceptOnly<T>(options: T[]) {
  return (nextOption: T) => options.includes(nextOption);
}
