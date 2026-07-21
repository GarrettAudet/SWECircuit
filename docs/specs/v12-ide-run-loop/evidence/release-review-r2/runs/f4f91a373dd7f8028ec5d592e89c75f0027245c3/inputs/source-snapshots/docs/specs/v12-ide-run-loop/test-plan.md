# Test Plan

## Status

Package identity verification and handoff schema verification authenticate preserved artifacts; neither alone establishes workflow success, phase readiness, or release readiness. Revision 1 has incomplete fan-in. Revisions 2 and 3 retain `split` workflow outcomes. Later correction phases retain their recorded `pass` routes where preserved evidence reports `pass`. The most recent three-reviewer review routed `pass` / `fix` / `pass`, so `releaseReady: false`; accepted Revision 16 attempt 2 corrects the release trace, and V12 is not merge-ready.

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
- Current post-R10 pre-freeze gate: format, lint, typecheck, the full test suite, examples, V10/V11/V12 dogfood, package inspection, and clean installed-consumer verification pass in 158.8 seconds.
- V11 revision-35 primary package, Audit B, receipt, binder, semantic handoff, and cross-package authorization: `pass`.
- Commit `4c7695519d274a8e3d939061dfa184b99dc8ac45` canonical receipt: `pass`; downstream R2 canonical-source preparation: fail closed before compilation.
- Commit `4ad12367cc0b36ea460ceabc48e5a41ca662e3df` canonical receipt: `pass`; lifecycle review: `pass`; product and security review: `fix`; source retired.
- R9 focused committed-source gate tests: 4 of 4 `pass`; exact specialist handoff: 4,584 bytes at `sha256:f36ddf35492244b21248fe96a5363f1c7222fb206a4fe11f5d213427c37a4956`; `phaseReady: true`.
- R10 lifecycle tests: 5 of 5 `pass`; independent full release-gate tests: 4 of 4 `pass`; exact accepted handoff: 5,595 bytes at `sha256:3e58dddde82171b5090debc1ea76a29298fe7a7e0f9a27dd39fd1f826350e543`; `phaseReady: true`.
- The Git-context source's exact canonical receipt: `fail`; 392 of 397 tests pass, five Git-context tests fail, source and repository integrity checks pass, and the source is retired.
- The next three exact receipts: `fail`; each source is retired with immutable source-addressed receipts and raw logs after exposing a distinct exact-source boundary defect.
- Commit `0482bf3783e085c6cef3111d63003daa5197eca8` exact canonical receipt: `pass`; 2,046 files and 57,258,623 bytes retain identical before/after source identity, disposable Git and cleanup checks pass, and receipt/stdout/stderr remain source-addressed.
- That source's fresh R2 compilation: `fail` closed before rendering or launch; 261 context sources and 261 read scopes exceed the unchanged 256-entry ceiling.
- Revision 15 exact package gate: one of one final handoff `pass`; `phaseReady: true`; compilation/package `sha256:857c536099f5fd9d01b0981593bef6f2e8b40eba774db7fae21c501e3bd3e83f` / `sha256:627414164e9176f4ead047a4a857f23f81efc868643dd8aaaa55377186f162c8`.
- Revision 15 integration verification: exact 261-to-167 regression `pass`; all 10 release-gate tests `pass`; canonical repository gate, checker mutation matrix, and standalone V11 evidence replay `pass`.
- Commit `447dd4cc5ef0dfa8894d54fdc79a1c15aaaedb84` exact canonical receipt: `pass`; complete R2 roster: `pass` / `fix` / `pass`; authenticated `releaseReady: false`; source permanently retired.
- Revision 16 exact package gate: one of one accepted attempt-2 handoff `pass`; `integrationAccepted: true`; `phaseReady: true`; focused release-review tests 8 of 8 `pass`; template, format, lint, and diff gates `pass`.
- Post-Revision-16 independent pre-freeze verification: canonical `npm.cmd run verify` `pass` in 350.4 seconds; checker mutation matrix `pass` in 316.7 seconds.
- Successor-source freeze, exact gate, fresh R2 review, hosted CI, and owner merge decision: pending.
