import test from 'node:test';
import assert from 'node:assert/strict';
import { parseEvalEnvelope } from '../src/harness/envelope.js';

test('eval envelope parses the last telemetry block', () => {
  const parsed = parseEvalEnvelope('hello\n<DEVOS_EVAL>{"stage":"Ready","buildAuthorized":false,"ambition":"preserve spatial continuity","exploreEntry":"discovery","evidenceAppetite":"representative"}</DEVOS_EVAL>');
  assert.equal(parsed.stage, 'Ready');
  assert.equal(parsed.buildAuthorized, false);
  assert.equal(parsed.ambition, 'preserve spatial continuity');
  assert.equal(parsed.exploreEntry, 'discovery');
  assert.equal(parsed.evidenceAppetite, 'representative');
});
