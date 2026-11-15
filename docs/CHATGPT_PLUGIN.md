# Development OS ChatGPT plugin

## Purpose

Development OS is the lightweight ChatGPT-facing operating methodology package. In v4.2.2 the root kernel is intended for every response when the plugin is enabled, with a lightweight Founder-to-Feature intent lens even for routine conversations.

It packages the five canonical Development OS skills:

- Development OS
- Founder-to-Feature
- Specialist Reasoning
- Evidence Stewardship
- Lean Repository Execution

That is the entire v4.2.2 plugin boundary.

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

Development OS has **one canonical source tree but more than one consumer-specific package contract**. Do not treat the repository root as one universal upload archive.

### Repository / marketplace source layout

The repository root contains all distribution metadata needed by supported repository-driven consumers:

- `plugin.json` — portable Agent Plugins manifest and canonical OpenAI-specific interface metadata source;
- `.codex-plugin/plugin.json` — Codex compatibility manifest;
- `.agents/plugins/marketplace.json` — repository marketplace metadata;
- `assets/` — canonical branding assets;
- `skills/` — canonical skill source.

These files may coexist in the repository because they serve different consumers. Their coexistence does **not** mean every packaged ZIP should contain all of them.

### ChatGPT private-plugin upload layout

A private ChatGPT upload is a **single-plugin archive**, not a repository marketplace snapshot.

For the 4.2.2 private-plugin install, the successful package used:

- exactly one plugin identity;
- root `plugin.json`;
- root `skills/*/SKILL.md`;
- supporting assets/docs/policy files as needed;
- **no** `.agents/plugins/marketplace.json`;
- **no competing secondary plugin manifest** such as `.codex-plugin/plugin.json`.

The importer rejected the broader repository-style package and accepted the archive after the marketplace index and competing manifest were removed.

Treat that as provider-boundary evidence, not a timeless assumption. At packaging time, refresh the current provider/importer contract and verify the **actual final archive bytes** against the consumer that will ingest them.

### Packaging invariant

> **Package for the consumer, not for the repository.**

Before delivery:

1. identify the exact consumer: repository marketplace, private ChatGPT upload, directory submission, or another host;
2. include only the metadata and content that consumer recognizes;
3. ensure the final archive contains exactly one plugin identity when the consumer expects one plugin;
4. inspect the final ZIP root, not only the staging directory or packaging script;
5. test the archive through the real importer before calling packaging accepted.

The active methodology package intentionally has no `.app.json`, app IDs, `mcp.json`, or `.mcp.json`; connected apps remain independent.

Directory submission requires both `interface.composerIcon` and `interface.logo` to reference readable square images. Repository validation protects those source fields, but successful source validation alone does not prove a consumer-specific archive is acceptable.

## Runtime relationship

Development OS is the default conversational operating kernel when enabled, not an execution runtime. It applies proportional intent interpretation to ordinary replies; the four companion roles deepen meaning, perspective, proof and execution when necessary while the kernel preserves cross-cutting intent/scope continuity. Read only the bodies/references that materially help; where native host rules permit, a current project-owned specialization can satisfy a companion role without stacking duplicate routines.

Native host rules retain task/delegation routing, scheduling, execution lifecycle, cancellation, authentication, tool registration/discovery and permission enforcement. Connected apps retain their own authority and independent setup; the plugin neither replaces them nor requires any named provider. Future control-plane/runtime ambitions remain outside this package.

## Acceptance

Use the existing journeys in `evals/scenarios/host/` in a fresh supported session with the candidate plugin installed. Test ordinary prompts without explicit skill invocation, and separately compare behavior after pausing it in Plugin Settings; these are observations of host behavior, not a claim that a manifest can assign developer-role priority. Observe the actual host trace rather than asking the agent to assert activation. Exercise filesystem, Git and shell on disposable fixtures; use only permitted read-only connected-provider operations or supplied disposable/retained fixture evidence. Do not create external product mutations or public canaries merely to test a skill.

A useful acceptance pass establishes:

1. metadata selection and actual skill-body retrieval, recording resolved source/package revision when available;
2. only relevant companions, including project-local composition with required native routing preserved;
3. live relevant tool discovery and permitted execution, without assuming a catalog is current;
4. collection of buffered/yielded terminal results, distinguishing a completed read from a still-running external process;
5. uncertain-write reconciliation, partial-effect reporting and durable artifact resumption without blind replay;
6. fresh intent and exact approval continuity across terse re-entry, including a verified new approval missed by a stale checkpoint;
7. proof at the claim boundary, including final native/visual artifact inspection when CI cannot establish appearance;
8. a compact owner-openable actual-used receipt linked from the existing checkpoint, with source/version/time/native provenance where available, explicit gaps and no private reasoning, secrets or raw payloads;
9. ordinary non-development and routine administration with the lightweight kernel active but no unnecessary full specialist, plus provider-independent/cross-provider composition; separately check paused-plugin behavior in a supported real host.

Use [the receipt guidance](../skills/development-os/references/execution-receipts.md) for the existing checkpoint artifact. Record the exact candidate, host/model when available, observation time, each journey's passed/failed/blocked/not-run status, current result and remaining limit. A native trace/export can independently support invocation; an agent-authored receipt alone is a bounded execution report, not independent attestation. Historical unknowns stay unknown. Verify that the owner can open the linked evidence.

### Proof boundaries

- Metadata-only activation evals do not prove subsequent body retrieval.
- Behavior/trajectory/productive evals intentionally preload all five bodies and conditional references. They test post-activation behavior, not selective reading or installed selection; their summaries identify the proof layer.
- Deterministic repository tests validate schemas, grading contracts, compatibility and packaging, not whether a model followed each scenario.
- Manual current-candidate source reads, local fixtures and safe native tools support bounded review but do not establish automatic installed activation.
- A candidate ZIP may be prepared with any unrun connected/installed-host journey plainly disclosed. Do not label it installed-selector accepted, tag a release, install/update the live plugin or claim maintainer acceptance without the corresponding authority and evidence.

Journeys are maintainer-reviewed; paid provider evals are optional diagnostics, not a publication requirement. Native observability or connected tools may be unavailable: report the specific gap instead of fabricating telemetry or making a provider a hard dependency.

## Distribution surfaces

### GitHub / Codex marketplace

The GitHub repository is a public Codex marketplace source. Users can register `pyralisxc/Development-OS` at the `main` ref and refresh that marketplace to receive the latest plugin files from `main`. This path uses repository/marketplace metadata such as `.agents/plugins/marketplace.json`.

### ChatGPT private plugin

Private ChatGPT upload is a separate consumer path. Supply one private-plugin archive containing one plugin identity; do not upload the repository marketplace bundle unchanged.

### Plugins Directory

The universal ChatGPT/Codex Plugins Directory is separate again. Directory-published skills are reviewed snapshots and require a new submitted version for updates; they do not follow GitHub `main` live.

Do not infer that package shape accepted by one distribution surface is accepted by another. Reconfirm the current provider contract at delivery time.

## Mobile boundary

The Development OS skills package is independent of custom MCP support. Custom MCP-backed apps may have different availability across ChatGPT surfaces; that does not change the plugin's methodology boundary.


