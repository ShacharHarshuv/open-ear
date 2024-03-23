import { NgModule } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { createMockProviders } from './shared/testing-utility';
import { VersionService } from './version.service';

export class VersionServiceMock implements Pick<VersionService, 'version$'> {
  readonly version$ = new ReplaySubject<string>(1);

  set version(v: string) {
    this.version$.next(v);
  }
}

@NgModule({
  providers: [...createMockProviders(VersionServiceMock, VersionService)],
})
export class VersionTestingModule {}
