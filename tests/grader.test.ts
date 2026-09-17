import test from 'node:test';
import assert from 'node:assert/strict';
import { gradeBehavior, gradeExpectation } from '../src/graders/behavior.js';
import type { BehaviorScenario } from '../src/types.js';

const scenario: BehaviorScenario = {
  id: 'sample',
  title: 'sample',
  kind: 'behavior',
  prompt: 'sample',
  expected: {
    stage: ['Build'],
    mode: ['Execute'],
    buildAuthorized: true,
    humanInput: 'none',
    continuation: 'continue',
    authorizationReferentContains: ['hardening'],
    authorizationScopeContains: ['fix'],
    activeFrontierMin: 1,
    mustActivate: ['Lean Repository Execution'],
    mustNotActivate: ['Specialist Reasoning'],
  },
};

test('behavior grader scores structured session envelope', () => {
  const result = gradeBehavior(scenario, {
    stage: 'Build / Routine fast path',
    mode: 'Execute / Repair',
    objective: 'Harden the application',
    stageBasis: 'Known behavior and explicit current action intent',
    buildAuthorized: true,
    authorizationReferent: 'application hardening',
    authorizationScope: ['inspect', 'fix ordinary defects'],
    humanInput: 'none',
    continuation: 'continue',
    boundary: 'none',
    activeFrontier: ['run focused proof'],
    activeCapabilities: ['Development OS', 'Lean Repository Execution'],
    specialistRoles: [],
  }, 'response');
  assert.equal(result.passed, true);
});

test('behavior grader catches unauthorized capability', () => {
  const result = gradeBehavior(scenario, {
    stage: 'Build',
    mode: 'Execute',
    buildAuthorized: true,
    authorizationReferent: 'hardening',
    authorizationScope: ['fix'],
    humanInput: 'none',
    continuation: 'continue',
    activeFrontier: ['proof'],
    activeCapabilities: ['Lean Repository Execution', 'Specialist Reasoning'],
  }, 'response');
  assert.equal(result.passed, false);
  assert.ok(result.checks.some(check => check.key === 'notActivate:Specialist Reasoning' && !check.passed));
});

test('liveness invariant rejects handoff while self-executable frontier remains', () => {
  const result = gradeExpectation('liveness', { humanInput: 'none' }, {
    humanInput: 'none',
    continuation: 'handoff',
    boundary: 'none',
    activeFrontier: ['continue audit'],
  }, 'response');
  assert.equal(result.passed, false);
  assert.ok(result.checks.some(check => check.key === 'liveness' && !check.passed));
  assert.ok(result.checks.some(check => check.key === 'handoff-boundary' && !check.passed));
});
