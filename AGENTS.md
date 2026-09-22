# Development OS agent guide

This repository owns the Development OS methodology and its evaluation harness.

## Product boundary

Development OS improves agent reasoning and development workflow. It is not project truth, a memory database, code-intelligence engine, deployment platform, control plane, or project-management ledger.

The five runtime skills are orthogonal:

1. Development OS — orchestration and human authorization.
2. Founder-to-Feature — product meaning and convergence.
3. Specialist Reasoning — professional perspective and generative divergence.
4. Evidence Stewardship — uncertainty, proof, and permanence.
5. Lean Repository Execution — implementation and delivery.

Do not move responsibilities casually. Prefer reducing overlap over adding doctrine or skills.

## Capacity-preserving evolution

Methodology releases treat proven behavior as a compatibility surface.

- Preserve authorization, liveness, stage reversal, audit neutrality, evidence, and fresh-context guarantees unless explicitly retired.
- `evals/compatibility/v3.5.json` remains the compatibility floor.
- Prefer strengthening an existing owner over creating a new skill.
- New evals must protect new behavior while older scenarios remain.
- Compression is desirable when it preserves or strengthens capability.

## Non-negotiable context rules

- Fresh message intent is interpreted before conversational momentum.
- Forget by default; promote deliberately.
- Conversation history is not canonical project or methodology truth.
- Do not add durable memory merely to make continuation easier.
- Do not store project-specific product intent here.
- Do not create duplicate planning/status/decision/handoff ledgers by default.
- Git history is the methodology archive.
- Raw live-eval traces are temporary unless a durable guarantee genuinely earns promotion.

## Evaluation boundary

Harness tests may be tiny and disposable.

Behavioral/trajectory evals test Development OS behavior.

Productive evals must separate methodology compliance from output usefulness/economic value. A commercially useful output does not excuse a methodology violation.

Productive eval outputs belong to their target project/content surface, not this repository.

Host acceptance must exercise the installed plugin through real filesystem, Git, and shell capabilities. Text-only provider evals cannot satisfy that proof layer.

Scenario JSON is validated fail-closed. Unknown fields are errors rather than silently ignored intent.

## External tools and capability composition

Runtime skills are capability-neutral and provider-neutral.

Development Intelligence, Conductor, GitHub, IDEs, browsers/computer use, provider APIs, and future specialist systems may materially improve work, but Development OS must remain conceptually usable without any particular one.

Connected systems remain independent:

- Development Intelligence may provide technical evidence/project intelligence.
- Conductor may provide bounded execution and durable work routing.
- AI Systems Control is an optional/deferred consumer for future persistent control-plane needs, not a Development OS authority.
- Development OS owns development reasoning methodology/workflow only.

Do not bind, proxy, copy, or reimplement specialist apps merely to make the plugin look unified. Provider adapters belong in the harness, not runtime methodology.

## Runtime composition

Development OS is distributed as a lightweight plugin that packages only canonical skills. External apps authenticate/connect independently through the host environment.

## Stack discipline

Current accepted repository shape:

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

Automated model evals are optional review tools, not release gates. The maintainer's hands-on grading is the qualitative acceptance authority; creating a version tag records explicit release sign-off. Do not tag until `npm run verify` passes and the candidate has been reviewed in a real host. `package.json` is the single version authority; plugin manifests and release artifacts must match it.
