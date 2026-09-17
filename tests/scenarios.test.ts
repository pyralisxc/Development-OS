import test from 'node:test';
import assert from 'node:assert/strict';
import { loadBehaviorScenarios, loadDevelopmentScenarios, loadProductiveScenarios, loadTrajectoryScenarios } from '../src/harness/scenarios.js';

test('development scenarios are unique and include one-shot plus trajectory regressions', async () => {
  const all = await loadDevelopmentScenarios();
  const behavior = await loadBehaviorScenarios();
  const trajectory = await loadTrajectoryScenarios();

  assert.ok(behavior.length >= 20);
  assert.ok(trajectory.length >= 5);
  assert.equal(new Set(all.map(item => item.id)).size, all.length);
  assert.ok(behavior.some(item => item.id === 'continuity-invalid-human-none-close'));
  assert.ok(behavior.some(item => item.id === 'crystal-exposes-implementation-shape'));
  assert.ok(trajectory.some(item => item.id === 'trajectory-standing-hardening-authorization'));
  assert.ok(trajectory.some(item => item.id === 'trajectory-new-semantics-invalidate-authorization'));
  assert.ok(trajectory.some(item => item.id === 'trajectory-human-none-keeps-working'));
});

test('productive eval template is disabled by default', async () => {
  const scenarios = await loadProductiveScenarios();
  assert.ok(scenarios.length >= 1);
  assert.ok(scenarios.every(item => !item.enabled));
});
