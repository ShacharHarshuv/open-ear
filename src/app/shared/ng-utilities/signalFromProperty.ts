import { onPropertySet } from '../ts-utility/onPropertySet';
import { Signal, signal } from '@angular/core';

export function signalFromProperty<G, K extends keyof G>(
  object: G,
  key: K
): Signal<G[K]>;
export function signalFromProperty<G, K extends keyof G>(
  object: any,
  key: string
): Signal<any>;
export function signalFromProperty<G, K extends keyof G>(
  object: any,
  key: string
): Signal<any> {
  const sig = signal(object[key]);
  onPropertySet(object, key, (value) => {
    sig.set(value);
  });
  return sig;
}
