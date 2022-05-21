import { TestBed } from '@angular/core/testing';
import {
  StorageMigrationService,
  StorageMigrationScript,
} from './storage-migration.service';

describe('StorageMigrationService', function() {
  let storageMigrationService: StorageMigrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StorageMigrationService,
      ],
    }).compileComponents();

    storageMigrationService = TestBed.inject(StorageMigrationService);
  });

  it('runMigrationScripts', async () => {
    const migrationScriptsMock: StorageMigrationScript[] = [
      {
      },
      {
      },
    ];
    spyOn(storageMigrationService, 'getScriptsToRun').and.returnValue(Promise.resolve(migrationScriptsMock));
    const runScriptSpy = spyOn(storageMigrationService, 'runScript');
    await storageMigrationService.runMigrationScripts();
    expect(runScriptSpy.calls.all()).toEqual(migrationScriptsMock.map(script => jasmine.objectContaining({
      args: [script],
    })))
  });
});
