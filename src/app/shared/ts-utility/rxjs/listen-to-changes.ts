import { Observable, BehaviorSubject } from 'rxjs';
import { onPropertySet } from '../onPropertySet';

export function listenToChanges<G, K extends keyof G>(
  object: G,
  key: K
): Observable<G[K]>;
export function listenToChanges<G, K extends keyof G>(
  object: any,
  key: string
): Observable<any>;
export function listenToChanges<G, K extends keyof G>(
  object: any,
  key: string
): Observable<any> {
  const subject$ = new BehaviorSubject<G[K]>(object[key]);
  onPropertySet(object, key, (value) => {
    subject$.next(value);
  });
  return subject$.asObservable();
}
