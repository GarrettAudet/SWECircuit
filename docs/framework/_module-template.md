# Module Template

## Module Name

Name the reusable workflow capability.

## Status

Use one of: `accepted-file-contract`, `optional-adapter`, `watch`, `deferred`, `rejected`.

## Purpose

State the problem this module solves.

## When To Use

- List triggers that make this module useful.

## When Not To Use

- List cases where the default workflow is enough.

## Input

- Required source artifacts, decisions, files, commands, or user context.

## Action

State the transformation, decision, retrieval, execution, verification, synthesis, or recording step.

## Output

- Required artifacts, evidence, decisions, memory updates, or handoffs.

## Gate

State the evidence required to continue and the route when it is missing.

## Outcome

Use only: `pass`, `fix`, `diagnose`, `clarify`, `redesign`, `split`, `block`, or `learn`.

## Artifacts

- Inputs preserved.
- Intermediate evidence.
- Final output.
- Memory or handoff records.

## Adapter

State whether the module is file-based or name optional tools that can implement or accelerate it.

## Stage Hooks

| Workflow Stage | Module Behavior |
| --- | --- |
| Intake | State what the module needs at intake. |
| Clarify | State what ambiguity the module resolves. |
| Spec | State what the module adds to requirements. |
| Architecture check | State design or ADR impact. |
| Task plan | State decomposition, dependencies, or sequencing. |
| Implement | State execution boundaries. |
| Verify | State evidence required. |
| Review | State review checks. |
| Memory update | State durable records to update. |

## Context Bundle

- Files, docs, snapshots, memory entries, tests, or commands the agent should retrieve.

## Verification

- Commands, manual checks, review checks, or evidence required.

## Failure Modes

| Failure Mode | Routing |
| --- | --- |
| Requirements unclear | `clarify` |
| Design conflict | `redesign` |
| Repeated or unclear failure | `diagnose` |
| Scope expands | `split` |
| Missing authority or safety concern | `block` |

## Adapter Options

- Name optional external tools that could implement or accelerate this module.

## Adoption Criteria

- Conditions that justify promoting or installing this module or adapter.

## Rollback

- How to remove or disable this module without losing source evidence.

## Memory Updates

- Decisions, known issues, patterns, glossary terms, history ledger entries, and retrieval-index entries to update.
