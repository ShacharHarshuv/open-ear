import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleaseNotesPage } from './release-notes-page.component';
import { RELEASE_NOTES_TOKEN, releaseNotes } from './release-notes';
import { IonicModule } from '@ionic/angular';
import { ModalFrameComponent } from '../shared/modal/modal-frame/modal-frame.component';

@NgModule({
  providers: [
    {
      provide: RELEASE_NOTES_TOKEN,
      useValue: releaseNotes,
    },
  ],
  imports: [ReleaseNotesPage, CommonModule, ModalFrameComponent, IonicModule],
})
export class ReleaseNotesModule {}
