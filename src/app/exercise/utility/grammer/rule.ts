export type Rule<T> = (prevOption: T) => (nextOption: T) => boolean;
