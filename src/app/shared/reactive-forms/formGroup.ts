import { UntypedFormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, startWith } from 'rxjs/operators';
import {
  IAbstractControl,
  IControlErrorRef,
  IControlsParent,
} from './abstractControl';
import { ControlMethods } from './control-methods';
import {
  AsyncValidatorFn,
  IAbstractControlOptions,
  IControlUpdateOptions,
  IControlsValue,
  TAbstractControlParent,
  TAbstractControlsOf,
  TControlStatus,
  TControlValueState,
  ValidationErrors,
  ValidatorFn,
} from './types';

export class FormGroup<
    GControlsOrValue extends { [p: string | symbol]: any } = {
      [p: string | symbol]: any;
    },
    GErrors extends ValidationErrors = ValidationErrors,
    GParent extends TAbstractControlParent = any,
  >
  extends UntypedFormGroup
  implements
    IAbstractControl<IControlsValue<GControlsOrValue>, GErrors, GParent>,
    IControlsParent<IControlsValue<GControlsOrValue>, GErrors>
{
  private readonly _touchChanges$ = new Subject<boolean>();
  private readonly _dirtyChanges$ = new Subject<boolean>();
  private readonly _errorsSubject$ = new Subject<Partial<GErrors> | null>();

  private readonly _options:
    | IAbstractControlOptions<IControlsValue<GControlsOrValue>, GErrors>
    | undefined = ControlMethods.getOptions(this._validatorOrOpts);

  override get asyncValidator(): AsyncValidatorFn<
    IControlsValue<GControlsOrValue>,
    GErrors
  > | null {
    return super.asyncValidator as AsyncValidatorFn<
      IControlsValue<GControlsOrValue>,
      GErrors
    > | null;
  }

  override set asyncValidator(
    asyncValidator: AsyncValidatorFn<
      IControlsValue<GControlsOrValue>,
      GErrors
    > | null,
  ) {
    super.asyncValidator = asyncValidator;
  }

  override get validator(): ValidatorFn<
    IControlsValue<GControlsOrValue>,
    GErrors
  > | null {
    return super.validator as ValidatorFn<
      IControlsValue<GControlsOrValue>,
      GErrors
    > | null;
  }

  override set validator(
    validator: ValidatorFn<IControlsValue<GControlsOrValue>, GErrors> | null,
  ) {
    super.validator = validator;
  }

  override get parent(): GParent | null {
    return super.parent as GParent;
  }

  // @ts-ignore
  override controls: TAbstractControlsOf<GControlsOrValue, GErrors>;
  // @ts-ignore
  override readonly value: IControlsValue<GControlsOrValue>;
  // @ts-ignore
  override readonly errors: GErrors | null;
  // @ts-ignore
  override readonly valueChanges: Observable<IControlsValue<GControlsOrValue>>;
  // @ts-ignore
  override readonly status: TControlStatus;

  // @ts-ignore
  override readonly statusChanges: Observable<TControlStatus>;

  readonly isTouched$ = this._touchChanges$
    .asObservable()
    .pipe(startWith(this.touched), distinctUntilChanged());
  readonly isDirty$ = this._dirtyChanges$
    .asObservable()
    .pipe(startWith(this.dirty), distinctUntilChanged());

  readonly value$: Observable<IControlsValue<GControlsOrValue>> =
    ControlMethods.getValueStream(this);
  readonly isDisabled$: Observable<boolean> =
    ControlMethods.getIsDisabledStream(this);
  readonly isEnabled$: Observable<boolean> =
    ControlMethods.getIsEnabledStream(this);
  readonly status$: Observable<TControlStatus> =
    ControlMethods.getStatusStream(this);
  readonly errors$: Observable<Partial<GErrors> | null> =
    ControlMethods.getErrorStream(this, this._errorsSubject$.asObservable());
  readonly errorRefList$: Observable<IControlErrorRef<GErrors>[]> =
    ControlMethods.getErrorRefListStream(this, this._options?.errorMsgMap);
  readonly firstErrorMsg$: Observable<string | null> =
    ControlMethods.getFirstErrorMsgStream(this);
  readonly aggregatedErrorRefList$: Observable<IControlErrorRef<GErrors>[]> =
    ControlMethods.getAggregatedErrorRefListStream(this);
  readonly firstAggregatedErrorMsg$: Observable<string | null> =
    ControlMethods.getFirstAggregatedErrorMsgStream(this);
  readonly disabledReasonList$: Observable<string[]> =
    ControlMethods.getDisabledReasonList(
      this,
      this._options?.disabledReason$List,
    );
  readonly firstDisabledReason$: Observable<string | null> =
    ControlMethods.getFirstDisabledReasonStream(this);
  readonly isValid$: Observable<boolean> =
    ControlMethods.getIsValidStream(this);
  readonly isValidAndDirty$: Observable<boolean> =
    ControlMethods.getIsValidAndDirtyStream(this);
  readonly isInvalid$: Observable<boolean> =
    ControlMethods.getIsInvalidStream(this);

  constructor(
    controls: TAbstractControlsOf<GControlsOrValue, GErrors>,
    options?: IAbstractControlOptions<
      IControlsValue<GControlsOrValue>,
      GErrors
    >,
  );
  /**
   * @Deprecated
   * Please use options as a second parameter, left for backward compatibility only
   * */
  constructor(
    controls: TAbstractControlsOf<GControlsOrValue, GErrors>,
    validators?:
      | ValidatorFn<IControlsValue<GControlsOrValue>, GErrors>
      | ValidatorFn<IControlsValue<GControlsOrValue>, GErrors>[]
      | null,
    asyncValidator?:
      | AsyncValidatorFn<IControlsValue<GControlsOrValue>, GErrors>
      | AsyncValidatorFn<IControlsValue<GControlsOrValue>, GErrors>[]
      | null,
  );
  constructor(
    controls: TAbstractControlsOf<GControlsOrValue, GErrors>,
    private readonly _validatorOrOpts?:
      | ValidatorFn<IControlsValue<GControlsOrValue>, GErrors>
      | ValidatorFn<IControlsValue<GControlsOrValue>, GErrors>[]
      | null
      | IAbstractControlOptions<IControlsValue<GControlsOrValue>, GErrors>,
    asyncValidator?:
      | AsyncValidatorFn<IControlsValue<GControlsOrValue>, GErrors>
      | AsyncValidatorFn<IControlsValue<GControlsOrValue>, GErrors>[]
      | null,
  ) {
    super(
      controls,
      ControlMethods.getBaseConstructorSecondParam(_validatorOrOpts),
      asyncValidator || null,
    );
  }

  override getRawValue(): IControlsValue<GControlsOrValue> {
    return super.getRawValue();
  }

  override addControl<K extends Extract<keyof GControlsOrValue, string>>(
    name: K,
    control: TAbstractControlsOf<GControlsOrValue, GErrors>[K],
  ): void {
    super.addControl(name, control);
  }

  override removeControl(name: Extract<keyof GControlsOrValue, string>): void {
    super.removeControl(name);
  }

  override contains(
    controlName: Extract<keyof GControlsOrValue, string>,
  ): boolean {
    return super.contains(controlName);
  }

  override setControl<K extends Extract<keyof GControlsOrValue, string>>(
    name: K,
    control: TAbstractControlsOf<GControlsOrValue, GErrors>[K],
  ): void {
    super.setControl(name, control);
  }

  override setValue(
    value: IControlsValue<GControlsOrValue>,
    options?: Pick<IControlUpdateOptions, 'emitEvent' | 'onlySelf'>,
  ): void {
    const normalizedValue: { [p in keyof this['controls']]: any } =
      value ?? _.mapValues(this.controls, () => null);
    super.setValue(normalizedValue, options);
  }

  override patchValue(
    valueOrObservable: Partial<IControlsValue<GControlsOrValue>>,
    options?: Pick<IControlUpdateOptions, 'emitEvent' | 'onlySelf'>,
  ): void {
    super.patchValue(valueOrObservable, options);
  }

  /**
   * To use this function you must supply takeUntil$ in the constructor options
   * */
  disableWhile(
    observable: Observable<boolean>,
    options?: IControlUpdateOptions & { takeUntil$: Observable<any> },
  ): Subscription {
    return ControlMethods.disableWhile(
      this,
      observable,
      this._options,
      options,
    );
  }

  override markAsTouched(opts?: Pick<IControlUpdateOptions, 'onlySelf'>): void {
    super.markAsTouched(opts);
    this._touchChanges$.next(true);
  }

  override markAsUntouched(
    opts?: Pick<IControlUpdateOptions, 'onlySelf'>,
  ): void {
    super.markAsUntouched(opts);
    this._touchChanges$.next(false);
  }

  override markAsPristine(
    opts?: Pick<IControlUpdateOptions, 'onlySelf'>,
  ): void {
    super.markAsPristine(opts);
    this._dirtyChanges$.next(false);
  }

  override markAsDirty(opts?: Pick<IControlUpdateOptions, 'onlySelf'>): void {
    super.markAsDirty(opts);
    this._dirtyChanges$.next(true);
  }

  override reset(
    formState?: TControlValueState<IControlsValue<GControlsOrValue>>,
    options?: Pick<IControlUpdateOptions, 'emitEvent' | 'onlySelf'>,
  ): void {
    super.reset(formState, options);
  }

  override setValidators(
    newValidator:
      | ValidatorFn<IControlsValue<GControlsOrValue>, GErrors>
      | ValidatorFn<IControlsValue<GControlsOrValue>, GErrors>[],
  ): void {
    super.setValidators(newValidator);
    super.updateValueAndValidity();
  }

  override setAsyncValidators(
    newValidator:
      | AsyncValidatorFn<IControlsValue<GControlsOrValue>, GErrors>
      | AsyncValidatorFn<IControlsValue<GControlsOrValue>, GErrors>[]
      | null,
  ): void {
    super.setAsyncValidators(newValidator);
    super.updateValueAndValidity();
  }

  override hasError<K1 extends keyof IControlsValue<GControlsOrValue>>(
    errorCode: Extract<keyof GErrors, string>,
    path?: [K1],
  ): boolean;
  override hasError<
    K1 extends keyof IControlsValue<GControlsOrValue>,
    K2 extends keyof IControlsValue<GControlsOrValue>[K1],
  >(errorCode: Extract<keyof GErrors, string>, path?: [K1, K2]): boolean;
  override hasError<
    K1 extends keyof IControlsValue<GControlsOrValue>,
    K2 extends keyof IControlsValue<GControlsOrValue>[K1],
    K3 extends keyof IControlsValue<GControlsOrValue>[K1][K2],
  >(errorCode: Extract<keyof GErrors, string>, path?: [K1, K2, K3]): boolean;
  override hasError(
    errorCode: Extract<keyof GErrors, string>,
    path?: string,
  ): boolean;
  override hasError(
    errorCode: Extract<keyof GErrors, string>,
    path?: any,
  ): boolean {
    return super.hasError(errorCode, path);
  }

  override async setErrors(
    errors: Partial<GErrors> | null,
    opts: Pick<IControlUpdateOptions, 'emitEvent'> = {},
  ): Promise<void> {
    await ControlMethods.setErrors(
      this,
      () => {
        return this._errorsSubject$;
      },
      errors,
      opts,
    );
  }

  override getError<
    K extends keyof GErrors,
    K1 extends keyof IControlsValue<GControlsOrValue>,
  >(errorCode: K, path?: [K1]): GErrors[K] | null;
  override getError<
    K extends keyof GErrors,
    K1 extends keyof IControlsValue<GControlsOrValue>,
    K2 extends keyof IControlsValue<GControlsOrValue>[K1],
  >(errorCode: K, path?: [K1, K2]): GErrors[K] | null;
  override getError<
    K extends keyof GErrors,
    K1 extends keyof IControlsValue<GControlsOrValue>,
    K2 extends keyof IControlsValue<GControlsOrValue>[K1],
    K3 extends keyof IControlsValue<GControlsOrValue>[K1][K2],
  >(errorCode: K, path?: [K1, K2, K3]): GErrors[K] | null;
  override getError<K extends keyof GErrors>(
    errorCode: K,
    path?: string,
  ): GErrors[K] | null;
  override getError<K extends keyof GErrors>(
    errorCode: K,
    path?: any,
  ): GErrors[K] | null {
    return super.getError(errorCode as any, path) as GErrors[K] | null;
  }

  hasErrorAndDirty<P1 extends keyof IControlsValue<GControlsOrValue>>(
    error: Extract<keyof GErrors, string>,
    prop1?: P1,
  ): boolean;
  hasErrorAndDirty<
    P1 extends keyof IControlsValue<GControlsOrValue>,
    P2 extends keyof IControlsValue<GControlsOrValue>[P1],
  >(error: Extract<keyof GErrors, string>, prop1?: P1, prop2?: P2): boolean;
  hasErrorAndDirty<
    P1 extends keyof IControlsValue<GControlsOrValue>,
    P2 extends keyof IControlsValue<GControlsOrValue>[P1],
    P3 extends keyof IControlsValue<GControlsOrValue>[P1][P2],
  >(
    error: Extract<keyof GErrors, string>,
    prop1?: P1,
    prop2?: P2,
    prop3?: P3,
  ): boolean;
  hasErrorAndDirty<
    P1 extends keyof IControlsValue<GControlsOrValue>,
    P2 extends keyof IControlsValue<GControlsOrValue>[P1],
    P3 extends keyof IControlsValue<GControlsOrValue>[P1][P2],
    P4 extends keyof IControlsValue<GControlsOrValue>[P1][P2][P3],
  >(
    error: Extract<keyof GErrors, string>,
    prop1?: P1,
    prop2?: P2,
    prop3?: P3,
    prop4?: P4,
  ): boolean;
  hasErrorAndDirty(error: any, ...path: any): boolean {
    return ControlMethods.hasErrorAndDirty(this, error, ...path);
  }

  setIsEnabled(
    enable = true,
    opts?: Pick<IControlUpdateOptions, 'emitEvent' | 'onlySelf'>,
  ): void {
    ControlMethods.setIsEnabled(this, enable, opts);
  }

  setIsDisabled(
    disable = true,
    opts?: Pick<IControlUpdateOptions, 'emitEvent' | 'onlySelf'>,
  ): void {
    ControlMethods.setIsDisabled(this, disable, opts);
  }
}
