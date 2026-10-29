import test from 'node:test';
import assert from 'node:assert/strict';
import { loadActivationScenarios, loadBehaviorScenarios, loadDevelopmentScenarios, loadHostScenarios, loadProductiveScenarios, loadTrajectoryScenarios, validateBehaviorScenario, validateHostScenario } from '../src/harness/scenarios.js';

test('development scenarios are unique and include one-shot plus trajectory regressions', async () => {
  const all = await loadDevelopmentScenarios();
  const behavior = await loadBehaviorScenarios();
  const trajectory = await loadTrajectoryScenarios();

  assert.ok(behavior.length >= 32);
  assert.ok(trajectory.length >= 8);
  assert.equal(new Set(all.map(item => item.id)).size, all.length);
  assert.ok(behavior.some(item => item.id === 'continuity-invalid-human-none-close'));
  assert.ok(behavior.some(item => item.id === 'crystal-exposes-implementation-shape'));
  assert.ok(trajectory.some(item => item.id === 'trajectory-standing-hardening-authorization'));
  assert.ok(trajectory.some(item => item.id === 'trajectory-new-semantics-invalidate-authorization'));
  assert.ok(trajectory.some(item => item.id === 'trajectory-human-none-keeps-working'));
  assert.ok(behavior.some(item => item.id === 'discovery-explore-independent-orientation'));
  assert.ok(behavior.some(item => item.id === 'representation-challenge-before-ready'));
  assert.ok(behavior.some(item => item.id === 'objective-level-proof-not-local-green'));
  assert.ok(trajectory.some(item => item.id === 'trajectory-ambition-survives-build-transition'));
  assert.ok(trajectory.some(item => item.id === 'trajectory-discovery-reconciles-founder-interpretation'));
});

test('activation-routing scenarios cover universal kernel and proportional specialist restraint', async () => {
  const scenarios = await loadActivationScenarios();
  assert.ok(scenarios.length >= 7);
  assert.ok(scenarios.some(item => item.id === 'activation-direct-implementation-keeps-kernel'));
  assert.ok(scenarios.some(item => item.id === 'activation-terse-reentry-restores-kernel'));
  assert.ok(scenarios.some(item => item.id === 'activation-nondevelopment-lightweight-kernel'));
  assert.ok(scenarios.some(item => item.id === 'activation-everyday-greeting-kernel'));
  assert.ok(scenarios.some(item => item.id === 'activation-event-reentry-preserves-kernel'));
  assert.ok(scenarios.every(item => !item.expected.notActivate?.includes('development-os')));
});

test('productive eval is a real enabled scenario with an explicit usefulness rubric', async () => {
  const scenarios = await loadProductiveScenarios();
  assert.equal(scenarios.length, 1);
  assert.equal(scenarios[0]?.enabled, true);
  assert.ok((scenarios[0]?.rubric.length ?? 0) >= 3);
  assert.ok(scenarios[0]?.rubric.every(item => item.required));
});

test('host acceptance scenarios require real capabilities and include a multi-turn intent case', async () => {
  const scenarios = await loadHostScenarios();
  assert.ok(scenarios.length >= 5);
  assert.ok(scenarios.every(item => item.requiredCapabilities.includes('shell')));
  assert.ok(scenarios.some(item => item.turns.length > 1));
  assert.ok(scenarios.some(item => item.id === 'host-fresh-development-activates-kernel'));
  assert.ok(scenarios.some(item => item.id === 'host-long-session-reentry-preserves-kernel'));
});

test('scenario validation fails closed on unknown expectation fields', async () => {
  await assert.rejects(
    validateBehaviorScenario({
      id: 'typo',
      title: 'typo',
      kind: 'behavior',
      prompt: 'test',
      expected: { buildAuthorised: true },
    }),
    /additional properties/,
  );
});

test('host acceptance covers connected collection, local composition and honest receipt provenance', async () => {
  const scenarios = await loadHostScenarios();
  for (const id of ['host-project-local-companion-composition', 'host-connected-result-collection-and-reentry', 'host-owner-auditable-receipt-provenance']) {
    assert.ok(scenarios.some(item => item.id === id), id);
  }
  const connected = scenarios.find(item => item.id === 'host-connected-result-collection-and-reentry')!;
  assert.ok(connected.requiredCapabilities.includes('connected-read-only-tool'));
  assert.ok(connected.turns.some(turn => turn.prompt.includes('ordinary channel description') && turn.requiredActivatedSkills?.includes('Development OS')));
  for (const id of ['host-ordinary-reply-root-kernel','host-founder-idea-reaches-ready-boundary','host-project-wake-recovers-objective']) {
    assert.ok(scenarios.some(item => item.id === id), id);
  }
  await assert.rejects(validateHostScenario({ ...connected, implicitPass: true }), /additional properties/);
});
