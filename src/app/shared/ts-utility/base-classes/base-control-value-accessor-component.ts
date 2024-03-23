import {
  Directive,
  ElementRef,
  Input,
  Output,
  Provider,
  Type,
  forwardRef,
  inject,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';
import {
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
  firstValueFrom,
  merge,
} from 'rxjs';
import { publishReplayUntilDestroyAndConnect } from '../rxjs';
import { BaseComponent } from './base-component';

export function getNgValueAccessorProvider(type: Type<any>): Provider {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => type),
    multi: true,
  };
}

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class BaseControlValueAccessorComponent<T>
  extends BaseComponent
  implements ControlValueAccessor
{
  protected readonly _isDisabled$ = new BehaviorSubject<boolean>(false);
  readonly isDisabled$: Observable<boolean> = this._isDisabled$.asObservable();
  protected readonly _modelValue$ = new ReplaySubject<T>(1);
  readonly modelValue$: Observable<T> = this._modelValue$.asObservable();
  protected _onChange: (value: T) => void = _.noop;
  protected _onTouch: () => void = _.noop;
  private readonly _cvaElement: HTMLElement =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  @Input()
  set value(value: T) {
    this.writeValue(value);
  }

  @Input()
  set disabled(isDisabled: boolean | null) {
    this.setDisabledState(!!isDisabled);
  }

  @Output()
  readonly valueChange: Subject<T> = new Subject();

  readonly value$: Observable<T> = merge(
    this.modelValue$,
    this.valueChange,
  ).pipe(publishReplayUntilDestroyAndConnect());

  get isDisabled(): boolean {
    return this._isDisabled$.value;
  }

  //#region PUBLIC ACTIONS
  setViewValue(newValue: T, skipMarkAsTouched?: boolean): void {
    this._onChange(newValue);
    if (!skipMarkAsTouched) {
      this._onTouch();
    }
    this.valueChange.next(newValue);
  }

  getCurrentValuePromise(): Promise<T> {
    return firstValueFrom(this.value$);
  }

  //#endregion

  //#region ANGULAR
  registerOnChange(fn: (value: T) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouch = fn;
  }

  // Sometimes this can get called from outside, make an arrow function to ensure `this` points to the right object
  setDisabledState = (isDisabled: boolean): void => {
    if (this._isDisabled$.value !== !!isDisabled) {
      this._isDisabled$.next(!!isDisabled);
      if (isDisabled) {
        this._cvaElement.setAttribute('disabled', '');
      } else {
        this._cvaElement.removeAttribute('disabled');
      }
    }
  };

  writeValue(modelValue: T): void {
    this._modelValue$.next(modelValue);
  }

  //#endregion
}
