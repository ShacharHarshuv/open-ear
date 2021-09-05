import { FormControl as NgFormControl } from '@angular/forms';
import {
  Observable,
  Subject,
  Subscription,
} from 'rxjs';
import {
  distinctUntilChanged,
  startWith,
} from 'rxjs/operators';
import { ControlMethods } from './control-methods';
import {
  AsyncValidatorFn,
  IAbstractControlOptions,
  IControlUpdateOptions,
  TControlStatus,
  TControlValueState,
  ValidationErrors,
  ValidatorFn,
  TAbstractControlParent,
} from './types';
import {
  IAbstractControl,
  IControlErrorRef,
} from './abstractControl';

export class FormControl<GValue = any, GErrors extends ValidationErrors = any, GParent extends TAbstractControlParent = any> extends NgFormControl implements IAbstractControl<GValue, GErrors, GParent> {
  private readonly _touchChanges$ = new Subject<boolean>();
  private readonly _dirtyChanges$ = new Subject<boolean>();
  private readonly _errorsSubject$ = new Subject<Partial<GErrors> | null>();
  private readonly _options: IAbstractControlOptions<GValue, GErrors> | undefined = ControlMethods.getOptions<GValue, GErrors>(this._validatorOrOpts);

  readonly value: GValue;
  readonly errors: GErrors | null;
  readonly valueChanges: Observable<GValue>;
  readonly status: TControlStatus;
  readonly statusChanges: Observable<TControlStatus>;

  readonly isTouched$: Observable<boolean> = this._touchChanges$.asObservable()
    .pipe(startWith(this.touched), distinctUntilChanged());
  readonly isDirty$: Observable<boolean> = this._dirtyChanges$.asObservable()
    .pipe(startWith(this.dirty), distinctUntilChanged());

  readonly value$: Observable<GValue> = ControlMethods.getValueStream<GValue, GErrors>(this);
  readonly isDisabled$: Observable<boolean> = ControlMethods.getIsDisabledStream<GValue, GErrors>(this);
  readonly isEnabled$: Observable<boolean> = ControlMethods.getIsEnabledStream<GValue, GErrors>(this);
  readonly status$: Observable<TControlStatus> = ControlMethods.getStatusStream<GValue, GErrors>(this);
  readonly errors$: Observable<Partial<GErrors> | null> = ControlMethods.getErrorStream<GValue, GErrors>(this, this._errorsSubject$.asObservable());
  readonly isValid$: Observable<boolean> = ControlMethods.getIsValidStream<GValue, GErrors>(this);
  readonly isValidAndDirty$: Observable<boolean> = ControlMethods.getIsValidAndDirtyStream(this);
  readonly isInvalid$: Observable<boolean> = ControlMethods.getIsInvalidStream<GValue, GErrors>(this);
  readonly errorRefList$: Observable<IControlErrorRef<GErrors>[]> = ControlMethods.getErrorRefListStream<GValue, GErrors>(this, this._options?.errorMsgMap);
  readonly firstErrorMsg$: Observable<string | null> = ControlMethods.getFirstErrorMsgStream(this);
  readonly disabledReasonList$: Observable<string[]> = ControlMethods.getDisabledReasonList(this, this._options?.disabledReason$List);
  readonly firstDisabledReason$: Observable<string | null> = ControlMethods.getFirstDisabledReasonStream(this);

  get asyncValidator(): AsyncValidatorFn<GValue, GErrors> | null {
    return super.asyncValidator as AsyncValidatorFn<GValue, GErrors> | null;
  }

  set asyncValidator(asyncValidator: AsyncValidatorFn<GValue, GErrors> | null) {
    super.asyncValidator = asyncValidator;
  }

  get validator(): ValidatorFn<GValue, GErrors> | null {
    return super.validator as ValidatorFn<GValue, GErrors> | null;
  }

  set validator(validator: ValidatorFn<GValue, GErrors> | null) {
    super.validator = validator;
  }

  get parent(): GParent | null {
    return super.parent as GParent;
  }

