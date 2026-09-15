import { promises as fs } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { evalsRoot, repoRoot, skillsRoot } from './harness/paths.js';
import { loadBehaviorScenarios, loadProductiveScenarios } from './harness/scenarios.js';

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

export async function validateRepository(): Promise<{ behaviorCount: number; productiveCount: number; scenarioSetSha256: string }> {
  for (const skill of REQUIRED_SKILLS) {
    const file = path.join(skillsRoot, skill, 'SKILL.md');
    const text = await fs.readFile(file, 'utf8');
    if (frontmatterName(text) !== skill) throw new Error(`${file}: frontmatter name must be ${skill}`);
  }

  const founder = await fs.readFile(path.join(skillsRoot, 'founder-to-feature', 'SKILL.md'), 'utf8');
  if (!founder.includes('**Implementation shape**')) throw new Error('Founder-to-Feature v3.5 must expose Implementation shape in the crystal');
  const os = await fs.readFile(path.join(skillsRoot, 'development-os', 'SKILL.md'), 'utf8');
  if (!os.includes('## Human-verifiable synthesis')) throw new Error('Development OS v3.5 must contain Human-verifiable synthesis');

  const behavior = await loadBehaviorScenarios();
  const productive = await loadProductiveScenarios();
  const canonical = JSON.stringify(behavior);
  const scenarioSetSha256 = crypto.createHash('sha256').update(canonical).digest('hex');

  const packageJson = JSON.parse(await fs.readFile(path.join(repoRoot, 'package.json'), 'utf8')) as { version?: string };
  if (packageJson.version !== '3.5.0') throw new Error('package version must be 3.5.0');

  const baselinePath = path.join(evalsRoot, 'baseline.json');
  if (await fs.stat(baselinePath).then(() => true, () => false)) {
    const baseline = JSON.parse(await fs.readFile(baselinePath, 'utf8')) as { scenarioSetSha256?: string };
    if (baseline.scenarioSetSha256 !== scenarioSetSha256) throw new Error('eval baseline scenarioSetSha256 is stale; update it deliberately');
  }

  return { behaviorCount: behavior.length, productiveCount: productive.length, scenarioSetSha256 };
}
