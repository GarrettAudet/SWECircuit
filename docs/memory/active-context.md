# Active Context

## Current Focus

V9 executable-kernel architecture and public-identity clarification on codex/v9-devrail-kernel.

## Current Stage

V8/V8.1 is complete on synchronized main at 9f2b68d. V9 intake artifacts are active; the next gate is primary-source research followed by an architecture decision for the first executable public contracts. No license selection was provided, so the repository remains unlicensed.

## Important Current Constraints

- TraceRail is currently a checked, file-based operating protocol, not an executable agent runtime.
- DevRail is the user-directed target identity for V9.
- Historical TraceRail artifacts remain source provenance and should not be mechanically rewritten.
- The README overview represents the target operating model.
- Canonical workflow outcomes are pass, fix, diagnose, clarify, redesign, split, block, and learn.
- Governance states such as watch, deferred, and rejected belong in output artifacts.
- Module and rail contracts are dynamically discovered and checker-enforced.
- No runtime, manifest, schema, package, or adapter API is frozen before the V9 research and architecture gate.
- DevRail is already active in an adjacent AI-agent development standards product, and the unscoped npm package is occupied; public identity now requires explicit owner clarification.
- Public reuse remains legally unclear until the owner selects a license.
- Main remains the stable V8/V8.1 baseline while V9 is isolated on its version branch.

## Recently Learned

- Two of four V8.1 write-enabled worker attempts completed; disjoint scopes prevented conflicts.
- A clean worker failure and a timed-out retry both required centralized recovery.
- File contracts alone cannot enforce heartbeat, deadline, cancellation, retry, or liveness.
- Positive validation needs permanent malformed-artifact fixtures.
- Every distinct parser path needs a dedicated negative fixture; green adjacent tests are not proof.
- Generated-script recovery should use baseline restoration plus literal boundary-checked replay.
- Expected child-process failures must bypass PowerShell-edition native-command semantics; use direct process exit-code capture.
- Durable decisions and named patterns need source provenance.
- Public documentation must distinguish current capabilities from the target model.
- The known Windows patch-helper sandbox refresh failure recurred at V9 intake; bounded direct-write recovery still requires independent diff and checker evidence.

## Next Likely Work

- Review the completed V9 primary-source architecture scan and proposed ADR.
- Decide the runtime, canonical manifest, schema dialect, compatibility policy, trace persistence, privacy boundary, and adapter interfaces in an ADR.
- Implement the smallest initializer, validator, and trace-inspection slices only after that architecture gate passes.