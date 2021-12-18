import { Injectable } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Async } from './shared/ts-utility/rxjs/SyncOrAsync';

@Injectable()
export class VersionService {
  readonly version$: Async<string> = this._getVersion();

  constructor(private _appVersion: AppVersion) {
  }

  private _getVersion(): Promise<string> {
    return this._appVersion.getVersionNumber()
    .catch((error) => {
      /**
       * TODO: it would be healthier to never call getVersionCode when cordova is not available.
       * Need to figure out how to know that
       * */
      return 'development';
    });
  };
}
