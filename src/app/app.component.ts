import { Component } from '@angular/core';
import {
  ModalController,
  AlertController,
  Platform,
} from '@ionic/angular';
import { ReleaseNotesPage } from './release-notes/release-notes-page.component';
import { ReleaseNotesService } from './release-notes/release-notes.service';
import { toPromise } from './shared/ts-utility/rxjs/toPromise';
import * as _ from 'lodash';
import { StorageMigrationService } from './storage/storage-migration.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly _modalController: ModalController,
    private readonly _releaseNotesService: ReleaseNotesService,
    private readonly _alertController: AlertController,
    private readonly _platform: Platform,
    private readonly _storageMigrationService: StorageMigrationService,
  ) {
    this.showReleaseNotes();
    this._storageMigrationService.runMigrationScripts();

    if (this._platform.is('iphone')) {
      this._alertController.create({
        message: 'Please make sure silent mode is off while using the app.',
        subHeader: 'Turn off Silent Mode',
        buttons: ['Silent mode is off'],
      }).then(alert => alert.present());
    }
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
