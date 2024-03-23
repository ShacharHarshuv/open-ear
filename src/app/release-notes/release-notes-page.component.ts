import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ModalFrameComponent } from '../shared/modal/modal-frame/modal-frame.component';
import { VersionService } from '../version.service';
import { ReleaseNotesService } from './release-notes.service';

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
