import { Injectable, inject } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Injectable()
export class VersionService {
  private readonly _appVersion = inject(AppVersion);
  readonly version$ = this._getVersion();

  private _getVersion(): Promise<string> {
    return this._appVersion.getVersionNumber().catch((error) => {
      /**
       * TODO: it would be healthier to never call getVersionCode when cordova is not available.
       * Need to figure out how to know that
       * */
      return 'development';
    });
  }
}
