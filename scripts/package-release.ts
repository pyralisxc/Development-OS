import { promises as fs } from 'node:fs';
import path from 'node:path';
import { zipSync } from 'fflate';
import { repoRoot, skillsRoot } from '../src/harness/paths.js';
import { packageVersion } from '../src/version.js';

const output = path.join(repoRoot, 'artifacts', 'release');
const skills = ['development-os', 'founder-to-feature', 'specialist-reasoning', 'evidence-stewardship', 'lean-repository-execution'];

async function zipDirectory(source: string, destination: string, archiveRoot: string): Promise<void> {
  const files: Record<string, Uint8Array> = {};

  async function visit(directory: string, relative: string): Promise<void> {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    for (const entry of entries.sort((left: { name: string }, right: { name: string }) => left.name.localeCompare(right.name))) {
      const fullPath = path.join(directory, entry.name);
      const relativePath = relative ? path.join(relative, entry.name) : entry.name;
      if (entry.isDirectory()) {
        await visit(fullPath, relativePath);
      } else if (entry.isFile()) {
        files[path.posix.join(archiveRoot, ...relativePath.split(path.sep))] = await fs.readFile(fullPath);
      }
    }
  }

  await visit(source, '');
  await fs.writeFile(destination, zipSync(files, { level: 9 }));
}

async function main() {
  const version = await packageVersion();
  await fs.rm(output, { recursive: true, force: true });
  await fs.mkdir(output, { recursive: true });

  for (const skill of skills) {
    await zipDirectory(path.join(skillsRoot, skill), path.join(output, `${skill}-v${version}.zip`), skill);
  }

  const bundleRoot = path.join(output, `agent-development-skills-v${version}`);
  await fs.mkdir(bundleRoot, { recursive: true });
  for (const skill of skills) await fs.cp(path.join(skillsRoot, skill), path.join(bundleRoot, skill), { recursive: true });
  await fs.copyFile(path.join(repoRoot, 'README.md'), path.join(bundleRoot, 'README.md'));
  await zipDirectory(bundleRoot, path.join(output, `agent-development-skills-v${version}.zip`), path.basename(bundleRoot));

  const pluginRoot = path.join(output, `development-os-plugin-v${version}`);
  await fs.mkdir(pluginRoot, { recursive: true });
  await fs.copyFile(path.join(repoRoot, 'plugin.json'), path.join(pluginRoot, 'plugin.json'));
  await fs.cp(path.join(repoRoot, '.codex-plugin'), path.join(pluginRoot, '.codex-plugin'), { recursive: true });
  await fs.cp(path.join(repoRoot, '.agents'), path.join(pluginRoot, '.agents'), { recursive: true });
  await fs.cp(path.join(repoRoot, 'assets'), path.join(pluginRoot, 'assets'), { recursive: true });
  await fs.cp(skillsRoot, path.join(pluginRoot, 'skills'), { recursive: true });
  await fs.mkdir(path.join(pluginRoot, 'docs'), { recursive: true });
  await fs.copyFile(path.join(repoRoot, 'docs', 'CHATGPT_PLUGIN.md'), path.join(pluginRoot, 'docs', 'CHATGPT_PLUGIN.md'));
  await zipDirectory(pluginRoot, path.join(output, `development-os-plugin-v${version}.zip`), path.basename(pluginRoot));

  console.log(output);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
