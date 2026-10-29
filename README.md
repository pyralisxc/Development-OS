# Development OS

Development OS is a public, portable operating methodology for agents' everyday conversations, ideas, research and development workflows. It is designed to improve thoughtful interpretation, continuity, human control and delivery quality without becoming project truth or requiring a particular tool stack.

## Runtime skills

- **Development OS — Operating kernel:** everyday intent interpretation, continuity, proportionate responses, and—for substantive work—stage/mode, authority, authorization, liveness, capability routing, stewardship and handoff.
- **Founder-to-Feature — Meaning:** a lightweight intent lens lives in the root for every response; the full skill resolves material product meaning through Crystallization and Ready.
- **Specialist Reasoning — Perspective:** professional rigor plus deliberate generative divergence and representation challenge.
- **Evidence Stewardship — Proof:** how uncertainty becomes justified confidence and what evidence deserves permanence.
- **Lean Repository Execution — Execute:** how the exact authorized referent is implemented, verified, recovered, and delivered.

## v4.2.1

v4.2.1 makes the enabled Development OS plugin's **root skill the intended baseline for every agent reply**, rather than limiting it to development-shaped prompts. The root embeds a lightweight Founder-to-Feature intent lens; substantial design-sensitive work still activates the full specialist and reaches a battle-tested, human-verifiable crystal before Ready. Ordinary questions, drafting and administration receive natural, proportionate answers without forced stages, specialist panels or invented implementation intent.

This release updates both manifests, the canonical root and Founder-to-Feature skill, activation/host/behavior scenarios, and observable compatibility checks. It does **not** add API billing, another runtime, session ledger, permission bypass or a second toggle. Plugin Settings remain the existing enable/pause control; the native host retains actual skill selection and tool permissions. Host acceptance distinguishes loaded instructions from agent-authored claims, and must not infer universal invocation solely from package metadata or response formatting.

## v4.2.0

v4.2.0 is a bounded host-aware evolution of the five-skill method, not a new runtime. It preserves exact-candidate authorization, fresh intent/re-entry, referent-scoped liveness, audit neutrality, idempotent recovery, human acceptance and the v3.5 compatibility floor.

- **Truthful compact visibility:** report the latest result, remaining boundary and necessary human action in the host's format. Long position headers are optional, not compliance proof.
- **Native ownership and local composition:** the method maintains intent/scope continuity; the host owns routing, scheduling, execution, authentication, tool discovery and enforcement. A current project-local specialization can satisfy a companion role without a second full routine where host rules permit.
- **Selective detail:** distinctive material triggers select the smallest relevant bodies/references. Conditional gate, handoff, wider wait stewardship and meta-audit detail loads when needed; waiting alone does not create portfolio work. Crystal dimensions are decision aids, not a mandatory form.
- **Observable acceptance:** installed-host journeys cover actual body reads, connected discovery, buffered-result collection, uncertain outcomes and re-entry. Generic fixtures exercise existing scope, identity, partial-effect, artifact and freshness safeguards rather than adding a rule per incident.
- **Owner-auditable actual use:** one compact receipt at the existing checkpoint distinguishes catalog availability, body retrieval, observed application and independently supported results, with available source/version/time/native references and explicit gaps. It is not a tracker, per-call diary or self-attestation service.

### Proof model and candidate acceptance

Repository CI proves deterministic build/tests, fail-closed schemas, compatibility, manifest/version parity and release packaging. It does not run or certify qualitative model behavior.

Optional activation evals test metadata-only routing. Behavior, trajectory and productive evals intentionally preload all five bodies and their references as regression input, not proof of selective host loading. Their existing result summaries identify that proof layer. No paid model eval is required.

Installed-host selection claims require the real journeys in `evals/scenarios/host/`: metadata selection → actual body retrieval → relevant tools → permitted action → collected result/readback → accurate checkpoint. Manual source reads and local fixtures can support candidate review but cannot certify automatic activation of a newly packaged plugin. Record run/skip/blocked status and provenance through the [plugin acceptance guidance](docs/CHATGPT_PLUGIN.md#acceptance); do not infer a pass merely because a scenario exists.

A correctly labeled candidate ZIP can be prepared before live plugin installation or refresh. Packaging is not installation, release sign-off or a selector acceptance claim. Maintainer hands-on review remains the qualitative acceptance authority; do not tag until required verification and real-host candidate review support explicit sign-off.

### Compatibility guarantee

The v3.5 scenario floor in `evals/compatibility/v3.5.json` and all established v4.x guarantees remain. Development OS remains provider-independent; OMS/DI or other control-plane/runtime ambitions are not part of this release.

## Design principles

> **Development OS owns the session; specialists deepen the work.**

> **State is sticky. Intent is fresh.**

> **Stay with self-answerable work until a real boundary.**

> **Wait nearby before wandering far.**

> **Teach the human only what the human must do.**

> **Methodology stands alone; capability composes opportunistically.**

> **Reason richly; persist selectively.**

> **See wider than you act.**

> **Battle-test deeply; persist findings only when evidence earns it.**

> **Recover truth before structure.**

> **Infer mechanics; never invent mission.**

> **Bad hypotheses are allowed during divergence; bad conclusions are not.**

> **Leave the frame when needed; do not lose the objective.**

## Evaluation

The repository contains:

- activation-routing evals for pre-body skill selection from name/description metadata;
- behavioral evals for single-turn post-activation methodology guarantees;
- trajectory evals for context, authorization, and liveness across turns;
- a real productive eval whose output is reviewed separately for methodology compliance and practical usefulness;
- host acceptance journeys that exercise installed skill reads, filesystem/Git/shell, connected read-only tools and current result collection;
- compatibility validation preserving proven older behavior.

Run:

```bash
npm ci
npm run verify
```

Optional live evals require an OpenAI API key/model:

```bash
export OPENAI_API_KEY=...
export DEVOS_OPENAI_MODEL=...
npm run eval:activation
npm run eval:behavior
npm run eval:trajectory
npm run eval:productive
```

Activation, behavioral, trajectory, productive, and host scenarios are optional review aids. They help a maintainer inspect methodology behavior, usefulness, and real host behavior, but automated model runs are not a release requirement. Release acceptance comes from the maintainer's hands-on review of the candidate; creating a version tag records that explicit sign-off.

A release tag requires `npm run verify`, tag/package version parity, and a packaged candidate whose manifest versions match `package.json`.

## Distribution

Development OS is packaged as a lightweight plugin containing the canonical skills. Connected tools/apps remain independent and are discovered/configured by the host environment.

### Install from GitHub

The public GitHub repository is the live marketplace source:

```bash
codex plugin marketplace add pyralisxc/Development-OS --ref main
codex plugin add development-os@development-os
```

To refresh an existing installation from the latest `main`:

```bash
codex plugin marketplace upgrade development-os
```

Start a fresh Codex session after installation or refresh so the current skills are loaded. GitHub-backed marketplace users receive the current `main` when they refresh; updates are not silently pushed into active sessions.

The universal ChatGPT/Codex Plugins Directory is a separate, reviewed distribution channel. Its skills are published snapshots, so directory updates require a new submitted plugin version rather than following GitHub `main` automatically.

See `docs/CHATGPT_PLUGIN.md` for the packaging boundary.

## Repository truth

- `skills/` is canonical methodology source.
- `evals/scenarios/` is canonical eval intent.
- `package.json` is the single release and plugin version authority.
- workflow artifacts are temporary evidence.
- Git history is the archive.

Do not add planning ledgers, conversation archives, session databases, or duplicate architecture documents by default.


