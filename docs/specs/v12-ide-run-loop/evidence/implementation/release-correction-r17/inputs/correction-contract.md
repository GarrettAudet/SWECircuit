# Revision 17 Candidate-Runtime Trust Correction Contract

## Objective

Retire candidate `f4f91a373dd7f8028ec5d592e89c75f0027245c3` and make every R2 package, approval, and handoff decision execute through a runtime derived from and cryptographically bound to the exact candidate under review.

## Confirmed Cause

The candidate's complete R2 fan-in verified `fix / pass / pass`. The security/trace/authority reviewer proved that both release-review entrypoints statically imported ignored live `dist/index.js` before candidate authentication. The authenticated scripts therefore did not establish which compiler and verifier semantics generated or accepted the evidence.

## Required Correction

- Remove every pre-authentication import of live generated runtime code from the R2 harness and handoff verifier.
- Authenticate the exact candidate Git blobs for the harness and verifier before constructing or importing review runtime code.
- Materialize the exact candidate source closure in a fresh private directory.
- Resolve the required compiler, type, and production dependency closure from the candidate lockfile; require regular files, validate locked package versions, copy exact installed bytes into the private materialization, and hash the complete supply.
- Build with the copied candidate-locked TypeScript compiler, hash the complete generated `dist` closure, and only then dynamically import the materialized entrypoint.
- Bind candidate identity, source closure, dependency supply, host runtime facts, build command, and generated closure in `reviewTooling`.
- Reconstruct the same binding during prepare, compile, approve, and raw-handoff verification; fail closed on any mismatch or cleanup failure.
- Add focused adversarial regressions for static live-runtime imports, source/dependency substitution, generated-runtime substitution, incomplete bindings, unsafe filesystem entries, and deterministic reconstruction.
- Preserve the retired candidate's exact gate and `fix / pass / pass` R2 evidence without modification.

## Scope

The specialist may edit only:

- `docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs`
- `docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs`
- `test/v12-release-review.test.mjs`
- `test/v12-release-gate.test.mjs`

The integration owner may separately update active feature status, RCA/debug notes, milestone, memory, candidate retirement, and immutable Revision 17 evidence.

## Invariants

- Do not execute candidate-derived modules until the exact harness/verifier candidate blobs have authenticated and the complete generated closure has been hashed.
- Do not resolve runtime dependencies from an unbound ancestor `node_modules`; the private materialization owns the copied, lockfile-validated dependency closure used at runtime.
- Do not run candidate package scripts or lifecycle hooks while constructing the review runtime.
- Do not weaken the exact candidate checkpoint, immutable evidence, package approval, raw handoff, or non-`pass` routing checks.
- Temporary cleanup may remove only a resolved descendant of the dedicated repository-local runtime scratch root.
- Do not modify prior candidate or correction evidence, core compiler behavior, schemas, package metadata, Git state, or external-host boundaries.
- Do not claim release readiness, hosted CI, merge, or memory closeout.
- The integration owner retains successor freeze, one-shot gate, fresh R2, hosted CI, and merge authority.

## Completion Evidence

Return one exact closed `SpecialistAgentHandoff` containing the changed files, runtime trust construction, stable binding fields, focused and full check results, assumptions, residual risks, and truthful workflow outcome.
