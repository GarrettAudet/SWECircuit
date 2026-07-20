# Test Plan

## Status

Release-correction revisions 6 through 8, V11 trust-root revision 35, and the current full pre-freeze gate pass. Candidate 2's exact canonical gate passed, but R2 preparation failed closed before reviewer compilation. Candidate 3's exact gate and independent R2 release review remain pending.

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

## Current Evidence

- R6 complete-package handoff gate: two of two exact `pass`; `phaseReady: true`.
- R7 complete-package handoff gate: one of one exact `pass`; `phaseReady: true`.
- R8 complete-package handoff gate: one of one exact `pass`; `phaseReady: true`.
- Canonical evidence retention: legacy and candidate-addressed gate logs are versionable and explicitly binary; unrelated logs remain ignored; receipts retain normal text policy; wrapper/R2 paths are byte-equivalent.
- Current full pre-freeze gate: format, lint, typecheck, 388 of 388 tests, examples, V10/V11/V12 dogfood, package inspection, and clean installed-consumer verification pass.
- V11 revision-35 Candidate A, Audit B, receipt, binder, semantic handoff, and cross-package authorization: `pass`.
- Candidate 2 canonical receipt: `pass`; downstream R2 canonical-source preparation: fail closed before compilation.
- Candidate 3 `npm.cmd run verify` receipt and three R2 reviewer handoffs: pending until candidate freeze.
