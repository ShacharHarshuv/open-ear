import { Injectable, Provider } from '@angular/core';
import { PublicMembers } from '../shared/ts-utility/PublicMembers';
import {
  StorageMigrationScript,
  StorageMigrationService,
} from './storage-migration.service';

@Injectable()
export class StorageMigrationServiceMock
  implements PublicMembers<StorageMigrationService>
{
  async getScriptsToRun(): Promise<StorageMigrationScript[]> {
    return [];
  }

  async runMigrationScript(
    migrationScript: StorageMigrationScript
  ): Promise<void> {}

  async runMigrationScripts(): Promise<void> {}

  static providers: Provider[] = [
    StorageMigrationServiceMock,
    {
      provide: StorageMigrationService,
      useExisting: StorageMigrationServiceMock,
    },
  ];
}
