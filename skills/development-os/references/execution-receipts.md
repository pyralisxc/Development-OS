# Compact execution receipt

Use at a meaningful run/checkpoint when the owner needs to inspect actual use. Keep it with the existing run artifact and link it from the ordinary project update using the host's authorized destination. Do not create a tracker or a permanent tool-call diary, or repeat the full receipt after individual calls. Check that the owner can open the link or attachment; disclose missing access rather than substituting a private URL.

## Minimum useful record

Record only what matters to the scoped result:

- **Run/result/boundary:** objective, candidate or artifact identity, current observed outcome, partial effects, remaining acceptance and required human action.
- **Actual-used:** skill bodies actually retrieved and relevant tools actually invoked. A catalog entry is availability, not invocation. Body retrieval does not establish correct application or causation; describe observable decisions separately.
- **Provenance:** available source/package revision or content hash, timestamp/window, native call/run/result reference and owner-openable trace/export. Resolve version through the actual source/package when possible. Do not infer an at-use semantic version from a later read or add hand-maintained versions to each skill.
- **Collection/verification:** distinguish accepted, running, terminal completed/failed and independently verified effects. State what readback or artifact inspection establishes each claim, and what it does not.
- **Gaps:** unavailable historical version, inaccessible host trace, lost scratch state, uncollected result or unresolved outcome. A native identifier without accessible evidence is not an inspectable trace. If only an agent-authored execution report survives, label it a bounded report, not independently attested execution.

Never include private reasoning, secrets, credentials or raw request payloads. Native host telemetry is optional evidence the method can use, not a capability it can invent. Public source proves inspected content; a public commit proves a Git effect, not skill selection or invocation. Missing evidence means unknown, not never.

## Synthetic connected-provider example

This is a format example, not an execution log or native receipt. Replace placeholders only with actual retained evidence.

Run: inspect one release candidate through source host A and deployment provider B. Result: candidate check completed; deployment acceptance still pending.

Actual-used: kernel and proof-body retrieval observed at <time>, from <resolved source/revision>. A project-local execution specialization supplied the companion role. Source-host read <native reference> returned candidate <identity>; provider-B status read <native reference> returned building. Application observed: current source and provider state were kept distinct; no deployment success was claimed.

Verification: source read establishes candidate identity, not deployment health. The provider call is terminal as a read while the deployment remains running. Owner-openable evidence: <supported trace/export or sanitized attachment>. Gaps: <unavailable trace/version details>. If the host exposes no trace, this is a bounded execution report, not independent invocation proof.

Compact checkpoint: “Source check passed for the current candidate; deployment is still building. Actual-used: kernel, proof, project-local execution specialization, source and deployment status reads. Receipt: <owner-openable artifact>. No owner action yet.”

## Historical-unknown example

A retained commit and later source inspection survive, but the original skill-read trace and package revision do not. Report the Git effect and current content separately. Historical at-use version and body retrieval are unknown. Do not relabel the old task with the version installed today, or infer that an unobserved skill was never used.

## Result collection and re-entry example

A read wrapper yields, then buffers a successful terminal result. Collect it before saying the provider is stalled. A subsequent mutation has no terminal reply: inspect the original operation/ref and each known effect before replay; no result or vanished local cache is not proof of non-execution. On re-entry, refresh actual tools through supported host discovery and reconcile durable state. Do not create another mutation merely to test availability.

A freshly verified authenticated owner approval may arrive through another host-supported channel while an older checkpoint still says approval pending. Reconcile the latest trusted conversation before repeating that status; forward applicable exact scope to the authorized executor. A receipt reports the freshness correction, not permission to widen scope or bypass native approval enforcement. Do not copy private message contents into a public example.
