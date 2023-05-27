import {
  combineLatest,
  defer,
  merge,
  Observable,
  of,
  Subscription,
  Subject,
} from 'rxjs';
import {
  distinctUntilChanged,
  map,
  startWith,
  takeUntil,
} from 'rxjs/operators';
import {
  IAbstractControlOptions,
  IControlUpdateOptions,
  TControlPath,
  TControlStatus,
  ValidationErrors,
  ValidatorFn,
} from './types';
import {
  IAbstractControl,
  IControlErrorRef,
  IControlsParent,
} from './abstractControl';
import {
  AbstractControlOptions,
  AbstractControl as NgAbstractControl,
} from '@angular/forms';
import * as _ from 'lodash';
import {
  timeoutAsPromise,
  OneOrMany,
  toArray,
  isValueTruthy,
  StaticOrGetter,
  toGetter,
} from '../ts-utility';

function getControlValue<GValue, GErrors extends ValidationErrors>(
  control: IAbstractControl<GValue, GErrors>
): GValue {
  if ((control as any).getRawValue) {
    return (control as any).getRawValue();
  }
  return control.value;
}

function getTakeUntilWasNotProvidedError(functionName: string): Error {
  return new Error(
    `${functionName} was called but takeUntil$ was not provided. Please add a takeUntil$ Observable that completes to the control options when creating to avoid memory leak.`
  );
}

export class ControlMethods {
  static getValueStream<GValue, GErrors extends ValidationErrors>(
    control: IAbstractControl<GValue, GErrors>
  ): Observable<GValue> {
    return merge(
      defer(() => of(getControlValue(control))),
      control.valueChanges.pipe(
        map(() => getControlValue(control)),
        distinctUntilChanged()
      )
    );
  }

  static getErrorStream<GValue, GErrors extends ValidationErrors>(
    control: IAbstractControl<GValue, GErrors>,
    setErrorsWasCalled$: Observable<Partial<GErrors> | null>
  ): Observable<Partial<GErrors> | null> {
    return merge(
      defer(() => of(control.errors)),
      setErrorsWasCalled$,
      control.valueChanges.pipe(
        map(() => control.errors),
        distinctUntilChanged((a, b) => _.isEqual(a, b))
      )
    ).pipe(distinctUntilChanged());
  }

  static getIsValidAndDirtyStream<GValue, GErrors extends ValidationErrors>(
    control: IAbstractControl<GValue, GErrors>
  ): Observable<boolean> {
    return combineLatest([control.isValid$, control.isDirty$]).pipe(
      map((conditions) => _.every(conditions)),
      distinctUntilChanged()
    );
  }

  static getStatusStream<GValue, GErrors extends ValidationErrors>(
    control: IAbstractControl<GValue, GErrors>
  ): Observable<TControlStatus> {
    return merge(
      defer(() => of(control.status)),
      control.statusChanges.pipe(
        map(() => control.status),
        distinctUntilChanged()
      )
    );
  }

  static getIsEnabledStream<GValue, GErrors extends ValidationErrors>(
    control: IAbstractControl<GValue, GErrors>
  ): Observable<boolean> {
    return merge(
      defer(() => of(control.enabled)),
      control.statusChanges.pipe(
        map(() => control.enabled),
        distinctUntilChanged()
      )
    );
  }

  static getIsDisabledStream<GValue, GErrors extends ValidationErrors>(
    control: IAbstractControl<GValue, GErrors>
  ): Observable<boolean> {
    return merge(
      defer(() => of(control.disabled)),
      control.statusChanges.pipe(
        map(() => control.disabled),
        distinctUntilChanged()
      )
    );
  }

  static setIsEnabled<GValue, GErrors extends ValidationErrors>(
    control: IAbstractControl<GValue, GErrors>,
    enabled: boolean,
    opts?: IControlUpdateOptions
  ): void {
    if (enabled === control.enabled) {
      return;
    }
    if (enabled) {
      control.enable(opts);
    } else {
      control.disable(opts);
    }
  }

  static setIsDisabled<GValue, GErrors extends ValidationErrors>(
    control: IAbstractControl<GValue, GErrors>,
    disabled: boolean,
    opts?: IControlUpdateOptions
  ): void {
    ControlMethods.setIsEnabled(control, !disabled, opts);
  }

