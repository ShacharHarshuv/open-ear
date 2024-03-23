import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, IAbstractControl } from '../../reactive-forms';
import { SyncOrAsync } from '../rxjs/SyncOrAsync';
import { toPromise } from '../rxjs/toPromise';
import { BaseControlValueAccessorComponent } from './base-control-value-accessor-component';

export abstract class BaseControlValueAccessorWithCustomControl<
  GCVAValue,
  GInternalValue = GCVAValue,
  GControl extends
    IAbstractControl<GInternalValue> = FormControl<GInternalValue>,
> extends BaseControlValueAccessorComponent<GCVAValue> {
  readonly control: GControl = this._getControl();

  protected constructor() {
    super();
    this._startModelValueChangeHandler();
    this._startDisabledChangeHandler();
  }

  setInternalViewValue(
    newValue: GInternalValue,
    skipMarkAsTouched?: boolean,
  ): void {
    super.setViewValue(
      this._internalValueToCVAValue(newValue),
      skipMarkAsTouched,
    );
  }

  protected abstract _getControl(): GControl;

  protected abstract _CVAValueToInternalValue(
    modelValue: GCVAValue,
  ): SyncOrAsync<GInternalValue>;

  protected abstract _internalValueToCVAValue(
    modelValue: GInternalValue,
  ): GCVAValue;

  private _startModelValueChangeHandler(): void {
    this.modelValue$
      .pipe(takeUntilDestroyed())
      .subscribe(async (modelValue) => {
        this.control.setValue(
          await toPromise(this._CVAValueToInternalValue(modelValue)),
        );
      });
  }

  private _startDisabledChangeHandler(): void {
    this.isDisabled$
      .pipe(takeUntilDestroyed())
      .subscribe((isDisabled) => this.control.setIsDisabled(isDisabled));
  }
}
