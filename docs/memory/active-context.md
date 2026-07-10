# Active Context

## Current Focus

V9 intake from the stable V8/V8.1 `main` baseline.

## Current Stage

The approved V8/V8.1 baseline was fast-forwarded into `main` at `fa2a73d`, pushed, and verified by main CI run 29069685873. No license selection was provided, so the repository remains unlicensed.

## Important Current Constraints

- TraceRail is currently a checked, file-based operating protocol, not an executable agent runtime.
- The README overview represents the target operating model.
- Canonical workflow outcomes are pass, fix, diagnose, clarify, redesign, split, block, and learn.
- Governance states such as watch, deferred, and rejected belong in output artifacts.
- Module and rail contracts are dynamically discovered and checker-enforced.
- Public reuse remains legally unclear until the owner selects a license.
- Main is the stable V8/V8.1 baseline for V9 dogfooding.

## Recently Learned

- Two of four write-enabled worker attempts completed; disjoint scopes prevented conflicts.
- A clean worker failure and a timed-out retry both required centralized recovery.
- File contracts alone cannot enforce heartbeat, deadline, cancellation, retry, or liveness.
- Positive validation needs permanent malformed-artifact fixtures.
- Every distinct parser path needs a dedicated negative fixture; green adjacent tests are not proof.
- Generated-script recovery should use baseline restoration plus literal boundary-checked replay.
- Expected child-process failures must bypass PowerShell-edition native-command semantics; use direct process exit-code capture.
- Durable decisions and named patterns need source provenance.
- Public documentation must distinguish current capabilities from the target model.

## Next Likely Work

- Create the V9 version branch from verified `main`.
- Start V9 from updated main.
- Define V9 architecture for TypeScript or another owner-approved implementation language, schemas, initializer, validator, event trace, and runtime liveness controls.
