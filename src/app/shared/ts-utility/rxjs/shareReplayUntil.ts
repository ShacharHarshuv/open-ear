import { Observable, MonoTypeOperatorFunction } from 'rxjs';
import { takeUntil, shareReplay } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export function shareReplayUntilDestroyed<T>(): MonoTypeOperatorFunction<T> {
  return (source$: Observable<T>) => {
    return source$.pipe(takeUntilDestroyed(), shareReplay(1));
  };
}
