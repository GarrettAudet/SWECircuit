# Active Context

## Current Focus

Synchronize the completed V8.2 SWECircuit identity baseline into V9 and continue the executable kernel.

## Current Stage

V8.2 is complete on `main`. The GitHub repository, origin, About description, README, canonical docs, workflow labels, and checker use SWECircuit; branch CI run `29264529026` and main CI run `29264704320` passed on release commit `7a08c37`. The V9 branch remains isolated and must now adopt this stable baseline. The repository remains unlicensed.

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

## Recently Learned

- A repository identity change inside an unfinished version should be extracted into a bounded baseline release rather than forcing premature merge.
- Namespace work should match real interfaces; a GitHub rename does not imply package or domain acquisition.
- Current identity and historical provenance require separate validation scopes.
- Two permanent regressions reject a legacy README heading and retired GitHub URL.
- File contracts still cannot enforce worker heartbeat, deadline, cancellation, retry, or recovery.
- Every distinct parser and resolver path needs a dedicated malformed-artifact fixture.

## Next Likely Work

- Merge the V8.2 `main` baseline into `codex/v9-devrail-kernel` and resolve only source-preserving overlap.
- Replace the primary overview visual with SWECircuit branding.
- Accept or revise ADR 0001, then implement versioned schemas, validator, initializer, and trace inspection.
