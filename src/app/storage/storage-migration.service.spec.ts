import { TestBed } from '@angular/core/testing';
import {
  StorageMigrationService,
  StorageMigrationScript,
  MIGRATION_SCRIPTS,
} from './storage-migration.service';
import { VersionServiceMock } from '../version.service.mock';
import { StorageServiceMock } from './storage.service.mock';
import { StorageService } from './storage.service';
import Expected = jasmine.Expected;
import ArrayContaining = jasmine.ArrayContaining;

describe('StorageMigrationService', function() {
  const baseMockScript: StorageMigrationScript = {
    breakingChangeVersion: '1.0.0',
    storageKey: 'key',
    getNewData(oldData: any): any {
    },
  }
  let storageMigrationService: StorageMigrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StorageMigrationService,
        ...VersionServiceMock.providers,
        ...StorageServiceMock.providers,
        {
          provide: MIGRATION_SCRIPTS,
          useValue: [],
        },
      ],
    }).compileComponents();
  });

  it('runMigrationScripts', async () => {
    storageMigrationService = TestBed.inject(StorageMigrationService);
    const migrationScriptsMock: StorageMigrationScript[] = [
      {
        ...baseMockScript,
        breakingChangeVersion: '1.1.2',
      },
      {
        ...baseMockScript,
        breakingChangeVersion: '1.4.2',
      },
    ];
    spyOn(storageMigrationService, 'getScriptsToRun').and.returnValue(Promise.resolve(migrationScriptsMock));
    const runScriptSpy = spyOn(storageMigrationService, 'runScript');
    await storageMigrationService.runMigrationScripts();
    expect(runScriptSpy.calls.all()).toEqual(migrationScriptsMock.map(script => jasmine.objectContaining({
      args: [script],
    })))
  });

  describe('getScriptsToRun', () => {
    const mockScripts: StorageMigrationScript[] = [
      {
        ...baseMockScript,
        breakingChangeVersion: '1.1.2',
      },
      {
        ...baseMockScript,
        breakingChangeVersion: '1.1.3',
      },
      {
        ...baseMockScript,
        breakingChangeVersion: '1.2.0',
      },
      {
        ...baseMockScript,
        breakingChangeVersion: '1.2.1',
      },
    ];

    const testCases: {
      name: string;
      currentVersion: string;
      lastVersionValue: string | undefined;
      expectedValue: Expected<ArrayLike<StorageMigrationScript>> | ArrayContaining<StorageMigrationScript>;
    }[] = [
      {
        name: 'when lastVersion is not set, should return all scripts',
        currentVersion: '1.2.3',
        lastVersionValue: undefined,
        expectedValue: mockScripts,
      },
      {
        name: 'when lastVersion = last migration script version, should return no script',
        currentVersion: '1.2.1',
        lastVersionValue: '1.2.1',
        expectedValue: [],
      },
      {
        name: 'when lastVersion > last migration script version, should return no script',
        currentVersion: '1.2.2',
        lastVersionValue: '1.2.2',
        expectedValue: [],
      },
      {
        name: 'return all scripts between lastVersionValue and currentVersion',
        currentVersion: '1.2.1',
        lastVersionValue: '1.1.3',
        expectedValue: [
          jasmine.objectContaining({
            breakingChangeVersion: '1.2.0',
          }),
          jasmine.objectContaining({
            breakingChangeVersion: '1.2.1',
          }),
        ],
      },
    ]

    testCases.forEach(testCase => {
      fit(testCase.name, async () => {
        TestBed.overrideProvider(MIGRATION_SCRIPTS, {
          useValue: mockScripts,
        });
        storageMigrationService = TestBed.inject(StorageMigrationService);
        TestBed.inject(VersionServiceMock).version$.next(testCase.currentVersion)
        spyOn(TestBed.inject(StorageService), 'get').and.callFake((key) => {
          if (key === 'lastVersion') {
            return Promise.resolve(testCase.lastVersionValue);
          }
          return Promise.resolve();
        });
        expect(await storageMigrationService.getScriptsToRun()).toEqual(testCase.expectedValue);
      });
    })
  })
});
