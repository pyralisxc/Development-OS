# Development OS ChatGPT plugin

## Purpose

Development OS is the single ChatGPT-facing development package.

The plugin composes:

- the five Development OS skills for reasoning and workflow;
- Development Intelligence as the evidence/intelligence app;
- Conductor as the execution/runtime app;
- AI Systems Control later, when ASC exposes a distinct agent-facing governance contract.

Composition does not transfer ownership. Development Intelligence still owns technical evidence, Conductor still owns execution/orchestration, ASC still owns owner-facing governance, and Development OS still owns development reasoning.

## Web-compatible packaging

The repository root is the plugin package.

- `plugin.json` is the portable Agent Plugins manifest.
- `.codex-plugin/plugin.json` is the ChatGPT/Codex compatibility manifest.
- `skills/` is the canonical skill source and is packaged directly.
- `.agents/plugins/marketplace.json` lets a workspace import/sync this repository as a plugin marketplace.

Do **not** add `mcp.json` or `.mcp.json` to this package for the hosted Development Intelligence or Conductor services. ChatGPT currently treats imported plugins that declare MCP servers directly as desktop-only. Web-compatible composition references already-created ChatGPT apps instead.

## Bind the apps

ChatGPT custom apps must exist before the plugin can reference them.

After Development Intelligence and Conductor have each been created as ChatGPT custom apps:

1. Copy `docs/app-bindings.example.json` to `.app.json`.
2. Replace each placeholder with the app ID from ChatGPT.
3. In `.codex-plugin/plugin.json`, add:

```json
"apps": "./.app.json"
```

at the top level.
4. Run `npm run verify`.
5. Sync/reimport the Development OS marketplace in ChatGPT.

Use app IDs such as `asdk_app_...`, `connector_...`, or `templated_apps_...`. Do not put a `plugin_...` ID in `.app.json`.

## Development Intelligence app

The hosted Development Intelligence service already exposes an OAuth-protected MCP endpoint:

```text
https://devint.cardforges.com/mcp
```

Create or reuse a ChatGPT custom app for that endpoint. If creating it:

1. Enable ChatGPT developer mode.
2. Open Apps → Create.
3. Enter the MCP endpoint above.
4. Use OAuth authentication.
5. Scan tools and complete the Development Intelligence owner authorization flow.
6. Create the app.
7. Copy its technical app ID from the ChatGPT app URL for the plugin binding.

The plugin should reference the app rather than embedding the MCP URL.

## Conductor app

Conductor's MCP transport is implemented on its `preview` branch but must be deployed before ChatGPT can connect.

The deployment needs:

- a stable public HTTPS origin;
- `CONDUCTOR_PUBLIC_URL`;
- `CONDUCTOR_OAUTH_ISSUER`;
- `CONDUCTOR_OAUTH_JWKS_URL`;
- `CONDUCTOR_PROJECTS_JSON`;
- `GITHUB_TOKEN`;
- the service port supplied by the host.

Conductor exposes:

- `GET /health`;
- OAuth protected-resource metadata;
- `POST /mcp`;
- `capabilities`;
- `preflight_project`.

The current Conductor transport is an OAuth resource server, not an authorization server. Its issuer must therefore provide the authorization flow, PKCE-compatible client behavior, JWT signing/JWKS, refresh-token support as required by the ChatGPT connection, the exact Conductor MCP audience, and the `conductor.read` scope.

For a single-owner deployment, the smallest operational simplification is to give Conductor a proven small owner OAuth path (for example by adapting the already-working Development Intelligence pattern) rather than introducing a large identity platform solely for these two read-only tools. That change belongs to Conductor, not Development OS.

After Conductor has a public endpoint and working OAuth:

1. Create a ChatGPT custom app using `https://<conductor-origin>/mcp`.
2. Complete OAuth and tool scanning.
3. Verify the app exposes exactly `capabilities` and `preflight_project` for Runtime v0.
4. Copy the technical app ID.
5. Bind it in Development OS `.app.json`.

## First acceptance test

In a fresh ChatGPT web conversation with the Development OS plugin installed:

1. Development OS skills should activate for development work.
2. Call Conductor `capabilities`.
3. Call Conductor `preflight_project` for an allowlisted project.
4. Ask Development Intelligence for current project reality.
5. Confirm the agent distinguishes:
   - reasoning authority: Development OS;
   - evidence authority: Development Intelligence;
   - execution capability: Conductor.

Runtime v0 is still read-only. A later Conductor execution slice is required before the unified plugin can replace direct GitHub/shell mutation tools.

## Mobile boundary

Custom MCP apps are currently a ChatGPT web capability. The plugin package may remain portable, but its MCP-backed DI/Conductor app actions should not be treated as mobile-parity functionality until ChatGPT supports custom MCP apps there.
