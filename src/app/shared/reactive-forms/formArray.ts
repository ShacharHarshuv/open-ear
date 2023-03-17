import { FormArray as NgFormArray } from "@angular/forms";
import {
  Observable,
  Subject,
  Subscription
} from "rxjs";
import {
  distinctUntilChanged,
  startWith
} from "rxjs/operators";
import { ControlMethods } from "./control-methods";
import {
  AsyncValidatorFn,
  IAbstractControlOptions,
  IControlUpdateOptions,
  TAbstractControlOf,
  TControlPath,
  TControlStatus,
  TControlValue,
  ValidationErrors,
  ValidatorFn,
  TAbstractControlParent
} from "./types";
import {
  IAbstractControl,
  IControlErrorRef,
  IControlsParent
} from "./abstractControl";
import * as _ from "lodash";

export interface IFormArrayOptions<
  GControlOrValue = any,
  GErrors extends ValidationErrors = ValidationErrors
> {
  controlFactory?: (
    value?: TControlValue<GControlOrValue>
  ) => TAbstractControlOf<GControlOrValue>;
}

export class FormArray<
    GControlOrValue = any,
    GErrors extends ValidationErrors = ValidationErrors,
    GParent extends TAbstractControlParent = any
  >
  extends NgFormArray
  implements
    IAbstractControl<TControlValue<GControlOrValue>[], GErrors, GParent>,
    IControlsParent<TControlValue<GControlOrValue>[], GErrors>
{
  private readonly _touchChanges$ = new Subject<boolean>();
  private readonly _dirtyChanges$ = new Subject<boolean>();
  private readonly _errorsSubject$ = new Subject<Partial<GErrors> | null>();

  private readonly _options:
    | (IAbstractControlOptions<TControlValue<GControlOrValue>[], GErrors> &
        IFormArrayOptions<GControlOrValue, GErrors>)
    | undefined = ControlMethods.getOptions(this._validatorOrOpts);

  override controls: Array<
    TAbstractControlOf<
      GControlOrValue,
      FormArray<GControlOrValue, GErrors, GParent>
    >
  >;
  override readonly value: TControlValue<GControlOrValue>[];
  override readonly valueChanges: Observable<TControlValue<GControlOrValue>[]>;
  override readonly status: TControlStatus;
  override readonly statusChanges: Observable<TControlStatus>;
  override readonly errors: GErrors | null;

  readonly isTouched$ = this._touchChanges$
    .asObservable()
    .pipe(startWith(this.touched), distinctUntilChanged());
  readonly isDirty$ = this._dirtyChanges$
    .asObservable()
    .pipe(startWith(this.dirty), distinctUntilChanged());

  readonly value$: Observable<TControlValue<GControlOrValue>[]> =
    ControlMethods.getValueStream<TControlValue<GControlOrValue>[], GErrors>(
      this
    );
  readonly isDisabled$: Observable<boolean> =
    ControlMethods.getIsDisabledStream(this);
  readonly isEnabled$: Observable<boolean> =
    ControlMethods.getIsEnabledStream(this);
  readonly status$: Observable<TControlStatus> =
    ControlMethods.getStatusStream(this);
  readonly errors$: Observable<Partial<GErrors> | null> =
    ControlMethods.getErrorStream<TControlValue<GControlOrValue>[], GErrors>(
      this,
      this._errorsSubject$.asObservable()
    );
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
      this._options?.disabledReason$List
    );
  readonly firstDisabledReason$: Observable<string | null> =
    ControlMethods.getFirstDisabledReasonStream(this);
  readonly isValid$: Observable<boolean> =
    ControlMethods.getIsValidStream(this);
  readonly isValidAndDirty$: Observable<boolean> =
    ControlMethods.getIsValidAndDirtyStream(this);
  readonly isInvalid$: Observable<boolean> =
    ControlMethods.getIsInvalidStream(this);

  override get asyncValidator(): AsyncValidatorFn<
    TControlValue<GControlOrValue>[],
    GErrors
  > | null {
    return super.asyncValidator as AsyncValidatorFn<
      TControlValue<GControlOrValue>[],
      GErrors
    > | null;
  }

  override set asyncValidator(
    asyncValidator: AsyncValidatorFn<
      TControlValue<GControlOrValue>[],
      GErrors
    > | null
  ) {
    super.asyncValidator = asyncValidator;
  }

  override get validator(): ValidatorFn<
    TControlValue<GControlOrValue>[],
    GErrors
  > | null {
    return super.validator as ValidatorFn<
      TControlValue<GControlOrValue>[],
      GErrors
    > | null;
  }

  override set validator(
    validator: ValidatorFn<TControlValue<GControlOrValue>[], GErrors> | null
  ) {
    super.validator = validator;
  }

  override get parent(): GParent | null {
    return super.parent as GParent;
  }

  constructor(
    controls?: Array<
      TAbstractControlOf<
        GControlOrValue,
        FormArray<GControlOrValue, GErrors, GParent>
      >
    >,
    options?: IAbstractControlOptions<
      TControlValue<GControlOrValue>[],
      GErrors
    > &
      IFormArrayOptions<GControlOrValue, GErrors>
  );
  /**
   * @Deprecated
   * Please use options as a second parameter, left for backward compatibility only
   * */
  constructor(
    controls?: Array<
      TAbstractControlOf<
        GControlOrValue,
        FormArray<GControlOrValue, GErrors, GParent>
      >
    >,
    validators?:
      | ValidatorFn<TControlValue<GControlOrValue>[], GErrors>
      | ValidatorFn<TControlValue<GControlOrValue>[], GErrors>[]
      | null,
    asyncValidator?:
      | AsyncValidatorFn<TControlValue<GControlOrValue>[], GErrors>
      | AsyncValidatorFn<TControlValue<GControlOrValue>[], GErrors>[]
      | null
  );
  constructor(
    controls: Array<
      TAbstractControlOf<
        GControlOrValue,
        FormArray<GControlOrValue, GErrors, GParent>
      >
    >,
    private readonly _validatorOrOpts?:
      | ValidatorFn<TControlValue<GControlOrValue>[], GErrors>
      | ValidatorFn<TControlValue<GControlOrValue>[], GErrors>[]
      | null
      | (IAbstractControlOptions<TControlValue<GControlOrValue>[], GErrors> &
          IFormArrayOptions<GControlOrValue, GErrors>),
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(
      controls,
      ControlMethods.getBaseConstructorSecondParam<
        TControlValue<GControlOrValue>[],
        GErrors
      >(_validatorOrOpts),
      asyncValidator
    );
  }

  private _setControlsFromValue(
    value?: TControlValue<GControlOrValue>[]
  ): void {
    const currentControlsLength: number = this.controls.length;
    const newControlsLength: number = (value || []).length;

    const controlLengthDiff: number = currentControlsLength - newControlsLength;
    if (controlLengthDiff > 0) {
      _.times(controlLengthDiff, () => {
        this.removeAt(0);
      });
    } else if (controlLengthDiff < 0) {
      let controlsToAdd = -controlLengthDiff;
      const controlFactory:
        | ((
            _value?: TControlValue<GControlOrValue>
          ) => TAbstractControlOf<GControlOrValue>)
        | undefined = this._options?.controlFactory;
      if (controlFactory) {
        while (controlsToAdd) {
          const valueIndex: number = newControlsLength - controlsToAdd;
          controlsToAdd--;
          this.push(controlFactory(value![valueIndex]!));
        }
      } else {
        throw new Error(`controlFactory was not provided`);
      }
    }
  }

  override getRawValue(): TControlValue<GControlOrValue>[] {
    return super.getRawValue();
  }

  override at(index: number): TAbstractControlOf<GControlOrValue> {
    return super.at(index) as TAbstractControlOf<GControlOrValue>;
  }

  override setValue(
    value: TControlValue<GControlOrValue>[],
    options?: Pick<IControlUpdateOptions, 'emitEvent' | 'onlySelf'>
  ): void {
    try {
      this._setControlsFromValue(value);
    } catch (e) {
      throw new Error(`FormArray#setValue: ${(e as Error).message}`);
    }

    super.setValue(value, options);
  }

  /**
   * @deprecated
   * Preffered to use setValue instead as patchValue delivers unexpected results
   * */
  override patchValue(
    value: Partial<TControlValue<GControlOrValue>>[],
    options?: Pick<IControlUpdateOptions, 'emitEvent' | 'onlySelf'>
  ): void {
    super.patchValue(value as GControlOrValue[], options);
  }

  override push(control: TAbstractControlOf<GControlOrValue>): void {
    return super.push(control);
  }

  pushValue(value: TControlValue<GControlOrValue>): void {
    if (!this._options?.controlFactory) {
      throw new Error(`FormArray#pushValue: controlFactory was not provided`);
    }
    const control = this._options.controlFactory(value);
    control.reset(value);
    this.push(control);
  }

  override insert(
    index: number,
    control: TAbstractControlOf<GControlOrValue>
  ): void {
    return super.insert(index, control);
  }

  override setControl(
    index: number,
    control: TAbstractControlOf<GControlOrValue>
  ): void {
    return super.setControl(index, control);
  }

  /**
   * To use this function you must supply takeUntil$ in the constructor options
   * */
  disableWhile(
    observable: Observable<boolean>,
    options?: IControlUpdateOptions
  ): Subscription {
    return ControlMethods.disableWhile(
      this,
      observable,
      this._options,
      options
    );
  }

  override markAsTouched(opts?: Pick<IControlUpdateOptions, 'onlySelf'>): void {
    super.markAsTouched(opts);
    this._touchChanges$.next(true);
  }

  override markAsUntouched(
    opts?: Pick<IControlUpdateOptions, 'onlySelf'>
  ): void {
    super.markAsUntouched(opts);
    this._touchChanges$.next(false);
  }

  override markAsPristine(
    opts?: Pick<IControlUpdateOptions, 'onlySelf'>
  ): void {
    super.markAsPristine(opts);
    this._dirtyChanges$.next(false);
  }

  override markAsDirty(opts?: Pick<IControlUpdateOptions, 'onlySelf'>): void {
    super.markAsDirty(opts);
    this._dirtyChanges$.next(true);
  }

  override reset(
    value?: TControlValue<GControlOrValue>[],
    options?: Pick<IControlUpdateOptions, 'emitEvent' | 'onlySelf'>
  ): void {
    try {
      this._setControlsFromValue(value);
    } catch (e) {
      throw new Error(`FormArray#reset: ${(e as Error).message}`);
    }

    super.reset(value, options);
  }

  override setValidators(
    newValidator:
      | ValidatorFn<TControlValue<GControlOrValue>[], GErrors>
      | ValidatorFn<TControlValue<GControlOrValue>[], GErrors>[]
  ): void {
    super.setValidators(newValidator);
    super.updateValueAndValidity();
  }

  override setAsyncValidators(
    newValidator:
      | AsyncValidatorFn<TControlValue<GControlOrValue>[], GErrors>
      | AsyncValidatorFn<TControlValue<GControlOrValue>[], GErrors>[]
      | null
  ): void {
    super.setAsyncValidators(newValidator);
    super.updateValueAndValidity();
  }

  override hasError(
    errorCode: Extract<keyof GErrors, string>,
    path?: TControlPath
  ): boolean {
    return super.hasError(errorCode, path);
  }

  override async setErrors(
    errors: Partial<GErrors> | null,
    opts: Pick<IControlUpdateOptions, 'emitEvent'> = {}
  ): Promise<void> {
    await ControlMethods.setErrors(
      this,
      () => {
        return this._errorsSubject$;
      },
      errors,
      opts
    );
  }

  override getError<K extends Extract<keyof GErrors, string>>(
    errorCode: K,
    path?: TControlPath
  ): GErrors[K] | null {
    return super.getError(errorCode, path) as GErrors[K] | null;
  }

  hasErrorAndDirty(
    errorCode: Extract<keyof GErrors, string>,
    path?: TControlPath
  ): boolean {
    return ControlMethods.hasErrorAndDirty(this, errorCode, path);
  }

  setIsEnabled(
    enable = true,
    opts?: Pick<IControlUpdateOptions, 'emitEvent' | 'onlySelf'>
  ): void {
    return ControlMethods.setIsEnabled(this, enable, opts);
  }

  setIsDisabled(
    disable = true,
    opts?: Pick<IControlUpdateOptions, 'emitEvent' | 'onlySelf'>
  ): void {
    return ControlMethods.setIsDisabled(this, disable, opts);
  }

  remove(value: TControlValue<GControlOrValue>): void {
    for (let i = this.length - 1; i >= 0; --i) {
      if (this.at(i).value === value) {
        this.removeAt(i);
      }
    }
  }
}
