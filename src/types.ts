export type EvalKind = 'behavior' | 'productive';
export type HumanInput = 'none' | 'required';
export type Continuation = 'continue' | 'handoff' | 'either';

export interface BehaviorExpectation {
  stage?: string[];
  buildAuthorized?: boolean;
  humanInput?: HumanInput;
  continuation?: Continuation;
  mustActivate?: string[];
  mustNotActivate?: string[];
  specialistRoles?: string[];
  evidenceLabels?: string[];
}

export interface BehaviorScenario {
  id: string;
  title: string;
  kind: 'behavior';
  context?: string;
  prompt: string;
  expected: BehaviorExpectation;
}

export interface ProductiveScenario {
  id: string;
  title: string;
  kind: 'productive';
  enabled: boolean;
  target: string;
  valueIntent: string;
  prompt: string;
  sourcePolicy: 'read-only' | 'isolated-workspace';
}

export interface EvalEnvelope {
  stage?: string;
  buildAuthorized?: boolean;
  humanInput?: HumanInput;
  continuation?: 'continue' | 'handoff';
  activeCapabilities?: string[];
  specialistRoles?: string[];
  evidenceLabels?: string[];
  materialAssumptions?: string[];
  summary?: string;
}

export interface AgentRunInput {
  instructions: string;
  input: string;
  metadata?: Record<string, string>;
}

export interface AgentRunOutput {
  text: string;
  usage?: {
    inputTokens?: number;
    outputTokens?: number;
    totalTokens?: number;
  };
  raw?: unknown;
}

export interface AgentAdapter {
  readonly name: string;
  run(input: AgentRunInput): Promise<AgentRunOutput>;
}

export interface CheckResult {
  key: string;
  passed: boolean;
  expected?: unknown;
  actual?: unknown;
  message?: string;
}

export interface ScenarioResult {
  scenarioId: string;
  passed: boolean;
  checks: CheckResult[];
  envelope?: EvalEnvelope;
  responseText: string;
  usage?: AgentRunOutput['usage'];
}
