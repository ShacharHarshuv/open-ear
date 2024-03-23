import CustomMatcherFactories = jasmine.CustomMatcherFactories;
import { toHaveBeenLastCalledWith } from './to-have-been-last-called-with';
import { toHaveOnlyBeenCalledWith } from './to-have-only-been-called-with';

export const spyMatchers: CustomMatcherFactories = {
  toHaveOnlyBeenCalledWith,
  toHaveBeenLastCalledWith,
};
