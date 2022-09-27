import {
  OneOrMany,
  toArray,
} from '../toArray';
import {
  Observable,
  merge,
  fromEvent,
} from 'rxjs';
import {
  StaticOrGetter,
  toGetter,
} from '../StaticOrGetter';
import {
  map,
  startWith,
} from 'rxjs/operators';
import { every } from 'lodash';
import { tapLogValue } from '../rxjs/tapLogValue';

export function elementStateFromEvents(inEventName: string, outEventName: string, initial: StaticOrGetter<boolean, [Element]> = false) {
  return function(elementOrElement: OneOrMany<Element>): Observable<boolean> {
    return merge(
      fromEvent(elementOrElement, inEventName)
        .pipe(
          tapLogValue(inEventName),
          map(() => true),
        ),
      fromEvent(elementOrElement, outEventName)
        .pipe(
          tapLogValue(outEventName),
          map(() => false),
        ),
    )
      .pipe(
        startWith(every(toArray(elementOrElement), toGetter(initial))),
      );
  };
}
