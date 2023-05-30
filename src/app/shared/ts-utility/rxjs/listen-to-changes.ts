import { Observable, BehaviorSubject } from 'rxjs';

const errorMsg = (key: unknown): string =>
  `Cannot listen to changes for property ${String(key)} because`;

export function listenToChanges<G, K extends keyof G>(
  object: G,
  key: K
): Observable<G[K]>;
export function listenToChanges<G, K extends keyof G>(
  object: any,
  key: string
): Observable<any>;
export function listenToChanges<G, K extends keyof G>(
  object: any,
  key: string
): Observable<any> {
  const subject$ = new BehaviorSubject<G[K]>(object[key]);
  function getPropertyDescriptor(_object): PropertyDescriptor | undefined {
    if (!_object) {
      return;
    }

    const descriptor: PropertyDescriptor | undefined =
      Object.getOwnPropertyDescriptor(_object, key);
    if (descriptor) {
      return descriptor;
    }

    return getPropertyDescriptor(_object.__proto__);
  }

  const descriptor: PropertyDescriptor | undefined =
    getPropertyDescriptor(object);
  if (!descriptor) {
    throw new Error(
      `${errorMsg(
        key
      )} it's not defined. Please make sure it's initialized before calling ${
        listenToChanges.name
      }`
    );
  }

  if (descriptor.get && !descriptor.set) {
    throw new Error(
      `${errorMsg(key)} because it only has a getter and not a setter`
    );
  }

  if (!descriptor.get && descriptor.set) {
    throw new Error(
      `${errorMsg(key)} because it only has a setter and not a getter`
    );
  }

  const { originalValueGet, originalValueSet } =
    descriptor.get && descriptor.set
      ? {
          originalValueGet: descriptor.get.bind(object),
          originalValueSet: descriptor.set.bind(object),
        }
      : (() => {
          let value = descriptor.value;
          return {
            originalValueGet: () => value,
            originalValueSet: (v: any) => (value = v),
          };
        })();

  delete object[key];
  Object.defineProperty(object, key, {
    get: function (): G[K] {
      return originalValueGet();
    },
    set: function (value: G[K]) {
      originalValueSet(value);
      subject$.next(originalValueGet());
    },
    configurable: true,
  });
  return subject$.asObservable();
}
