import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReleaseNotesPage } from "./release-notes-page.component";
import {
  RELEASE_NOTES_TOKEN,
  releaseNotes
} from "./release-notes";
import { ModalModule } from "../shared/modal/modal.module";
import { IonicModule } from "@ionic/angular";

@NgModule({
  declarations: [ReleaseNotesPage],
  providers: [
    {
      provide: RELEASE_NOTES_TOKEN,
      useValue: releaseNotes,
    },
  ],
  imports: [CommonModule, ModalModule, IonicModule],
})
export class ReleaseNotesModule {}
