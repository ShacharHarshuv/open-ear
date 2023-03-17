import CustomMatcherFactories = jasmine.CustomMatcherFactories;
import { toHaveOnlyBeenCalledWith } from "./to-have-only-been-called-with";
import { toHaveBeenLastCalledWith } from "./to-have-been-last-called-with";

export const spyMatchers: CustomMatcherFactories = {
  toHaveOnlyBeenCalledWith,
  toHaveBeenLastCalledWith,
};
