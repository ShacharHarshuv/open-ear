import { bumpPackageVersion } from "./bumpPackageVersion";
import { formatVersion } from "./version";
import { updateAndroidVersion } from "./updateAndroidVersion";

const version = bumpPackageVersion('patch');
updateAndroidVersion(version);

/**
 * TODO:
 * - Commit
 * - Create and Tag
 * - Build bundles
 * - Create release on github with bundles
 * - Create testing release on google play
 * */

console.log('Done Release ', formatVersion(version));
