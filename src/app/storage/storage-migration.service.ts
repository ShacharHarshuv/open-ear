import { Injectable, InjectionToken, inject } from '@angular/core';
import * as _ from 'lodash';
import { firstValueFrom } from 'rxjs';
import { versionComparator } from '../release-notes/version-comparator';
import { OneOrMany, toArray, toObservable } from '../shared/ts-utility';
import { VersionService } from '../version.service';
import { StorageService } from './storage.service';

export interface StorageMigrationScript<GData = any> {
  breakingChangeVersion: string;
  storageKey: OneOrMany<string>; // if more than one provided, script will be run for all provided keys
  getNewData(oldData: GData): GData;
}

export const MIGRATION_SCRIPTS = new InjectionToken<StorageMigrationScript[]>(
  'MigrationScrtips',
);

@Injectable({
  providedIn: 'root',
})
export class StorageMigrationService {
  private _versionService = inject(VersionService);
  private _storageService = inject(StorageService);
  private _migrationScrips: readonly StorageMigrationScript[] =
    inject(MIGRATION_SCRIPTS);
  private readonly _lastVersionKey: string = 'lastVersion';

  async getScriptsToRun(): Promise<readonly StorageMigrationScript[]> {
    const currentVersion: string = await firstValueFrom(
      toObservable(await this._versionService.version$),
    );
    const lastVersion: string = await this._storageService.get(
      this._lastVersionKey,
    );
    if (!lastVersion && currentVersion !== 'development') {
      return this._migrationScrips;
    }
    if (lastVersion === currentVersion || currentVersion === 'development') {
      return [];
    }
    return this._migrationScrips.filter((migrationScript) => {
      return (
        versionComparator(migrationScript.breakingChangeVersion, lastVersion) >
          0 &&
        versionComparator(
          migrationScript.breakingChangeVersion,
          currentVersion,
        ) <= 0
      );
    });
  }

  async runMigrationScript<GData = any>(
    migrationScript: Omit<
      StorageMigrationScript<GData>,
      'breakingChangeVersion'
    >,
  ): Promise<void> {
    for (let key of toArray(migrationScript.storageKey)) {
      const currentValue: GData = await this._storageService.get(key);
      if (_.isNil(currentValue)) {
        continue;
      }
      const newValue: GData = migrationScript.getNewData(currentValue);
      await this._storageService.set(key, newValue);
    }
  }

  async runMigrationScripts(): Promise<void> {
    const scriptsToRun: readonly StorageMigrationScript[] =
      await this.getScriptsToRun();
    for (let script of scriptsToRun) {
      await this.runMigrationScript(script);
    }
  }
}
