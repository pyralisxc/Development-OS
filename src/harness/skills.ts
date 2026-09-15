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
