# Active Context

## Current Focus

V8.2 SWECircuit identity baseline merge and V9 synchronization.

## Current Stage

The GitHub repository is `GarrettAudet/SWECircuit`. The approved identity slice is isolated on `codex/swecircuit-identity-main` from verified V8.1 `main`; local validation is green and branch CI, fast-forward merge, final main CI, and V9 synchronization remain. The repository remains unlicensed.

## Important Current Constraints

- SWECircuit is currently a checked, file-based operating protocol, not an executable agent runtime.
- Circuit is the public composition term; `docs/rails/`, rail-named templates, `tracepack-*`, `.tracerail/`, and `tracerail-*` assets remain 0.x compatibility identifiers.
- Historical TraceRail and DevRail artifacts remain source provenance and should not be mechanically rewritten.
- The primary README overview PNG still contains the historical TraceRail label and must be replaced before V9 is merge-ready.
- Canonical workflow outcomes are pass, fix, diagnose, clarify, redesign, split, block, and learn.
- Governance states such as watch, deferred, and rejected belong in output artifacts.
- Module and circuit contracts under the 0.x rail path are dynamically discovered and checker-enforced.
- No package, domain, CLI, schema, or local-state namespace acquisition is part of the repository rename.
- Public reuse remains legally unclear until the owner selects a license.
- Unfinished V9 architecture and runtime work must remain isolated from the V8.2 main-targeted identity branch.

## Recently Learned

- A repository identity change inside an unfinished version should be extracted into a bounded baseline release rather than forcing premature merge.
- Namespace work should match real interfaces; a GitHub rename does not imply package or domain acquisition.
- Current identity and historical provenance require separate validation scopes.
- Two permanent regressions now reject a legacy README heading and retired GitHub URL.
- Two of four V8.1 write-enabled worker attempts completed; disjoint scopes prevented conflicts but file contracts did not enforce liveness.
- Positive validation needs permanent malformed-artifact fixtures for every distinct parser and resolver path.

## Next Likely Work

- Push V8.2, verify branch CI, fast-forward `main`, and verify final main CI.
- Synchronize the merged V8.2 baseline into `codex/v9-devrail-kernel`.
- Replace the primary overview visual, accept or revise ADR 0001, and implement the smallest executable-kernel slices.
