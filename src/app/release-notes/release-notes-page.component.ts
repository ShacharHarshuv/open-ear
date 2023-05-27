import { Component, inject } from '@angular/core';
import { VersionService } from '../version.service';
import { ReleaseNotesService } from './release-notes.service';

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes-page.component.html',
  styleUrls: ['./release-notes-page.component.scss'],
})
export class ReleaseNotesPage {
  readonly versionService = inject(VersionService);
  readonly releaseNotesService = inject(ReleaseNotesService);
}
