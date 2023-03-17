import {
  Observable,
  MonoTypeOperatorFunction
} from "rxjs";
import {
  takeUntil,
  shareReplay
} from "rxjs/operators";

export function shareReplayUntil<T>(
  notifier: Observable<any>
): MonoTypeOperatorFunction<T> {
  return (source$: Observable<T>) => {
    return source$.pipe(takeUntil(notifier), shareReplay(1));
  };
}
