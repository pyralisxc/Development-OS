# Development OS

Development OS is a public, portable development reasoning system for software and digital-product agents. It is designed to improve reasoning, continuity, human control, and development quality without becoming project truth or requiring a particular tool stack.

## Runtime skills

- **Development OS — Orchestration:** present intent, stable objective/constraints, stage/mode, authority, authorization, referent-scoped liveness, capability routing, stewardship, and handoff.
- **Founder-to-Feature — Meaning:** what should become true and whether the product contract is coherent enough to become Ready.
- **Specialist Reasoning — Perspective:** professional rigor plus deliberate generative divergence and representation challenge.
- **Evidence Stewardship — Proof:** how uncertainty becomes justified confidence and what evidence deserves permanence.
- **Lean Repository Execution — Execute:** how the exact authorized referent is implemented, verified, recovered, and delivered.

## v4.1

v4.1 is a **compression and resilience release**.

It preserves the five-skill architecture and the established v3.5/v4.0 compatibility surface while making the highest-value runtime rules harder to lose under long, tool-heavy, multi-repository, or fresh-context work.

First-class 4.1 behavior includes:

- **Fresh intent, continuous state** — every new user message establishes present action intent; prior plans remain context rather than automatic permission to execute later steps.
- **Referent-scoped liveness** — continue all material self-answerable work inside the current referent, but do not consume the rest of a known roadmap.
- **Exact visible position** — opening position is a runtime invariant; closing position is emitted only at a genuine handoff.
- **Earned authority** — repository artifacts are evidence until their authority is established; degraded repositories recover truth before structure.
- **Minimum grounding** — infer mechanics but never invent mission when product purpose or intended behavior is genuinely non-derivable.
- **Tool-independent composition** — Development OS requires no external specialist system while exploiting the strongest available capabilities when useful.
- **Routing without takeover** — creating/routing durable work neither changes the active objective nor authorizes executing sibling work.
- **Native artifacts + selective persistence** — reason richly, persist selectively, and place durable obligations/meaning in natural project owners.
- **Professional floor + generative divergence** — professional specialist reasoning is preserved while substantial conceptual work deliberately generates materially different representations before convergence.
- **Scope elasticity** — leave the current frame when necessary to discover a better representation or real systemic cause, but remain anchored to the accepted objective.
- **Architectural runway** — prepare cheap neutral seams for probable expensive future migrations without prematurely implementing future systems.
- **Repository recovery** — messy/no-doc/over-documented projects can reconstruct a trustworthy canonical spine without a new Recovery skill or mandatory documentation suite.
- **Lower human burden** — restatement burden and founder-rescue burden are explicit R&D quality signals.

### Compatibility guarantee

v4.1 preserves the v3.5 scenario floor in `evals/compatibility/v3.5.json`. New scenarios protect the field failures and founder-rescue patterns discovered during 4.0 usage.

## Design principles

> **State is sticky. Intent is fresh.**

> **Methodology stands alone; capability composes opportunistically.**

> **Reason richly; persist selectively.**

> **Recover truth before structure.**

> **Infer mechanics; never invent mission.**

> **Bad hypotheses are allowed during divergence; bad conclusions are not.**

> **Leave the frame when needed; do not lose the objective.**

## Evaluation

The repository contains:

- behavioral evals for single-turn methodology guarantees;
- trajectory evals for context, authorization, and liveness across turns;
- a real productive eval whose output is reviewed separately for methodology compliance and practical usefulness;
- host acceptance journeys that exercise filesystem, Git, and shell behavior in an installed Codex plugin;
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
npm run eval:behavior
npm run eval:trajectory
npm run eval:productive
```

Behavioral, trajectory, productive, and host scenarios are optional review aids. They help a maintainer inspect methodology behavior, usefulness, and real host behavior, but automated model runs are not a release requirement. Release acceptance comes from the maintainer's hands-on review of the candidate; creating a version tag records that explicit sign-off.

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
