import test from 'node:test';
import assert from 'node:assert/strict';
import { agentApiHeaders, agentSessionRequest, failedTurnMessage } from '../src/adapters/openai.js';

test('Agents API requests carry the required beta contract header', () => {
  const headers = agentApiHeaders('redacted') as Record<string, string>;
  assert.equal(headers['OpenAI-Beta'], 'agents=v1');
  assert.equal(headers['Content-Type'], 'application/json');
  assert.equal(headers.Authorization, 'Bearer redacted');
});

test('turn-level provider failures are surfaced instead of reported as missing output', () => {
  assert.equal(
    failedTurnMessage({ data: [{ status: 'failed', error: { code: 'usage_limit_exceeded', message: 'billing limit reached' } }] }),
    'usage_limit_exceeded: billing limit reached',
  );
});

test('tool-free eval sessions disable multi-agent without an invalid concurrency limit', () => {
  const body = agentSessionRequest('model', { instructions: 'instructions', input: 'input' });
  const agent = body.agent as { multi_agent: Record<string, unknown> };
  assert.deepEqual(agent.multi_agent, { enabled: false });
});
