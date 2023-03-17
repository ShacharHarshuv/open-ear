import {
  from,
  Observable,
  of
} from "rxjs";
import { SyncOrAsync } from "./SyncOrAsync";

export function toObservable<T>(input: SyncOrAsync<T>): Observable<T> {
  if (input instanceof Observable) {
    return input;
  }

  if (input instanceof Promise) {
    return from(input);
  }

  return of(input);
}
