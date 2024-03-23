import {
  ValidationErrors as AnyValidationErrors,
  AbstractControlOptions as NgAbstractControlOptions,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { ArrayItemType, OneOrMany, Primitive } from '../ts-utility';
import { IAbstractControl } from './abstractControl';
import { FormArray } from './formArray';
import { FormControl } from './formControl';
import { FormGroup } from './formGroup';

export type ValidationErrors<
  GErrors extends AnyValidationErrors = AnyValidationErrors,
> = GErrors;
export type ValidatorFn<
  GValue = any,
  GErrors extends ValidationErrors = ValidationErrors,
> = (
  control: IAbstractControl<GValue, GErrors>,
) => ValidationErrors<Partial<GErrors>> | null;
export type AsyncValidatorFn<
  GValue = any,
  GErrors extends ValidationErrors = ValidationErrors,
> = (
  control: IAbstractControl<GValue, GErrors>,
) =>
  | Promise<ValidationErrors<Partial<GErrors>> | null>
  | Observable<ValidationErrors<Partial<GErrors>> | null>;

interface IAbstractControlOptionsBase<
  GValue = any,
  GErrors extends ValidationErrors = ValidationErrors,
> extends NgAbstractControlOptions {
  validators?:
    | ValidatorFn<GValue, GErrors>
    | ValidatorFn<GValue, GErrors>[]
    | null;
  asyncValidators?:
    | AsyncValidatorFn<GValue, GErrors>
    | AsyncValidatorFn<GValue, GErrors>[]
    | null;
  errorMsgMap?: {
    [key in keyof GErrors]: string | ((errorValue: GErrors[key]) => string);
  };
  takeUntil$?: Observable<any>;
}

interface IAbstractControlOptionsWithoutDisabledReasonConfigList<
  GValue,
  GErrors extends ValidationErrors,
> extends IAbstractControlOptionsBase<GValue, GErrors> {
  disabledReason$List?: undefined;
}

interface IAbstractControlOptionsWithDisabledReasonConfigList<
  GValue,
  GErrors extends ValidationErrors,
> extends IAbstractControlOptionsBase<GValue, GErrors> {
  /**
   * To use disabledReasonConfigList you must supply takeUntil$
   * */
  disabledReason$List: OneOrMany<Observable<string | boolean>>;
  takeUntil$: Observable<any>;
}

export type IAbstractControlOptions<
  GValue = any,
  GErrors extends ValidationErrors = ValidationErrors,
> =
  | IAbstractControlOptionsWithoutDisabledReasonConfigList<GValue, GErrors>
  | IAbstractControlOptionsWithDisabledReasonConfigList<GValue, GErrors>;

export interface IControlUpdateOptions {
  onlySelf?: boolean;
  emitEvent?: boolean;
  emitModelToViewChange?: boolean;
  emitViewToModelChange?: boolean;
}

export type TControlStatus = 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED';

export type TControlPath = (string | number)[] | string;

export interface NgValidatorsErrors {
  required: true;
  email: true;
  pattern: { requiredPattern: string; actualValue: string };
  minlength: { requiredLength: number; actualLength: number };
  maxlength: { requiredLength: number; actualLength: number };
  min: { min: number; actual: number };
  max: { max: number; actual: number };
}

export type IControlValueState<T> = { value: T; disabled?: boolean };
export type TControlValueState<T> = T | IControlValueState<T>;

export type TAbstractControlParent = FormGroup | FormArray | null;

/**
 * Set the control's (GControl) parent property type (GParent)
 * **/
export type TControlWithParent<
  GControl extends IAbstractControl,
  GParent extends TAbstractControlParent,
> = GControl extends FormArray
  ? FormArray<GControl['controls'][0], NonNullable<GControl['errors']>, GParent>
  : GControl extends FormGroup
    ? FormGroup<GControl['controls'], NonNullable<GControl['errors']>, GParent>
    : GControl extends FormControl
      ? FormControl<GControl['value'], NonNullable<GControl['errors']>, GParent>
      : never;
/*
 * Convert a Control type or a value type
 * Leaving non-control types as is
 * */
export type TControlValue<T> = T extends IAbstractControl ? T['value'] : T;

/**
 * Convert an object of a FormGroup's "value" or "controls" to its "value"
 * */
export type IControlsValue<T extends { [p: string]: any }> = {
  [K in keyof T]: TControlValue<T[K]>;
};
/**
 * Converts a value / form control to form control
 * Converting non-control types to AbstractControl of the type
 *
 * The intermediate type is to solve the issue of T being any, thus assignable to all condition and resulting in the "any" type.
 *
 * Note the use of an array is to prevent use of distributive conditional types. (https://github.com/microsoft/TypeScript/issues/37279)
 * */
type TAbstractControlOfWithPotentialUnion<
  T,
  GParent extends TAbstractControlParent = any,
> = [T] extends [IAbstractControl]
  ? T
  : [T] extends [Primitive]
    ? FormControl<T, any, GParent>
    : IAbstractControl<T, any, GParent>;

export type TAbstractControlOf<
  T,
  GParent extends TAbstractControlParent = any,
> = IAbstractControl<
  any,
  any,
  GParent
> extends TAbstractControlOfWithPotentialUnion<T>
  ? IAbstractControl<
      TAbstractControlOfWithPotentialUnion<T>['value'],
      any,
      GParent
    >
  : TAbstractControlOfWithPotentialUnion<T, GParent>;

/**
 * Convert an object of a FormGroup's "value" or "controls" to "controls".
 * Converting non-control types to AbstractControl of the type
 * */
export type TAbstractControlsOf<
  GValueOrControls extends { [key: string]: any },
  GParentErrors extends ValidationErrors,
> = {
  [K in keyof GValueOrControls]: GValueOrControls[K] extends IAbstractControl
    ? TControlWithParent<
        GValueOrControls[K],
        FormGroup<GValueOrControls, GParentErrors>
      >
    : TAbstractControlOf<
        GValueOrControls[K],
        FormGroup<GValueOrControls, GParentErrors>
      >;
};

export type TControlOf<T, GParent extends TAbstractControlParent = any> = [
  T,
] extends [any[]]
  ? FormArray<TControlOf<ArrayItemType<T>>, any, GParent>
  : [T] extends [object]
    ? FormGroup<TControlsOf<T>, any, GParent>
    : FormControl<T, any, GParent>;
export type TControlsOf<
  T extends Object,
  TOverrides extends { [p in keyof T]?: IAbstractControl } = {},
  GParent extends TAbstractControlParent = any,
> = {
  [key in keyof T]: key extends keyof TOverrides
    ? TOverrides[key]
    : TControlOf<T[key], GParent>;
};

export type TFlatControlsOf<T extends Object> = {
  [key in keyof T]: FormControl<T[key]>;
};
