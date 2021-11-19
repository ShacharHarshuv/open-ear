import {Component} from '@angular/core';
import {AppVersion} from "@ionic-native/app-version/ngx";

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage {
  readonly version$: Promise<string | number> = this._getVersion();

  constructor(private _appVersion: AppVersion) {
  }

  private _getVersion(): Promise<string | number> {
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
