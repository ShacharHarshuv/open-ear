import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { ReleaseNotesTestingModule } from './release-notes/release-notes.testing.module';
import { StorageTestingModule } from './storage/storage.testing.module';
import { StorageMigrationService } from './storage/storage-migration.service';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [
        IonicModule,
        ReleaseNotesTestingModule,
        StorageTestingModule,
        RouterTestingModule.withRoutes([]),
        AppComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
}).compileComponents();
  }));

  it('should call runMigrationScripts on creation', () => {
    const spy = spyOn(
      TestBed.inject(StorageMigrationService),
      'runMigrationScripts'
    );
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture).toBeTruthy();
    expect(spy).toHaveBeenCalledOnceWith();
  });
});
