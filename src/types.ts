export type EvalKind = 'behavior' | 'trajectory' | 'productive' | 'host';
export type HumanInput = 'none' | 'required';
export type Continuation = 'continue' | 'handoff' | 'either';
export type EvidenceAppetite = 'representative' | 'targeted' | 'exhaustive';
export type ExploreEntry = 'directed' | 'discovery';

export interface BehaviorExpectation {
  stage?: string[];
  mode?: string[];
  buildAuthorized?: boolean;
  humanInput?: HumanInput;
  continuation?: Continuation;
  boundary?: string[];
  objectiveContains?: string[];
  ambitionContains?: string[];
  exploreEntry?: ExploreEntry;
  evidenceAppetite?: EvidenceAppetite;
  stageBasisContains?: string[];
  authorizationReferentContains?: string[];
  authorizationScopeContains?: string[];
  activeFrontierMin?: number;
  protectedRetiredMeaningContains?: string[];
  mustActivate?: string[];
  mustNotActivate?: string[];
  specialistRoles?: string[];
  evidenceLabels?: string[];
  materialAssumptionsContains?: string[];
  responseContains?: string[];
  responseContainsAny?: string[];
  responseNotContains?: string[];
}

export interface BehaviorScenario {
  id: string;
  title: string;
  kind: 'behavior';
  context?: string;
  prompt: string;
  expected: BehaviorExpectation;
}

export interface TrajectoryTurn {
  prompt: string;
  expected: BehaviorExpectation;
}

export interface TrajectoryScenario {
  id: string;
  title: string;
  kind: 'trajectory';
  objective: string;
  context?: string;
  turns: TrajectoryTurn[];
}

export type DevelopmentScenario = BehaviorScenario | TrajectoryScenario;

export interface ProductiveScenario {
  id: string;
  title: string;
  kind: 'productive';
  enabled: boolean;
  target: string;
  valueIntent: string;
  prompt: string;
  sourcePolicy: 'read-only' | 'isolated-workspace';
  rubric: ProductiveRubricCriterion[];
}

export interface ProductiveRubricCriterion {
  id: string;
  description: string;
  required: boolean;
}

export interface HostScenario {
  id: string;
  title: string;
  kind: 'host';
  objective: string;
  workspace: 'isolated-fixture' | 'read-only-repository';
  requiredCapabilities: string[];
  turns: HostScenarioTurn[];
}

export interface HostScenarioTurn {
  prompt: string;
  requiredObservations: string[];
  forbiddenOutcomes: string[];
}

export interface EvalEnvelope {
  stage?: string;
  mode?: string;
  objective?: string;
  ambition?: string;
  exploreEntry?: ExploreEntry;
  evidenceAppetite?: EvidenceAppetite;
  stageBasis?: string;
  buildAuthorized?: boolean;
  authorizationReferent?: string;
  authorizationScope?: string[];
  humanInput?: HumanInput;
  continuation?: 'continue' | 'handoff';
  boundary?: string;
  activeFrontier?: string[];
  protectedRetiredMeaning?: string[];
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

export interface TrajectoryTurnResult extends ScenarioResult {
  turn: number;
  prompt: string;
}

export interface TrajectoryScenarioResult {
  scenarioId: string;
  passed: boolean;
  turns: TrajectoryTurnResult[];
}
