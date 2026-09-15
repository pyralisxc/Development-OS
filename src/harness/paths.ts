import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(here, '..', '..', '..');
export const skillsRoot = path.join(repoRoot, 'skills');
export const evalsRoot = path.join(repoRoot, 'evals');
