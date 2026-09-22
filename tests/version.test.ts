import test from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { repoRoot } from '../src/harness/paths.js';
import { packageVersion } from '../src/version.js';

test('package version is the single release and plugin version authority', async () => {
  const version = await packageVersion();
  const portable = JSON.parse(await fs.readFile(path.join(repoRoot, 'plugin.json'), 'utf8')) as {
    version: string;
    extensions?: { 'com.openai'?: { interface?: { composerIcon?: string; logo?: string } } };
  };
  const codex = JSON.parse(await fs.readFile(path.join(repoRoot, '.codex-plugin', 'plugin.json'), 'utf8')) as {
    version: string;
    interface?: { composerIcon?: string; logo?: string };
  };
  const lockfile = JSON.parse(await fs.readFile(path.join(repoRoot, 'package-lock.json'), 'utf8')) as {
    version?: string;
    packages?: Record<string, { version?: string }>;
  };
  const workflow = await fs.readFile(path.join(repoRoot, '.github', 'workflows', 'verify.yml'), 'utf8');
  const packager = await fs.readFile(path.join(repoRoot, 'scripts', 'package-release.ts'), 'utf8');

  assert.equal(portable.version, version);
  assert.equal(codex.version, version);
  assert.equal(lockfile.version, version);
  assert.equal(lockfile.packages?.['']?.version, version);
  assert.match(workflow, /steps\.package-version\.outputs\.version/);
  assert.match(packager, /const version = await packageVersion\(\)/);
  assert.doesNotMatch(packager, /const version\s*=\s*['"]/);

  const portableInterface = portable.extensions?.['com.openai']?.interface;
  assert.equal(portableInterface?.composerIcon, './assets/composer-icon.svg');
  assert.equal(portableInterface?.logo, './assets/logo.svg');
  assert.equal(codex.interface?.composerIcon, portableInterface?.composerIcon);
  assert.equal(codex.interface?.logo, portableInterface?.logo);
  assert.match(packager, /fs\.cp\(path\.join\(repoRoot, 'assets'\)/);

  for (const asset of ['composer-icon.svg', 'logo.svg']) {
    const svg = await fs.readFile(path.join(repoRoot, 'assets', asset), 'utf8');
    assert.match(svg, /<svg\b/);
    assert.match(svg, /width="512"/);
    assert.match(svg, /height="512"/);
    assert.match(svg, /viewBox="0 0 512 512"/);
  }
});

