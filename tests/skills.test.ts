import test from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { skillsRoot } from '../src/harness/paths.js';
import { loadSkillCatalog, loadSkillCatalogText, loadSkillInstructions } from '../src/harness/skills.js';
import { activationInstructions, behaviorInstructions, productiveInstructions } from '../src/harness/prompt.js';

test('metadata routing and intentionally preloaded regression inputs remain distinct', async () => {
  const catalog = await loadSkillCatalog();
  assert.equal(catalog.length, 5);
  const metadata = activationInstructions(await loadSkillCatalogText());
  assert.doesNotMatch(metadata, /## Critical runtime invariants/);
  const bodies = await loadSkillInstructions(false);
  const regression = await loadSkillInstructions(true);
  assert.match(bodies, /## Critical runtime invariants/);
  assert.doesNotMatch(bodies, /===== REFERENCE:/);
  assert.match(regression, /===== REFERENCE: development-os\/operating-boundaries.md/);
  assert.match(regression, /===== REFERENCE: development-os\/execution-receipts.md/);
  assert.match(regression, /===== REFERENCE: specialist-reasoning\/product-core.md/);
  assert.match(behaviorInstructions(regression), /intentionally preloaded methodology regression, not an installed-host activation test/);
  assert.match(productiveInstructions(regression), /not an installed-host activation test/);
});

test('progressive-disclosure local reference links resolve inside their packaged skill', async () => {
  for (const skill of await loadSkillCatalog()) {
    const body = await fs.readFile(path.join(skillsRoot, skill.name, 'SKILL.md'), 'utf8');
    for (const match of body.matchAll(/\]\((references\/[^)#]+)(?:#[^)]*)?\)/g)) {
      const absolute = path.resolve(skillsRoot, skill.name, match[1]);
      assert.ok(absolute.startsWith(path.resolve(skillsRoot, skill.name) + path.sep));
      assert.ok((await fs.stat(absolute)).isFile());
    }
  }
});

test('universal root kernel carries lightweight intent interpretation while companions remain conditional', async () => {
  const catalog = await loadSkillCatalogText();
  const instructions = await loadSkillInstructions(false);
  assert.match(catalog, /default session kernel when Development OS is enabled/);
  assert.match(instructions, /## Everyday operating baseline/);
  assert.match(instructions, /Founder-to-Feature intent lens/);
  assert.match(instructions, /Ordinary conversation, creative writing/);
});
