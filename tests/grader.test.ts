import test from 'node:test';
import assert from 'node:assert/strict';
import { gradeBehavior } from '../src/graders/behavior.js';
import type { BehaviorScenario } from '../src/types.js';

const scenario: BehaviorScenario = {
  id: 'sample',
  title: 'sample',
  kind: 'behavior',
  prompt: 'sample',
  expected: {
    stage: ['Build'],
    buildAuthorized: true,
    humanInput: 'none',
    continuation: 'continue',
    mustActivate: ['Lean Repository Execution'],
    mustNotActivate: ['Specialist Reasoning'],
  },
};

test('behavior grader scores structured envelope', () => {
  const result = gradeBehavior(scenario, {
    stage: 'Build / Routine fast path',
    buildAuthorized: true,
    humanInput: 'none',
    continuation: 'continue',
    activeCapabilities: ['Development OS', 'Lean Repository Execution'],
    specialistRoles: [],
  }, 'response');
  assert.equal(result.passed, true);
});

test('behavior grader catches unauthorized capability', () => {
  const result = gradeBehavior(scenario, {
    stage: 'Build',
    buildAuthorized: true,
    humanInput: 'none',
    continuation: 'continue',
    activeCapabilities: ['Lean Repository Execution', 'Specialist Reasoning'],
  }, 'response');
  assert.equal(result.passed, false);
  assert.ok(result.checks.some(check => check.key === 'notActivate:Specialist Reasoning' && !check.passed));
});
