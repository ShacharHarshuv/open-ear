import { Signal } from '@angular/core';
import { onChange } from './on-change';

export function logChange<T extends Signal<unknown>>(
  label: string,
  signal: T
): T {
  return onChange(signal, (value) => {
    console.log(label, value);
  });
}
