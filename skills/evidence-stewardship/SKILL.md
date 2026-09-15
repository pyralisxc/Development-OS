---
name: evidence-stewardship
description: Automatically use during software/product development whenever tests, CI, bug reproduction, regressions, mocks, browser/device acceptance, provider proof, performance checks, verification, or evidence permanence are involved. Choose the cheapest trustworthy proof, preserve durable guarantees rather than historical tests, and keep temporary development evidence temporary without requiring the user to invoke this skill.
---

# Evidence Stewardship

## Purpose

Evidence Stewardship owns **proof**:

> **What evidence actually establishes the accepted truth, and what evidence deserves permanence?**

It is cross-cutting and automatic whenever proof enters development work.

It is **not** a separate testing phase, coverage doctrine, sequential gate, or mandatory artifact.

The user should never need to say “use Evidence Stewardship.”

> **Minimum durable evidence for maximum durable confidence.**

## Ownership boundaries

- **Founder-to-Feature** defines product meaning, behavioral deltas, and Crystallized acceptance meaning.
- **Specialist Reasoning** may identify professional obligations that require proof but does not choose evidence permanence.
- **Evidence Stewardship** defines proof strategy and evidence permanence.
- **Lean Repository Execution** owns verification cadence and execution mechanics.
- **Development OS** routes automatically.

Project-local verification rules override generic guidance.

## Evidence is not authority

Tests and verification are evidence about accepted truth.

They do not define product truth merely because they already exist.

When implementation and evidence disagree, classify the disagreement:

- **Preserved behavior failed** → likely regression.
- **Behavior intentionally changed or retired** → obsolete evidence.
- **Evidence protects implementation shape** → it may never have deserved permanence.
- **Product meaning is unresolved** → return to Founder-to-Feature.
- **Harness/environment is broken** → repair or isolate proof infrastructure rather than product code.

Do not bend newly accepted product behavior around obsolete tests just to restore green CI.

Do not delete evidence merely because it is inconvenient.

> **Preserve guarantees, not historical tests.**

## Development evidence is temporary by default

Evidence created to learn something does not automatically deserve permanent residence.

Temporary examples include:
- bug reproductions;
- diagnostic tests;
- fixtures;
- scripts;
- assertions;
- screenshots;
- logs;
- benchmarks;
- source readers;
- temporary topology/graph comparisons;
- exploratory browser checks;
- instrumentation.

Use temporary proof freely when it is the cheapest way to learn.

Delete it when the question is answered unless it earns permanence.

## Durable guarantees deserve durable protection

Some truths should defend themselves across future rewrites and fresh agents.

Examples:
- authorization/privacy boundaries;
- destructive-data safety;
- identity/ownership invariants;
- serialization/file-format compatibility;
- required idempotency/concurrency;
- billing/entitlement correctness;
- migration guarantees;
- published APIs/protocols;
- core user-visible behavior intended to survive implementation changes.

Durable protection does **not** automatically mean a permanent test.

Possible mechanisms include:
- behavioral contract tests;
- type/schema constraints;
- database constraints;
- architecture/security guardrails;
- runtime assertions;
- provider/configuration checks;
- monitoring/telemetry;
- generated consistency checks.

Choose the cheapest trustworthy mechanism at the strongest stable boundary.

## Proof follows uncertainty

Ask:

> **Where does the uncertainty actually live?**

Then prove it there.

- Local deterministic policy → local deterministic proof.
- Browser interaction/rendering → browser/device proof.
- Provider semantics → provider-backed acceptance where safe.
- Production configuration → real configuration/health evidence.
- Scale/performance → representative workload/telemetry.
- Architecture boundary → architecture/static guardrail.
- Human visual/ergonomic judgment → physical acceptance, not brittle snapshots by default.

Never claim provider/production reality from a mock.

## Four evidence classes

Use these mentally. Do not create taxonomy files.

### Probe

Temporary evidence used to answer a development question.

Default:

> **Create freely. Delete when the question is answered.**

Promote only if it reveals a durable guarantee not already protected.

### Contract

Durable protection for externally meaningful behavior.

Examples:
- Copy creates independent identity.
- Failed destructive movement preserves recoverable source work.
- Unauthorized access fails closed.
- A portable document round-trips without losing authored information.
- Stale writes cannot silently replace accepted newer state.

Default:

> **Keep while the accepted contract remains true. Replace or remove when the contract changes.**

### Guardrail

Generic protection against a class of mistakes.

Examples:
- dependency boundaries;
- migration immutability;
- secret exposure;
- schema compatibility;
- public/private module rules;
- generated consistency checks owned by the project.

Default:

> **Consolidate toward the strongest general rule.**

Retire narrow regressions fully subsumed by stronger guardrails.

### Acceptance evidence

Proof in the environment where uncertainty exists.

Examples:
- physical browser/device interaction;
- visual usability;
- real auth/provider behavior;
- staging/production configuration;
- artifact/download inspection;
- realistic-scale performance;
- telemetry/operational observation.

Default:

> **Capture enough evidence for the decision. Automate permanently only when value and stability justify carrying cost.**

## Permanence judgment

Before adding or retaining permanent evidence, answer three questions in working reasoning:

1. **What durable guarantee and meaningful harm does this protect?**
2. **What is the cheapest stable mechanism or boundary that can prove or enforce it?**
3. **Is it already protected, and is this evidence worth carrying forward?**

