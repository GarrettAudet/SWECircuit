# Revision 18 Parent-Bootstrap Trust Correction Contract

## Objective

Replace the repository-live R2 execution path with a parent/child release-review boundary that attributes every compiler, package, approval, and handoff decision to one exact candidate-derived runtime before promoting any evidence.

## Confirmed Cause

Candidate `f4f91a373dd7f8028ec5d592e89c75f0027245c3` was retired after security review proved that mutable ignored `dist/index.js` supplied R2 semantics before candidate authentication. Revision 17 correctly routed `redesign`: its four-file scope still left circular self-authentication, ancestor dependency fallthrough, unproven lockfile correspondence, shared-process ESM lifetime, and direct live output writes.

## Required Architecture

Use one small parent bootstrap as the only live entrypoint. The parent uses Node built-ins and external host tools, never imports candidate runtime modules, and performs this sequence for each `prepare`, `compile`, `approve`, `verify`, or `paths` invocation:

1. Require an exact 40-character candidate, exact repository `HEAD`, and clean tracked state.
2. Bind the parent bootstrap, child harness, and child verifier to their exact candidate Git blobs before launching a child.
3. Materialize the complete committed candidate tree into a short fresh root outside both the repository and every repository ancestor/descendant path.
4. Reject unsafe cross-platform and Windows path aliases, alternate data streams, reserved device names, trailing dot/space segments, links, reparse points, hardlinks where detectable, and realpath escapes.
5. Run `npm ci --offline --ignore-scripts --no-audit --no-fund` against the exact candidate lockfile and an explicit host cache. Reject non-registry or integrity-less locked package supply. Do not run package lifecycle hooks or silently use network access.
6. Build through the candidate-installed TypeScript entrypoint with a case-insensitively sanitized environment.
7. Hash and canonically bind the complete candidate source, bootstrap/worker blobs, installed dependency supply, Node/npm/Git/TypeScript toolchain facts, platform/architecture, environment policy, and complete generated `dist` closure.
8. Write one closed runtime-binding input with a canonical `runtimeBindingDigest`; require the exact candidate child to validate it before dynamically importing its private `dist` entrypoint.
9. Seed only explicitly allowed post-commit gate evidence and prior immutable run inputs into the private materialization, recording exact bindings.
10. Launch one fresh candidate child process for the requested phase. The live parent must not import or call candidate compiler/verifier functions.
11. Stage child outputs outside the live repository. Reject modifications to candidate source, installed supply, generated runtime, runtime binding, or seeded inputs; reject new files outside the mode-specific run-output boundary.
12. Rehash protected closures after child exit, clean the candidate materialization and disposable Git context, and promote staged bytes with immutable writes only after every parent-side check succeeds.
13. Record a parent execution receipt with child identity, input/output bindings, pre/post closure digests, result, and bounded cleanup outcome.

## Candidate Worker Requirements

- Direct invocation outside the parent-created materialization fails before any runtime import.
- Live test imports execute no generated runtime code.
- The candidate manifest, runtime-binding context, compilation summary, approval, phase metadata, and final handoff-verification report expose and compare the same direct `runtimeBindingDigest`.
- Prepare, compile, approve, and verify reconstruct exact prior inputs and fail closed on substitution.
- A verified non-`pass` reviewer outcome remains non-success.

## External Host Boundary

The parent binds observed tool and byte identities and prevents ordinary repository-live substitution. It does not claim protection from a hostile same-user process, compromised OS, compromised Node/Git/npm executable, or an IDE that bypasses the documented entrypoint. Process and filesystem isolation, executable trust, cache provisioning, and permission enforcement remain external host responsibilities.

## Scope

The specialist may edit only:

- `scripts/run-v12-release-review.mjs` (new parent entrypoint)
- `docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs`
- `docs/specs/v12-ide-run-loop/evidence/release-review-r2/verify-release-review-handoffs.mjs`
- `test/v12-release-review.test.mjs`
- `test/v12-release-gate.test.mjs`
- `package.json`

The integration owner separately owns feature status, RCA/debug notes, milestone, memory, candidate retirement, command documentation, and immutable Revision 18 evidence.

## Invariants

- Never execute repository-live `dist`, the live candidate worker, npm lifecycle hooks, or a network-enabled install.
- Never promote output before successful child exit, pre/post identity equality, bounded cleanup, and output-set validation.
- Never permit bare-package resolution through repository ancestry.
- Never mutate prior candidate, gate, reviewer, or correction evidence.
- Do not alter core compiler behavior, schemas, public runtime API, dependencies, lockfile, branch state, or external-host ownership claims.
- Do not claim release readiness, hosted CI, merge, or memory closeout.
- The integration owner retains successor freeze, one-shot gate, fresh R2, hosted CI, and merge authority.

## Completion Evidence

Return one exact closed `SpecialistAgentHandoff` containing changed files, bootstrap/worker trust construction, stable runtime binding, offline exact-lock proof, adversarial mutation results, focused and full verification, assumptions, residual host risks, and a truthful workflow outcome.
