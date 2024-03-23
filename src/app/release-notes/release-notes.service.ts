import { Injectable, inject } from '@angular/core';
import * as _ from 'lodash';
import { Observable, Subject, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { toObservable } from '../shared/ts-utility';
import { toPromise } from '../shared/ts-utility/rxjs/toPromise';
import { StorageService } from '../storage/storage.service';
import { VersionService } from '../version.service';
import { RELEASE_NOTES_TOKEN, ReleaseNotes } from './release-notes';
import { versionComparator } from './version-comparator';

@Injectable({
  providedIn: 'root',
})
export class ReleaseNotesService {
  private readonly _versionService = inject(VersionService);
  private readonly _releaseNotes: ReleaseNotes = inject(RELEASE_NOTES_TOKEN);
  private readonly _storageService = inject(StorageService);

  private readonly _releaseNotesKey: string = 'releaseNotesViewedOn';
  private readonly _releaseNotesViewedOnChange$ = new Subject<string>();
  readonly relevantReleaseNotes$: Observable<string[]> =
    this._getRelevantReleaseNotes();

  async setReleaseNotesWereViewed(): Promise<void> {
    const currentVersion = await toPromise(this._versionService.version$);
    if (currentVersion === 'development') {
      return;
    }
    await this._storageService.set(this._releaseNotesKey, currentVersion);
    this._releaseNotesViewedOnChange$.next(currentVersion);
  }

  private _getRelevantReleaseNotes(): Observable<string[]> {
    return toObservable(this._versionService.version$).pipe(
      switchMap((currentVersion) => {
        if (currentVersion === 'development') {
          return of([]);
        }

        const releaseNotesLastViewedOn$ = toObservable(
          this._storageService.get(this._releaseNotesKey),
        ).pipe(
          switchMap((releaseNotesLastViewedOn) => {
            return this._releaseNotesViewedOnChange$.pipe(
              startWith(releaseNotesLastViewedOn),
            );
          }),
        );

        return releaseNotesLastViewedOn$.pipe(
          map((releaseNotesLastViewedOn) => {
            return _.flatMap(
              this._releaseNotes.filter(
                (releaseNote) =>
                  !!releaseNotesLastViewedOn &&
                  versionComparator(
                    releaseNote.version,
                    releaseNotesLastViewedOn,
                  ) > 0,
              ),
              (releaseNote) => {
                return releaseNote.notes;
              },
            );
          }),
        );
      }),
    );
  }
}
