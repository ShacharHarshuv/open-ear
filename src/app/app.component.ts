import { Component, inject } from '@angular/core';
import {
  AlertController,
  IonicModule,
  ModalController,
  Platform,
} from '@ionic/angular';
import * as _ from 'lodash';
import { ReleaseNotesPage } from './release-notes/release-notes-page.component';
import { ReleaseNotesService } from './release-notes/release-notes.service';
import { toPromise } from './shared/ts-utility/rxjs/toPromise';
import { StorageMigrationService } from './storage/storage-migration.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class AppComponent {
  private readonly _modalController = inject(ModalController);
  private readonly _releaseNotesService = inject(ReleaseNotesService);
  private readonly _alertController = inject(AlertController);
  private readonly _platform = inject(Platform);
  private readonly _storageMigrationService = inject(StorageMigrationService);

  constructor() {
    this.showReleaseNotes();
    this._storageMigrationService.runMigrationScripts();

    if (this._platform.is('iphone')) {
      this._alertController
        .create({
          message: 'Please make sure silent mode is off while using the app.',
          subHeader: 'Turn off Silent Mode',
          buttons: ['Silent mode is off'],
        })
        .then((alert) => alert.present());
    }

    document.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
    });
  }

  async showReleaseNotes(): Promise<void> {
    const releaseNotes = await toPromise(
      this._releaseNotesService.relevantReleaseNotes$,
    );
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