If those answers are weak, keep the evidence temporary.

## Use the Founder-to-Feature crystal

When a Crystallized feature exists, derive proof from it:

- **Changes** — what new behavior needs evidence?
- **Preserved** — what important existing truths must not regress?
- **Retired** — which old tests/proof may now be obsolete?
- **Product shape** — what needs physical/browser/device acceptance?
- **System shape** — what technical boundaries deserve contract/guardrail protection?
- **Lifecycle** — what scale/migration/recovery/compatibility evidence matters?
- **Ecosystem choice** — what provider/native boundary must be proven in reality?
- **Acceptance meaning** — what observable outcome establishes success?

Do not invent additional product requirements while designing proof.

## No universal testing chronology

Valid patterns include:

### Contract-first
Protect a known high-consequence invariant, then implement.

### Discover-then-promote
Experiment freely, learn desired behavior, then promote only the durable guarantee.

### Probe-fix-delete
Create a reproduction, fix the canonical owner, verify accepted behavior, then delete the probe when permanence is not justified.

### Physical acceptance
Use real browser/device/provider/output evidence when uncertainty is inherently physical, visual, operational, or external.

The proof method serves the truth.

## Bugs and regressions

For a bug:

1. reproduce at the smallest useful boundary;
2. identify the violated accepted guarantee;
3. let Lean fix the canonical owner;
4. decide whether recurrence deserves durable protection.

Do **not** automatically add one permanent regression per bug.

Permanent regression proof is justified when:
- recurrence is plausible;
- consequence is meaningful;
- no broader contract/guardrail protects it;
- proof can live at a stable boundary.

Avoid or retire narrow regressions when they protect:
- historical implementation details;
- one-time cutovers;
- retired behavior;
- guarantees already subsumed by stronger protection.

## Creativity and maintainability

Good durable evidence creates a wide implementation space bounded by important truths.

Prefer:
- “unauthorized access fails closed” over import/helper assertions;
- “document round-trips without data loss” over private serialization shape;
- “return restores prior user context” over exact component hierarchy.

Do not freeze code shape because it is easy to assert.

Tests are compressed institutional memory.

Store only things worth remembering.

## Consolidation and deletion

Agents are allowed to delete tests and verification infrastructure when no accepted guarantee is lost.

Look for:
- duplicate proof;
- source-text/import-path assertions without compatibility reason;
- snapshots freezing incidental structure;
- obsolete feature behavior;
- one-time migration/cutover tests already covered generically;
- regressions subsumed by guardrails;
- retired fixtures/helpers;
- test-only abstractions with excessive carrying cost.

Keep the strongest stable protection and remove weaker duplicates.

Do not use test count or coverage percentage alone as quality metrics.

## Performance evidence

Performance proof should answer a concrete user/system question.

Prefer:
- representative scale;
- meaningful thresholds;
- before/after bottleneck evidence;
- production telemetry when appropriate.

Temporary diagnostic benchmarks may be deleted unless the threshold itself is a durable guarantee.

## Project intelligence and generated proof

If the project provides product-reality graphs, topology diffs, architecture maps, generated projections, or other machine-readable project intelligence:

- use them according to project-local rules;
- treat temporary development comparisons as Probes unless the project declares a durable guardrail;
- do not assume generated projections are product authority;
- use final project-required maps/graphs/checks when they genuinely prove release/merge invariants.

Global Evidence Stewardship does not mandate any specific graph or heat-map system.

## Evidence debt

Evidence becomes debt when:
- harmless refactors require large test rewrites;
- agents repeatedly repair tests rather than reasoning about accepted behavior;
- CI is dominated by historical low-value cases;
- fixtures model retired behavior;
- internal source shape is over-asserted;
- many tests prove the same guarantee;
- mocks make external behavior look more proven than it is.

Clean affected evidence debt when safe and bounded.

Do not launch unrelated repository-wide cleanup unless requested.

## Completion

Before evidence-related work is considered complete:

- remove temporary probes unless they earned permanence;
- consolidate durable protection;
- retire proof for intentionally retired behavior;
- distinguish automated proof from physical/provider acceptance;
- state what important behavior was actually proven and what remains unproven.

Do not report “all tests pass” as equivalent to “the product is correct.”

## Communication style

Keep Evidence Stewardship mostly invisible.

Do not make the user manage test taxonomy.

Surface a decision only when:
- preserving old evidence would constrain accepted product change;
- deleting evidence could remove an important guarantee;
- live/provider/destructive proof has meaningful cost or requires approval;
- product meaning is unresolved;
- proof strategies have materially different risk/carrying cost.

## Anti-patterns

Do not:
- add tests merely to increase coverage;
- require TDD for every change;
- add one permanent regression for every bug;
- equate green CI with product correctness;
- treat historical tests as unquestionable authority;
- delete hard tests without identifying their protected guarantee;
- use implementation snapshots where stable behavior can be proven;
- preserve temporary probes forever;
- claim external reality from mocks;
- add a new verification framework when current tools suffice;
- create evidence ledgers/testing diaries by default;
- make Evidence Stewardship a new mandatory phase.

## Governing maxim

> **Preserve guarantees, not tests. Prove reality at the boundary where it exists. Keep only the evidence worth carrying forward.**
