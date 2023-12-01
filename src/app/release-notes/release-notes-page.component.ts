import { Component, inject } from '@angular/core';
import { VersionService } from '../version.service';
import { ReleaseNotesService } from './release-notes.service';
import { ModalFrameComponent } from '../shared/modal/modal-frame/modal-frame.component';
import { IonicModule } from '@ionic/angular';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes-page.component.html',
  styleUrls: ['./release-notes-page.component.scss'],
  standalone: true,
  imports: [ModalFrameComponent, IonicModule, AsyncPipe],
})
export class ReleaseNotesPage {
  readonly versionService = inject(VersionService);
  readonly releaseNotesService = inject(ReleaseNotesService);
}
