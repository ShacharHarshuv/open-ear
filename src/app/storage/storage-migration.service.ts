import { Injectable } from '@angular/core';

export interface StorageMigrationScript {
}

@Injectable({
  providedIn: 'root'
})
export class StorageMigrationService {
  async getScriptsToRun(): Promise<StorageMigrationScript[]> {
    return [];
  }

  async runScript(migrationScript: StorageMigrationScript): Promise<void> {
  }

  async runMigrationScripts(): Promise<void> {
    const scriptsToRun: StorageMigrationScript[] = await this.getScriptsToRun();
    for (let script of scriptsToRun) {
      await this.runScript(script);
    }
  }
}