  constructor(
    formState?: TControlValueState<GValue>,
    options?: IAbstractControlOptions<GValue, GErrors>,
  );
  /**
   * @Deprecated
   * Please use options as a second parameter, left for backward compatibility only
   * */
  constructor(
    formState?: TControlValueState<GValue>,
    validators?: ValidatorFn<GValue, GErrors> | ValidatorFn<GValue, GErrors>[] | null,
    asyncValidator?: AsyncValidatorFn<GValue, GErrors> | AsyncValidatorFn<GValue, GErrors>[] | null,
  );
  constructor(
    formState?: TControlValueState<GValue>,
    private readonly _validatorOrOpts?: ValidatorFn<GValue, GErrors> | ValidatorFn<GValue, GErrors>[] | null | IAbstractControlOptions<GValue, GErrors>,
    asyncValidator?: AsyncValidatorFn<GValue, GErrors> | AsyncValidatorFn<GValue, GErrors>[] | null,
  ) {
    super(
      formState,
      ControlMethods.getBaseConstructorSecondParam(_validatorOrOpts),
      asyncValidator,
    );
  }

  setValue(valueOrObservable: GValue, options?: IControlUpdateOptions): void {
    super.setValue(valueOrObservable, options);
  }

  patchValue(value: GValue, options?: IControlUpdateOptions): void {
    super.patchValue(value, options);
  }

  /**
   * To use this function you must supply takeUntil$ in the constructor options
   * */
  disableWhile(observable: Observable<boolean>, options?: IControlUpdateOptions & { takeUntil$?: Observable<any> }): Subscription {
    return ControlMethods.disableWhile(this, observable, this._options, options);
  }

  markAsTouched(opts?: Pick<IControlUpdateOptions, 'onlySelf'>): void {
    super.markAsTouched(opts);
    this._touchChanges$.next(true);
  }

  markAsUntouched(opts?: Pick<IControlUpdateOptions, 'onlySelf'>): void {
    super.markAsUntouched(opts);
    this._touchChanges$.next(false);
  }

  markAsPristine(opts?: Pick<IControlUpdateOptions, 'onlySelf'>): void {
    super.markAsPristine(opts);
    this._dirtyChanges$.next(false);
  }

  markAsDirty(opts?: Pick<IControlUpdateOptions, 'onlySelf'>): void {
    super.markAsDirty(opts);
    this._dirtyChanges$.next(true);
  }

  reset(formState?: TControlValueState<GValue>, options?: Pick<IControlUpdateOptions, 'emitEvent' | 'onlySelf'>): void {
    super.reset(formState, options);
  }

  setValidators(newValidator: ValidatorFn<GValue, GErrors> | ValidatorFn<GValue, GErrors>[] | null): void {
    super.setValidators(newValidator);
    super.updateValueAndValidity();
  }

  setAsyncValidators(newValidator: AsyncValidatorFn<GValue, GErrors> | AsyncValidatorFn<GValue, GErrors>[] | null): void {
    super.setAsyncValidators(newValidator);
    super.updateValueAndValidity();
  }

  getError<K extends Extract<keyof GErrors, string>>(errorCode: K): GErrors[K] | null {
    return super.getError(errorCode) as GErrors[K] | null;
  }

  hasError<K extends Extract<keyof GErrors, string>>(errorCode: K): boolean {
    return super.hasError(errorCode);
  }

  async setErrors(errors: Partial<GErrors> | null, opts: Pick<IControlUpdateOptions, 'emitEvent'> = {}): Promise<void> {
    await ControlMethods.setErrors(this, () => {
      return this._errorsSubject$;
    }, errors, opts);
  }

  hasErrorAndDirty(error: Extract<keyof GErrors, string>): boolean {
    return ControlMethods.hasErrorAndDirty(this, error);
  }

  setIsEnabled(enable = true, opts?: Pick<IControlUpdateOptions, 'emitEvent' | 'onlySelf'>): void {
    ControlMethods.setIsEnabled(this, enable, opts);
  }

  setIsDisabled(disable = true, opts?: Pick<IControlUpdateOptions, 'emitEvent' | 'onlySelf'>): void {
    ControlMethods.setIsDisabled(this, disable, opts);
  }
}
