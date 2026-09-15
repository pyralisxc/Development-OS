import type { AgentAdapter, AgentRunInput, AgentRunOutput } from '../types.js';

interface SessionResponse {
  id: string;
  status?: string;
  error?: string | null;
  usage?: {
    input_tokens?: number;
    output_tokens?: number;
    total_tokens?: number;
  } | null;
}

interface ItemsResponse {
  data?: Array<Record<string, unknown>>;
}

const API_BASE = process.env.OPENAI_API_BASE ?? 'https://api.openai.com/v1';

async function api(path: string, init: RequestInit = {}): Promise<any> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('OPENAI_API_KEY is required for live OpenAI evals');
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      ...(init.headers ?? {}),
    },
  });
  const text = await response.text();
  const body = text ? JSON.parse(text) : undefined;
  if (!response.ok) throw new Error(`OpenAI ${response.status}: ${text.slice(0, 1000)}`);
  return body;
}

function messageText(item: Record<string, unknown>): string {
  if (item.type !== 'message' || item.role !== 'assistant' || !Array.isArray(item.content)) return '';
  return item.content.map(part => {
    if (!part || typeof part !== 'object') return '';
    const text = (part as Record<string, unknown>).text;
    return typeof text === 'string' ? text : '';
  }).filter(Boolean).join('\n');
}

async function waitForIdle(sessionId: string, timeoutMs = 180_000): Promise<SessionResponse> {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    const session = await api(`/agents/sessions/${encodeURIComponent(sessionId)}`) as SessionResponse;
    if (session.status === 'idle') return session;
    if (session.status === 'failed') throw new Error(`OpenAI agent session failed: ${session.error ?? 'unknown error'}`);
    if (session.status === 'requires_action') throw new Error('OpenAI agent session requires an external action; v1 eval adapter is tool-free by design');
    await new Promise(resolve => setTimeout(resolve, 1200));
  }
  throw new Error(`OpenAI agent session timed out after ${timeoutMs}ms`);
}

export class OpenAIAgentAdapter implements AgentAdapter {
  readonly name = 'openai-agents';

  async run(input: AgentRunInput): Promise<AgentRunOutput> {
    const model = process.env.DEVOS_OPENAI_MODEL;
    if (!model) throw new Error('DEVOS_OPENAI_MODEL is required for live OpenAI evals');

    const created = await api('/agents/sessions', {
      method: 'POST',
      body: JSON.stringify({
        environment: { type: 'none' },
        agent: {
          model,
          instructions: input.instructions,
          multi_agent: { enabled: false, max_concurrent_subagents: 1 },
        },
        input: input.input,
        metadata: input.metadata ?? {},
        stream: false,
      }),
    }) as SessionResponse;

    const session = created.status === 'idle' ? created : await waitForIdle(created.id);
    const items = await api(`/agents/sessions/${encodeURIComponent(created.id)}/items?order=asc&limit=100`) as ItemsResponse;
    const text = (items.data ?? []).map(messageText).filter(Boolean).join('\n\n');
    if (!text) throw new Error('OpenAI agent session returned no assistant message text');

    return {
      text,
      usage: {
        inputTokens: session.usage?.input_tokens,
        outputTokens: session.usage?.output_tokens,
        totalTokens: session.usage?.total_tokens,
      },
      raw: { sessionId: created.id, status: session.status },
    };
  }
}
