import { promises as fs } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { evalsRoot, repoRoot, skillsRoot } from './harness/paths.js';
import { loadBehaviorScenarios, loadDevelopmentScenarios, loadProductiveScenarios, loadTrajectoryScenarios } from './harness/scenarios.js';

const REQUIRED_SKILLS = ['development-os', 'founder-to-feature', 'specialist-reasoning', 'evidence-stewardship', 'lean-repository-execution'];

function frontmatterName(text: string): string | undefined {
  const lines = text.split(/\r?\n/);
  if (lines[0]?.trim() !== '---') return undefined;
  for (let index = 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (line?.trim() === '---') break;
    const match = line?.match(/^name:\s*(.+)$/);
    if (match) return match[1]?.trim();
  }
  return undefined;
}

export async function validateRepository(): Promise<{ behaviorCount: number; trajectoryCount: number; productiveCount: number; scenarioSetSha256: string }> {
  for (const skill of REQUIRED_SKILLS) {
    const file = path.join(skillsRoot, skill, 'SKILL.md');
    const text = await fs.readFile(file, 'utf8');
    if (frontmatterName(text) !== skill) throw new Error(`${file}: frontmatter name must be ${skill}`);
  }

  const founder = await fs.readFile(path.join(skillsRoot, 'founder-to-feature', 'SKILL.md'), 'utf8');
  if (!founder.includes('**Implementation shape**')) throw new Error('Founder-to-Feature compatibility contract must expose Implementation shape in the crystal');
  if (!founder.includes('## Authorization reconciliation')) throw new Error('Founder-to-Feature compatibility contract must reconcile changed semantic referents with Development OS authorization');

  const os = await fs.readFile(path.join(skillsRoot, 'development-os', 'SKILL.md'), 'utf8');
  for (const required of ['## Active development session', '## Scoped authorization', '### Liveness predicate', '## Visible working synthesis', '## Fresh-context transfer']) {
    if (!os.includes(required)) throw new Error(`Development OS compatibility contract must contain ${required}`);
  }
  for (const required of ['## Explore entry modes', '## Evidence appetite', '### Progress sensitivity', '## Independent meta-audit']) {
    if (!os.includes(required)) throw new Error(`Development OS v4.0 must contain ${required}`);
  }

  const specialist = await fs.readFile(path.join(skillsRoot, 'specialist-reasoning', 'SKILL.md'), 'utf8');
  if (!specialist.includes('## Transformative synthesis')) throw new Error('Specialist Reasoning v4.0 must define Transformative synthesis');

  const evidence = await fs.readFile(path.join(skillsRoot, 'evidence-stewardship', 'SKILL.md'), 'utf8');
  if (!evidence.includes('level of proof to the level of the claim')) throw new Error('Evidence Stewardship v4.0 must align proof level with claim level');

  const lean = await fs.readFile(path.join(skillsRoot, 'lean-repository-execution', 'SKILL.md'), 'utf8');
  if (!lean.includes('## Mutation integrity and recovery')) throw new Error('Lean compatibility contract must define mutation integrity and recovery');

  const development = await loadDevelopmentScenarios();
  const behavior = await loadBehaviorScenarios();
  const trajectory = await loadTrajectoryScenarios();
  const productive = await loadProductiveScenarios();
  const canonical = JSON.stringify(development);
  const scenarioSetSha256 = crypto.createHash('sha256').update(canonical).digest('hex');

  const packageJson = JSON.parse(await fs.readFile(path.join(repoRoot, 'package.json'), 'utf8')) as { version?: string };
  if (packageJson.version !== '4.0.0') throw new Error('package version must be 4.0.0');

  const compatibilityPath = path.join(evalsRoot, 'compatibility', 'v3.5.json');
  const compatibility = JSON.parse(await fs.readFile(compatibilityPath, 'utf8')) as { scenarioIds?: string[] };
  const currentIds = new Set(development.map(scenario => scenario.id));
  const missingCompatibility = (compatibility.scenarioIds ?? []).filter(id => !currentIds.has(id));
  if (missingCompatibility.length) {
    throw new Error(`v3.5 compatibility scenarios missing: ${missingCompatibility.join(', ')}`);
  }

  const baselinePath = path.join(evalsRoot, 'baseline.json');
  if (await fs.stat(baselinePath).then(() => true, () => false)) {
    const baseline = JSON.parse(await fs.readFile(baselinePath, 'utf8')) as { scenarioSetSha256?: string };
    if (baseline.scenarioSetSha256 !== scenarioSetSha256) {
      throw new Error(`eval baseline scenarioSetSha256 is stale; current scenario set is ${scenarioSetSha256}`);
    }
  }

  return { behaviorCount: behavior.length, trajectoryCount: trajectory.length, productiveCount: productive.length, scenarioSetSha256 };
}
