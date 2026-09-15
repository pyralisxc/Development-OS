import { promises as fs } from 'node:fs';
import path from 'node:path';
import { OpenAIAgentAdapter } from '../adapters/openai.js';
import { gradeBehavior } from '../graders/behavior.js';
import { parseEvalEnvelope } from './envelope.js';
import { behaviorInput, behaviorInstructions, productiveInput, productiveInstructions } from './prompt.js';
import { loadBehaviorScenarios, loadProductiveScenarios } from './scenarios.js';
import { loadSkillInstructions } from './skills.js';
import type { AgentAdapter, ScenarioResult } from '../types.js';

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

export async function runBehavior(provider: string, scenarioId?: string): Promise<{ passed: boolean; results: ScenarioResult[]; directory: string }> {
  const scenarios = await loadBehaviorScenarios();
  const selected = scenarioId ? scenarios.filter(item => item.id === scenarioId) : scenarios;
  if (!selected.length) throw new Error(`no behavior scenario matched ${scenarioId ?? '<all>'}`);
  const skills = await loadSkillInstructions(true);
  const runner = adapter(provider);
  const directory = await outputDir('behavior');
  const results: ScenarioResult[] = [];

  for (const scenario of selected) {
    const result = await runner.run({
      instructions: behaviorInstructions(skills),
      input: behaviorInput(scenario),
      metadata: { scenario: scenario.id, skill_version: '3.5.0' },
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
    skillVersion: '3.5.0',
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
  const directory = await outputDir('productive');

  for (const scenario of scenarios) {
    const result = await runner.run({
      instructions: productiveInstructions(skills),
      input: productiveInput(scenario),
      metadata: { scenario: scenario.id, skill_version: '3.5.0', eval_kind: 'productive' },
    });
    await fs.writeFile(path.join(directory, `${scenario.id}.json`), JSON.stringify({
      scenario,
      provider: runner.name,
      model: process.env.DEVOS_OPENAI_MODEL ?? null,
      usage: result.usage,
      responseText: result.text,
      note: 'Output usefulness and Development OS compliance must be reviewed/scored independently before promotion.',
    }, null, 2));
  }

  return { directory, count: scenarios.length };
}
