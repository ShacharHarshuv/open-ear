import { enableProdMode, importProvidersFrom } from '@angular/core';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  PreloadAllModules,
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
} from '@angular/router';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppComponent } from './app/app.component';
import {
  RELEASE_NOTES_TOKEN,
  releaseNotes,
} from './app/release-notes/release-notes';
import { routes } from './app/routes';
import { migrationScripts } from './app/storage/migration-scripts/migration-scripts';
import { MIGRATION_SCRIPTS } from './app/storage/storage-migration.service';
import { VersionService } from './app/version.service';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    {
      provide: RELEASE_NOTES_TOKEN,
      useValue: releaseNotes,
    },
    importProvidersFrom(
      BrowserModule,
      IonicModule.forRoot(),
      IonicStorageModule.forRoot(),
      DragDropModule,
    ),
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
    importProvidersFrom(
      provideFirebaseApp(() => {
        console.log('initializeApp');
        return initializeApp({
          apiKey: 'AIzaSyANL-ufEKaeOgg-cihiNg5NyNZkUA0iLGY',
          authDomain: 'openear-4654a.firebaseapp.com',
          projectId: 'openear-4654a',
          storageBucket: 'openear-4654a.firebasestorage.app',
          messagingSenderId: '768435529409',
          appId: '1:768435529409:web:cb835daa8234966b99d640',
          measurementId: 'G-NXSDJS7KT2',
        });
      }),
      provideFirestore(() => getFirestore()),
    ),
  ],
}).catch((err) => console.log(err));
