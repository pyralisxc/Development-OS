import test from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { repoRoot } from '../src/harness/paths.js';
import { packageVersion } from '../src/version.js';

test('package version is the single release and plugin version authority', async () => {
  const version = await packageVersion();
  const portable = JSON.parse(await fs.readFile(path.join(repoRoot, 'plugin.json'), 'utf8')) as { version: string };
  const codex = JSON.parse(await fs.readFile(path.join(repoRoot, '.codex-plugin', 'plugin.json'), 'utf8')) as { version: string };
  const workflow = await fs.readFile(path.join(repoRoot, '.github', 'workflows', 'verify.yml'), 'utf8');
  const packager = await fs.readFile(path.join(repoRoot, 'scripts', 'package-release.ts'), 'utf8');

  assert.equal(portable.version, version);
  assert.equal(codex.version, version);
  assert.match(workflow, /steps\.package-version\.outputs\.version/);
  assert.match(packager, /const version = await packageVersion\(\)/);
  assert.doesNotMatch(packager, /const version\s*=\s*['"]/);
});
