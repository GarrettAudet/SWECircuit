# Decomposition Plan

## Status

Complete.

## Goal

Harden TraceRail's manual baseline so contracts, checker behavior, memory provenance, and public positioning agree before V9.

## Source Artifacts

- `README.md`
- `AGENTS.md`
- `docs/specs/v8.1-baseline-integrity/spec.md`
- Repository-wide V8 audit findings.

## Branch And State

- Branch: `codex/v8.1-baseline-integrity`
- Base: `codex/v8-readme-visual-clarity`
- Integration owner: main IDE agent.
- Approval gate: user approval before merge to `main`.

## Module Selection

| Need | Module | Reason |
| --- | --- | --- |
| Contract consistency | Architecture review | Align public and internal interfaces. |
| Parallel edits | Decomposition | Bound files and prevent conflicts. |
| Evidence | Verify and review | Require positive and negative checks. |
| Durable learning | Memory | Preserve audit and dogfood outcomes. |

## Decomposition Summary

Three write-enabled workers receive disjoint file ownership. The main agent owns public positioning, feature artifacts, integration, and final verification.

## Dependency Graph

```txt
source package -> [A contracts, B checker, C memory] -> integration -> verification -> review -> milestone
```

## Work Units

### Work Unit A

- Objective: normalize module, rail, and outcome contracts.
- Scope: `docs/framework/_module-template.md`, `docs/framework/rail-composition.md`, `docs/modules/README.md`, `docs/modules/memory-adapters.md`, `docs/rails/*.md` except `README.md` only when needed.
- Dependencies: current catalog and audit findings.
- Conflict zones: checker references owned by Work Unit B; do not edit checker.
- Context bundle: module catalog, rail template, rail catalog, canonical outcomes.
- Agent role: contract editor.
- Allowed actions: edit assigned Markdown files and run read-only scans.
- Verification evidence: changed-file list, interface scan, outcome scan.
- Handoff: findings, files changed, checks run, residual risks.
- Stop conditions: contract change requires runtime design or README edit.

### Work Unit B

- Objective: harden checker behavior and dynamic discovery.
- Scope: `scripts/check-template.ps1` only.
- Dependencies: V8.1 spec and current checker.
- Conflict zones: module/rail content changes owned by Work Unit A; validate interface terms without editing those files.
- Context bundle: checker functions, feature package convention, pack layout, milestone layout.
- Agent role: validation engineer.
- Allowed actions: edit checker and run temporary repository-local or temp-directory fixtures.
- Verification evidence: positive checker run and negative fixture results.
- Handoff: exact logic changes, tests, changed files, residual risks.
- Stop conditions: change requires production dependency or destructive fixture.

### Work Unit C

- Objective: add source provenance to durable memory.
- Scope: `docs/memory/decisions.md`, `docs/memory/patterns.md`, and memory-format guidance in `docs/ai/handbook.md` if required.
- Dependencies: current retrieval index and feature packages.
- Conflict zones: active context, history ledger, retrieval index, known issues, and milestone remain integration-owner files.
- Context bundle: memory rule, source-first pattern, decisions, patterns, retrieval index.
- Agent role: memory provenance editor.
- Allowed actions: edit assigned files and validate source paths.
- Verification evidence: source-field audit and resolved path sample.
- Handoff: files changed, provenance model, checks, residual risks.
- Stop conditions: provenance requires inventing unsupported sources.

## Fan-Out Plan

- Start all three workers after this plan is committed to the working tree.
- Workers edit only assigned files.
- No worker stages, commits, pushes, or merges.
- Main agent reviews and integrates all changes.

## Fan-In Plan

- Review each handoff against changed files.
- Resolve any contract/checker assumptions centrally.
- Add README positioning after internal contracts settle.
- Run checker, negative fixtures, scans, and CI.

## Verification Matrix

| Work Unit | Local Evidence | Integrated Evidence |
| --- | --- | --- |
| A | Contract and outcome scans | Full checker and public claim review |
| B | Positive and negative checker runs | Full checker after all files change |
| C | Source audit | Memory and retrieval review |

## Stop Or Redesign Triggers

- Workers touch overlapping files.
- Stronger checker exposes broad historical migration work.
- Inline-module decision requires a V9 schema design.
- License choice becomes necessary to complete non-legal work.

## Memory Updates

Update active context, known issues, decisions, patterns, history ledger, and retrieval index after integrated review.