  static async setErrors<GValue, GErrors extends ValidationErrors>(
    control: IAbstractControl<GValue, GErrors>,
    getErrorSubject: () => Subject<Partial<GErrors> | null>,
    errors: Partial<GErrors> | null,
    opts: Pick<IControlUpdateOptions, 'emitEvent'> = {}
  ): Promise<void> {
    NgAbstractControl.prototype.setErrors.bind(control)(errors, opts);
    // super.setErrors(errors, opts);
    // in case of async validation - setErrors might be called before the properties of this class
    // are initialized
    if (!getErrorSubject()) {
      await timeoutAsPromise();
    }
    // make sure that the errors we update on the subject is equal to the errors argument we got
    // to avoid clashing with parallel calls to setErrors
    if (control.errors === errors) {
      getErrorSubject().next(errors);
    }
  }

  static disableWhile<GValue, GErrors extends ValidationErrors>(
    control: IAbstractControl<GValue, GErrors>,
    isDisabled$: Observable<boolean>,
    controlOptions?: IAbstractControlOptions<GValue, GErrors>,
    updateOptions?: IControlUpdateOptions & { takeUntil$?: Observable<any> }
  ): Subscription {
    const takeUntil$ = controlOptions?.takeUntil$ || updateOptions?.takeUntil$;
    if (!takeUntil$) {
      throw getTakeUntilWasNotProvidedError(`disableWhile`);
    }

    return isDisabled$
      .pipe(takeUntil(takeUntil$))
      .subscribe((isDisabled) =>
        ControlMethods.setIsDisabled(control, isDisabled, updateOptions)
      );
  }

  static enableWhile<GValue, GErrors extends ValidationErrors>(
    control: IAbstractControl<GValue, GErrors>,
    isEnabled$: Observable<boolean>,
    opts?: IControlUpdateOptions
  ): Subscription {
    return isEnabled$.subscribe((isEnabled) =>
      ControlMethods.setIsEnabled(control, isEnabled, opts)
    );
  }

  static hasError<GValue, GErrors extends ValidationErrors>(
    control: IAbstractControl<GValue, GErrors>,
    error: Extract<keyof GErrors, string>,
    path?: TControlPath
  ): boolean {
    return control.hasError(
      error,
      !path || path.length === 0 ? undefined : path
    );
  }

  static hasErrorAndDirty<GValue, GErrors extends ValidationErrors>(
    control: IAbstractControl<GValue, GErrors>,
    error: Extract<keyof GErrors, string>,
    path?: TControlPath
  ): boolean {
    return control.dirty && ControlMethods.hasError(control, error, path);
  }

  static getIsValidStream<GValue, GErrors extends ValidationErrors>(
    control: IAbstractControl<GValue, GErrors>
  ): Observable<boolean> {
    return control.status$.pipe(
      map(() => control.valid),
      distinctUntilChanged()
    );
  }

  static getIsInvalidStream<GValue, GErrors extends ValidationErrors>(
    control: IAbstractControl<GValue, GErrors>
  ): Observable<boolean> {
    return control.status$.pipe(
      map(() => control.invalid),
      distinctUntilChanged()
    );
  }

  static getErrorRefListStream<GValue, GErrors extends ValidationErrors>(
    control: IAbstractControl<GValue, GErrors>,
    errorMsgMap?: {
      [key in keyof GErrors]: StaticOrGetter<string, [GErrors[key]]>;
    }
  ): Observable<IControlErrorRef<GErrors>[]> {
    return control.errors$.pipe(
      map((errors): IControlErrorRef<GErrors>[] => {
        return _.map(
          errors,
          (errorData, errorKey): IControlErrorRef<GErrors> => {
            return {
              code: errorKey,
              data: errorData,
              msg:
                errorMsgMap?.[errorKey] !== undefined
                  ? typeof errorMsgMap[errorKey] === 'string'
                    ? errorMsgMap[errorKey]
                    : toGetter(errorMsgMap[errorKey])(errorData!)
                  : 'Unknown error',
            } as IControlErrorRef<GErrors>;
          }
        );
      })
    );
  }

