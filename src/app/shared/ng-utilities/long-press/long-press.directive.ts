import {
  Directive,
  ElementRef,
  Output,
} from '@angular/core';
import {
  Observable,
  from,
  fromEvent,
  of,
  NEVER,
  delay,
} from 'rxjs';
import {
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import {
  BaseDestroyable,
  timeoutAsPromise,
  getElementIsPressedStream,
  asBehaviorObservable,
} from '../../ts-utility';
import { tapLogValue } from '../../ts-utility/rxjs/tapLogValue';

@Directive({
  selector: '[long-press]'
})
export class LongPressDirective extends BaseDestroyable {
  private _isMouseDown$ = asBehaviorObservable(
    getElementIsPressedStream(this._eRef.nativeElement),
    this._destroy$,
  );

  @Output('long-press')
  readonly longPress$: Observable<unknown> = this._getLongPressStream();

  constructor(
    private _eRef: ElementRef,
  ) {
    super();
  }

  private _getLongPressStream(): Observable<unknown> {
    return fromEvent(this._eRef.nativeElement, 'pointerdown')
      .pipe(
        delay(500),
        switchMap(() => this._isMouseDown$.value ? of(null) : NEVER),
      );
  }
}
