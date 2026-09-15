import test from 'node:test';
import assert from 'node:assert/strict';
import { loadBehaviorScenarios, loadProductiveScenarios } from '../src/harness/scenarios.js';

 test('behavior scenarios are unique and include v3.5 crystallization regressions', async () => {
  const scenarios = await loadBehaviorScenarios();
  assert.ok(scenarios.length >= 20);
  assert.equal(new Set(scenarios.map(item => item.id)).size, scenarios.length);
  assert.ok(scenarios.some(item => item.id === 'continuity-invalid-human-none-close'));
  assert.ok(scenarios.some(item => item.id === 'crystal-exposes-implementation-shape'));
  assert.ok(scenarios.some(item => item.id === 'crystal-human-verifiable-synthesis'));
});

test('productive eval template is disabled by default', async () => {
  const scenarios = await loadProductiveScenarios();
  assert.ok(scenarios.length >= 1);
  assert.ok(scenarios.every(item => !item.enabled));
});
