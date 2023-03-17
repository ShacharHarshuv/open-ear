import { ControlValueAccessor as NgControlValueAccessor } from '@angular/forms';

export abstract class ControlValueAccessor<GValue = any>
  implements NgControlValueAccessor
{
  abstract writeValue(value: GValue): void;

  onChange? = (value: GValue | null): void => {};
  onTouched? = (): void => {};

  registerOnChange(fn: (value: GValue | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
