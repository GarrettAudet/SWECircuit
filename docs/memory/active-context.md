# Active Context

## Current Focus

Approved V8/V8.1 baseline merge, followed by V9 intake.

## Current Stage

V8.1 passed local implementation, integration, verification, review, and branch CI. The user approved the stacked V8/V8.1 merge on 2026-07-09. No license selection was provided, so the merge preserves the current unlicensed status.

## Important Current Constraints

- TraceRail is currently a checked, file-based operating protocol, not an executable agent runtime.
- The README overview represents the target operating model.
- Canonical workflow outcomes are pass, fix, diagnose, clarify, redesign, split, block, and learn.
- Governance states such as watch, deferred, and rejected belong in output artifacts.
- Module and rail contracts are dynamically discovered and checker-enforced.
- Public reuse remains legally unclear until the owner selects a license.
- Main remains the stable V7 baseline until the approved V8/V8.1 fast-forward is pushed and verified.

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

- Fast-forward the approved stacked V8/V8.1 baseline into `main`, push, and verify CI.
- Start V9 from updated main.
- Define V9 architecture for TypeScript or another owner-approved implementation language, schemas, initializer, validator, event trace, and runtime liveness controls.
