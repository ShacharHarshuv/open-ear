import { NgModule } from '@angular/core';
import { ReleaseNotesServiceMock } from './release-notes.service.mock';
import { ReleaseNotesService } from './release-notes.service';
import { createMockProviders } from '../shared/testing-utility';

@NgModule({
  providers: [
    ...createMockProviders(ReleaseNotesServiceMock, ReleaseNotesService),
  ],
})
export class ReleaseNotesTestingModule {}
