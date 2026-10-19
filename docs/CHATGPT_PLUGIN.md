# Development OS ChatGPT plugin

## Purpose

Development OS is the lightweight ChatGPT-facing methodology package.

It packages the five canonical Development OS skills:

- Development OS
- Founder-to-Feature
- Specialist Reasoning
- Evidence Stewardship
- Lean Repository Execution

That is the entire v4.2.0 plugin boundary.

## Connected apps stay independent

Development Intelligence and Conductor are already useful as independently connected ChatGPT apps. AI Systems Control may also expose an app later when it has a distinct agent-facing governance contract.

The Development OS plugin does **not** bind those apps by ID and does not embed their MCP endpoints.

This is intentional:

- Development Intelligence keeps its own OAuth, deployment, MCP contract, and evidence authority.
- Conductor keeps its own OAuth, deployment, MCP contract, and execution authority.
- AI Systems Control keeps owner-facing governance and control-plane authority.
- Development OS remains portable reasoning/workflow methodology.

A ChatGPT account may have all of them enabled at the same time. Development OS provides the reasoning frame; connected apps provide capabilities when available.

## Packaging

The repository root is the plugin package.

- `plugin.json` is the portable Agent Plugins manifest and canonical OpenAI-specific interface metadata source.
- `.codex-plugin/plugin.json` is the ChatGPT/Codex compatibility manifest.
- `assets/` contains required square OpenAI directory branding assets.
- `skills/` is the canonical skill source and is packaged directly.
- `.agents/plugins/marketplace.json` lets a workspace import/sync this repository as a plugin marketplace.

The active package intentionally has:

- no `.app.json`;
- no app IDs;
- no `mcp.json`;
- no `.mcp.json`.

The plugin can therefore evolve independently of whichever apps are connected to a particular ChatGPT account.

Directory submission requires both `interface.composerIcon` and `interface.logo` to reference readable square images. Repository validation protects those fields and the release packager includes the canonical assets.

## Runtime relationship

Development OS is a methodology session kernel, not an execution runtime. The four companion roles deepen meaning, perspective, proof and execution while the kernel preserves cross-cutting intent/scope continuity. Read only the bodies/references that materially help; where native host rules permit, a current project-owned specialization can satisfy a companion role without stacking duplicate routines.

Native host rules retain task/delegation routing, scheduling, execution lifecycle, cancellation, authentication, tool registration/discovery and permission enforcement. Connected apps retain their own authority and independent setup; the plugin neither replaces them nor requires any named provider. Future control-plane/runtime ambitions remain outside this package.

## Acceptance

Use the existing journeys in `evals/scenarios/host/` in a fresh supported session with the candidate plugin installed. Observe the actual host trace rather than asking the agent to assert activation. Exercise filesystem, Git and shell on disposable fixtures; use only permitted read-only connected-provider operations or supplied disposable/retained fixture evidence. Do not create external product mutations or public canaries merely to test a skill.

A useful acceptance pass establishes:

1. metadata selection and actual skill-body retrieval, recording resolved source/package revision when available;
2. only relevant companions, including project-local composition with required native routing preserved;
3. live relevant tool discovery and permitted execution, without assuming a catalog is current;
4. collection of buffered/yielded terminal results, distinguishing a completed read from a still-running external process;
5. uncertain-write reconciliation, partial-effect reporting and durable artifact resumption without blind replay;
6. fresh intent and exact approval continuity across terse re-entry, including a verified new approval missed by a stale checkpoint;
7. proof at the claim boundary, including final native/visual artifact inspection when CI cannot establish appearance;
8. a compact owner-openable actual-used receipt linked from the existing checkpoint, with source/version/time/native provenance where available, explicit gaps and no private reasoning, secrets or raw payloads;
9. non-development and routine administrative negative controls, plus provider-independent/cross-provider composition.

Use [the receipt guidance](../skills/development-os/references/execution-receipts.md) for the existing checkpoint artifact. Record the exact candidate, host/model when available, observation time, each journey's passed/failed/blocked/not-run status, current result and remaining limit. A native trace/export can independently support invocation; an agent-authored receipt alone is a bounded execution report, not independent attestation. Historical unknowns stay unknown. Verify that the owner can open the linked evidence.

### Proof boundaries

- Metadata-only activation evals do not prove subsequent body retrieval.
- Behavior/trajectory/productive evals intentionally preload all five bodies and conditional references. They test post-activation behavior, not selective reading or installed selection; their summaries identify the proof layer.
- Deterministic repository tests validate schemas, grading contracts, compatibility and packaging, not whether a model followed each scenario.
- Manual current-candidate source reads, local fixtures and safe native tools support bounded review but do not establish automatic installed activation.
- A candidate ZIP may be prepared with any unrun connected/installed-host journey plainly disclosed. Do not label it installed-selector accepted, tag a release, install/update the live plugin or claim maintainer acceptance without the corresponding authority and evidence.

Journeys are maintainer-reviewed; paid provider evals are optional diagnostics, not a publication requirement. Native observability or connected tools may be unavailable: report the specific gap instead of fabricating telemetry or making a provider a hard dependency.

## Public distribution

The GitHub repository is a public Codex marketplace source. Users can register `pyralisxc/Development-OS` at the `main` ref and refresh that marketplace to receive the latest plugin files from `main`.

The universal ChatGPT/Codex Plugins Directory is separate. Directory-published skills are reviewed snapshots and require a new submitted version for updates; they do not follow GitHub `main` live.

## Mobile boundary

The Development OS skills package is independent of custom MCP support. Custom MCP-backed apps may have different availability across ChatGPT surfaces; that does not change the plugin's methodology boundary.


