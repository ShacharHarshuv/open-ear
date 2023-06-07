import { Directive, Input, Inject, inject } from '@angular/core';
import Exercise from '../../../../exercise-logic';
import { ExerciseSettingsPage } from '../exercise-settings.page';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { takeUntil, map, pairwise, startWith } from 'rxjs/operators';
import { BaseComponent } from '../../../../../shared/ts-utility';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { shareReplayUntil } from '../../../../../shared/ts-utility/rxjs/shareReplayUntil';

@Directive({
  selector: '[appExerciseControl]',
  standalone: true,
})
export class ExerciseControlDirective extends BaseComponent {
  private readonly _exerciseSettingsPage = inject(ExerciseSettingsPage);
  private readonly _valueAccessors: readonly ControlValueAccessor[] =
    inject(NG_VALUE_ACCESSOR);

  @Input('appExerciseControl')
  set exerciseControlSettings(
    exerciseControlSettings: Exercise.SettingsControlDescriptor
  ) {
    if (exerciseControlSettings?.key) {
      const control =
        this._exerciseSettingsPage.exerciseFormGroup.controls[
          exerciseControlSettings.key
        ];
      for (let valueAccessor of this._valueAccessors) {
        valueAccessor.registerOnChange((change) => {
          control.setValue(change);
        });
        control.value$.pipe(takeUntil(this._destroy$)).subscribe((value) => {
          valueAccessor.writeValue(value);
        });
      }
    } else {
      for (let valueAccessor of this._valueAccessors) {
        const updateDisabledState = (settings, value) => {
          valueAccessor.setDisabledState?.(
            exerciseControlSettings.isDisabled?.(settings, value) ?? false
          );
        };
        const controlValue$ = new Observable((subscriber) => {
          valueAccessor.registerOnChange((value) => subscriber.next(value));
        }).pipe(
          startWith(
            exerciseControlSettings.getter?.(
              this._exerciseSettingsPage.exerciseFormGroup.value
            )
          ),
          shareReplayUntil(this._destroy$)
        );

        // Update settings on change
        controlValue$
          .pipe(
            pairwise(),
            map(([newValue, prevValue]) => ({
              newSettings: exerciseControlSettings.onChange?.(
                newValue,
                prevValue,
                this._exerciseSettingsPage.exerciseFormGroup.value
              ),
              newValue,
            })),
            takeUntil(this._destroy$)
          )
          .subscribe(({ newSettings, newValue }) => {
            if (
              newSettings &&
              !_.isEqual(
                newSettings,
                this._exerciseSettingsPage.exerciseFormGroup.value
              )
            ) {
              this._exerciseSettingsPage.exerciseFormGroup.patchValue(
                newSettings
              );
              updateDisabledState(newSettings, newValue);
            }
          });

        // Update control value on setting's change
        this._exerciseSettingsPage.exerciseFormGroup.value$
          .pipe(
            map((settings) => exerciseControlSettings.getter?.(settings)),
            takeUntil(this._destroy$)
          )
          .subscribe((newValue) => {
            valueAccessor.writeValue(newValue);
            updateDisabledState(
              this._exerciseSettingsPage.exerciseFormGroup.value,
              newValue
            );
          });
      }
    }
  }
}
