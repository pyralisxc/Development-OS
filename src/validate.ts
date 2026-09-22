import { promises as fs } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { evalsRoot, repoRoot, skillsRoot } from './harness/paths.js';
import { loadBehaviorScenarios, loadDevelopmentScenarios, loadHostScenarios, loadProductiveScenarios, loadTrajectoryScenarios } from './harness/scenarios.js';
import { packageVersion } from './version.js';

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

function scenarioHash(values: unknown[]): string {
  return crypto.createHash('sha256').update(JSON.stringify(values)).digest('hex');
}

function squareSvgDimensions(text: string): { width: number; height: number } | null {
  const width = text.match(/\bwidth=["']([0-9]+(?:\.[0-9]+)?)["']/i);
  const height = text.match(/\bheight=["']([0-9]+(?:\.[0-9]+)?)["']/i);
  if (width && height) return { width: Number(width[1]), height: Number(height[1]) };
  const viewBox = text.match(/\bviewBox=["']\s*[-+]?\d+(?:\.\d+)?\s+[-+]?\d+(?:\.\d+)?\s+([0-9]+(?:\.\d+)?)\s+([0-9]+(?:\.\d+)?)\s*["']/i);
  return viewBox ? { width: Number(viewBox[1]), height: Number(viewBox[2]) } : null;
}

async function validateSquareBrandAsset(relativePath: string | undefined, field: string): Promise<void> {
  if (!relativePath) throw new Error(`${field} is required for OpenAI directory submission`);
  if (!relativePath.startsWith('./assets/')) throw new Error(`${field} must reference ./assets/`);
  const absolute = path.resolve(repoRoot, relativePath);
  const assetsRoot = path.resolve(repoRoot, 'assets');
  if (!absolute.startsWith(`${assetsRoot}${path.sep}`)) throw new Error(`${field} must remain inside assets/`);
  const stat = await fs.stat(absolute).catch(() => null);
  if (!stat?.isFile()) throw new Error(`${field} must reference an existing regular file`);
  if (path.extname(absolute).toLowerCase() !== '.svg') throw new Error(`${field} must use the canonical SVG branding asset`);
  const svg = await fs.readFile(absolute, 'utf8');
  if (!/<svg\b/i.test(svg)) throw new Error(`${field} must contain a valid SVG root`);
  const dimensions = squareSvgDimensions(svg);
  if (!dimensions || dimensions.width !== dimensions.height || dimensions.width < 48) {
    throw new Error(`${field} must reference a square SVG at least 48x48`);
  }
}

export async function validateRepository(): Promise<{ version: string; behaviorCount: number; trajectoryCount: number; productiveCount: number; hostCount: number; scenarioSetSha256: string }> {
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
  for (const required of ['## Explore entry modes', '## Evidence appetite', '### Progress sensitivity', '## Independent meta-audit', '### Degraded authority and recovery', '## Stewardship and native artifacts']) {
    if (!os.includes(required)) throw new Error(`Development OS v4.1 must contain ${required}`);
  }
  for (const required of ['Fresh intent, continuous state.', 'Continue only the live referent.', 'Methodology stands alone; capability composes opportunistically.']) {
    if (!os.includes(required)) throw new Error(`Development OS v4.1 runtime kernel must contain ${required}`);
  }

  const specialist = await fs.readFile(path.join(skillsRoot, 'specialist-reasoning', 'SKILL.md'), 'utf8');
  if (!specialist.includes('## Transformative synthesis')) throw new Error('Specialist Reasoning v4.1 must define Transformative synthesis');
  if (!specialist.includes('## Generative divergence')) throw new Error('Specialist Reasoning v4.1 must define Generative divergence');
  if (!specialist.includes('Bad hypotheses are allowed during divergence; bad conclusions are not.')) throw new Error('Specialist Reasoning v4.1 must preserve safe divergence');

  const evidence = await fs.readFile(path.join(skillsRoot, 'evidence-stewardship', 'SKILL.md'), 'utf8');
  if (!evidence.includes('level of proof to the level of the claim')) throw new Error('Evidence Stewardship v4.1 must align proof level with claim level');
  if (!evidence.includes('## Degraded evidence and documentation')) throw new Error('Evidence Stewardship v4.1 must cover degraded evidence');

  const lean = await fs.readFile(path.join(skillsRoot, 'lean-repository-execution', 'SKILL.md'), 'utf8');
  if (!lean.includes('## Mutation integrity and recovery')) throw new Error('Lean compatibility contract must define mutation integrity and recovery');
  if (!lean.includes('### Repository recovery execution')) throw new Error('Lean v4.1 must define repository recovery execution');

  const development = await loadDevelopmentScenarios();
  const behavior = await loadBehaviorScenarios();
  const trajectory = await loadTrajectoryScenarios();
  const productive = await loadProductiveScenarios();
  const host = await loadHostScenarios();
  const scenarioSetSha256 = scenarioHash(development);
  const version = await packageVersion();

  const portablePlugin = JSON.parse(await fs.readFile(path.join(repoRoot, 'plugin.json'), 'utf8')) as {
    name?: string;
    version?: string;
    extensions?: {
      'com.openai'?: {
        interface?: {
          composerIcon?: string;
          logo?: string;
        };
      };
    };
  };
  if (portablePlugin.name !== 'development-os') throw new Error('portable plugin name must be development-os');
  if (portablePlugin.version !== version) throw new Error('portable plugin version must match package version');
  const openAiInterface = portablePlugin.extensions?.['com.openai']?.interface;
  await validateSquareBrandAsset(openAiInterface?.composerIcon, 'plugin.json extensions.com.openai.interface.composerIcon');
  await validateSquareBrandAsset(openAiInterface?.logo, 'plugin.json extensions.com.openai.interface.logo');

  const codexPlugin = JSON.parse(await fs.readFile(path.join(repoRoot, '.codex-plugin', 'plugin.json'), 'utf8')) as {
    name?: string;
    version?: string;
    skills?: string;
    apps?: string;
    mcpServers?: string;
    interface?: {
      composerIcon?: string;
      logo?: string;
    };
  };
  if (codexPlugin.name !== 'development-os') throw new Error('ChatGPT/Codex plugin name must be development-os');
  if (codexPlugin.version !== version) throw new Error('ChatGPT/Codex plugin version must match package version');
  if (codexPlugin.skills !== './skills/') throw new Error('Development OS plugin must package canonical ./skills/');
  if (codexPlugin.apps) throw new Error('Development OS v4 plugin must remain lightweight and must not bind ChatGPT apps');
  if (codexPlugin.mcpServers) throw new Error('Development OS v4 plugin must not embed MCP server declarations');
  if (codexPlugin.interface?.composerIcon !== openAiInterface?.composerIcon || codexPlugin.interface?.logo !== openAiInterface?.logo) {
    throw new Error('OpenAI branding asset paths must match between portable and compatibility manifests');
  }

  for (const filename of ['.app.json', 'mcp.json', '.mcp.json']) {
    const exists = await fs.stat(path.join(repoRoot, filename)).then(() => true, () => false);
    if (exists) throw new Error(`${filename} is outside the lightweight Development OS v4 plugin boundary`);
  }

  const marketplace = JSON.parse(await fs.readFile(path.join(repoRoot, '.agents', 'plugins', 'marketplace.json'), 'utf8')) as {
    plugins?: Array<{ name?: string; source?: { source?: string; path?: string } }>;
  };
  const marketplacePlugin = marketplace.plugins?.find(item => item.name === 'development-os');
  if (!marketplacePlugin) throw new Error('plugin marketplace must include development-os');
  if (marketplacePlugin.source?.source !== 'local' || marketplacePlugin.source.path !== './') {
    throw new Error('Development OS marketplace entry must reference the repository-root plugin package');
  }

  const compatibilityPath = path.join(evalsRoot, 'compatibility', 'v3.5.json');
  const compatibility = JSON.parse(await fs.readFile(compatibilityPath, 'utf8')) as { scenarioIds?: string[] };
  const currentIds = new Set(development.map(scenario => scenario.id));
  const missingCompatibility = (compatibility.scenarioIds ?? []).filter(id => !currentIds.has(id));
  if (missingCompatibility.length) {
    throw new Error(`v3.5 compatibility scenarios missing: ${missingCompatibility.join(', ')}`);
  }

  return { version, behaviorCount: behavior.length, trajectoryCount: trajectory.length, productiveCount: productive.length, hostCount: host.length, scenarioSetSha256 };
}
