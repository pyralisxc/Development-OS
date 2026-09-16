# Development OS

Development OS is a private, portable development reasoning system for working with software and digital-product agents without turning the methodology into a project-specific dependency.

## Runtime skills

- **Development OS — Session/orchestration:** what objective is active, what constraints govern it, what stage/mode is valid, what is authorized, may work continue, and where is the real human boundary?
- **Founder-to-Feature — Meaning:** what should become true, and is the product contract coherent enough to become Ready?
- **Specialist Reasoning — Perspective:** what are we failing to see, and which professional disciplines can materially improve or challenge the work?
- **Evidence Stewardship — Proof:** what establishes accepted truth, and what evidence deserves permanence?
- **Lean Repository Execution — Execute:** how do we make the approved change coherently and efficiently?

## v3.5

v3.5 keeps the five-skill architecture but reworks Development OS around an **active development-session runtime**.

The change is grounded in real v3.4 ChatGPT usage and a pre-release v3.5a Codex trajectory. Those runs showed that many individual rules were correct while long sessions still lost standing authorization, objective constraints, process-position fidelity, retired product meaning, stage validity, or liveness.

The revised runtime therefore makes the following first-class:

- one stable session objective plus governing constraints;
- stage and work mode as separate axes;
- stage validity that can move backward when evidence changes;
- authorization scoped to the accepted semantic referent rather than a context-free Boolean;
- standing authorization that survives ordinary progress reports and terse follow-ups;
- a hard liveness predicate: self-answerable authorized work continues until a real boundary;
- observational audit routing that does not automatically become product design or Build scope;
- visible working synthesis as the human steering surface;
- compact fresh-context transfer that preserves non-derivable accepted meaning while rechecking live project truth.

Founder-to-Feature keeps product meaning and Crystallization. Specialist Reasoning keeps perspective. Evidence Stewardship keeps proof. Lean keeps implementation and mutation integrity.

## Context philosophy: selective durability

> **Forget by default. Promote deliberately. Reconstruct from project truth.**

Conversation is working context, not automatic durable truth. Development OS should not become a memory database.

Three layers matter:

1. **Project truth** — durable source/contracts/provider state owned by the project and reconstructible by a fresh agent.
2. **Working development state** — temporary objective/constraints/stage/authorization/meaning needed while an objective is active.
3. **Conversational exhaust** — discarded alternatives, intermediate guesses, and path-dependent reasoning that should disappear.

When a context handoff is genuinely needed, the outgoing agent may emit a compact transfer crystal containing only non-derivable working state. The receiving agent must still re-inspect authoritative project reality.

## Evaluation model

Four layers remain intentionally separate:

- **Harness tests** — cheap deterministic checks of the harness and scenario contracts.
- **Behavioral evals** — one-shot agent runs for bounded rules and routing.
- **Trajectory evals** — cumulative multi-turn simulations for standing authorization, stage invalidation, audit continuity, retired-direction protection, and liveness.
- **Productive evals** — substantial real work whose useful output belongs to the target project/content/business surface while raw eval traces remain temporary.

Trajectory evals deliberately pass the standing scenario objective plus prior transcript back into each turn. They test the methodology's state-reconciliation behavior; they do not pretend to reproduce every host product's context-management internals.

Commercial usefulness never overrides methodology compliance. A valuable artifact can still be an eval failure.

Raw live-eval output is temporary evidence. The repository keeps only a compact accepted baseline; prior baselines live in Git history.

## Stack

Development OS v3.5 intentionally uses a small GitHub-native stack:

- GitHub repository as canonical source/history;
- five Markdown runtime skills;
- TypeScript on Node.js 22 for the harness;
- npm and the built-in Node test runner;
- GitHub Actions for verification, optional live evals, and release packaging;
- no database;
- no Vercel/web app;
- no central memory service;
- no Jarvis dependency;
- no Development Intelligence dependency.

Development Intelligence may be supplied as optional technical-evidence tooling. It remains independent of Development OS.

## ChatGPT and Codex deployment

GitHub is the canonical source. ChatGPT and Codex are separate runtime deployments of the same five skills; they should not be assumed to auto-sync.

Project-specific skills may specialize Development OS locally, but global Development OS must not hard-code CardForge, Development Intelligence, or another project.

## Local verification

```bash
npm install
npm run verify
```

Optional live evals additionally require an OpenAI API key/model:

```bash
export OPENAI_API_KEY=...
export DEVOS_OPENAI_MODEL=...
npm run eval:behavior
npm run eval:trajectory
```

Continuous live evaluation is not required for normal solo use. Real project work plus deliberate regression runs before meaningful methodology releases is a valid evidence model.

## Repository truth

- `skills/` is canonical methodology source.
- `evals/scenarios/` is canonical eval intent.
- `evals/baseline.json` is the compact accepted measurement snapshot, not a run archive.
- workflow artifacts are temporary evidence.
- Git history is the archive.

Do not add planning ledgers, conversation archives, session databases, or duplicate architecture documents by default.
