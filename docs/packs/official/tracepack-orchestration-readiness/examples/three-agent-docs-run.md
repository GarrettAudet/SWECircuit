# Three-Agent Documentation Run Example

## Purpose

Show how `tracepack-orchestration-readiness` turns one goal into bounded work units before any worker starts.

## Shared Goal

Improve a documentation feature package without losing consistency across rails, modules, verification, and memory.

## Pattern

Use subagents for independent read-heavy or scoped writing work, with the main agent as integration owner.

```txt
goal | retrieve | spec | decompose | fanout | synthesize | integrate | verify | review | memory
```

## Work Units

### Rail Reviewer

Objective: Check whether rail guidance is consistent with the feature package and handbook.

Scope boundary: `docs/rails/` and related handbook references.

Dependencies: Shared goal, feature package, and decomposition plan.

Conflict zones: Handbook references shared with other reviewers; no edits without integration-owner assignment.

Context bundle: Feature spec, relevant rail docs, handbook stage contracts, known issues.

Agent role or capability: Read-only explorer or documentation worker.

Allowed actions: Read and propose changes; edit only if assigned a disjoint write scope.

Verification evidence: Findings with file paths, headings, and required updates.

Handoff format: Findings ordered by severity, with risks and follow-ups.

Stop conditions: Requirements ambiguity, architecture mismatch, shared-file conflict, unclear verification, or sensitive data concern.

### Module Reviewer

Objective: Check whether module contracts and registry entries expose the fields needed by the selected rail.

Scope boundary: `docs/modules/` and `docs/framework/module-registry.md`.

Dependencies: Shared goal, feature package, decomposition plan, relevant rail docs.

Conflict zones: Module registry and handbook references shared with other reviewers; no edits without integration-owner assignment.

Context bundle: Feature spec, module docs, registry, relevant adapter decisions.

Agent role or capability: Read-only explorer or module-contract reviewer.

Allowed actions: Read and propose changes; edit only if assigned a disjoint write scope.

Verification evidence: Findings with module names, file paths, contract gaps, and suggested routing outcome.

Handoff format: Findings ordered by severity, with risks and follow-ups.

Stop conditions: Missing module ownership, conflicting contracts, unclear adapter status, or unsafe permission needs.

### Verification Reviewer

Objective: Check whether validation, review, and memory evidence can prove the integrated change.

Scope boundary: `scripts/check-template.ps1`, PR template, review notes, milestone, and memory pointers.

Dependencies: Shared goal, feature package, decomposition plan, expected acceptance criteria.

Conflict zones: Checker and PR template are shared validation surfaces; no edits without integration-owner assignment.

Context bundle: Feature spec, tasks, test plan, checker, review file, milestone, memory files.

Agent role or capability: Read-only verification reviewer.

Allowed actions: Run or inspect checks if permitted; otherwise read and propose validation changes.

Verification evidence: Command results, uncovered risks, missing checks, and source file references.

Handoff format: Findings ordered by severity, with skipped checks and follow-ups.

Stop conditions: Verification cannot be run, evidence contradicts acceptance criteria, or failure cause becomes unclear.

## Fan-Out

The integration owner gives every worker the shared goal, relevant feature package, scope boundary, conflict zones, allowed actions, evidence format, and stop conditions.

Workers stop instead of editing when they find ambiguous requirements, architecture mismatch, shared-file conflicts, unclear verification, or sensitive data concerns.

## Fan-In

The integration owner combines findings, resolves conflicts, makes final edits, runs integrated verification, and records review and memory updates.

## Verification

- Worker-local evidence is not enough for merge readiness.
- Integrated verification must cover the full feature acceptance criteria.
- Any recurring or unclear failure routes to diagnosis before more patching.

## Memory

Record durable lessons in implementation notes first, then promote stable findings to decisions, known issues, patterns, history ledger, or retrieval index.

## Stop Conditions

- Work units overlap in the same file without an integration plan.
- Any worker needs permissions not listed in the contract.
- The shared goal changes.
- Verification cannot prove the combined behavior.
