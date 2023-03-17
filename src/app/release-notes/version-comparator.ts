import { toNumber } from 'lodash';

export function versionComparator(version1: string, version2: string): number {
  // negative if version1 < version2
  const split1 = version1.split('.').map((v) => toNumber(v));
  const split2 = version2.split('.').map((v) => toNumber(v));

  for (let i = 0; i < split1.length; i++) {
    if (split1[i] - split2[i] != 0) {
      return split1[i] - split2[i];
    }
  }

  return 0;
}
