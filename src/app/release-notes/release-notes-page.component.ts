import { Component } from '@angular/core';
import { VersionService } from '../version.service';
import { ReleaseNotesService } from './release-notes.service';

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes-page.component.html',
  styleUrls: ['./release-notes-page.component.scss'],
})
export class ReleaseNotesPage {
  constructor(
    public readonly versionService: VersionService,
    public readonly releaseNotesService: ReleaseNotesService,
  ) {
  }

}
