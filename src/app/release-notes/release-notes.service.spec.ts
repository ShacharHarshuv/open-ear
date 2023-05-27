import { TestBed } from '@angular/core/testing';
import { ReleaseNotesService } from './release-notes.service';
import {
  VersionServiceMock,
  VersionTestingModule,
} from '../version.service.mock';
import { RELEASE_NOTES_TOKEN, ReleaseNotes } from './release-notes';
import { Subscription } from 'rxjs';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';
import { timeoutAsPromise } from '../shared/ts-utility';
import { Storage } from '@ionic/storage-angular';

describe('ReleaseNotesService', function () {
  let releaseNotesService: ReleaseNotesService;
  let versionServiceMock: VersionServiceMock;
  const releaseNotesChangSpy: jasmine.Spy = jasmine.createSpy();
  let subscription: Subscription;

  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    );
    const releaseNotesMock: ReleaseNotes = [
      {
        version: '1.0.0',
        notes: '1.0.0',
      },
      {
        version: '1.2.3',
        notes: ['1.2.3a', '1.2.3b'],
      },
      {
        version: '3.2.1',
        notes: '3.2.1',
      },
    ];

    const storageMock = {};
    TestBed.configureTestingModule({
      imports: [VersionTestingModule],
      providers: [
        ReleaseNotesService,
        {
          provide: RELEASE_NOTES_TOKEN,
          useValue: releaseNotesMock,
        },
        {
          provide: Storage,
          useValue: {
            create: function () {
              return Promise.resolve(this);
            },
            set: function (key, value): Promise<any> {
              storageMock[key] = value;
              return Promise.resolve();
            },
            get: function (key): Promise<any> {
              return Promise.resolve(storageMock[key]);
            },
          },
        },
      ],
    });

    releaseNotesService = TestBed.inject(ReleaseNotesService);
    versionServiceMock = TestBed.inject(VersionServiceMock);
    subscription =
      releaseNotesService.relevantReleaseNotes$.subscribe(releaseNotesChangSpy);
  });

  afterEach(() => {
    subscription.unsubscribe();
  });

  describe('relevantReleaseNotes$', function () {
    it('should contain relevant release notes', async () => {
      versionServiceMock.version = '1.0.0';
      await timeoutAsPromise();
      /**
       * This is seemingly the first time the user opens the app, so no release notes should be displayed
       * */
      expect(releaseNotesChangSpy).toHaveBeenCalledWith([]);
      versionServiceMock.version = '1.0.1';
      await releaseNotesService.setReleaseNotesWereViewed();
      await timeoutAsPromise();
      expect(releaseNotesChangSpy).toHaveBeenCalledWith([
        '1.2.3a',
        '1.2.3b',
        '3.2.1',
      ]);

      versionServiceMock.version = '3.2.1';
      await releaseNotesService.setReleaseNotesWereViewed();
      await timeoutAsPromise();
      expect(releaseNotesChangSpy).toHaveBeenCalledWith([]);
    });
  });
});
