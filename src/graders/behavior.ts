import type { BehaviorExpectation, BehaviorScenario, CheckResult, EvalEnvelope, ScenarioResult } from '../types.js';

function normalized(values: string[] | undefined): string[] {
  return (values ?? []).map(value => value.trim().toLowerCase());
}

function containsApprox(values: string[] | undefined, expected: string): boolean {
  const target = expected.trim().toLowerCase();
  return normalized(values).some(value => value === target || value.includes(target) || target.includes(value));
}

function textContains(actual: string | undefined, expected: string): boolean {
  return (actual ?? '').toLowerCase().includes(expected.trim().toLowerCase());
}

function textContainsAll(actual: string | undefined, expected: string[] | undefined): boolean {
  return (expected ?? []).every(value => textContains(actual, value));
}

function stageMatches(actual: string | undefined, expected: string[]): boolean {
  if (!actual) return false;
  const value = actual.toLowerCase();
  return expected.some(stage => value === stage.toLowerCase() || value.startsWith(`${stage.toLowerCase()} /`) || value.startsWith(`${stage.toLowerCase()} —`));
}

function modeMatches(actual: string | undefined, expected: string[]): boolean {
  if (!actual) return false;
  const value = actual.toLowerCase();
  return expected.some(mode => value === mode.toLowerCase() || value.includes(mode.toLowerCase()));
}

export function gradeExpectation(scenarioId: string, expected: BehaviorExpectation, envelope: EvalEnvelope, responseText: string): ScenarioResult {
  const checks: CheckResult[] = [];

  if (expected.stage) checks.push({ key: 'stage', passed: stageMatches(envelope.stage, expected.stage), expected: expected.stage, actual: envelope.stage });
  if (expected.mode) checks.push({ key: 'mode', passed: modeMatches(envelope.mode, expected.mode), expected: expected.mode, actual: envelope.mode });
  if (expected.buildAuthorized !== undefined) checks.push({ key: 'buildAuthorized', passed: envelope.buildAuthorized === expected.buildAuthorized, expected: expected.buildAuthorized, actual: envelope.buildAuthorized });
  if (expected.humanInput) checks.push({ key: 'humanInput', passed: envelope.humanInput === expected.humanInput, expected: expected.humanInput, actual: envelope.humanInput });
  if (expected.continuation && expected.continuation !== 'either') checks.push({ key: 'continuation', passed: envelope.continuation === expected.continuation, expected: expected.continuation, actual: envelope.continuation });
  if (expected.boundary) checks.push({ key: 'boundary', passed: !!envelope.boundary && expected.boundary.some(value => textContains(envelope.boundary, value)), expected: expected.boundary, actual: envelope.boundary });
  if (expected.objectiveContains) checks.push({ key: 'objective', passed: textContainsAll(envelope.objective, expected.objectiveContains), expected: expected.objectiveContains, actual: envelope.objective });
  if (expected.ambitionContains) checks.push({ key: 'ambition', passed: textContainsAll(envelope.ambition, expected.ambitionContains), expected: expected.ambitionContains, actual: envelope.ambition });
  if (expected.exploreEntry) checks.push({ key: 'exploreEntry', passed: envelope.exploreEntry === expected.exploreEntry, expected: expected.exploreEntry, actual: envelope.exploreEntry });
  if (expected.evidenceAppetite) checks.push({ key: 'evidenceAppetite', passed: envelope.evidenceAppetite === expected.evidenceAppetite, expected: expected.evidenceAppetite, actual: envelope.evidenceAppetite });
  if (expected.stageBasisContains) checks.push({ key: 'stageBasis', passed: textContainsAll(envelope.stageBasis, expected.stageBasisContains), expected: expected.stageBasisContains, actual: envelope.stageBasis });
  if (expected.authorizationReferentContains) checks.push({ key: 'authorizationReferent', passed: textContainsAll(envelope.authorizationReferent, expected.authorizationReferentContains), expected: expected.authorizationReferentContains, actual: envelope.authorizationReferent });
  if (expected.authorizationScopeContains) checks.push({ key: 'authorizationScope', passed: expected.authorizationScopeContains.every(value => containsApprox(envelope.authorizationScope, value)), expected: expected.authorizationScopeContains, actual: envelope.authorizationScope });
  if (expected.activeFrontierMin !== undefined) checks.push({ key: 'activeFrontierMin', passed: (envelope.activeFrontier?.length ?? 0) >= expected.activeFrontierMin, expected: expected.activeFrontierMin, actual: envelope.activeFrontier?.length ?? 0 });
  if (expected.protectedRetiredMeaningContains) checks.push({ key: 'protectedRetiredMeaning', passed: expected.protectedRetiredMeaningContains.every(value => containsApprox(envelope.protectedRetiredMeaning, value)), expected: expected.protectedRetiredMeaningContains, actual: envelope.protectedRetiredMeaning });

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
  if (expected.materialAssumptionsContains) checks.push({ key: 'materialAssumptions', passed: expected.materialAssumptionsContains.every(value => containsApprox(envelope.materialAssumptions, value)), expected: expected.materialAssumptionsContains, actual: envelope.materialAssumptions });
  if (expected.responseContains) checks.push({ key: 'responseContains', passed: expected.responseContains.every(value => textContains(responseText, value)), expected: expected.responseContains, actual: responseText });
  if (expected.responseContainsAny) checks.push({ key: 'responseContainsAny', passed: expected.responseContainsAny.some(value => textContains(responseText, value)), expected: expected.responseContainsAny, actual: responseText });
  if (expected.responseNotContains) checks.push({ key: 'responseNotContains', passed: expected.responseNotContains.every(value => !textContains(responseText, value)), expected: expected.responseNotContains, actual: responseText });

  const frontier = envelope.activeFrontier?.length ?? 0;
  if (frontier > 0 && envelope.humanInput === 'none') {
    checks.push({
      key: 'liveness',
      passed: envelope.continuation === 'continue',
      expected: 'continue while active frontier remains and human input is none',
      actual: { continuation: envelope.continuation, activeFrontier: envelope.activeFrontier },
    });
  }
  if (envelope.continuation === 'handoff' && (!envelope.boundary || envelope.boundary.toLowerCase() === 'none')) {
    checks.push({
      key: 'handoff-boundary',
      passed: false,
      expected: 'a genuine boundary for handoff',
      actual: envelope.boundary,
    });
  }

  return {
    scenarioId,
    passed: checks.every(check => check.passed),
    checks,
    envelope,
    responseText,
  };
}

export function gradeBehavior(scenario: BehaviorScenario, envelope: EvalEnvelope, responseText: string): ScenarioResult {
  return gradeExpectation(scenario.id, scenario.expected, envelope, responseText);
}
