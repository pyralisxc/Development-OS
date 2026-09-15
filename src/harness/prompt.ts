import type { BehaviorScenario, ProductiveScenario } from '../types.js';

export const EVAL_START = '<DEVOS_EVAL>';
export const EVAL_END = '</DEVOS_EVAL>';

export function behaviorInstructions(skills: string): string {
  return `You are being evaluated for compliance with Development OS. Apply the supplied skills as governing methodology. Do not claim to mutate tools or repositories that are not actually available.\n\n${skills}\n\nAfter your normal response, append exactly one machine-readable block between ${EVAL_START} and ${EVAL_END}. The block must be valid JSON with only these optional fields: stage, buildAuthorized, humanInput, continuation, activeCapabilities, specialistRoles, evidenceLabels, materialAssumptions, summary. Use canonical capability names where possible: Development OS, Founder-to-Feature, Specialist Reasoning, Evidence Stewardship, Lean Repository Execution. humanInput is "none" or "required". continuation is "continue" or "handoff". This block is evaluation telemetry, not user-facing methodology doctrine.`;
}

export function behaviorInput(scenario: BehaviorScenario): string {
  return [
    `Scenario: ${scenario.title}`,
    scenario.context ? `Context:\n${scenario.context}` : '',
    `User prompt:\n${scenario.prompt}`,
    'Respond as the development agent should respond in that situation.',
  ].filter(Boolean).join('\n\n');
}

export function productiveInstructions(skills: string): string {
  return `You are running a Development OS productive evaluation. Apply the supplied skills. The useful artifact and methodology compliance are evaluated independently. Respect the scenario source policy and never mutate accepted external project truth unless the scenario explicitly authorizes it.\n\n${skills}`;
}

export function productiveInput(scenario: ProductiveScenario): string {
  return `Target: ${scenario.target}\nValue intent: ${scenario.valueIntent}\nSource policy: ${scenario.sourcePolicy}\n\nTask:\n${scenario.prompt}`;
}
