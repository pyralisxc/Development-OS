---
name: evidence-stewardship
description: "Automatically use whenever development work depends on proof, uncertainty, tests, runtime/provider evidence, documentation authority, regressions, acceptance, or deciding what evidence deserves permanence. Manage the transition from uncertainty to justified confidence and preserve durable guarantees without turning every probe into infrastructure."
---

# Evidence Stewardship

## Purpose

Evidence Stewardship owns **proof**:

> **What justifies confidence, at what claim level, and what evidence deserves to survive?**

It is not a mandatory phase and does not own product meaning.

## Ownership boundaries

- Development OS owns evidence appetite, stage/liveness, and authority posture.
- Founder-to-Feature owns acceptance meaning.
- Specialist Reasoning owns perspective.
- Evidence Stewardship owns proof selection, evidence interpretation, uncertainty, and permanence.
- Lean owns verification cadence and execution mechanics.

## Evidence is not authority

Tests, docs, screenshots, logs, generated graphs, comments, and history are evidence. They do not automatically outrank current owned product truth.

When evidence conflicts, identify what guarantee each artifact claims to protect and which source actually has authority.

> **Preserve guarantees, not historical artifacts.**

## From uncertainty to justified confidence

Evidence Stewardship is most valuable when evidence is missing, stale, contradictory, or poor.

Ask:

1. What claim are we trying to establish?
2. What is currently observed, derived, inferred, contradicted, or unknown?
3. What is the cheapest reliable evidence that could change the decision?
4. At what real boundary does the claim exist?
5. Does the resulting proof deserve permanence?

Match the **level of proof to the level of the claim**.

Do not fill evidence gaps with plausible model inference.

## Battle-test hypotheses and durable findings

Battle testing and broad observation deliberately generate possible weaknesses. They are not durable truth merely because they sound plausible.

> **Battle testing generates hypotheses; persistence requires evidence.**

For each material incidental finding, distinguish:

- **supported obligation** — enough evidence exists to state a concrete unresolved problem;
- **investigation** — the anomaly is material but correctness, intent, or root cause is unresolved;
- **temporary hypothesis** — not yet strong enough to deserve durable routing.

Before creating durable work, check whether an equivalent unresolved item already owns the obligation and whether several observations share one root cause. Preserve every warranted distinct obligation; do not cap issue count arbitrarily.

The durable work system owns unresolved obligation, not final truth. When work resolves, reconcile accepted durable meaning into its natural living owner and close/retire the temporary obligation artifact.

Respect information sensitivity and destination visibility. Evidence does not become safer to publish merely because an issue tracker is convenient.

## Development evidence is temporary by default

Use temporary proof freely when it is the cheapest way to learn:

- reproductions;
- diagnostic tests;
- fixtures/scripts;
- logs/instrumentation;
- screenshots/browser checks;
- benchmarks;
- source/topology comparisons.

Delete it when the question is answered unless it protects a durable guarantee worth carrying.

## Durable guarantees deserve durable protection

Examples include:

- authorization/privacy/security boundaries;
- destructive-data safety;
- identity/ownership invariants;
- serialization/file-format compatibility;
- idempotency/concurrency;
- billing/entitlement correctness;
- migration guarantees;
- published APIs/protocols.

Protect the stable behavior at the cheapest reliable boundary. Do not freeze incidental implementation shape.

## Evidence classes

Use whichever class resolves the uncertainty; the taxonomy is descriptive, not workflow:

- **Probe** — temporary evidence created to learn.
- **Contract / guardrail** — durable automated protection for a stable guarantee.
- **Acceptance evidence** — proof at the real user/provider/product boundary.

Mocks can establish internal logic. They cannot prove external reality.

## Degraded evidence and documentation

When a repository has no good evidence, create the smallest temporary probe needed to distinguish plausible stories.

When documentation is absent, do not manufacture documentation merely to create evidence.

When documentation conflicts:

- identify explicit ownership/currentness;
- compare against source/runtime/provider state;
- determine whether code is a regression, docs are stale, or authority is genuinely unresolved;
- keep unresolved claims unknown until stronger evidence or human intent decides them.

For many documents, build only a temporary authority map needed for the active objective. Do not maintain everything by default.

Documentation earns permanence under the same rule as tests: it must carry durable meaning that cannot be cheaply/reliably derived elsewhere.

## Proof follows uncertainty

Choose proof that targets the real remaining uncertainty:

- source/static/type/schema checks;
- deterministic tests;
- runtime/provider reads;
- browser/device journeys;
- artifact inspection;
- realistic-scale performance;
- operational telemetry;
- human physical/taste acceptance where inherently necessary.

Do not silently escalate proof merely because another check exists.

## Permanence judgment

Before adding or retaining permanent evidence, ask:

1. What durable guarantee and meaningful harm does this protect?
2. What is the cheapest stable mechanism/boundary that can prove or enforce it?
3. Is that guarantee already protected elsewhere?

If the answers are weak, keep evidence temporary.

## Use the Founder-to-Feature crystal

When a Crystallized referent exists, derive proof from **acceptance meaning**, not from incidental code structure.

A crystal is working semantic context; it does not need a permanent crystal artifact.

## Bugs and regressions

For a failure:

- preserved accepted behavior failed → likely regression;
- behavior intentionally changed/retired → old evidence may be obsolete;
- test only freezes implementation → reconsider permanence;
- intended meaning unclear → return to Founder-to-Feature;
- harness/environment broken → repair/isolate proof infrastructure.

Do not bend accepted behavior around an obsolete test just to make CI green.

## Consolidation and deletion

Delete or consolidate:

- duplicate proof;
- stale source-text/import assertions without compatibility reason;
- snapshots freezing incidental structure;
- obsolete behavior;
- one-time migration probes after stronger protection exists;
- redundant regressions subsumed by guardrails;
- abandoned fixtures/helpers/docs that no longer own unique durable meaning.

Evidence is institutional memory only when it protects something worth remembering.

## Performance and external reality

Measure performance at realistic scale and boundary when it matters. Prove provider/auth/deployment behavior against the real provider when practical.

Do not claim production or external truth from local mocks.

## Evidence debt

Evidence debt exists when important accepted guarantees have no reliable proof, proof is so brittle it blocks safe change, or competing evidence prevents trustworthy decisions.

Prioritize evidence debt by consequence, not coverage percentage.

## Completion

Evidence work is complete when the objective-level claim has enough justified proof, material contradictions/unknowns are explicit, and temporary evidence has been removed or deliberately promoted.

Green CI alone is not product acceptance.

## Communication style

Keep Evidence Stewardship mostly invisible. Surface only material uncertainty, proof boundaries, contradictions, or permanence decisions.

## Anti-patterns

Do not:

- add tests for coverage theater;
- require TDD universally;
- add a permanent regression for every bug;
- treat tests or docs as unquestionable authority;
- claim external reality from mocks;
- keep probes forever;
- create testing/evidence ledgers by default;
- automate unstable taste judgments merely for objectivity;
- generate documentation because documentation is missing.

## Governing maxim

> **Move from uncertainty to justified confidence at the real claim boundary, then keep only the evidence worth carrying forward.**

