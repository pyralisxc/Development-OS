# Development OS agent guide

This repository owns the Development OS methodology and its evaluation harness.

## Product boundary

Development OS improves agent reasoning and development workflow. It is not project truth, a memory database, a code-intelligence engine, a deployment platform, or a project-management ledger.

The five runtime skills are orthogonal:

1. Development OS — orchestration and human authorization.
2. Founder-to-Feature — product meaning and convergence.
3. Specialist Reasoning — adaptive multidisciplinary perspective.
4. Evidence Stewardship — proof choice and permanence.
5. Lean Repository Execution — implementation and delivery.

Do not move responsibilities between them casually. Prefer reducing overlap over adding doctrine.

## Non-negotiable context rules

- Forget by default; promote deliberately.
- Conversation history is not canonical methodology truth.
- Do not add durable memory merely to make continuation easier.
- Do not store project-specific product intent in this repository.
- Do not create duplicate planning/status/decision ledgers by default.
- Git history is the methodology archive.
- Raw live-eval traces are temporary unless a durable methodological guarantee genuinely requires promotion.

## Evaluation boundary

Harness tests may be tiny and disposable.

Behavioral evals test Development OS behavior.

Productive evals must separate:
- methodology compliance; and
- output usefulness/economic value.

A commercially useful output does not excuse a methodology violation.

Productive eval outputs belong to their target project/content surface, not this repository. Until explicitly expanded, scheduled productive evals are read-only toward external repositories and may produce draft patches/artifacts only.

## External tools

Development Intelligence is optional technical evidence. Development OS must work without it. Never couple either product so one requires the other's schema, stages, or lifecycle.

Provider adapters belong in the harness. Runtime skills stay provider-neutral.

## Stack discipline

Current accepted shape:
- Node.js 22 + TypeScript 5.8.3;
- npm;
- node:test;
- GitHub Actions;
- no database;
- no Vercel/web app;
- no central eval-history store.

Changing this shape is a product/architecture decision, not routine cleanup.

## Verification

Run `npm run verify` for every meaningful change.

Permanent tests should protect harness contracts and durable methodology guarantees, not incidental implementation shape.
