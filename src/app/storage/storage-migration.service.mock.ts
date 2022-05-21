import {
  Injectable,
  Provider,
} from '@angular/core';
import { PublicMembers } from '../shared/ts-utility/PublicMembers';
import { StorageMigrationService } from './storage-migration.service';

@Injectable()
export class StorageMigrationServiceMock implements PublicMembers<StorageMigrationService> {
  async runMigrationScripts(): Promise<void> {
  }

  static providers: Provider[] = [
    StorageMigrationServiceMock,
    {
      provide: StorageMigrationService,
      useExisting: StorageMigrationServiceMock,
    },
  ]
}
