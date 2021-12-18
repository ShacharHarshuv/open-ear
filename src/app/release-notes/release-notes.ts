import { InjectionToken } from '@angular/core';
import { OneOrMany } from '../shared/ts-utility';

export const RELEASE_NOTES_TOKEN: InjectionToken<ReleaseNotes> = new InjectionToken('Release Notes');

export type ReleaseNotes = {
  version: string,
  notes: OneOrMany<string>
}[];

export const releaseNotes: ReleaseNotes = [
  // { // todo: expose after release notes feature is deployed (the feature will work only if it's not loaded on the first time to avoid showing to new users)
  //   version: '1.2.0',
  //   notes: 'Cadence is always played in 120BPM regardless of BPM settings',
  // },
]
