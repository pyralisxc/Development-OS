import { promises as fs } from 'node:fs';
import path from 'node:path';
import { skillsRoot } from './paths.js';

const CORE_SKILLS = [
  'development-os',
  'founder-to-feature',
  'specialist-reasoning',
  'evidence-stewardship',
  'lean-repository-execution',
] as const;

function frontmatterValue(text: string, field: string): string | undefined {
  const lines = text.split(/\r?\n/);
  if (lines[0]?.trim() !== '---') return undefined;
  for (let index = 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (line?.trim() === '---') break;
    const prefix = field + ':';
    if (!line?.startsWith(prefix)) continue;
    let value = line.slice(prefix.length).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    return value;
  }
  return undefined;
}

export async function loadSkillCatalog(): Promise<Array<{ name: string; description: string }>> {
  const entries: Array<{ name: string; description: string }> = [];
  for (const skill of CORE_SKILLS) {
    const text = await fs.readFile(path.join(skillsRoot, skill, 'SKILL.md'), 'utf8');
    const name = frontmatterValue(text, 'name');
    const description = frontmatterValue(text, 'description');
    if (!name || !description) throw new Error(skill + ': skill catalog requires name and description frontmatter');
    entries.push({ name, description });
  }
  return entries;
}

export async function loadSkillCatalogText(): Promise<string> {
  return (await loadSkillCatalog()).map(item => '- [' + item.name + '] ' + item.description).join('\n');
}

export async function loadSkillInstructions(includeSpecialistReferences = true): Promise<string> {
  const parts: string[] = [];
  for (const skill of CORE_SKILLS) {
    const file = path.join(skillsRoot, skill, 'SKILL.md');
    parts.push(`\n===== SKILL: ${skill} =====\n${await fs.readFile(file, 'utf8')}`);
  }
  if (includeSpecialistReferences) {
    const references = path.join(skillsRoot, 'specialist-reasoning', 'references');
    const names = (await fs.readdir(references)).filter((name: string) => name.endsWith('.md')).sort();
    for (const name of names) {
      parts.push(`\n===== SPECIALIST REFERENCE: ${name} =====\n${await fs.readFile(path.join(references, name), 'utf8')}`);
    }
  }
  return parts.join('\n');
}
