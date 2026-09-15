# Development OS

Development OS is a private, portable development reasoning system for working with software and digital-product agents without turning the methodology into a project-specific dependency.

## Runtime skills

- **Development OS — Coordinate:** where are we, what capability should be active, may work continue, and where is human authorization required?
- **Founder-to-Feature — Meaning:** what should become true, and is the product contract coherent enough to become Ready?
- **Specialist Reasoning — Perspective:** what are we failing to see, and which professional disciplines can materially improve or challenge the work?
- **Evidence Stewardship — Proof:** what establishes accepted truth, and what evidence deserves permanence?
- **Lean Repository Execution — Execute:** how do we make the approved change coherently and efficiently?

## v3.5

v3.5 keeps the five-skill architecture and strengthens Crystallization in two places:

1. **Implementation shape is explicit.** Material runtime, repository, persistence, provider, deployment, automation, distribution, credential, and intentional-absence choices must be visible before substantial work becomes Ready.
2. **Human-verifiable synthesis is explicit.** Private reasoning may stay compressed, but the user must be able to validate the resolved architecture without guessing what the agent silently assumed.

## Context philosophy: selective durability

> **Forget by default. Promote deliberately. Reconstruct from project truth.**

Conversation is working context, not automatic durable truth. Development OS should not become a memory database. Project-owned meaning belongs in the project that owns it. Generated intelligence may be durable when the project deliberately accepts it, but disposable work state should remain disposable.

This repository itself owns only the methodology and its evaluation machinery.

## Evaluation model

Three levels are intentionally separate:

- **Harness tests** — cheap deterministic checks of the harness and scenario contracts.
- **Behavioral evals** — real agent runs that compare skill behavior against machine-readable expectations.
- **Productive evals** — substantial real work whose useful output belongs to the target project/content/business surface while raw eval traces remain temporary.

Commercial usefulness never overrides methodology compliance. A valuable artifact can still be an eval failure.

Raw live-eval output is written to workflow artifacts and should use short retention. The repository keeps only a compact accepted baseline; prior baselines live in Git history.

## Stack

Development OS v3.5 intentionally uses a small GitHub-native stack:

- GitHub repository as canonical source/history;
- TypeScript on Node.js 22 for the harness;
- npm and the built-in Node test runner;
- GitHub Actions for verification, optional scheduled evals, and release packaging;
- no database;
- no Vercel/web app;
- no central memory service;
- no Jarvis dependency;
- no Development Intelligence dependency.

Development Intelligence may be supplied to an evaluated agent as optional technical-evidence tooling. It remains independent of Development OS.

## Local verification

```bash
npm install
npm run verify
```

Live OpenAI behavior evals additionally require:

```bash
export OPENAI_API_KEY=...
export DEVOS_OPENAI_MODEL=...
npm run eval:behavior
```

The harness uses the current OpenAI Agents HTTP surface through a small provider adapter rather than making the runtime skills provider-specific.

## Repository truth

- `skills/` is canonical methodology source.
- `evals/scenarios/` is canonical eval intent.
- `evals/baseline.json` is the compact accepted measurement snapshot, not a run archive.
- workflow artifacts are temporary evidence.
- Git history is the archive.

Do not add planning ledgers, conversation archives, or duplicate architecture documents by default.
