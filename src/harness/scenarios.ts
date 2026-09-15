import { promises as fs } from 'node:fs';
import path from 'node:path';
import { evalsRoot } from './paths.js';
import type { BehaviorScenario, ProductiveScenario } from '../types.js';

function assertNonEmpty(value: unknown, field: string): asserts value is string {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${field} must be a non-empty string`);
}

export function validateBehaviorScenario(value: unknown): asserts value is BehaviorScenario {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('behavior scenario must be an object');
  const record = value as Record<string, unknown>;
  assertNonEmpty(record.id, 'id');
  assertNonEmpty(record.title, 'title');
  if (record.kind !== 'behavior') throw new Error(`${record.id}: kind must be behavior`);
  assertNonEmpty(record.prompt, `${record.id}.prompt`);
  if (!record.expected || typeof record.expected !== 'object' || Array.isArray(record.expected)) throw new Error(`${record.id}.expected must be an object`);
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

export async function loadBehaviorScenarios(): Promise<BehaviorScenario[]> {
  const directory = path.join(evalsRoot, 'scenarios', 'behavior');
  const scenarios: BehaviorScenario[] = [];
  for (const file of await jsonFiles(directory)) {
    const parsed = JSON.parse(await fs.readFile(file, 'utf8')) as unknown;
    const values = Array.isArray(parsed) ? parsed : [parsed];
    for (const value of values) {
      validateBehaviorScenario(value);
      scenarios.push(value);
    }
  }
  const ids = new Set<string>();
  for (const scenario of scenarios) {
    if (ids.has(scenario.id)) throw new Error(`duplicate behavior scenario id: ${scenario.id}`);
    ids.add(scenario.id);
  }
  return scenarios;
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
