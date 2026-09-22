# Development OS ChatGPT plugin

## Purpose

Development OS is the lightweight ChatGPT-facing methodology package.

It packages the five canonical Development OS skills:

- Development OS
- Founder-to-Feature
- Specialist Reasoning
- Evidence Stewardship
- Lean Repository Execution

That is the entire v4.1 plugin boundary.

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

- `plugin.json` is the portable Agent Plugins manifest.
- `.codex-plugin/plugin.json` is the ChatGPT/Codex compatibility manifest.
- `skills/` is the canonical skill source and is packaged directly.
- `.agents/plugins/marketplace.json` lets a workspace import/sync this repository as a plugin marketplace.

The active package intentionally has:

- no `.app.json`;
- no app IDs;
- no `mcp.json`;
- no `.mcp.json`.

The plugin can therefore evolve independently of whichever apps are connected to a particular ChatGPT account.

## Runtime relationship

In an account where the apps are connected, the intended conceptual ownership remains:

- **Development OS** — reasoning, stages, authorization, Ambition, Evidence Appetite, routing, and liveness.
- **Development Intelligence** — evidence-backed project reality.
- **Conductor** — capability discovery and execution/orchestration.
- **AI Systems Control** — owner-facing governance and control-plane state.

The plugin does not need to declare those relationships as hard dependencies for the methodology to use available capabilities appropriately.

## Acceptance

A fresh supported host session with the Development OS plugin installed should:

1. activate the relevant Development OS skills for development work;
2. use connected specialist apps when they are available and relevant;
3. remain functional when one or more external apps are absent;
4. never claim a connected capability exists without checking current tool reality;
5. preserve the ownership boundaries above.

Release acceptance also includes bounded Codex host journeys with real filesystem, Git, and shell use. These journeys verify tool-time authorization, liveness, and fresh-intent behavior that API text evals cannot prove.

These journeys are maintainer-reviewed. Automated provider evals are optional diagnostic tools, not a publication requirement.

## Public distribution

The GitHub repository is a public Codex marketplace source. Users can register `pyralisxc/Development-OS` at the `main` ref and refresh that marketplace to receive the latest plugin files from `main`.

The universal ChatGPT/Codex Plugins Directory is separate. Directory-published skills are reviewed snapshots and require a new submitted version for updates; they do not follow GitHub `main` live.

## Mobile boundary

The Development OS skills package is independent of custom MCP support. Custom MCP-backed apps may have different availability across ChatGPT surfaces; that does not change the plugin's methodology boundary.
