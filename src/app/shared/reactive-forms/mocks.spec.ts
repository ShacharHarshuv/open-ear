import { Observable, of } from 'rxjs';
import { FormControl } from './formControl';
import { FormGroup } from './formGroup';
import { FormArray } from './formArray';
import { ValidatorFn } from './types';

export interface INestedTestForm {
  num: number;
  obj?: {
    str: string;
    numArr: number[];
  };
  arr?: { a: number }[];
  bool?: boolean;
}

export interface INestedTestFormControls {
  num: FormControl<number>;
  obj: FormGroup<{
    str: FormControl<string>;
    numArr: FormArray<FormControl<number>>;
  }>;
  arr: FormArray<FormGroup<{ a: number }>>;
}

export interface IPerson {
  name?: string;
  age: number;
}

export interface ITestErrors {
  required: boolean;
  customError: {
    actualValue: string;
    requiredCondition: string;
  };
}

export const person: IPerson = {
  name: 'Shachar',
  age: 21,
};

export const nestedFormMockValue: INestedTestForm = {
  num: 1,
  obj: {
    str: '1',
    numArr: [1],
  },
  arr: [
    {
      a: 2,
    },
  ],
};
export const nestedFormControls: INestedTestFormControls = {
  num: new FormControl<number>(),
  obj: new FormGroup<{
    str: FormControl<string>;
    numArr: FormArray<FormControl<number>>;
  }>({
    str: new FormControl<string>(),
    numArr: new FormArray<FormControl<number>>([]),
  }),
  arr: new FormArray<FormGroup<{ a: number }>>([]),
};

export const errors: ITestErrors = {
  required: true,
  customError: {
    actualValue: '*',
    requiredCondition: '*',
  },
};
export const required = (control): Partial<ITestErrors> => ({
  required: true,
});
export const customError = (control): Partial<ITestErrors> => ({
  customError: {
    requiredCondition: '*',
    actualValue: '*',
  },
});
export const requiredAsync = (control): Observable<Partial<ITestErrors>> =>
  of({
    required: true,
  });
export const customErrorAsync = (control): Observable<Partial<ITestErrors>> =>
  of({
    customError: {
      requiredCondition: '*',
      actualValue: '*',
    },
  });
export const failingValidator: ValidatorFn = (group): { isInvalid: true } => ({
  isInvalid: true,
});
