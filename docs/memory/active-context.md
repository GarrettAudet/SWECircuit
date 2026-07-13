# Active Context

## Current Focus

Continue the V9 executable kernel from the synchronized V8.2 SWECircuit baseline.

## Current Stage

V8.2 is complete on `main` at `5caaa29`; branch CI run `29264529026`, release CI run `29264704320`, and closeout CI run `29264903672` passed. The GitHub repository, origin, About description, README, canonical docs, workflow labels, and checker use SWECircuit. V9 has adopted that stable baseline on `codex/v9-devrail-kernel`; its executable-kernel architecture remains proposed. The repository remains unlicensed.

## Important Current Constraints

- SWECircuit is currently a checked, file-based operating protocol, not an executable agent runtime.
- DevRail is rejected for public use after the owner reopened naming.
- Circuit is the public composition term; `docs/rails/`, rail-named templates, `tracepack-*`, `.tracerail/`, and `tracerail-*` assets remain 0.x compatibility identifiers.
- Historical TraceRail and DevRail artifacts remain source provenance and should not be mechanically rewritten.
- The README overview represents the target operating model.
- The primary README overview PNG still contains the historical TraceRail label and must be replaced before V9 is merge-ready.
- Canonical workflow outcomes are pass, fix, diagnose, clarify, redesign, split, block, and learn.
- Governance states such as watch, deferred, and rejected belong in output artifacts.
- Module and circuit contracts under the 0.x rail path are dynamically discovered and checker-enforced.
- No runtime, manifest, schema, package, or adapter API is frozen before the V9 research and architecture gate.
- No package, domain, CLI, schema, or local-state namespace acquisition is part of the repository rename.
- Public reuse remains legally unclear until the owner selects a license.
- Main remains the stable V8.2 baseline while V9 is isolated on its version branch.

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
- SWECircuit maps modules, routes, gates, branches, feedback loops, and execution traces into one composition metaphor without an exact package or repository collision in the scan.
- A repository identity change inside an unfinished version should be extracted into a bounded baseline release rather than forcing premature merge.
- Namespace work should match real interfaces; a GitHub rename does not imply package or domain acquisition.
- Current identity and historical provenance require separate validation scopes.
- Two permanent regressions reject a legacy README heading and retired GitHub URL.

## Next Likely Work

- Replace the primary overview visual with SWECircuit branding.
- Preserve the recorded 0.x Rail Composition compatibility boundary while making Circuit the public composition term.
- Accept or revise ADR 0001 covering the runtime, canonical manifest, schema dialect, compatibility policy, trace persistence, privacy boundary, and adapter interfaces.
- Implement the smallest initializer, validator, and trace-inspection slices only after that architecture gate passes.
