# Root Cause Analysis

## Status

No unresolved causal defect. Release-review attempt 1 corrections pass integrated verification; candidate-bound R2 review remains the acceptance gate.

## Reproduction

Run `node docs/specs/v12-ide-run-loop/evidence/architecture/run-specialist-compiler.mjs approve` against the rendered Revision-1 architecture package.

## Stable Evidence

The command stopped before approval with a `TypeError` at `specialistPackage.compilation.contentDigest`. The exact preserved envelope has root keys `compilationDigest`, `packageDigest`, `manifest`, and `files`.

## Competing Hypotheses

- Rendering omitted compilation data.
- JSON serialization removed a nested field.
- The host assumed the wrong public envelope shape.

## Confirmed Root Cause

The dogfood host used an unverified nested field path instead of the public root `RenderedSpecialistPackage.compilationDigest` field.

## Fix

Read the root digest pair, assert both values are strings, then bind approval and package verification to those exact values.

## Regression Coverage

The corrected approval command must write the exact expected pair and pass `verifySpecialistPackage`. Later V12 host examples must test envelope-shape access through public types rather than untyped JSON assumptions.

## Durable Learning

Host scripts must validate deserialized public-envelope roots before constructing approval expectations. Digest integrity cannot repair a caller that reads the wrong field.

## Memory Update

Keep the finding in this feature package until the V12 host protocol and tests demonstrate the durable prevention pattern.

## Foundation Host Edit Failure

### Reproduction

Run the exact Foundation Revision-1 specialist in the temporary Git worktree and attempt an approved scoped edit.

### Stable Evidence

The specialist authenticated every source, attempted four native or wrapper `apply_patch` routes, and changed no target file. The verified non-`pass` handoff is preserved under `evidence/implementation/foundation/handoffs/`.

### Competing Hypotheses

- The generated contract omitted write authority.
- The repository files were read-only.
- The temporary worktree was outside the host's native patch workspace.

### Confirmed Root Cause

The contract correctly declared the six-file write scope, but the host's native patch helper cannot initialize against the temporary worktree. Main-agent dogfood had already required bounded escalated writes in the same location. The failure is host capability supply, not package identity, source authentication, product ambiguity, or implementation logic.

### Fix

Retire the blocked session and compile a new GoalContract revision. Preserve the same product, source, and file authority while explicitly declaring `powershell` process demand and allowing exact precondition-hash-guarded writes only after native `apply_patch` fails before mutation.

### Regression Coverage

Revision 2 must authenticate the same sources, remain within the same six-file ceiling, record every fallback precondition and resulting verification, and return a fresh package-bound handoff. Any write outside scope or unguarded replacement remains a hard stop.

### Durable Learning

Portable agent contracts must distinguish semantic write authority from host editing capability. A host-specific fallback can materialize the same authority, but it must be explicit, bounded, revisioned, and auditable rather than silently improvised.

## Release Review Attempt 1

### Reproduction

Run the exact product/API/IDE, lifecycle/correctness, and security/trace/authority reviewers over candidate `d914b273ba619e3cfa42206c8d9f136be73075e3` after the full 385-test canonical gate passes.

### Stable Evidence

The complete three-agent package-bound roster returned `fix`. Raw source evidence and verifier output are preserved under `evidence/release-review/`; no reviewer edited production or repaired a finding.

### Confirmed Root Causes

- Correlated criterion and requirement fixture IDs hid that inspection sorted by criterion before the unique V11 requirement identity.
- The run validator copied the repository's schema-loading pattern without reconciling V12's stronger no-filesystem-effect contract.
- Boundary coverage proved individual inputs but never constructed the normative maximum aggregate; green tests therefore overstated resource-proof completeness.
- The synthetic dogfood fixture was treated as both API regression coverage and implementation dogfood, even though AC8 requires an actual implementation package and measured friction.
- Release review was added after the candidate freeze without first separating immutable reviewer inputs from mutable closeout outputs or preserving primary raw gate evidence.

### Smallest Causal Corrections

- Sort evidence by `requirementId` first and add counterordered IDs.
- Bundle immutable schema data into the module and prove all four operations survive with filesystem reads disabled.
- Build the real 16-agent aggregate fixture, then either prove every exact limit or revise unreachable limits through the reviewed contract.
- Run V12 over the exact correction package and its exact raw handoffs; preserve sessions, inspections, integration snapshot, and all AC8 metrics.
- Snapshot mutable review input and bind raw V12 handoffs, Audit-B approval bytes, and a candidate-bound canonical-gate log/receipt into the next review package.

### Regression Gate

The replacement candidate must pass focused causal tests, the complete canonical gate, deterministic implementation-package dogfood, exact source and handoff verification, and a fresh three-domain release review. Attempt-1 identities cannot authorize the replacement.

## Correction Confirmation

The correction chain preserved each non-success route instead of repeatedly patching: revision 1 exposed stale scope, revisions 2 and 3 returned `split` with progressively narrower cold-read evidence, revision 4 closed the composed filesystem-read chain, and revision 5 rebound real dogfood and primary release evidence. Both revision-5 handoffs verify `pass`, the integrated suite passes 388 of 388 tests, and V11 revision 33 independently re-authenticates the final bound sources. The remaining uncertainty is deliberately externalized to the candidate-bound canonical receipt and three independent R2 reviewers.
