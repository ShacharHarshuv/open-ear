import { VersionService } from './version.service';
import { Provider } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export class VersionServiceMock implements Pick<VersionService, 'version$'> {
  readonly version$ = new ReplaySubject<string>(1);

  set version(v: string) {
    this.version$.next(v);
  }

  static providers: Provider[] = [
    VersionServiceMock,
    {
      provide: VersionService,
      useExisting: VersionServiceMock,
    },
  ];
}
