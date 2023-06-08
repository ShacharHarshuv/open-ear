import {
  MonoTypeOperatorFunction,
  Observable,
  ConnectableObservable,
  Subscription,
} from 'rxjs';
import { publishReplay, take } from 'rxjs/operators';
import { DestroyRef, inject } from '@angular/core';

export function publishReplayUntilDestroyAndConnect<G>(
  destroyRef: DestroyRef = inject(DestroyRef)
): MonoTypeOperatorFunction<G> {
  return (source$: Observable<G>) => {
    const connectableObservable: ConnectableObservable<G> = source$.pipe(
      publishReplay(1)
    ) as ConnectableObservable<G>;
    const subscription: Subscription = connectableObservable.connect();
    destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });

    return connectableObservable;
  };
}
