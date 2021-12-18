import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ReleaseNotesPage } from './release-notes/release-notes-page.component';
import { ReleaseNotesService } from './release-notes/release-notes.service';
import { toPromise } from './shared/ts-utility/rxjs/toPromise';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly _modalController: ModalController,
    private readonly _releaseNotesService: ReleaseNotesService,
  ) {
    this.showReleaseNotes();
  }

  async showReleaseNotes(): Promise<void> {
    const releaseNotes = await toPromise(this._releaseNotesService.relevantReleaseNotes$);
    if (_.isEmpty(releaseNotes)) {
      await this._releaseNotesService.setReleaseNotesWereViewed();
      return;
    }
    const modal = await this._modalController.create({
      component: ReleaseNotesPage,
    });
    await modal.present();
    await modal.onDidDismiss();
    await this._releaseNotesService.setReleaseNotesWereViewed();
  }
}
