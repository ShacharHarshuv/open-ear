import { effect, Signal } from '@angular/core';

export function onChange<T, TSignal extends Signal<T>>(
  signal: TSignal,
  callback: (value: T) => void
): TSignal {
  effect(() => {
    callback(signal());
  });
  return signal;
}
