# Decomposition Plan

## Status

Complete.

## Goal

Dogfood `tracepack-orchestration-readiness` by running a real read-only multi-agent review of V6 artifacts, then synthesize the handoffs into an integration-owned review and memory update.

## Source Artifacts

- Feature package: `docs/specs/v6-orchestration-readiness-dogfood/`
- Architecture or ADR: not needed; this uses existing V6 orchestration contracts.
- Research snapshot: existing V5/V6 orchestration and capability-adapter snapshots.
- Relevant memory: `docs/memory/active-context.md`, `docs/memory/known-issues.md`, `docs/memory/retrieval-index.md`

## Branch And State

- Source branch: `codex/v6-module-rail-catalog`.
- Target branch: `main`.
- Baseline commit or state: branch was clean and tracking `origin/codex/v6-module-rail-catalog` before fan-out.
- Dirty state: no pre-existing local changes; main agent owned all edits created during integration.
- Approval gate: V6 remains unmerged until user approval.
- Merge target: `main` after explicit approval.

## Module Selection

| Needed Capability | Module | Reason |
| --- | --- | --- |
| Decomposition | Decomposition rail | Split a review goal into bounded work units. |
| Orchestration | Astraeus orchestration compiler contract | Define roles, scope, handoffs, stop conditions, and integration ownership. |
| Verification | Verify and review modules | Prove evidence before changing readiness state. |
| Memory | Memory module | Preserve durable dogfood lessons. |

## Decomposition Summary

This work can fan out because each work unit is read-only, bounded to separate documentation slices, and can return findings independently. The main agent remains integration owner and owns all edits, verification, review, and memory updates.

## Dependency Graph

```txt
shared intake -> decomposition plan -> pack/rail reviewer
shared intake -> decomposition plan -> module/template reviewer
shared intake -> decomposition plan -> verification/memory reviewer
review handoffs -> integration synthesis -> narrow fixes or follow-ups -> validation -> review -> memory
```

## Work Units

### Work Unit A

Objective: Review pack, rail, lifecycle, and conformance contracts for contradictions or missing safety boundaries.

Scope boundary: `docs/packs/official/tracepack-orchestration-readiness/`, `docs/packs/README.md`, `docs/packs/conformance.md`, `docs/packs/pack-lifecycle.md`, `docs/rails/decomposition-rail.md`, `docs/framework/orchestration-patterns.md`.

Likely files or docs: listed in scope boundary.

Dependencies: none after shared context.

Conflict zones: none; read-only.

Context bundle: pack README, pack example, decomposition rail, orchestration patterns, V6 branch state.

Agent role or capability: read-only explorer.

Allowed actions: read and report findings only.

Verification evidence: file path plus heading or short phrase for each finding.

Handoff format: findings by severity, then recommendation on official/not-recommended status.

Stop conditions: missing context, need to edit, or blocker to V6 approval.

### Work Unit B

Objective: Review module and template alignment for decomposition, orchestration run records, Astraeus compiler contract, and standalone agent docs.

Scope boundary: `docs/framework/_decomposition-plan-template.md`, `docs/framework/_orchestration-run-template.md`, `docs/framework/orchestration-patterns.md`, `docs/modules/astraeus-orchestration-compiler.md`, `docs/agents/`, pack README.

Likely files or docs: listed in scope boundary.

Dependencies: none after shared context.

Conflict zones: none; read-only.

Context bundle: framework templates, orchestration patterns, Astraeus module, agent work package docs.

Agent role or capability: read-only explorer.

Allowed actions: read and report findings only.

Verification evidence: file path plus heading or short phrase for each finding.

Handoff format: findings by severity, then recommendation on readiness for a first subagent dogfood run.

Stop conditions: missing context, need to edit, or mismatch blocking V6 approval.

### Work Unit C

Objective: Review validation, milestone approval state, and memory retrieval readiness.

Scope boundary: `scripts/check-template.ps1`, `docs/milestones/v6.md`, `docs/memory/`, recent V6 hardening review files.

Likely files or docs: listed in scope boundary.

Dependencies: none after shared context.

Conflict zones: none; read-only.

Context bundle: checker, V6 milestone, memory files, approval gate review, pack conformance review.

Agent role or capability: read-only explorer.

Allowed actions: read and report findings only.

Verification evidence: file path plus heading or short phrase for each finding.

Handoff format: findings by severity, then recommendation on V6 validation/memory merge readiness.

Stop conditions: missing context, need to edit, or blocker to V6 approval.

## Fan-Out Plan

- All three work units can start immediately.
- All work units are read-only.
- No work unit may edit files.
- Main agent continues non-overlapping artifact setup while reviewers run.

## Fan-In Plan

- Integration owner: main Codex agent.
- Merge order: no worker diffs; synthesize handoffs into `orchestration-run.md`, then apply any narrow main-agent fixes.
- Conflict-resolution approach: evidence-backed findings win; broad or uncertain findings become follow-ups.
- Integrated verification: checker, placeholder scan, non-ASCII scan, `git diff --check`.
- Review owner: main Codex agent.

## Verification Matrix

| Work Unit | Local Evidence | Integrated Evidence |
| --- | --- | --- |
| A | Pack/rail findings with file references | Handoff captured and synthesized in `orchestration-run.md` |
| B | Module/template findings with file references | Handoff captured and synthesized in `orchestration-run.md` |
| C | Validation/memory findings with file references | Handoff captured and synthesized in `orchestration-run.md` |

## Stop Or Redesign Triggers

- Requirements become unclear.
- A worker needs write permission.
- A worker finds a blocker to V6 approval.
- Findings require broad redesign beyond V6 approval hardening.
- Verification cannot be run.

## Memory Updates

- History ledger: add run completion entry.
- Retrieval index: point to run package and orchestration record.
- Decisions: update only if a durable policy changes.
- Known issues: update if run reveals limitations.
- Patterns: update if the pack dogfood creates a reusable pattern.
