# V9 Validation Kernel Decomposition Plan

## Status

Complete.

## Goal

Implement deterministic project validation from the frozen v1alpha1 contract, then challenge the integrated behavior independently before T006 can pass.

## Integration Owner

The primary IDE agent owns all implementation, tests, synthesis, and final verification on `codex/v9-devrail-kernel`.

## Why This Shape

Parser, path, schema, reference, graph, permission, and diagnostic behavior share one tightly coupled result model. Keeping those edits with one owner avoids overlapping changes. Independent contract review is read-heavy and can run in parallel without a merge conflict.

## Work Unit A: Integrated Implementation

- Objective: implement strict input, package schema dispatch, safe project loading, semantic validation, and deterministic results.
- Scope: `src/`, kernel tests, and T006 feature evidence.
- Dependencies: accepted ADR 0001 and the completed T005 schema gate at `9932371`.
- Conflict zones: all kernel source and validation tests stay integration-owner only.
- Authority: edit bounded V9 files, run local checks, and integrate reviewer findings.
- Evidence: format, lint, typecheck, build, fixture tests, package inspection, template check, and remote matrix.
- Stop conditions: schema ambiguity, operation-scope expansion, unsafe external execution, or a failure requiring diagnosis.

## Work Unit B: Independent Validation Review

- Objective: find concrete correctness, security, portability, determinism, contract-fidelity, and missing-test defects.
- Scope: read ADR 0001, the v1alpha1 contract and case matrix, `src/`, and T006 tests.
- Dependencies: the integrated implementation must be readable, but local hardening can continue concurrently.
- Conflict zones: none; read-only authority.
- Authority: inspect and report only; no edits, installs, commits, or pushes.
- Evidence: findings with exact file and line references, affected frozen rules, smallest fixes, missing cases, and `PASS` or `REVISE`.
- Handoff: severity-ordered review to the integration owner.
- Stop conditions: initializer, CLI rendering, trace reconstruction, naming, licensing, and README work are out of scope.

## Fan-In Gate

T006 can pass only after the integration owner maps every reviewer finding to accepted, fixed, deferred, or rejected-with-rationale and reruns the complete local and remote verification matrix.

Gate result: `PASS`. All findings were fixed or bounded with explicit rationale, focused re-review passed, and GitHub Actions run `29277160551` completed successfully.
