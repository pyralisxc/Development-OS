import type { BehaviorScenario, CheckResult, EvalEnvelope, ScenarioResult } from '../types.js';

function normalized(values: string[] | undefined): string[] {
  return (values ?? []).map(value => value.trim().toLowerCase());
}

function containsApprox(values: string[] | undefined, expected: string): boolean {
  const target = expected.trim().toLowerCase();
  return normalized(values).some(value => value === target || value.includes(target) || target.includes(value));
}

function stageMatches(actual: string | undefined, expected: string[]): boolean {
  if (!actual) return false;
  const value = actual.toLowerCase();
  return expected.some(stage => value === stage.toLowerCase() || value.startsWith(`${stage.toLowerCase()} /`) || value.startsWith(`${stage.toLowerCase()} —`));
}

export function gradeBehavior(scenario: BehaviorScenario, envelope: EvalEnvelope, responseText: string): ScenarioResult {
  const checks: CheckResult[] = [];
  const expected = scenario.expected;

  if (expected.stage) checks.push({ key: 'stage', passed: stageMatches(envelope.stage, expected.stage), expected: expected.stage, actual: envelope.stage });
  if (expected.buildAuthorized !== undefined) checks.push({ key: 'buildAuthorized', passed: envelope.buildAuthorized === expected.buildAuthorized, expected: expected.buildAuthorized, actual: envelope.buildAuthorized });
  if (expected.humanInput) checks.push({ key: 'humanInput', passed: envelope.humanInput === expected.humanInput, expected: expected.humanInput, actual: envelope.humanInput });
  if (expected.continuation && expected.continuation !== 'either') checks.push({ key: 'continuation', passed: envelope.continuation === expected.continuation, expected: expected.continuation, actual: envelope.continuation });

  for (const capability of expected.mustActivate ?? []) {
    checks.push({ key: `activate:${capability}`, passed: containsApprox(envelope.activeCapabilities, capability), expected: capability, actual: envelope.activeCapabilities });
  }
  for (const capability of expected.mustNotActivate ?? []) {
    const inCapabilities = containsApprox(envelope.activeCapabilities, capability);
    const inRoles = containsApprox(envelope.specialistRoles, capability);
    checks.push({ key: `notActivate:${capability}`, passed: !inCapabilities && !inRoles, expected: `not ${capability}`, actual: { activeCapabilities: envelope.activeCapabilities, specialistRoles: envelope.specialistRoles } });
  }
  for (const role of expected.specialistRoles ?? []) {
    checks.push({ key: `specialist:${role}`, passed: containsApprox(envelope.specialistRoles, role), expected: role, actual: envelope.specialistRoles });
  }
  for (const label of expected.evidenceLabels ?? []) {
    checks.push({ key: `evidence:${label}`, passed: containsApprox(envelope.evidenceLabels, label), expected: label, actual: envelope.evidenceLabels });
  }

  return {
    scenarioId: scenario.id,
    passed: checks.every(check => check.passed),
    checks,
    envelope,
    responseText,
  };
}
