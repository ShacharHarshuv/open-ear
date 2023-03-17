import { NgModule } from "@angular/core";
import { ReleaseNotesServiceMock } from "./release-notes.service.mock";

@NgModule({
  providers: [ReleaseNotesServiceMock.providers],
})
export class ReleaseNotesTestingModule {}
