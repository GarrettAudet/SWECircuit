# Test Plan

## Status

Release-correction revisions 1 through 11 and V11 trust-root revision 36 pass their package gates. Candidate 5 is retired after exact Git-blob execution exposed checkout-specific V11 bindings and repository-local runtime residue. R12 must close both causes before Candidate 6.

## Contract Tests

- Exact package expectation is required for create, restore, inspect, and record.
- Session normalization, source retention, serialization, and independent handoff arrival order are deterministic.
- Unknown, stale, duplicate, malformed, or substituted handoffs fail closed.
- Verified non-`pass` outcomes remain explicit and block dependency readiness.
- Dependency-eligible work is complete, manifest-resolved, dependency-safe, and deterministic.
- Prior immutable session values never change after an operation.

## Lifecycle Tests

- Initial independent wave.
- Partial wave completion.
- Complete verified fan-in.
- Missing dependency.
- Valid `fix`, `diagnose`, `clarify`, `redesign`, `split`, `block`, and `learn` routing.
- Reinspection after JSON round trip.
- Complete-roster integration readiness through the virtual all-sinks closure.

## Boundary Tests

- No provider, model, prompt, executor, credential, grant, scheduler, workspace, process, or merge field enters the session contract.
- Core performs no filesystem, network, process, Git, agent-launch, persistence, merge, or memory effect.
- Host responsibilities remain explicit in public documentation and examples.

## Integration Tests

- A real V11 package is created as a session, serialized, restored, inspected, advanced with exact raw handoffs, and reaches complete-roster integration readiness.
- The installed package exposes the V12 types and operations to a clean TypeScript consumer.
- The IDE kickoff can be followed from one natural-language goal without hidden state.

## Adversarial And Limit Tests

- `npm.cmd run verify`
- Template checker and checker regression matrix.
- V11 and V12 dogfood replay.
- Independent product/API, correctness/lifecycle, and security/trace review.
- V11 context bindings remain byte-identical under the live checkout, Git clean filtering, and exact committed-blob materialization.
- The exact candidate command leaves no undeclared file, directory, link, cache, log, or temporary parent inside the authenticated materialization.

## Current Evidence

- R6 complete-package handoff gate: two of two exact `pass`; `phaseReady: true`.
- R7 complete-package handoff gate: one of one exact `pass`; `phaseReady: true`.
- R8 complete-package handoff gate: one of one exact `pass`; `phaseReady: true`.
- Canonical evidence retention: legacy and candidate-addressed gate logs are versionable and explicitly binary; unrelated logs remain ignored; receipts retain normal text policy; wrapper/R2 paths are byte-equivalent.
- Current post-R10 pre-freeze gate: format, lint, typecheck, the full test suite, examples, V10/V11/V12 dogfood, package inspection, and clean installed-consumer verification pass in 158.8 seconds.
- V11 revision-35 Candidate A, Audit B, receipt, binder, semantic handoff, and cross-package authorization: `pass`.
- Candidate 2 canonical receipt: `pass`; downstream R2 canonical-source preparation: fail closed before compilation.
- Candidate 3 `4ad12367cc0b36ea460ceabc48e5a41ca662e3df` canonical receipt: `pass`; lifecycle review: `pass`; product and security review: `fix`; candidate retired.
- R9 focused committed-source gate tests: 4 of 4 `pass`; exact specialist handoff: 4,584 bytes at `sha256:f36ddf35492244b21248fe96a5363f1c7222fb206a4fe11f5d213427c37a4956`; `phaseReady: true`.
- R10 lifecycle tests: 5 of 5 `pass`; independent full release-gate tests: 4 of 4 `pass`; exact accepted handoff: 5,595 bytes at `sha256:3e58dddde82171b5090debc1ea76a29298fe7a7e0f9a27dd39fd1f826350e543`; `phaseReady: true`.
- Candidate 4 exact canonical receipt: `fail`; 392 of 397 tests pass, five Git-context tests fail, source and repository integrity checks pass, candidate retired.
- Candidate 5 exact canonical receipt: `fail`; all 399 tests pass, V11 replay rejects two CRLF-bound PowerShell sources, post-command inspection finds `.local`, Git/repository isolation passes, candidate retired.
- R12 byte-stable V11 bindings, external runtime cache, complete temporary-path cleanup, Candidate 6 exact receipt, and complete three-reviewer R2 roster: pending.
