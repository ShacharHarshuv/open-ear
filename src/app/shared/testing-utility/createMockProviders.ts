import { TypeProvider, Provider } from '@angular/core';

export function createMockProviders(
  mock: TypeProvider,
  real: TypeProvider
): Provider[] {
  return [
    mock,
    {
      provide: real,
      useExisting: mock,
    },
  ];
}
