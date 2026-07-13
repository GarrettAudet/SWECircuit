# V9 Schema Orchestration Run

## Status

Complete.

## Goal

Independently challenge the v1alpha1 field model and malformed-fixture coverage while the integration owner authors the canonical schemas.

## Pattern Chosen

Read-only specialist subagents with centralized schema ownership.

## Why This Pattern

Schema authoring was tightly coupled and stayed with one integration owner. Contract fidelity and adversarial fixture design were independent, read-heavy checks that could run without write conflicts.

## Source Artifacts

- Feature package: docs/specs/v9-devrail-kernel/
- Decomposition plan: docs/specs/v9-devrail-kernel/schema-decomposition-plan.md
- Architecture: docs/architecture/decisions/0001-executable-kernel-foundation.md
- Contract: schemas/v1alpha1/README.md
- Schemas and catalog: schemas/v1alpha1/
- Fixtures and tests: test/fixtures/, test/schema-contract.test.mjs, and test/schema-fixtures.test.mjs

## Branch And State

- Source branch: codex/v9-devrail-kernel
- Target branch: codex/v9-devrail-kernel
- Baseline commit: 5e44035
- Dirty state before fan-out: schema decomposition plan and run shell only
- Approval gate: integration-owner schema freeze after both handoffs and tests
- Merge target: none for reviewer handoffs

## Roster

| Agent Or Role | Work Unit | Authority | Stop Condition |
| --- | --- | --- | --- |
| Primary IDE agent | Schema author and integration owner | Own schemas, fixtures, tests, synthesis, and final verification. | Stop if ADR behavior is ambiguous or scope expands. |
| Volta (019f5c74-2e9a-79d3-91d0-2c8dd6464dad) | A: contract fidelity | Read and recommend only. | Stop on undecided product behavior or unsupported field invention. |
| McClintock (019f5c74-42bb-7b42-a656-085931a95f5a) | B: adversarial fixtures | Read and recommend only. | Stop before unsafe execution, secrets, or future runtime behavior. |

## Work-Unit Contract References

| Work Unit | Contract Source | Scope Boundary | Conflict Zones | Allowed Actions | Verification Evidence | Handoff Format |
| --- | --- | --- | --- | --- | --- | --- |
| A | schema-decomposition-plan.md Work Unit A | Human-to-machine field fidelity | None; read-only | Inspect and report | Source-linked field matrix | Required, deferred, invariants, risks, verdict |
| B | schema-decomposition-plan.md Work Unit B | Negative fixture coverage | None; read-only | Inspect and report | ADR-linked fixture matrix | Case, layer, rule, impact, platforms |

## Fan-Out Log

| Step | Agent Or Role | Work Started | Context Bundle |
| --- | --- | --- | --- |
| 1 | Volta | Contract-fidelity review | ADR, V9 package, framework and agent templates |
| 1 | McClintock | Adversarial-fixture review | ADR, security review, test plan, RCA, known issues |
| 1 | Integration owner | Canonical schema draft | Accepted architecture plus existing contracts |
| 2 | Integration owner | Review integration | Both read-only REVISE handoffs and passing local schema tests |

## Handoffs

| Agent Or Role | Output | Evidence | Risks | Follow-Ups |
| --- | --- | --- | --- | --- |
| Volta | REVISE | Per-kind field matrix, deferred fields, invariants, and three must-fix gaps | Undefined permission relationship, cycle/join legality, and compatibility grammar | Define exact ceilings, graph rules, and API-only compatibility |
| McClintock | REVISE | Parser, dispatch, schema, reference, graph, trace, path, limit, diagnostics, permission, and privacy matrix | Unfrozen diagnostics, ambiguous secret handling, and an unreachable edge limit | Freeze catalog and pointers, make secret suppression warning-only, lower edge ceiling, preserve platform variants |

## Integration Notes

- Merge order: contract fidelity, adversarial coverage, then local schema-test evidence.
- Conflicts found: none between reviewers; both required revision before freeze.
- Decisions made: use one explicit Project artifact list; distinguish instance identity from versioned definitions; require eventTypeVersion while making time optional; define exact API-only compatibility; use Module requirements and WorkPacket permission ceilings; require route port transfers; declare fan-out and fan-in; bound every cyclic route; lower the edge ceiling to 10,000; freeze diagnostics and privacy behavior.
- Deferred recommendation: WorkPacket keeps source baseline fields because branch and commit traceability are central to bounded parallel development, but mutable worker state remains excluded.
- Integrated behavior: schemas validate declarations only and do not launch, grant, write, fetch, or merge.

## Verification

- Worker-local evidence: two complete read-only REVISE handoffs; no worker changed files or installed dependencies.
- Integrated commands: template checker passed; all seventeen checker regressions passed; format, lint, typecheck, build, tests, and dry-run package inspection passed.
- Schema evidence: eleven tests cover strict registry compilation, valid examples for all six kinds, closed object boundaries, parallel fan-out, permission and privacy rejection, compatibility rejection, terminal-state conditions, optional timestamps, local-only references, parser failures, and diagnostic-matrix consistency.
- Package evidence: dry-run tarball includes all six schemas, common definitions, the contract README, and diagnostic catalog.
- Skipped checks: semantic project validation and trace reconstruction execute in T006 through T008; native path variants execute in the CI matrix when their implementation exists.

## Review

- Review outcome: PASS after integrated revisions.
- Findings resolved: permission vocabulary and ceiling, join policy, bounded cycles, package compatibility deferral, event versioning, diagnostics, JSONL pointers, secret suppression, and independently reachable limits.
- Residual risks: semantic implementation, native path behavior, complete trace matrix, public README visual, and unselected license remain open.

## Memory Updates

- History ledger: record the completed T005 schema gate.
- Retrieval index: add the v1alpha1 contract, diagnostic catalog, case matrix, and run.
- Decisions: record the frozen v1alpha1 authority and composition model.
- Known issues: no new blocker; implementation coverage remains active work.
- Patterns: evaluate schema-first adversarial review after V9 dogfood.

## Completion Handoff

- Summary: two independent REVISE handoffs were integrated into one smaller, stricter v1alpha1 contract.
- Files changed: schemas/v1alpha1/, test/fixtures/, schema tests, ADR edge ceiling, and this work package.
- Evidence: eleven schema/fixture tests plus the existing workflow verification layer.
- Approval gate: integration-owner PASS; T006 may begin.
