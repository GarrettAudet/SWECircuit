# Revision 65 Correction Contract

## Goal

Restore exact-candidate release verification by preserving Windows dependency-install path
headroom through the nested copied lifecycle.

## Scope

- `scripts/run-v12-release-gate.mjs`
- `test/helpers/v12-release-review-lifecycle.mjs`
- `test/v12-release-gate.test.mjs`
- Revision 65 release evidence and live routing status

## Invariants

- Revision 64 is permanently retired and its one-shot canonical gate remains unused.
- Candidate source, dependency lock, offline cache policy, private runtime, Git authority,
  cleanup, and one-shot semantics do not change.
- The correction changes only the internal scratch namespace and its authenticated identity.
- The nested Windows candidate path retains legacy-path headroom for a lock-supplied TypeScript
  leaf that crossed 260 characters under Revision 64.
- Product runtime, public APIs, schemas, compiler behavior, and IDE host boundaries do not change.

## Completion Evidence

- Exact R64 hosted success and rehearsal failure are preserved.
- A source-preserving diagnostic replay confirms the copied canonical-gate timeout.
- A bounded counterfactual shows the exact locked offline install completes at a short path.
- The focused regression proves the corrected nested leaf is below 260 characters on Windows.
- One exact Revision 65 candidate passes copied lifecycle, full verification, non-consuming
  rehearsal, all seven hosted jobs, the one-shot canonical gate, and fresh three-domain R2.

## Route

`verify -> diagnose -> fix -> Revision 65`
