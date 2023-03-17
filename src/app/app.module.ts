import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VersionService } from './version.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { ModalModule } from './shared/modal/modal.module';
import { ReleaseNotesModule } from './release-notes/release-notes.module';
import { SandboxComponent } from './sandbox/sandbox.component';
import { MIGRATION_SCRIPTS } from './storage/storage-migration.service';
import { migrationScripts } from './storage/migration-scripts/migration-scripts';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [AppComponent, SandboxComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    ModalModule,
    ReleaseNotesModule,
    DragDropModule,
  ],
  providers: [
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
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
