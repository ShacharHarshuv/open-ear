import { DestroyRef, inject } from '@angular/core';
import {
  ConnectableObservable,
  MonoTypeOperatorFunction,
  Observable,
  Subscription,
} from 'rxjs';
import { publishReplay } from 'rxjs/operators';

export function publishReplayUntilDestroyAndConnect<G>(
  destroyRef: DestroyRef = inject(DestroyRef),
): MonoTypeOperatorFunction<G> {
  return (source$: Observable<G>) => {
    const connectableObservable: ConnectableObservable<G> = source$.pipe(
      publishReplay(1),
    ) as ConnectableObservable<G>;
    const subscription: Subscription = connectableObservable.connect();
    destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });

    return connectableObservable;
  };
}
