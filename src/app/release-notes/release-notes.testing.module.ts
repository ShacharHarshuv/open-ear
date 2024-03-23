import { NgModule } from '@angular/core';
import { createMockProviders } from '../shared/testing-utility';
import { ReleaseNotesService } from './release-notes.service';
import { ReleaseNotesServiceMock } from './release-notes.service.mock';

@NgModule({
  providers: [
    ...createMockProviders(ReleaseNotesServiceMock, ReleaseNotesService),
  ],
})
export class ReleaseNotesTestingModule {}
