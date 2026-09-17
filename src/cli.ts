import { runBehavior, runProductive, runTrajectory } from './harness/run.js';
import { validateRepository } from './validate.js';

function arg(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

async function main() {
  const [command, kind] = process.argv.slice(2);
  if (command === 'validate') {
    const result = await validateRepository();
    console.log(JSON.stringify({ ok: true, ...result }, null, 2));
    return;
  }
  if (command === 'run' && kind === 'behavior') {
    const result = await runBehavior(arg('--provider') ?? 'openai', arg('--scenario'));
    console.log(JSON.stringify({ passed: result.passed, total: result.results.length, directory: result.directory }, null, 2));
    process.exitCode = result.passed ? 0 : 1;
    return;
  }
  if (command === 'run' && kind === 'trajectory') {
    const result = await runTrajectory(arg('--provider') ?? 'openai', arg('--scenario'));
    console.log(JSON.stringify({ passed: result.passed, total: result.results.length, directory: result.directory }, null, 2));
    process.exitCode = result.passed ? 0 : 1;
    return;
  }
  if (command === 'run' && kind === 'productive') {
    const result = await runProductive(arg('--provider') ?? 'openai', arg('--scenario'));
    console.log(JSON.stringify(result, null, 2));
    return;
  }
  throw new Error('usage: devos <validate | run behavior|trajectory|productive [--provider openai] [--scenario id]>');
}

main().catch(error => {
  console.error(error instanceof Error ? error.stack ?? error.message : String(error));
  process.exitCode = 1;
});
