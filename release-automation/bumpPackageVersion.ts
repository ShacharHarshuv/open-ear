import * as fs from 'fs';
import { parseVersion, Version, formatVersion } from './version';

export function bumpPackageVersion(
  bump: 'major' | 'minor' | 'patch',
  path: string = '../package.json'
): Version {
  const packageJson = JSON.parse(fs.readFileSync(path, 'utf8'));
  const version: Version = parseVersion(packageJson.version);
  version[bump]++;
  packageJson.version = formatVersion(version);
  fs.writeFileSync(path, JSON.stringify(packageJson, null, 2));
  return version;
}
