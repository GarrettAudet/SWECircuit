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

| Work Unit | Scope | Allowed Actions | Evidence |
| --- | --- | --- | --- |
| Rail reviewer | `docs/rails/` and related handbook references | Read and propose changes; edit only if assigned | Findings with file paths and required updates |
| Module reviewer | `docs/modules/` and module registry | Read and propose changes; edit only if assigned | Findings with module names and contract gaps |
| Verification reviewer | checker, PR template, review notes | Run checks and inspect validation coverage | Command results and uncovered risks |

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
