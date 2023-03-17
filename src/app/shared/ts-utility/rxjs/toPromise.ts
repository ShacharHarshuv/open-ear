import {
  Observable,
  firstValueFrom
} from "rxjs";
import { SyncOrAsync } from "./SyncOrAsync";

export function toPromise<G>(param: SyncOrAsync<G>): Promise<G> {
  if (param instanceof Observable) {
    return firstValueFrom(param);
  }

  if (param instanceof Promise) {
    return param;
  }

  return Promise.resolve(param);
}
