import { promises as fs } from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { repoRoot, skillsRoot } from '../src/harness/paths.js';

const version = '3.5';
const output = path.join(repoRoot, 'artifacts', 'release');
const skills = ['development-os', 'founder-to-feature', 'specialist-reasoning', 'evidence-stewardship', 'lean-repository-execution'];

function run(command: string, args: string[], cwd: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, stdio: 'inherit' });
    child.once('error', reject);
    child.once('exit', (code: number | null) => code === 0 ? resolve() : reject(new Error(`${command} exited ${code}`)));
  });
}

async function main() {
  await fs.rm(output, { recursive: true, force: true });
  await fs.mkdir(output, { recursive: true });

  for (const skill of skills) {
    await run('zip', ['-qr', path.join(output, `${skill}-v${version}.zip`), skill], skillsRoot);
  }

  const bundleRoot = path.join(output, `agent-development-skills-v${version}`);
  await fs.mkdir(bundleRoot, { recursive: true });
  for (const skill of skills) await fs.cp(path.join(skillsRoot, skill), path.join(bundleRoot, skill), { recursive: true });
  await fs.copyFile(path.join(repoRoot, 'README.md'), path.join(bundleRoot, 'README.md'));
  await run('zip', ['-qr', path.join(output, `agent-development-skills-v${version}.zip`), path.basename(bundleRoot)], output);
  console.log(output);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
