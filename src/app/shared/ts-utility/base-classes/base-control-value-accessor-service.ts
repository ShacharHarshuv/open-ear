import { ControlValueAccessor } from '@angular/forms';
import { BehaviorSubject, ReplaySubject, Observable } from 'rxjs';
import * as _ from 'lodash';

export class BaseControlValueAccessorService<T>
  implements ControlValueAccessor
{
  protected _isDisabled$ = new BehaviorSubject<boolean>(false);
  isDisabled$: Observable<boolean> = this._isDisabled$.asObservable();
  protected _modelValue$ = new ReplaySubject<T>(1);
  protected _onChange: (value: T) => void = _.noop;
  protected _onTouch: () => void = _.noop;

  registerOnChange(fn: (value: T) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if (this._isDisabled$.value !== !!isDisabled) {
      this._isDisabled$.next(!!isDisabled);
    }
  }

  writeValue(modelValue: T): void {
    this._modelValue$.next(modelValue);
  }

  emitViewValueChanged(newValue: T): void {
    this._onChange(newValue);
    this._onTouch();
  }
}
