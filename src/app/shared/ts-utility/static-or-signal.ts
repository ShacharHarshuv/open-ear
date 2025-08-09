import { Signal } from '@angular/core';

export type StaticOrSignal<T> = T | Signal<T>;

// todo
// export function toSignal<T>(staticOrSignal: StaticOrSignal<T>): Signal<T> {
//   return staticOrSignal instanceof Signal ? staticOrSignal : computed(() => staticOrSignal);
// }
