import { promises as fs } from 'node:fs';
import path from 'node:path';
import { OpenAIAgentAdapter } from '../adapters/openai.js';
import { gradeBehavior, gradeExpectation } from '../graders/behavior.js';
import { parseEvalEnvelope } from './envelope.js';
import { ACTIVATION_END, ACTIVATION_START, activationInput, activationInstructions, behaviorInput, behaviorInstructions, EVAL_END, EVAL_START, productiveInput, productiveInstructions, trajectoryInput, type TrajectoryHistoryTurn } from './prompt.js';
import { loadActivationScenarios, loadBehaviorScenarios, loadProductiveScenarios, loadTrajectoryScenarios } from './scenarios.js';
import { loadSkillCatalogText, loadSkillInstructions } from './skills.js';
import { packageVersion } from '../version.js';
import type { ActivationScenarioResult, AgentAdapter, AgentRunOutput, CheckResult, ScenarioResult, TrajectoryScenarioResult, TrajectoryTurnResult } from '../types.js';

function adapter(name: string): AgentAdapter {
  if (name === 'openai') return new OpenAIAgentAdapter();
  throw new Error(`unknown provider: ${name}`);
}

function timestamp(): string {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

async function outputDir(kind: string): Promise<string> {
  const directory = process.env.DEVOS_EVAL_OUTPUT_DIR ?? path.resolve('artifacts', 'evals', `${kind}-${timestamp()}`);
  await fs.mkdir(directory, { recursive: true });
  return directory;
}

function stripEvalBlock(text: string): string {
  const start = text.lastIndexOf(EVAL_START);
  const end = text.lastIndexOf(EVAL_END);
  if (start < 0 || end < 0 || end <= start) return text.trim();
  return `${text.slice(0, start)}${text.slice(end + EVAL_END.length)}`.trim();
}

function parseActivationEnvelope(text: string): { activate: string[]; reason?: string } {
  const start = text.lastIndexOf(ACTIVATION_START);
  const end = text.lastIndexOf(ACTIVATION_END);
  if (start < 0 || end < 0 || end <= start) throw new Error('activation output missing machine-readable block');
  const raw = text.slice(start + ACTIVATION_START.length, end).trim();
  const value = JSON.parse(raw) as Record<string, unknown>;
  if (Object.keys(value).some(key => key !== 'activate' && key !== 'reason')) throw new Error('activation output contains unknown fields');
  if (!Array.isArray(value.activate) || !value.activate.every(item => typeof item === 'string' && item.length > 0)) throw new Error('activation output activate must be an array of skill slugs');
  return { activate: Array.from(new Set(value.activate as string[])), reason: typeof value.reason === 'string' ? value.reason : undefined };
}

function addUsage(target: AgentRunOutput['usage'], next: AgentRunOutput['usage']): AgentRunOutput['usage'] {
  if (!target && !next) return undefined;
  return {
    inputTokens: (target?.inputTokens ?? 0) + (next?.inputTokens ?? 0),
    outputTokens: (target?.outputTokens ?? 0) + (next?.outputTokens ?? 0),
    totalTokens: (target?.totalTokens ?? 0) + (next?.totalTokens ?? 0),
  };
}

export async function runActivation(provider: string, scenarioId?: string): Promise<{ passed: boolean; results: ActivationScenarioResult[]; directory: string }> {
  const scenarios = await loadActivationScenarios();
  const selected = scenarioId ? scenarios.filter(item => item.id === scenarioId) : scenarios;
  if (!selected.length) throw new Error('no activation scenario matched ' + (scenarioId ?? '<all>'));
  const catalog = await loadSkillCatalogText();
  const runner = adapter(provider);
  const version = await packageVersion();
  const directory = await outputDir('activation');
  const results: ActivationScenarioResult[] = [];

  for (const scenario of selected) {
    const result = await runner.run({
      instructions: activationInstructions(catalog),
      input: activationInput(scenario),
      metadata: { scenario: scenario.id, skill_version: version, eval_kind: 'activation' },
    });
    let graded: ActivationScenarioResult;
    try {
      const envelope = parseActivationEnvelope(result.text);
      const checks: CheckResult[] = [];
      for (const skill of scenario.expected.activate) checks.push({ key: 'activate:' + skill, passed: envelope.activate.includes(skill), expected: skill, actual: envelope.activate });
      for (const skill of scenario.expected.notActivate ?? []) checks.push({ key: 'notActivate:' + skill, passed: !envelope.activate.includes(skill), expected: 'not ' + skill, actual: envelope.activate });
      graded = { scenarioId: scenario.id, passed: checks.every(check => check.passed), checks, activated: envelope.activate, responseText: result.text, usage: result.usage };
    } catch (error) {
      graded = { scenarioId: scenario.id, passed: false, checks: [{ key: 'parse', passed: false, message: error instanceof Error ? error.message : String(error) }], activated: [], responseText: result.text, usage: result.usage };
    }
    results.push(graded);
    await fs.writeFile(path.join(directory, scenario.id + '.json'), JSON.stringify(graded, null, 2));
  }

  const summary = {
    skillVersion: version,
    provider: runner.name,
    model: process.env.DEVOS_OPENAI_MODEL ?? null,
    createdAt: new Date().toISOString(),
    passed: results.filter(result => result.passed).length,
    failed: results.filter(result => !result.passed).length,
    total: results.length,
  };
  await fs.writeFile(path.join(directory, 'summary.json'), JSON.stringify(summary, null, 2));
  return { passed: summary.failed === 0, results, directory };
}

export async function runBehavior(provider: string, scenarioId?: string): Promise<{ passed: boolean; results: ScenarioResult[]; directory: string }> {
  const scenarios = await loadBehaviorScenarios();
  const selected = scenarioId ? scenarios.filter(item => item.id === scenarioId) : scenarios;
  if (!selected.length) throw new Error(`no behavior scenario matched ${scenarioId ?? '<all>'}`);
  const skills = await loadSkillInstructions(true);
  const runner = adapter(provider);
  const version = await packageVersion();
  const directory = await outputDir('behavior');
  const results: ScenarioResult[] = [];

  for (const scenario of selected) {
    const result = await runner.run({
      instructions: behaviorInstructions(skills),
      input: behaviorInput(scenario),
      metadata: { scenario: scenario.id, skill_version: version, eval_kind: 'behavior' },
    });
    let graded: ScenarioResult;
    try {
      graded = gradeBehavior(scenario, parseEvalEnvelope(result.text), result.text);
      graded.usage = result.usage;
    } catch (error) {
      graded = {
        scenarioId: scenario.id,
        passed: false,
        checks: [{ key: 'parse', passed: false, message: error instanceof Error ? error.message : String(error) }],
        responseText: result.text,
        usage: result.usage,
      };
    }
    results.push(graded);
    await fs.writeFile(path.join(directory, `${scenario.id}.json`), JSON.stringify(graded, null, 2));
  }

  const summary = {
    skillVersion: version,
    provider: runner.name,
    model: process.env.DEVOS_OPENAI_MODEL ?? null,
    createdAt: new Date().toISOString(),
    passed: results.filter(result => result.passed).length,
    failed: results.filter(result => !result.passed).length,
    total: results.length,
  };
  await fs.writeFile(path.join(directory, 'summary.json'), JSON.stringify(summary, null, 2));
  return { passed: summary.failed === 0, results, directory };
}

export async function runTrajectory(provider: string, scenarioId?: string): Promise<{ passed: boolean; results: TrajectoryScenarioResult[]; directory: string }> {
  const scenarios = await loadTrajectoryScenarios();
  const selected = scenarioId ? scenarios.filter(item => item.id === scenarioId) : scenarios;
  if (!selected.length) throw new Error(`no trajectory scenario matched ${scenarioId ?? '<all>'}`);
  const skills = await loadSkillInstructions(true);
  const runner = adapter(provider);
  const version = await packageVersion();
  const directory = await outputDir('trajectory');
  const results: TrajectoryScenarioResult[] = [];

  for (const scenario of selected) {
    const history: TrajectoryHistoryTurn[] = [];
    const turnResults: TrajectoryTurnResult[] = [];
    let usage: AgentRunOutput['usage'];

    for (let index = 0; index < scenario.turns.length; index += 1) {
      const turn = scenario.turns[index]!;
      const result = await runner.run({
        instructions: behaviorInstructions(skills),
        input: trajectoryInput(scenario, index, history),
        metadata: { scenario: scenario.id, turn: String(index + 1), skill_version: version, eval_kind: 'trajectory' },
      });
      usage = addUsage(usage, result.usage);
      let graded: TrajectoryTurnResult;
      try {
        const base = gradeExpectation(`${scenario.id}#${index + 1}`, turn.expected, parseEvalEnvelope(result.text), result.text);
        graded = { ...base, turn: index + 1, prompt: turn.prompt, usage: result.usage };
      } catch (error) {
        graded = {
          scenarioId: `${scenario.id}#${index + 1}`,
          turn: index + 1,
          prompt: turn.prompt,
          passed: false,
          checks: [{ key: 'parse', passed: false, message: error instanceof Error ? error.message : String(error) }],
          responseText: result.text,
          usage: result.usage,
        };
      }
      turnResults.push(graded);
      history.push({ user: turn.prompt, assistant: stripEvalBlock(result.text) });
    }

    const scenarioResult: TrajectoryScenarioResult = {
      scenarioId: scenario.id,
      passed: turnResults.every(turn => turn.passed),
      turns: turnResults,
    };
    results.push(scenarioResult);
    await fs.writeFile(path.join(directory, `${scenario.id}.json`), JSON.stringify({ ...scenarioResult, usage }, null, 2));
  }

  const summary = {
    skillVersion: version,
    provider: runner.name,
    model: process.env.DEVOS_OPENAI_MODEL ?? null,
    createdAt: new Date().toISOString(),
    passed: results.filter(result => result.passed).length,
    failed: results.filter(result => !result.passed).length,
    total: results.length,
  };
  await fs.writeFile(path.join(directory, 'summary.json'), JSON.stringify(summary, null, 2));
  return { passed: summary.failed === 0, results, directory };
}

export async function runProductive(provider: string, scenarioId?: string): Promise<{ directory: string; count: number }> {
  const scenarios = (await loadProductiveScenarios()).filter(item => item.enabled && (!scenarioId || item.id === scenarioId));
  if (!scenarios.length) throw new Error('no enabled productive eval scenario matched; productive evals must be deliberately enabled');
  const skills = await loadSkillInstructions(true);
  const runner = adapter(provider);
  const version = await packageVersion();
  const directory = await outputDir('productive');

  for (const scenario of scenarios) {
    const result = await runner.run({
      instructions: productiveInstructions(skills),
      input: productiveInput(scenario),
      metadata: { scenario: scenario.id, skill_version: version, eval_kind: 'productive' },
    });
    await fs.writeFile(path.join(directory, `${scenario.id}.json`), JSON.stringify({
      scenario,
      skillVersion: version,
      provider: runner.name,
      model: process.env.DEVOS_OPENAI_MODEL ?? null,
      usage: result.usage,
      responseText: result.text,
      note: 'Output usefulness and Development OS compliance must be reviewed/scored independently before promotion.',
    }, null, 2));
  }

  return { directory, count: scenarios.length };
}
