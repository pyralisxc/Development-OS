# Development OS

Development OS is a public, portable development reasoning system for software and digital-product agents. It is designed to improve reasoning, continuity, human control, and development quality without becoming project truth or requiring a particular tool stack.

## Runtime skills

- **Development OS — Orchestration:** present intent, stable objective/constraints, stage/mode, authority, authorization, referent-scoped liveness, capability routing, stewardship, and handoff.
- **Founder-to-Feature — Meaning:** what should become true and whether the product contract is coherent enough to become Ready.
- **Specialist Reasoning — Perspective:** professional rigor plus deliberate generative divergence and representation challenge.
- **Evidence Stewardship — Proof:** how uncertainty becomes justified confidence and what evidence deserves permanence.
- **Lean Repository Execution — Execute:** how the exact authorized referent is implemented, verified, recovered, and delivered.

## v4.1.9

v4.1.9 is an **activation, liveness, and autonomy-resilience field-validation bridge** built from the accepted Wait Stewardship / owner-gate Preview work. It intentionally carries the emerging 4.2 architecture under a 4.1.x version so real host usage can harden activation and re-entry behavior before the 4.2.0 stabilization release.

It preserves the five-skill architecture while making **Development OS the explicit development-session kernel**. Founder-to-Feature, Specialist Reasoning, Evidence Stewardship, and Lean Repository Execution are subordinate specialists that co-activate when material rather than competing as independent front doors.

First-class 4.1.9 behavior includes:

- **Activation resilience** — fresh development prompts, terse continuation, provider wake/re-entry, and specialist routing retain Development OS session ownership.
- **Activation-routing evals** — a separate scenario lane evaluates skill selection from name/description metadata without preloading the skill bodies; post-activation behavior remains a different proof layer.
- **Provider-neutral liveness** — waits are modeled by authoritative source, blocked condition, resume condition, cheapest authoritative recheck, and stewardship eligibility rather than by a GitHub-specific state.
- **Progressive Wait Stewardship** — use primary work first, then harden known obligations, then widen through same-repository, repository-wide, adjacent-repository, and wider-portfolio read-only stewardship only as nearer work saturates.
- **Guided human handoff** — genuinely manual provider/interface actions are taught as executable lessons: why, where, exact action, expected signal, guardrails, return evidence, and UI-drift recovery, without asking for secrets.
- **Founder-burden gate** — self-answerable engineering consequences and reachable evidence gaps stay with the agent; only non-derivable product choices, authorization, unavailable evidence, or irreducibly human acceptance return to the user.
- **Native-capability discovery** — systemic manual friction triggers a bounded provider-native capability check before custom infrastructure; restraint is equally required when a native feature adds ceremony without value.
- **Positive operating invariants** — the runtime emphasizes the shape of excellent continuation while keeping hard safety/authority prohibitions where they are actually needed.
- **Compatibility preservation** — v3.5 and established v4.x authorization, stage reversal, audit neutrality, liveness, fresh-context reconstruction, and human-agency guarantees remain protected.

### Proof model

Repository CI proves deterministic TypeScript build/tests, fail-closed scenario/schema validation, compatibility, manifest/version parity, and release packaging.

Optional live activation/behavior/trajectory/productive evals provide diagnostic model evidence. They do not substitute for installed-host evidence.

**4.1.9 publication is itself the bounded field-validation step.** Repository CI and maintainer review establish that this bridge is safe to publish; subsequent real Development OS sessions should exercise the host journeys in `evals/scenarios/host/`, especially fresh natural activation and long-session wait/re-entry behavior. Those observations become evidence for hardening and naming the stabilized 4.2.0 release.

### Compatibility guarantee

v4.1.9 preserves the v3.5 scenario floor in `evals/compatibility/v3.5.json` and all established v4.x runtime guarantees. New scenarios protect activation routing, self-answerable frontier ownership, provider-neutral liveness, progressive Wait Stewardship, guided human handoff, and native-capability discovery/restraint.

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


