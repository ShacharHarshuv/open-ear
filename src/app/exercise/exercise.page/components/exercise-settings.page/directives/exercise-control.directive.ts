import {
  Directive,
  Input,
  Inject,
} from '@angular/core';
import { Exercise } from '../../../../Exercise';
import { ExerciseSettingsPage } from '../exercise-settings.page';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
} from '@angular/forms';
import {
  takeUntil,
  map,
  distinctUntilChanged,
  pairwise,
  startWith,
} from 'rxjs/operators';
import { BaseComponent } from '../../../../../shared/ts-utility';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

@Directive({
  selector: '[appExerciseControl]',
})
export class ExerciseControlDirective extends BaseComponent {
  @Input('appExerciseControl')
  set exerciseControlSettings(exerciseControlSettings: Exercise.SettingsControlDescriptor) {
    if (exerciseControlSettings?.key) {
      const control = this._exerciseSettingsPage.exerciseFormGroup.controls[exerciseControlSettings.key];
      for (let valueAccessor of this._valueAccessors) {
        valueAccessor.registerOnChange(change => {
          control.setValue(change);
        });
        control.value$
          .pipe(
            takeUntil(this._destroy$)
          )
          .subscribe(value => {
            valueAccessor.writeValue(value)
          });
      }
    } else {
      for (let valueAccessor of this._valueAccessors) {
        new Observable(subscriber => {
          valueAccessor.registerOnChange((value) => subscriber.next(value));
        })
          .pipe(
            startWith(exerciseControlSettings.getter?.(this._exerciseSettingsPage.exerciseFormGroup.value)),
            pairwise(),
            map(([newValue, prevValue]) => exerciseControlSettings.onChange?.(newValue, prevValue, this._exerciseSettingsPage.exerciseFormGroup.value)),
            distinctUntilChanged(_.isEqual),
            takeUntil(this._destroy$)
          )
          .subscribe(newSettings => {
            this._exerciseSettingsPage.exerciseFormGroup.patchValue(newSettings);
          })

        this._exerciseSettingsPage.exerciseFormGroup.value$
          .pipe(
            map(settings => exerciseControlSettings.getter?.(settings)),
            takeUntil(this._destroy$),
          )
          .subscribe(newValue => {
            valueAccessor.writeValue(newValue);
          });
      }
    }
  };

  constructor(
    private readonly _exerciseSettingsPage: ExerciseSettingsPage,
    @Inject(NG_VALUE_ACCESSOR) private readonly _valueAccessors: ControlValueAccessor[],
  ) {
    super();
  }
}
