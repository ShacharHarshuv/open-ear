import { Observable } from 'rxjs';
import { shareReplayUntil } from './shareReplayUntil';

export type BehaviorObservable<G> = Observable<G> & {
  readonly value: G | null;
};

export function asBehaviorObservable<G>(obs$: Observable<G>, takeUntil$: Observable<unknown>): BehaviorObservable<G> {
  const shared$ = obs$.pipe(
    shareReplayUntil(takeUntil$),
  );

  let value: G | null = null;

  shared$.subscribe((v) => (value = v));

  Object.defineProperty(shared$, 'value', {
    get: () => {
      return value;
    },
  });

  return shared$ as BehaviorObservable<G>;
}
