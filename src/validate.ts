import { promises as fs } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { evalsRoot, repoRoot, skillsRoot } from './harness/paths.js';
import { loadActivationScenarios, loadBehaviorScenarios, loadDevelopmentScenarios, loadHostScenarios, loadProductiveScenarios, loadTrajectoryScenarios } from './harness/scenarios.js';
import { packageVersion } from './version.js';

const REQUIRED_SKILLS = ['development-os', 'founder-to-feature', 'specialist-reasoning', 'evidence-stewardship', 'lean-repository-execution'];

function frontmatterField(text: string, field: string): string | undefined {
  const lines = text.split(/\r?\n/);
  if (lines[0]?.trim() !== '---') return undefined;
  const prefix = `${field}:`;
  for (let index = 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (line?.trim() === '---') break;
    if (!line?.startsWith(prefix)) continue;
    let value = line.slice(prefix.length).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    return value;
  }
  return undefined;
}

function frontmatterName(text: string): string | undefined {
  return frontmatterField(text, 'name');
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

export async function validateRepository(): Promise<{ version: string; activationCount: number; behaviorCount: number; trajectoryCount: number; productiveCount: number; hostCount: number; scenarioSetSha256: string }> {
  for (const skill of REQUIRED_SKILLS) {
    const file = path.join(skillsRoot, skill, 'SKILL.md');
    const text = await fs.readFile(file, 'utf8');
    if (frontmatterName(text) !== skill) throw new Error(`${file}: frontmatter name must be ${skill}`);
  }

  const skillTexts = new Map<string, string>();
  for (const skill of REQUIRED_SKILLS) {
    skillTexts.set(skill, await fs.readFile(path.join(skillsRoot, skill, 'SKILL.md'), 'utf8'));
  }

  const osDescription = frontmatterField(skillTexts.get('development-os') ?? '', 'description') ?? '';
  if (!osDescription.includes('session kernel')) throw new Error('Development OS v4.1.9 description must identify the session kernel');
  for (const child of ['founder-to-feature', 'specialist-reasoning', 'evidence-stewardship', 'lean-repository-execution']) {
    const description = frontmatterField(skillTexts.get(child) ?? '', 'description') ?? '';
    if (!description.startsWith('Use with Development OS')) throw new Error(`${child}: v4.1.9 child description must route through Development OS`);
    if (!description.includes('session kernel')) throw new Error(`${child}: v4.1.9 child description must preserve Development OS session ownership`);
  }

  const founder = skillTexts.get('founder-to-feature') ?? '';
  if (!founder.includes('**Implementation shape**')) throw new Error('Founder-to-Feature compatibility contract must expose Implementation shape in the crystal');
  if (!founder.includes('## Authorization reconciliation')) throw new Error('Founder-to-Feature compatibility contract must reconcile changed semantic referents with Development OS authorization');

  const os = skillTexts.get('development-os') ?? '';
  for (const required of ['## Active development session', '## Scoped authorization', '### Liveness predicate', '## Visible working synthesis', '## Fresh-context transfer']) {
    if (!os.includes(required)) throw new Error(`Development OS compatibility contract must contain ${required}`);
  }
  for (const required of ['## Activation resilience', '## Explore entry modes', '## Evidence appetite', '### Progress sensitivity', '### Wait stewardship', '### Provider-neutral wait contract', '### Progressive stewardship radius', '### Owner-gate presentation', '### Guided human handoff', '### Founder-burden gate', '### Peripheral discovery and durable routing', '## Independent meta-audit', '### Degraded authority and recovery', '## Stewardship and native artifacts']) {
    if (!os.includes(required)) throw new Error(`Development OS v4.1.9 must contain ${required}`);
  }
  for (const required of ['Fresh intent, continuous state.', 'Continue only the live referent.', 'Development OS owns the session; specialists deepen the work.', 'Methodology stands alone; capability composes opportunistically.', 'See wider than you act.', 'Known obligation hardening', 'Wider portfolio', 'Assume no familiarity with the exact interface without assuming low intelligence.', 'native-capability check', 'Bound **exploration cost and interference**, not discovery yield.', 'Durable routing authorization', 'next safe atomic', 'Exact action', 'Protected concern', 'Non-authorization', 'After approval', 'Natural-language approval in chat applies only to the exact gate']) {
    if (!os.includes(required)) throw new Error(`Development OS v4.1.9 runtime kernel must contain ${required}`);
  }

  const specialist = skillTexts.get('specialist-reasoning') ?? '';
  if (!specialist.includes('## Transformative synthesis')) throw new Error('Specialist Reasoning v4.1 must define Transformative synthesis');
  if (!specialist.includes('## Generative divergence')) throw new Error('Specialist Reasoning v4.1 must define Generative divergence');
  if (!specialist.includes('Bad hypotheses are allowed during divergence; bad conclusions are not.')) throw new Error('Specialist Reasoning v4.1 must preserve safe divergence');
  if (!specialist.includes('## Battle testing')) throw new Error('Specialist Reasoning v4.1.5 must define Battle testing');
  if (!specialist.includes('Attack the result across the smallest sufficient set of consequence layers')) throw new Error('Specialist Reasoning v4.1.5 must preserve layered battle testing');

  const evidence = skillTexts.get('evidence-stewardship') ?? '';
  if (!evidence.includes('level of proof to the level of the claim')) throw new Error('Evidence Stewardship v4.1 must align proof level with claim level');
  if (!evidence.includes('## Degraded evidence and documentation')) throw new Error('Evidence Stewardship v4.1 must cover degraded evidence');
  if (!evidence.includes('Battle testing generates hypotheses; persistence requires evidence.')) throw new Error('Evidence Stewardship v4.1.5 must gate battle-test persistence with evidence');

  const lean = skillTexts.get('lean-repository-execution') ?? '';
  if (!lean.includes('## Mutation integrity and recovery')) throw new Error('Lean compatibility contract must define mutation integrity and recovery');
  if (!lean.includes('### Repository recovery execution')) throw new Error('Lean v4.1 must define repository recovery execution');

  const activation = await loadActivationScenarios();
  const development = await loadDevelopmentScenarios();
  const behavior = await loadBehaviorScenarios();
  const trajectory = await loadTrajectoryScenarios();
  const productive = await loadProductiveScenarios();
  const host = await loadHostScenarios();
  const scenarioSetSha256 = scenarioHash([...activation, ...development]);
  const version = await packageVersion();

  const portablePlugin = JSON.parse(await fs.readFile(path.join(repoRoot, 'plugin.json'), 'utf8')) as {
    name?: string;
    version?: string;
    extensions?: {
      'com.openai'?: {
        interface?: {
          shortDescription?: string;
          category?: string;
          capabilities?: string[];
          websiteURL?: string;
          supportURL?: string;
          privacyPolicyURL?: string;
          termsOfServiceURL?: string;
          composerIcon?: string;
          logo?: string;
        };
      };
    };
  };
  if (portablePlugin.name !== 'development-os') throw new Error('portable plugin name must be development-os');
  if (portablePlugin.version !== version) throw new Error('portable plugin version must match package version');
  const openAiInterface = portablePlugin.extensions?.['com.openai']?.interface;
  if (!openAiInterface?.shortDescription || openAiInterface.shortDescription.length > 30) {
    throw new Error('OpenAI subtitle/shortDescription must be present and 30 characters or fewer');
  }
  if (openAiInterface.category !== 'Developer Tools') {
    throw new Error('Development OS submission category must be Developer Tools');
  }
  if (!openAiInterface.capabilities?.includes('Development workflow')) {
    throw new Error('Development OS listing capabilities must describe its development workflow purpose');
  }
  for (const field of ['websiteURL', 'supportURL', 'privacyPolicyURL', 'termsOfServiceURL'] as const) {
    const value = openAiInterface[field];
    if (!value || !value.startsWith('https://')) throw new Error(`OpenAI listing ${field} must be a public HTTPS URL`);
  }
  for (const policyFile of ['PRIVACY.md', 'TERMS.md', 'SUPPORT.md']) {
    const stat = await fs.stat(path.join(repoRoot, policyFile)).catch(() => null);
    if (!stat?.isFile()) throw new Error(`${policyFile} must exist for submission packaging`);
  }
  await validateSquareBrandAsset(openAiInterface?.composerIcon, 'plugin.json extensions.com.openai.interface.composerIcon');
  await validateSquareBrandAsset(openAiInterface?.logo, 'plugin.json extensions.com.openai.interface.logo');

  const codexPlugin = JSON.parse(await fs.readFile(path.join(repoRoot, '.codex-plugin', 'plugin.json'), 'utf8')) as {
    name?: string;
    version?: string;
    skills?: string;
    apps?: string;
    mcpServers?: string;
    interface?: {
      shortDescription?: string;
      category?: string;
      capabilities?: string[];
      websiteURL?: string;
      supportURL?: string;
      privacyPolicyURL?: string;
      termsOfServiceURL?: string;
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
  for (const field of ['shortDescription', 'category', 'websiteURL', 'supportURL', 'privacyPolicyURL', 'termsOfServiceURL'] as const) {
    if (codexPlugin.interface?.[field] !== openAiInterface?.[field]) {
      throw new Error(`OpenAI interface field ${field} must match between portable and compatibility manifests`);
    }
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

  return { version, activationCount: activation.length, behaviorCount: behavior.length, trajectoryCount: trajectory.length, productiveCount: productive.length, hostCount: host.length, scenarioSetSha256 };
}



