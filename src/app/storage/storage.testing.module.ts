import { NgModule } from '@angular/core';
import { createMockProviders } from '../shared/testing-utility';
import { StorageMigrationService } from './storage-migration.service';
import { StorageMigrationServiceMock } from './storage-migration.service.mock';

@NgModule({
  providers: [
    ...createMockProviders(
      StorageMigrationServiceMock,
      StorageMigrationService,
    ),
  ],
})
export class StorageTestingModule {}
