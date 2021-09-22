import {
  Directive,
  AfterViewInit,
} from '@angular/core';
import {
  ReplaySubject,
  Observable,
} from 'rxjs';
import { BaseDestroyable } from './base-destroyable';
import { take } from 'rxjs/operators';

@Directive()
export class BaseComponent extends BaseDestroyable implements AfterViewInit {
  private readonly _afterViewInit$ = new ReplaySubject<void>(1);
  readonly afterViewInit$: Observable<void> = this._afterViewInit$.asObservable();
  readonly afterViewInitPromise: Promise<void> = this.afterViewInit$.pipe(take(1))
    .toPromise();

  ngAfterViewInit(): void {
    this._afterViewInit$.next();
  }
}
