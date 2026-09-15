import { EVAL_END, EVAL_START } from './prompt.js';
import type { EvalEnvelope } from '../types.js';

export function parseEvalEnvelope(text: string): EvalEnvelope {
  const start = text.lastIndexOf(EVAL_START);
  const end = text.lastIndexOf(EVAL_END);
  if (start < 0 || end < 0 || end <= start) throw new Error('response is missing DEVOS_EVAL block');
  const json = text.slice(start + EVAL_START.length, end).trim();
  const parsed = JSON.parse(json) as unknown;
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('DEVOS_EVAL must be an object');
  return parsed as EvalEnvelope;
}
