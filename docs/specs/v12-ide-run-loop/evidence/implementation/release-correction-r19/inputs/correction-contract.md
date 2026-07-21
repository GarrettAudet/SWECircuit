# Revision 19 Closed Reconstruction Trust Contract

## Objective

Replace Revision 18's live prior-phase seeding with a closed parent pipeline that reconstructs every required phase from the exact candidate, authenticates every external byte input, rejects undeclared private-tree state before execution, and makes incomplete promotion unusable as release evidence.

## Confirmed Causes

Revision 18 passed its approved specialist package but independent security and architecture review returned `REVISE`:

- npm or TypeScript could add or mutate candidate-tree state before the first child without a closed pre-execution inventory check.
- Later phases trusted broad live run-root seeds, allowing self-consistent package or prior-phase substitution.
- Promotion followed insufficiently authenticated paths and could leave unreceipted partial evidence that later phases consumed.
- Root disjointness and bare-package confinement were lexical or incomplete.
- The repository parent described more trust than it could independently establish about itself, cache provisioning, environment, and executable supply.
- Several critical guarantees were source-text assertions instead of behavioral tests.

## Required Architecture

### 1. Cumulative private reconstruction

Do not seed any prior candidate run-root output. For each invocation, materialize and prepare a fresh exact candidate, then run the required phase prefix with a fresh child process per phase:

```txt
prepare -> prepare
compile -> prepare | compile
approve -> prepare | compile | approve
verify  -> prepare | compile | approve | verify
paths   -> paths
```

The same candidate-private root may carry outputs between children inside one parent invocation. No later invocation may consume the live package, compilation summary, approval, runtime binding, snapshots, or prior parent receipt as semantic input.

`approve` and `verify` require the owner-reviewed `compilationDigest` and `packageDigest` as explicit host inputs. The reconstructed compilation, package envelope, and every materialized package file must match that pair exactly before approval or handoff verification.

### 2. Explicit external inputs

The parent requires, records, and validates:

- An explicit absolute offline npm cache path from `SWECIRCUIT_RELEASE_REVIEW_NPM_CACHE`; no repository default.
- An externally computed expected parent digest from `SWECIRCUIT_RELEASE_REVIEW_PARENT_DIGEST`; it must match the candidate parent blob and live bytes. This is evidence of the host's declared pin, not self-authentication against a malicious parent.
- An exact canonical-gate receipt digest for `prepare`, `compile`, `approve`, and `verify`.
- An exact raw digest alongside every handoff path for `verify`.
- Exact owner-reviewed compilation and package digests for `approve` and `verify`.

Only the three candidate-addressed canonical-gate files and explicitly named raw handoffs may enter from live post-commit evidence. Bind all such bytes into the invocation digest and parent receipt.

### 3. Closed pre-execution state

Inspect and compare candidate source immediately after materialization, after npm install, after TypeScript build, immediately before every child spawn, and after every child exit.

At every boundary:

- Every committed candidate file must retain exact bytes, mode identity, and realpath containment.
- No undeclared file, directory, link, reparse point, hardlink, or alternate path may exist outside the exact candidate source, exact external inputs, private `node_modules`, generated `dist`, runtime binding, and phase outputs already produced by the current invocation.
- Installed supply, generated runtime, runtime binding, external inputs, tool entrypoints, and accumulated phase outputs must retain exact closure identities.
- A phase may add only its declared output set.

### 4. Realpath and resolver confinement

- Resolve the repository, operation root, candidate root, cache, and output destinations to authenticated realpaths before use.
- Require the operation and candidate roots to be realpath-disjoint from repository ancestry.
- Reject a `node_modules` directory in every candidate-root ancestor through the filesystem root, preventing ordinary Node ancestor fallback.
- Keep `NODE_PATH` and `NODE_OPTIONS` absent and confirm every declared production dependency resolves beneath candidate-private `node_modules`.
- Treat hostile same-user races, compromised operating systems, and compromised executables as external-host risks.

### 5. Receipt-last promotion

Preflight the complete promotion set before writing any output:

- Walk every existing ancestor with `lstat` and `realpath`; reject links, junctions, reparse aliases, non-directories, escapes, linked targets, and hardlinked target files.
- Verify every existing destination is the exact expected regular file or require it to be absent.
- Promote only immutable exact bytes.
- Write one deterministic phase receipt as the final commit marker after every output is present and reverified.
- Never consume live run outputs in later phases. A partial promotion without the final receipt is inert and cannot become semantic input.

The receipt must bind the candidate, runtime, external inputs, fresh child roster, phase outputs, pre/post protected closures, promotion dispositions, cleanup result, and explicit external-host trust statement.

### 6. Truthful trust boundary

The repository parent verifies candidate and runtime bytes under an externally declared parent digest, but it is not its own malicious-code trust root. The host remains responsible for independently pinning the parent before execution, provisioning the offline cache, trusting Node/npm/Git, enforcing process and filesystem isolation, preserving raw handoffs, and invoking only the documented interface.

Runtime evidence may claim exact observed entrypoint bytes, versions, installed closure, generated closure, environment policy, and external declarations. It must not claim full executable provenance or hostile-process isolation.

## Interface

Keep one concise parent entrypoint with closed positional forms:

```txt
paths   <candidate>
prepare <candidate> <gateReceiptDigest>
compile <candidate> <gateReceiptDigest>
approve <candidate> <gateReceiptDigest> <compilationDigest> <packageDigest>
verify  <candidate> <gateReceiptDigest> <compilationDigest> <packageDigest> <handoffPath> <handoffDigest> [...]
```

All commits and digests use their exact lowercase closed forms. Handoff paths remain `handoffs/<file>.json`.

## Scope

The specialist may edit only:

- `scripts/run-v12-release-review.mjs`
- `docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs`
- `docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs`
- `test/v12-release-review.test.mjs`
- `test/v12-release-gate.test.mjs`
- `package.json`

The integration owner separately owns correction evidence, feature status, RCA/debug notes, V11 approval refresh, milestone and memory updates, candidate freeze, canonical gate, R2 launch, hosted CI, and merge.

## Invariants

- Never import repository-live generated runtime.
- Never seed a live prior-phase package, approval, snapshot, summary, runtime binding, or receipt.
- Never derive owner expectation from the package being approved; compare reconstruction to the explicit owner pair.
- Never execute generated runtime until closed post-install and post-build state passes.
- Never promote through an unauthenticated ancestor or treat a receipt-less partial output set as complete.
- Never silently use network access, lifecycle hooks, a default cache, ancestor package supply, or host-specific orchestration semantics.
- Never mutate Revision 17 or Revision 18 evidence.
- Do not claim release readiness, hosted CI, merge, model routing, spawning, or hostile-process isolation.

## Completion Evidence

Return one exact closed `SpecialistAgentHandoff` with the six-file diff, reconstruction behavior, explicit input grammar, pre/post state checks, resolver and promotion behavior, behavioral adversarial results, bounded verification, residual external-host risks, and a truthful workflow outcome.
