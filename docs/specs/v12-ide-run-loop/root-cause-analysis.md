# Root Cause Analysis

## Status

Active for the first V12 dogfood host-integration failure.

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