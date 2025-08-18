import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppComponent } from './app.component';
import { ReleaseNotesTestingModule } from './release-notes/release-notes.testing.module';
import { StorageMigrationService } from './storage/storage-migration.service';
import { StorageTestingModule } from './storage/storage.testing.module';

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        ReleaseNotesTestingModule,
        StorageTestingModule,
        RouterTestingModule.withRoutes([]),
        AppComponent,
        IonicStorageModule.forRoot(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  it('should call runMigrationScripts on creation', () => {
    const spy = spyOn(
      TestBed.inject(StorageMigrationService),
      'runMigrationScripts',
    );
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture).toBeTruthy();
    expect(spy).toHaveBeenCalledOnceWith();
  });
});
