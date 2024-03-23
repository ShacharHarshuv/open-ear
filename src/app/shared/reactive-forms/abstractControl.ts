import { AbstractControl as NgAbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  AsyncValidatorFn,
  IControlUpdateOptions,
  TAbstractControlParent,
  TControlStatus,
  TControlValueState,
  ValidationErrors,
  ValidatorFn,
} from './types';

export interface IControlErrorRef<
  GErrors extends ValidationErrors = ValidationErrors,
> {
  /**
   * Made the type less generic because of a bug in typescript: https://github.com/microsoft/TypeScript/issues/41595
   * */
  code: /*keyof GErrors*/ string;
  data: /*GErrors[keyof GErrors]*/ any;
  msg: string;
}

export interface IAbstractControl<
  GValue = any,
  GErrors extends ValidationErrors = ValidationErrors,
  GParent extends TAbstractControlParent = any,
> extends NgAbstractControl {
  readonly parent: GParent | null;
  readonly value: GValue;
  readonly valueChanges: Observable<GValue>;
  readonly status: TControlStatus;
  readonly statusChanges: Observable<TControlStatus>;
  readonly errors: GErrors | null;

  readonly isTouched$: Observable<boolean>;
  readonly isDirty$: Observable<boolean>;
  readonly value$: Observable<GValue>;
  readonly isDisabled$: Observable<boolean>;
  readonly isEnabled$: Observable<boolean>;
  readonly status$: Observable<TControlStatus>;
  readonly errors$: Observable<Partial<GErrors> | null>;
  readonly isValid$: Observable<boolean>;
  readonly isValidAndDirty$: Observable<boolean>;
  readonly isInvalid$: Observable<boolean>;
  readonly errorRefList$: Observable<IControlErrorRef<GErrors>[]>;
  readonly firstErrorMsg$: Observable<string | null>; // null if no errors
  readonly disabledReasonList$: Observable<string[]>;
  readonly firstDisabledReason$: Observable<string | null>;
  validator: ValidatorFn<GValue, GErrors> | null;
  asyncValidator: AsyncValidatorFn<GValue, GErrors> | null;

  setValidators(
    newValidator:
      | ValidatorFn<GValue, GErrors>
      | ValidatorFn<GValue, GErrors>[]
      | null,
  ): void;

  setAsyncValidators(
    newValidator:
      | AsyncValidatorFn<GValue, GErrors>
      | AsyncValidatorFn<GValue, GErrors>[]
      | null,
  ): void;

  setValue(value: GValue, options?: IControlUpdateOptions): void;

  reset(
    formState?: TControlValueState<GValue>,
    options?: Pick<IControlUpdateOptions, 'emitEvent' | 'onlySelf'>,
  ): void;

  setErrors(
    errors: Partial<GErrors> | null,
    opts?: Pick<IControlUpdateOptions, 'emitEvent'>,
  ): void;

  getError<K extends Extract<keyof GErrors, string>>(
    errorCode: K,
    path?: Array<string | number> | string,
  ): GErrors[K] | null;

  hasError<K extends Extract<keyof GErrors, string>>(
    errorCode: K,
    path?: Array<string | number> | string,
  ): boolean;

  setIsDisabled(
    isDisabled?: boolean,
    opts?: Pick<IControlUpdateOptions, 'emitEvent' | 'onlySelf'>,
  ): void;

  setIsEnabled(
    isEnabled?: boolean,
    opts?: Pick<IControlUpdateOptions, 'emitEvent' | 'onlySelf'>,
  ): void;

  disableWhile(
    isDisabled$: Observable<boolean>,
    options?: IControlUpdateOptions & { takeUntil$?: Observable<any> },
  ): void;
}

// To be used with FormGroup and FormArray
export interface IControlsParent<
  GValue = any,
  GErrors extends ValidationErrors = ValidationErrors,
> {
  controls: IAbstractControl[] | { [key: string]: IAbstractControl };
  readonly aggregatedErrorRefList$: Observable<IControlErrorRef<GErrors>[]>; // Includes all children's error
  readonly firstAggregatedErrorMsg$: Observable<string | null>;

  getRawValue(): GValue;
}
