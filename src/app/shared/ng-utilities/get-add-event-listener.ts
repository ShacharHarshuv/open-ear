import { EffectCleanupRegisterFn } from '@angular/core';

export function getAddEventListener(onCleanup: EffectCleanupRegisterFn) {
  function addEventListener<K extends keyof HTMLElementEventMap>(
    htmlElement: HTMLElement | Document,
    type: K[],
    listener: (ev: HTMLElementEventMap[K]) => any,
  );
  function addEventListener<K extends keyof HTMLElementEventMap>(
    htmlElement: HTMLElement | Document,
    type: K,
    listener: (ev: HTMLElementEventMap[K]) => any,
  );
  function addEventListener<K extends keyof HTMLElementEventMap>(
    htmlElement: HTMLElement | Document,
    type: K | K[],
    listener: (ev: HTMLElementEventMap[K]) => any,
  ) {
    if (Array.isArray(type)) {
      type.forEach((type) => addEventListener(htmlElement, type, listener));
      return;
    }

    htmlElement.addEventListener(type, listener);
    onCleanup(() => {
      htmlElement.removeEventListener(type, listener);
    });
  }

  return addEventListener;
}
