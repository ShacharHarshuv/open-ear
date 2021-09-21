import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { SyncOrAsync } from './SyncOrAsync';

export function toPromise<G>(param: SyncOrAsync<G>): Promise<G> {
  if (param instanceof Observable) {
    return param.pipe(take(1))
      .toPromise();
  }

  if (param instanceof Promise) {
    return param;
  }

  return Promise.resolve(param);
}
