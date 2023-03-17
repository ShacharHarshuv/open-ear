import { Version, formatVersion } from './version';
import * as fs from 'fs';

export function updateAndroidVersion(
  version: Version,
  path: string = '../android/app/build.gradle'
): void {
  let file = fs.readFileSync(path, 'utf8');
  file = file.replace(
    /versionName "\d+.\d+.\d+"/,
    `versionName "${formatVersion(version)}"`
  );
  const versionCodeRegex = /versionCode (\d+)/;
  const currentVersionCode: number = +file.match(versionCodeRegex)![1];
  file = file.replace(
    versionCodeRegex,
    'versionCode ' + (currentVersionCode + 1)
  );
  fs.writeFileSync(path, file);
}
