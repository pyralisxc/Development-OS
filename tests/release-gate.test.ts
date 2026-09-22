import test from 'node:test';
import assert from 'node:assert/strict';
import { assertReleaseTag } from '../src/version.js';

test('release validation accepts the package version tag', () => {
  assert.doesNotThrow(() => assertReleaseTag('v4.1.5', '4.1.5'));
});

test('release validation rejects a tag for a different package version', () => {
  assert.throws(() => assertReleaseTag('v4.0.0', '4.1.5'), /must match package version/);
});

