import {
  Injectable,
  Inject,
  InjectionToken,
} from '@angular/core';
import {
  OneOrMany,
  toObservable,
} from '../shared/ts-utility';
import { VersionService } from '../version.service';
import { StorageService } from './storage.service';
import { firstValueFrom } from 'rxjs';
import { versionComparator } from '../release-notes/version-comparator';

export interface StorageMigrationScript<GDataType = any> {
  breakingChangeVersion: string;
  storageKey: OneOrMany<string>; // if more than one provided, script will be run for all provided keys
  getNewData(oldData: GDataType): GDataType;
}

export const MIGRATION_SCRIPTS = new InjectionToken<StorageMigrationScript[]>('MigrationScrtips');

@Injectable({
  providedIn: 'root'
})
export class StorageMigrationService {
  private readonly _lastVersionKey: string = 'lastVersion';

  constructor(
    private _versionService: VersionService,
    private _storageService: StorageService,
    @Inject(MIGRATION_SCRIPTS) private _migrationScrips: StorageMigrationScript[],
  ) {
  }

  async getScriptsToRun(): Promise<StorageMigrationScript[]> {
    const currentVersion: string = await firstValueFrom(toObservable(await this._versionService.version$));
    const lastVersion: string = await this._storageService.get(this._lastVersionKey);
    if (!lastVersion) {
      return this._migrationScrips;
    }
    if (lastVersion === currentVersion) {
      return [];
    }
    return this._migrationScrips.filter(migrationScript => {
      return versionComparator(migrationScript.breakingChangeVersion, lastVersion) > 0 &&
        versionComparator(migrationScript.breakingChangeVersion, currentVersion) <= 0;
    });
  }

  /**
   * Todo: verify that if key does not exist, nothing is done (it's still not saved)
   * */
  async runScript(migrationScript: StorageMigrationScript): Promise<void> {
  }

  async runMigrationScripts(): Promise<void> {
    const scriptsToRun: StorageMigrationScript[] = await this.getScriptsToRun();
    for (let script of scriptsToRun) {
      await this.runScript(script);
    }
  }
}
