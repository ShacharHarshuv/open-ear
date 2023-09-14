import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReleaseNotesModule } from './app/release-notes/release-notes.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppRoutingModule } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { VersionService } from './app/version.service';
import { migrationScripts } from './app/storage/migration-scripts/migration-scripts';
import { MIGRATION_SCRIPTS } from './app/storage/storage-migration.service';
import { IonicRouteStrategy, IonicModule } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot(), ReleaseNotesModule, DragDropModule),
        {
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy,
        },
        {
            provide: MIGRATION_SCRIPTS,
            useValue: migrationScripts,
        },
        VersionService,
        AppVersion,
        provideAnimations(),
    ]
})
  .catch((err) => console.log(err));
