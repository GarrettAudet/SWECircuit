# Root Cause Analysis

## Status

Closed for the V11 revision-6 technical candidate. No production incident occurred. Post-integration reconstruction, owner approval, branch preparation, and merge remain separate release gates.

## Incident Summary

Four architecture-review rounds rejected the original universal runtime scope. After that scope was split, Specialist Compiler dogfood attempts 1-4 exposed product/API, authority, package-trust, host-containment, consumer, scheduler-coverage, and verification defects. Attempt 5 passed its pre-integration wave but emitted `FIX` when authorized integration changed a live spec still bound as review input. Revision 6 removed that alias, repeated every review lane, preserved host-only release `FIX` attempts 6A/6B, and passed the complete technical gate against one digest pair.

## Impact

The original boundary delayed a usable specialist compiler. Early dogfood packages were deterministic but not sufficient for trusted launch or complete security review, so none was eligible for owner approval. No rejected candidate was merged or presented as accepted.

## Reproduction

Review exact architecture candidate `d486b7f49724651cc12a115ee483e70d67e62bbb` against `../v11-orchestration-planner/architecture-review-round-4.md`.

For attempt 1, compile `evidence/dogfood/runs/attempt-1/goal-contract.json`, inspect the generated package, submit `path:../outside.txt`, and test a coordinated rewrite of compilation, payloads, manifest, and package envelope without externally trusted expected digests. Attempts 2-4 and their narrower reproductions are preserved in `debug-notes.md` and `evidence/dogfood/handoffs/`.

## Evidence

- Round 4 produced 10 high and 9 medium findings; `../v11-orchestration-planner/revision-5-correction-design.md` preserves the correction design.
- Attempt 1 is preserved under `evidence/dogfood/runs/attempt-1/`; every later `REVISE`, `FIX`, and `PASS` handoff remains under `evidence/dogfood/handoffs/`.
- Attempt 5 is historically bound by compilation `sha256:20adea92233a3d6a6d5a852e940a959f37e0b570333999dd784b450d0509687d` and package `sha256:5824f61dedfa82e479b412eb4a091c25c5a1d43b59ce94a9ec8ee47e61757f07`; `post-integration-replay-fix-attempt-5.md` records its final `FIX` outcome.
- Revision 6 is bound by compilation `sha256:ac1707213d9c22314d4c5a3d0bc6a838ef31863b63a9e2dac5993541d919c161` and package `sha256:838019281b732ec238e4460c03167087b7a63c409348ee66322cc5535469774d`.
- `evidence/dogfood/handoffs/review-candidate-digests-attempt-6.json` records 34/34 preparation source bindings and the sole immutable `context.spec` locator.
- `verify-release-fix-attempt-6a.md` and `verify-release-fix-attempt-6b.md` preserve host failures without changing source or candidate identity; `verify-release-pass-attempt-6.md` and the three revision-6 reviews record the accepted PASS set.

## Hypotheses Considered

- Continue revising the universal runtime contract.
- Ship the independent Specialist Compiler first and defer the effectful runtime layer.
- Treat prose-only assumptions and decisions as adequate launch context.
- Bind only individual files and the manifest, without a trusted package root.
- Give reviewers only direct feature sources rather than security-sensitive transitive helpers.
- Treat host-side containment and approval handling as implicit rather than executable consumer obligations.

## Confirmed Root Cause

The first cause was an oversized feature boundary that coupled pure task-team construction to scheduler, callback, restart, attestation, merge, and memory protocols not required for the owner-priority capability.

The dogfood failures came from launch-sensitive requirements existing only in prose, prefix-only path validation, integrity values rooted only inside a mutable package, incomplete security-review context, and later incomplete containment of host control/evidence paths. Consumer and scheduler assertions also lacked direct installed and fixed-scheduler regressions until attempts 3-4.

Attempt 5 failed because the same live spec path was both a digest-bound review input and an authorized integration output. Attempts 6A/6B failed because the release host consumed Windows path headroom and then removed a host-owned offline cache while cleaning attempt-owned files.

## Fix

ADR 0004 makes the standalone Specialist Compiler the V11 target and defers runtime effects. The completed correction canonicalizes assumptions and decisions, exposes search and selection evidence, validates repository path segments, closes permission kinds, binds a compilation-bearing package to externally retained compilation and package digests, deterministically reconstructs and verifies the package, closes reviewer context, contains host-side reads/writes, and exercises the installed consumer plus fixed scheduler directly.

Revision 6 also binds every integration-mutable review document through an immutable pre-integration snapshot, reserves the live path as an output, and requires the integration owner to reconstruct both trusted digests after integration. Release retries use `.local/npm-cache` directly as TEMP/TMP, preserve host-owned `_cacache`, and clean only attempt-owned outputs.

## Verification Of Fix

- Revision-6 preparation passed 34/34 source bindings, with `context.spec` resolved only to the immutable pre-integration snapshot.
- Product/API passed 12/12 context items with no findings.
- Algorithm/lifecycle passed 14/14 with no findings.
- Security/trace passed 32/32 with no findings.
- Release verification passed 19/19 release contexts, 9/9 package files, focused 7/7 schema, 35/35 compiler/golden, 6/6 containment, and canonical 323/323 tests.
- Both dogfoods, the offline installed consumer, package verification, template checker, and the complete 744.9-second negative matrix passed.

These checks verify the documented pure-core and host-fixture boundaries. They do not prove provider execution, permission enforcement, isolation, persistence, merge, or automatic memory effects.

## Regression Coverage

Architecture checks must reject provider/runtime supply or claims that V11 core schedules, executes, merges, or mutates memory. Golden and adversarial coverage rejects blocking decisions, traversal, authority surplus, secret leakage, runtime fields, fixed-scheduler drift, mismatched package expectations, coordinated rewrites, host containment failures, and type/schema permission drift.

Any semantic candidate change requires new source binding, both trusted digests, affected canonical gates, and repeat independent review. Any document integration may mutate must be supplied through an immutable pre-integration snapshot, and the exact approved pair must reconstruct after integration before branch freeze.

## Durable Learning

Split pure planning demand from effectful runtime control when either layer can deliver independently reviewable value. An immutable execution contract must carry assumptions and unresolved decisions. Package digests establish trust only when expectations are retained outside the received package. Reviewer strength depends on exact context closure, and host examples must demonstrate the containment and approval rules they teach. An integration target cannot also be a digest-bound live input; snapshot first, mutate the output, then replay the exact approved package.

## Memory Update

The split and immutable-input decisions remain in `docs/memory/decisions.md`; attempt 5 and release-host attempts 6A/6B are preserved in `docs/memory/failed-attempts.md`. Residual limits and final evidence are linked from `docs/memory/known-issues.md`, `docs/memory/history-ledger.md`, `docs/memory/retrieval-index.md`, and `docs/milestones/v11.md`.
