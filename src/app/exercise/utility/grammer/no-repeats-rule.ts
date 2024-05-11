export const noRepeatsRule =
  <T>(prevOption: T) =>
  (nextOption: T) =>
    prevOption !== nextOption;
