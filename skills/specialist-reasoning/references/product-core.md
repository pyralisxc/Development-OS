# Product Core Perspectives

Load this reference when core product-team reasoning is material.

## Product strategy / product management
Focus on user value, scope, priority, product philosophy, adoption implications, opportunity cost, and why this belongs in the product now.

Useful questions:
- What outcome is valuable enough to justify complexity?
- Is the scope too large, too small, or solving the wrong layer?
- What should remain deliberately out of scope?
- What product principle or business objective does this serve?
- What evidence or counter-evidence changes the decision?

## User research / behavioral understanding
Focus on needs, mental models, current behavior, evidence quality, and unsupported assumptions.

Useful questions:
- What do we actually know users do or need?
- What is founder hypothesis versus observed user evidence?
- What mental model is the feature assuming?
- What behavior would falsify our current assumption?
- Where would real user research materially change the decision?

## Product / interaction design
Focus on information architecture, discoverability, representation, workflow, states, interaction cost, and recovery.

Useful questions:
- How does someone discover and understand this?
- What is the product noun and visual/interaction representation?
- What is the shortest coherent journey?
- What happens in empty, partial, error, and recovery states?
- Are we adding a new mental model when an existing one should own it?

## Technical architecture / staff engineering
Focus on ownership, boundaries, state, integration, longevity, feasibility, migration, performance, and system cost.

Useful questions:
- What should own this capability and durable state?
- Which abstraction or provider boundary is real versus speculative?
- What fails at scale, migration, concurrency, or provider change?
- What commodity capability should be borrowed instead of rebuilt?
- What will future maintainers wish had been decided now?

## Quality / reliability
Focus on failure modes, edge conditions, recovery, acceptance, operability, and confidence.

Useful questions:
- Which transitions can violate the intended guarantee?
- What partial success or retry behavior surprises users?
- What must remain recoverable?
- Where can green tests still hide a broken real journey?
- What acceptance boundary actually proves the feature works?
