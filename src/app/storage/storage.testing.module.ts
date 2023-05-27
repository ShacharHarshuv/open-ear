import { NgModule } from '@angular/core';
import { StorageMigrationServiceMock } from './storage-migration.service.mock';
import { StorageMigrationService } from './storage-migration.service';
import { createMockProviders } from '../shared/testing-utility';

@NgModule({
  providers: [
    ...createMockProviders(
      StorageMigrationServiceMock,
      StorageMigrationService
    ),
  ],
})
export class StorageTestingModule {}
