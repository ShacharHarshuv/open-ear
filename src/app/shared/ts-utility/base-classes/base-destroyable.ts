import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class BaseDestroyable implements OnDestroy {
  protected _destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._onDestroy();
  }

  /**
   * Override this when extending if needs to
   * */
  protected _onDestroy(): void {}
}
