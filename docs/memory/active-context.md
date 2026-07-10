# Active Context

## Current Focus

TraceRail V8.1 baseline integrity on branch codex/v8.1-baseline-integrity.

## Current Stage

V8.1 passed local implementation, integration, verification, and review. The branch is stacked on the unmerged V8 README work; merge requires green branch CI, user approval, and a license decision or explicit deferral.

## Important Current Constraints

- TraceRail is currently a checked, file-based operating protocol, not an executable agent runtime.
- The README overview represents the target operating model.
- Canonical workflow outcomes are pass, fix, diagnose, clarify, redesign, split, block, and learn.
- Governance states such as watch, deferred, and rejected belong in output artifacts.
- Module and rail contracts are dynamically discovered and checker-enforced.
- Public reuse remains legally unclear until the owner selects a license.
- Main remains the stable V7 baseline until stacked V8 and V8.1 approval.

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

- Push V8.1 and confirm CI.
- Obtain user approval and a license decision or explicit deferral.
- Merge stacked V8 and V8.1 only after approval.
- Start V9 from updated main.
- Define V9 architecture for TypeScript or another owner-approved implementation language, schemas, initializer, validator, event trace, and runtime liveness controls.
