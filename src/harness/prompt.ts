import type { BehaviorScenario, ProductiveScenario, TrajectoryScenario } from '../types.js';

export const EVAL_START = '<DEVOS_EVAL>';
export const EVAL_END = '</DEVOS_EVAL>';

export function behaviorInstructions(skills: string): string {
  return `You are being evaluated for compliance with Development OS. Apply the supplied skills as governing methodology. Do not claim to mutate tools or repositories that are not actually available.\n\n${skills}\n\nAfter your normal response, append exactly one machine-readable block between ${EVAL_START} and ${EVAL_END}. The block must be valid JSON with only these optional fields: stage, mode, objective, stageBasis, buildAuthorized, authorizationReferent, authorizationScope, humanInput, continuation, boundary, activeFrontier, protectedRetiredMeaning, activeCapabilities, specialistRoles, evidenceLabels, materialAssumptions, summary. Use canonical capability names where possible: Development OS, Founder-to-Feature, Specialist Reasoning, Evidence Stewardship, Lean Repository Execution. humanInput is \"none\" or \"required\". continuation is \"continue\" or \"handoff\". authorizationScope, activeFrontier, protectedRetiredMeaning, activeCapabilities, specialistRoles, evidenceLabels, and materialAssumptions are arrays of strings. The telemetry should describe the state you actually established, not aspirational process language. This block is evaluation telemetry, not user-facing methodology doctrine.`;
}

export function behaviorInput(scenario: BehaviorScenario): string {
  return [
    `Scenario: ${scenario.title}`,
    scenario.context ? `Context:\n${scenario.context}` : '',
    `User prompt:\n${scenario.prompt}`,
    'Respond as the development agent should respond in that situation.',
  ].filter(Boolean).join('\n\n');
}

export interface TrajectoryHistoryTurn {
  user: string;
  assistant: string;
}

export function trajectoryInput(scenario: TrajectoryScenario, turnIndex: number, history: TrajectoryHistoryTurn[]): string {
  const turn = scenario.turns[turnIndex];
  if (!turn) throw new Error(`trajectory turn ${turnIndex} is missing`);
  const prior = history.length
    ? `Conversation so far:\n${history.map(item => `User: ${item.user}\nAssistant: ${item.assistant}`).join('\n\n')}`
    : '';
  return [
    `Trajectory scenario: ${scenario.title}`,
    `Standing objective: ${scenario.objective}`,
    scenario.context ? `Initial context:\n${scenario.context}` : '',
    prior,
    `Current user prompt:\n${turn.prompt}`,
    'Treat this as the same continuing development session. Reconcile the current prompt with the standing objective, constraints, accepted/retired meaning, authorization scope, stage validity, and active frontier rather than resetting from the latest sentence alone. Respond as the development agent should respond now.',
  ].filter(Boolean).join('\n\n');
}

export function productiveInstructions(skills: string): string {
  return `You are running a Development OS productive evaluation. Apply the supplied skills. The useful artifact and methodology compliance are evaluated independently. Respect the scenario source policy and never mutate accepted external project truth unless the scenario explicitly authorizes it.\n\n${skills}`;
}

export function productiveInput(scenario: ProductiveScenario): string {
  return `Target: ${scenario.target}\nValue intent: ${scenario.valueIntent}\nSource policy: ${scenario.sourcePolicy}\n\nTask:\n${scenario.prompt}`;
}
