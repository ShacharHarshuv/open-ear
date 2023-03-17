import {
  MonoTypeOperatorFunction,
  Observable,
  ConnectableObservable,
  Subscription,
} from 'rxjs';
import { publishReplay, take } from 'rxjs/operators';

export function publishReplayUntilAndConnect<G>(
  notifier?: Observable<any>
): MonoTypeOperatorFunction<G> {
  return (source$: Observable<G>) => {
    const connectableObservable: ConnectableObservable<G> = source$.pipe(
      publishReplay(1)
    ) as ConnectableObservable<G>;
    const subscription: Subscription = connectableObservable.connect();
    if (notifier) {
      notifier.pipe(take(1)).subscribe(() => subscription.unsubscribe());
    }

    return connectableObservable;
  };
}
