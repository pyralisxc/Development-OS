import { promises as fs } from 'node:fs';
import path from 'node:path';
import { evalsRoot } from './paths.js';
import type { BehaviorScenario, DevelopmentScenario, ProductiveScenario, TrajectoryScenario } from '../types.js';

function assertNonEmpty(value: unknown, field: string): asserts value is string {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${field} must be a non-empty string`);
}

function assertExpected(value: unknown, field: string): void {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${field} must be an object`);
}

export function validateBehaviorScenario(value: unknown): asserts value is BehaviorScenario {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('behavior scenario must be an object');
  const record = value as Record<string, unknown>;
  assertNonEmpty(record.id, 'id');
  assertNonEmpty(record.title, 'title');
  if (record.kind !== 'behavior') throw new Error(`${record.id}: kind must be behavior`);
  assertNonEmpty(record.prompt, `${record.id}.prompt`);
  assertExpected(record.expected, `${record.id}.expected`);
}

export function validateTrajectoryScenario(value: unknown): asserts value is TrajectoryScenario {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('trajectory scenario must be an object');
  const record = value as Record<string, unknown>;
  assertNonEmpty(record.id, 'id');
  assertNonEmpty(record.title, 'title');
  if (record.kind !== 'trajectory') throw new Error(`${record.id}: kind must be trajectory`);
  assertNonEmpty(record.objective, `${record.id}.objective`);
  if (!Array.isArray(record.turns) || record.turns.length < 2) throw new Error(`${record.id}.turns must contain at least two turns`);
  for (let index = 0; index < record.turns.length; index += 1) {
    const turn = record.turns[index];
    if (!turn || typeof turn !== 'object' || Array.isArray(turn)) throw new Error(`${record.id}.turns[${index}] must be an object`);
    const turnRecord = turn as Record<string, unknown>;
    assertNonEmpty(turnRecord.prompt, `${record.id}.turns[${index}].prompt`);
    assertExpected(turnRecord.expected, `${record.id}.turns[${index}].expected`);
  }
}

export function validateProductiveScenario(value: unknown): asserts value is ProductiveScenario {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('productive scenario must be an object');
  const record = value as Record<string, unknown>;
  assertNonEmpty(record.id, 'id');
  assertNonEmpty(record.title, 'title');
  if (record.kind !== 'productive') throw new Error(`${record.id}: kind must be productive`);
  if (typeof record.enabled !== 'boolean') throw new Error(`${record.id}.enabled must be boolean`);
  assertNonEmpty(record.target, `${record.id}.target`);
  assertNonEmpty(record.valueIntent, `${record.id}.valueIntent`);
  assertNonEmpty(record.prompt, `${record.id}.prompt`);
  if (record.sourcePolicy !== 'read-only' && record.sourcePolicy !== 'isolated-workspace') throw new Error(`${record.id}.sourcePolicy is invalid`);
}

async function jsonFiles(directory: string): Promise<string[]> {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  return entries.filter((entry: any) => entry.isFile() && entry.name.endsWith('.json')).map((entry: any) => path.join(directory, entry.name)).sort();
}

async function developmentScenarioValues(): Promise<unknown[]> {
  const directory = path.join(evalsRoot, 'scenarios', 'behavior');
  const values: unknown[] = [];
  for (const file of await jsonFiles(directory)) {
    const parsed = JSON.parse(await fs.readFile(file, 'utf8')) as unknown;
    values.push(...(Array.isArray(parsed) ? parsed : [parsed]));
  }
  return values;
}

export async function loadDevelopmentScenarios(): Promise<DevelopmentScenario[]> {
  const scenarios: DevelopmentScenario[] = [];
  for (const value of await developmentScenarioValues()) {
    const record = value as Record<string, unknown>;
    if (record?.kind === 'behavior') {
      validateBehaviorScenario(value);
      scenarios.push(value);
    } else if (record?.kind === 'trajectory') {
      validateTrajectoryScenario(value);
      scenarios.push(value);
    } else {
      throw new Error(`${String(record?.id ?? '<unknown>')}: development scenario kind must be behavior or trajectory`);
    }
  }
  const ids = new Set<string>();
  for (const scenario of scenarios) {
    if (ids.has(scenario.id)) throw new Error(`duplicate development scenario id: ${scenario.id}`);
    ids.add(scenario.id);
  }
  return scenarios;
}

export async function loadBehaviorScenarios(): Promise<BehaviorScenario[]> {
  return (await loadDevelopmentScenarios()).filter((scenario): scenario is BehaviorScenario => scenario.kind === 'behavior');
}

export async function loadTrajectoryScenarios(): Promise<TrajectoryScenario[]> {
  return (await loadDevelopmentScenarios()).filter((scenario): scenario is TrajectoryScenario => scenario.kind === 'trajectory');
}

export async function loadProductiveScenarios(): Promise<ProductiveScenario[]> {
  const directory = path.join(evalsRoot, 'scenarios', 'productive');
  const scenarios: ProductiveScenario[] = [];
  for (const file of await jsonFiles(directory)) {
    const parsed = JSON.parse(await fs.readFile(file, 'utf8')) as unknown;
    const values = Array.isArray(parsed) ? parsed : [parsed];
    for (const value of values) {
      validateProductiveScenario(value);
      scenarios.push(value);
    }
  }
  return scenarios;
}
