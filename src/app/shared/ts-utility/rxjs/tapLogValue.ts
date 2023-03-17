import {
  Observable,
  OperatorFunction
} from "rxjs";
import { tap } from "rxjs/operators";

export function tapLogValue<T>(label?: string): OperatorFunction<T, T> {
  return function (source$: Observable<T>): Observable<T> {
    return source$.pipe(
      tap((v) => (label ? console.log(label, v) : console.log(v)))
    );
  };
}
