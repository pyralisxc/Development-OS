import { promises as fs } from 'node:fs';
import path from 'node:path';
import { Ajv2020, type ValidateFunction } from 'ajv/dist/2020.js';
import { evalsRoot } from './paths.js';
import type { BehaviorScenario, DevelopmentScenario, HostScenario, ProductiveScenario, TrajectoryScenario } from '../types.js';

interface ScenarioValidators {
  development: ValidateFunction<DevelopmentScenario>;
  productive: ValidateFunction<ProductiveScenario>;
  host: ValidateFunction<HostScenario>;
}

let validatorsPromise: Promise<ScenarioValidators> | undefined;

async function readSchema(filename: string): Promise<Record<string, unknown>> {
  return JSON.parse(await fs.readFile(path.join(evalsRoot, 'schema', filename), 'utf8')) as Record<string, unknown>;
}

async function scenarioValidators(): Promise<ScenarioValidators> {
  if (!validatorsPromise) {
    validatorsPromise = Promise.all([
      readSchema('development-scenario.schema.json'),
      readSchema('productive-scenario.schema.json'),
      readSchema('host-scenario.schema.json'),
    ]).then(([development, productive, host]) => {
      const ajv = new Ajv2020({ allErrors: true, strict: true });
      return {
        development: ajv.compile<DevelopmentScenario>(development),
        productive: ajv.compile<ProductiveScenario>(productive),
        host: ajv.compile<HostScenario>(host),
      };
    });
  }
  return validatorsPromise;
}

function assertSchema<T>(validator: ValidateFunction<T>, value: unknown, label: string): asserts value is T {
  if (!validator(value)) {
    const details = validator.errors?.map(error => `${error.instancePath || '/'} ${error.message ?? 'is invalid'}`).join('; ');
    throw new Error(`${label}: ${details ?? 'schema validation failed'}`);
  }
}

export async function validateBehaviorScenario(value: unknown): Promise<BehaviorScenario> {
  const { development } = await scenarioValidators();
  assertSchema(development, value, String((value as { id?: unknown })?.id ?? 'behavior scenario'));
  if (value.kind !== 'behavior') throw new Error(`${value.id}: kind must be behavior`);
  return value;
}

export async function validateTrajectoryScenario(value: unknown): Promise<TrajectoryScenario> {
  const { development } = await scenarioValidators();
  assertSchema(development, value, String((value as { id?: unknown })?.id ?? 'trajectory scenario'));
  if (value.kind !== 'trajectory') throw new Error(`${value.id}: kind must be trajectory`);
  return value;
}

export async function validateProductiveScenario(value: unknown): Promise<ProductiveScenario> {
  const { productive } = await scenarioValidators();
  assertSchema(productive, value, String((value as { id?: unknown })?.id ?? 'productive scenario'));
  return value;
}

export async function validateHostScenario(value: unknown): Promise<HostScenario> {
  const { host } = await scenarioValidators();
  assertSchema(host, value, String((value as { id?: unknown })?.id ?? 'host scenario'));
  return value;
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
      scenarios.push(await validateBehaviorScenario(value));
    } else if (record?.kind === 'trajectory') {
      scenarios.push(await validateTrajectoryScenario(value));
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
      scenarios.push(await validateProductiveScenario(value));
    }
  }
  return scenarios;
}

export async function loadHostScenarios(): Promise<HostScenario[]> {
  const directory = path.join(evalsRoot, 'scenarios', 'host');
  const scenarios: HostScenario[] = [];
  for (const file of await jsonFiles(directory)) {
    const parsed = JSON.parse(await fs.readFile(file, 'utf8')) as unknown;
    const values = Array.isArray(parsed) ? parsed : [parsed];
    for (const value of values) {
      scenarios.push(await validateHostScenario(value));
    }
  }
  const ids = new Set<string>();
  for (const scenario of scenarios) {
    if (ids.has(scenario.id)) throw new Error(`duplicate host scenario id: ${scenario.id}`);
    ids.add(scenario.id);
  }
  return scenarios;
}
