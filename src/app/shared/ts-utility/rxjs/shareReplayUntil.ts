import { MonoTypeOperatorFunction, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef, inject } from '@angular/core';

export function shareReplayUntilDestroyed<T>(
  destroyRef = inject(DestroyRef)
): MonoTypeOperatorFunction<T> {
  return (source$: Observable<T>) => {
    return source$.pipe(takeUntilDestroyed(destroyRef), shareReplay(1));
  };
}
