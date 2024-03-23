import CustomMatcherFactories = jasmine.CustomMatcherFactories;
import { Observable } from 'rxjs';
import { toHaveHadEmissions } from './matchers/to-have-had-emissions';
import { toHaveLastEmitted } from './matchers/to-have-last-emitted';
import { toHaveOnlyEmitted } from './matchers/to-have-only-emitted';

declare global {
  function expect<G>(spy: Observable<G>): jasmine.ObservableMatchers<G>;

  namespace jasmine {
    interface ObservableMatchers<G> extends jasmine.Matchers<any> {
      not: ObservableMatchers<G>;
    }
  }
}

export const observableSpyMatchers: CustomMatcherFactories = {
  toHaveLastEmitted,
  toHaveOnlyEmitted,
  toHaveHadEmissions,
};
