import { Injectable, Provider } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PublicMembers } from '../shared/ts-utility/PublicMembers';
import { ReleaseNotesService } from './release-notes.service';

@Injectable()
export class ReleaseNotesServiceMock
  implements PublicMembers<ReleaseNotesService>
{
  relevantReleaseNotes$ = new BehaviorSubject<string[]>([]);

  setReleaseNotesWereViewed(): Promise<void> {
    return Promise.resolve();
  }

  static providers: Provider[] = [
    ReleaseNotesServiceMock,
    {
      provide: ReleaseNotesService,
      useExisting: ReleaseNotesServiceMock,
    },
  ];
}