  static getFirstErrorMsgStream<GValue, GErrors extends ValidationErrors>(
    control: IAbstractControl<GValue, GErrors>
  ): Observable<string | null> {
    return control.errorRefList$.pipe(
      map((errorRefList) => errorRefList[0]?.msg ?? null),
      distinctUntilChanged()
    );
  }

  static getAggregatedErrorRefListStream<
    GValue,
    GErrors extends ValidationErrors
  >(
    control: IAbstractControl<GValue, GErrors> &
      IControlsParent<GValue, GErrors>
  ): Observable<IControlErrorRef<GErrors>[]> {
    return combineLatest([
      control.errorRefList$,
      ..._.map(
        control.controls,
        (ctrl: IAbstractControl | (IAbstractControl & IControlsParent)) =>
          (ctrl as IControlsParent).aggregatedErrorRefList$ ||
          ctrl.errorRefList$
      ),
    ]).pipe(
      map((errorRefList: IControlErrorRef<GErrors>[][]) => {
        return _.flatMap(errorRefList);
      })
    );
  }

  static getFirstAggregatedErrorMsgStream<
    GValue,
    GErrors extends ValidationErrors
  >(
    control: IAbstractControl<GValue, GErrors> &
      IControlsParent<GValue, GErrors>
  ): Observable<string | null> {
    return control.aggregatedErrorRefList$.pipe(
      map((aggregatedErrorRefList) => aggregatedErrorRefList[0]?.msg ?? null)
    );
  }

  static getDisabledReasonList<GValue, GErrors extends ValidationErrors>(
    control: IAbstractControl<GValue, GErrors>,
    disabledReasonConfigList?: OneOrMany<Observable<string | boolean>>
  ): Observable<string[]> {
    if (!disabledReasonConfigList) {
      return of([]);
    }
    const disabledReasonList$ = combineLatest(
      _.map(toArray(disabledReasonConfigList), (disabledReason$) =>
        disabledReason$.pipe(
          map((disabledReason) =>
            disabledReason !== false ? disabledReason : null
          )
        )
      )
    ).pipe(
      map((disabledReasonList: (string | null)[]): string[] =>
        _.filter(disabledReasonList, isValueTruthy)
      ),
      startWith([]),
      distinctUntilChanged()
    );

    control.disableWhile(
      disabledReasonList$.pipe(map((reasonList) => !_.isEmpty(reasonList)))
    );

    return disabledReasonList$;
  }

  static getFirstDisabledReasonStream<GValue, GErrors extends ValidationErrors>(
    control: IAbstractControl<GValue, GErrors>
  ): Observable<string | null> {
    return control.disabledReasonList$.pipe(
      map((disabledReasonList) => disabledReasonList?.[0] ?? null),
      distinctUntilChanged()
    );
  }

  static getOptions<GValue, GErrors extends ValidationErrors>(
    validatorOrOpts?:
      | ValidatorFn<GValue, GErrors>
      | ValidatorFn<GValue, GErrors>[]
      | null
      | IAbstractControlOptions<GValue, GErrors>
  ): IAbstractControlOptions<GValue, GErrors> | undefined {
    if (
      !!validatorOrOpts &&
      typeof validatorOrOpts === 'object' &&
      !Array.isArray(validatorOrOpts)
    ) {
      return validatorOrOpts;
    }
    return undefined;
  }

  static getBaseConstructorSecondParam<
    GValue,
    GErrors extends ValidationErrors
  >(
    validatorOrOpts?:
      | ValidatorFn<GValue, GErrors>
      | ValidatorFn<GValue, GErrors>[]
      | null
      | IAbstractControlOptions<GValue, GErrors>
  ): ValidatorFn | ValidatorFn[] | AbstractControlOptions | null {
    if (
      !!validatorOrOpts &&
      typeof validatorOrOpts === 'object' &&
      !Array.isArray(validatorOrOpts)
    ) {
      return {
        validators:
          (validatorOrOpts as IAbstractControlOptions)?.validators || undefined,
        asyncValidators:
          (validatorOrOpts as IAbstractControlOptions)?.asyncValidators ||
          undefined,
      };
    }
    return validatorOrOpts || null;
  }
}
