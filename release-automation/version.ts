export type Version = {
  major: number;
  minor: number;
  patch: number;
};

export function parseVersion(version: string): Version {
  const [major, minor, patch] = version.split('.').map((v) => +v);
  return {
    major,
    minor,
    patch,
  };
}

export function formatVersion(version: Version): string {
  return `${version.major}.${version.minor}.${version.patch}`;
}
