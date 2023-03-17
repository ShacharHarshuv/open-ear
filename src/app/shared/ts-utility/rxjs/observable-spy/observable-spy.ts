import { Observable, Subscription } from 'rxjs';

export class ObservableSpy<G = unknown> {
  private readonly _subscription: Subscription;
  readonly spy = jasmine.createSpy<(value: G) => void>();

  constructor(private readonly _obs$: Observable<G>) {
    this._subscription = this._obs$.subscribe(this.spy);
  }

  reset(): void {
    this.spy.calls.reset();
  }

  unsubscribe(): void {
    if (!this._subscription.closed) {
      this._subscription.unsubscribe();
    }
  }
}

export namespace ObservableSpy {
  /**
   * Do not use this class directly,
   * Instead use spyOnObservable and matchers on the observable
   * */
  export const map = new Map<Observable<unknown>, ObservableSpy>();

  export function spyOn<G>(obs$: Observable<G>): void {
    if (map.get(obs$)) {
      throw new Error(
        `Cannot spy on Observable ${obs$} because it's already spied on`
      );
    }
    const observableSpy = new ObservableSpy(obs$);
    map.set(obs$, observableSpy);
  }

  export function getSpy<G>(observable: Observable<G>): ObservableSpy<G> {
    const observableSpy: ObservableSpy | undefined =
      ObservableSpy.map.get(observable);
    if (!observableSpy) {
      throw new Error(
        `Cannot assert emission of Observable because it wasn't spied on.\n Please call spyOnObservable first.`
      );
    }
    return observableSpy as ObservableSpy<G>;
  }

  export function resetEmissions<G>(obs$: Observable<G>): void {
    const observableSpy = getSpy(obs$);
    observableSpy.spy.calls.reset();
  }
}

afterEach(() => {
  const observableSpies = ObservableSpy.map.values();
  for (const observableSpy of observableSpies) {
    observableSpy.unsubscribe();
  }
});

/**
 * Call this to use observable matchers
 * */
