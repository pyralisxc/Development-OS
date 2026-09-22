import { promises as fs } from 'node:fs';
import path from 'node:path';
import { repoRoot } from './harness/paths.js';

const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;

export async function packageVersion(): Promise<string> {
  const packagePath = path.join(repoRoot, 'package.json');
  const packageJson = JSON.parse(await fs.readFile(packagePath, 'utf8')) as { version?: unknown };
  if (typeof packageJson.version !== 'string' || !SEMVER.test(packageJson.version)) {
    throw new Error('package.json version must be a valid semantic version');
  }
  return packageJson.version;
}

export function assertReleaseTag(tag: string, version: string): void {
  if (tag !== `v${version}`) throw new Error(`release tag ${tag} must match package version v${version}`);
}
