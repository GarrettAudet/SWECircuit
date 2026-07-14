# Decomposition Plan: V10 Executor Boundary Review

## Status

Active.

## Goal

Independently challenge the V10 executor boundary before code freezes it, using distinct read-only work units for architecture and API coherence, authorization and cancellation safety, and developer experience and testability.

## Source Artifacts

- Feature package: `docs/specs/v10-executor-adapter/`
- Architecture or ADR: `docs/architecture/decisions/0001-executable-kernel-foundation.md` and `docs/architecture/decisions/0002-bounded-executor-boundary.md`
- Research snapshot: `docs/research/snapshots/2026-07-14-v10-executor-boundary-scan.md`
- Relevant memory: `docs/memory/active-context.md`, `decisions.md`, `known-issues.md`, `history-ledger.md`, and `retrieval-index.md`

## Branch And State

- Source branch: `codex/v10-executor-adapter`
- Target branch: `codex/v10-executor-adapter`
- Baseline commit or state: `2b7bef37fb2477e3fc8779171c5971a3db42f20b`
- Dirty state: feature-package planning changes only before fan-out
- Approval gate: independent review must return no unresolved high-severity finding before implementation
- Merge target: no merge during review; the primary IDE agent remains integration owner

## Module Selection

| Needed Capability | Module | Reason |
| --- | --- | --- |
| Architecture | Architecture review | Test whether the port, grant, result, and event boundaries form the smallest coherent increment. |
| Security | Security review | Challenge authority, mutation, privacy, abort races, and false-terminal claims. |
| Developer experience | Review | Test embedding ergonomics, failure semantics, and minimal documentation. |
| Integration | Verification and review | Reconcile findings against AC1 through AC8 before code. |

## Decomposition Summary

Review should fan out because each unit evaluates a separate quality dimension and performs no edits. Implementation remains local and blocked only by unresolved high-severity findings, while the integration owner prepares non-overlapping test and API details.

## Dependency Graph

```txt
V10 spec + research + proposed ADR
  -> architecture/API review
  -> authorization/cancellation review
  -> DX/testability review
all handoffs -> integration owner -> architecture review -> ADR disposition -> implementation
```

## Work Units

### Work Unit A: Architecture And API Coherence

Objective: determine whether one host-injected adapter, one invocation-scoped grant, one packet, and one returned journal form a coherent provider-neutral execution boundary.

Scope boundary: public 0.x interfaces, lifecycle ownership, artifact/runtime separation, and compatibility only; no edits or provider selection.

Likely files or docs: V10 spec, plan, ADR 0002, ADR 0001, model and public types, validation and trace APIs.

Dependencies: V9 executable baseline and V10 research snapshot.

Conflict zones: none; read-only.

Context bundle: source artifacts above plus `src/index.ts`, `src/types.ts`, `src/model.ts`, `src/validate.ts`, and `src/trace.ts`.

Agent role or capability: senior framework and runtime API architect.

Allowed actions: read repository files and return section-linked findings; no edits, commands that mutate state, network use, installation, commits, or merges.

Verification evidence: explicit PASS or REVISE verdict, prioritized findings, validated choices, and smallest corrective design.

Handoff format: verdict, must-fix findings, should-fix findings, validated choices, assumptions, and ADR recommendation.

Stop conditions: the design requires a new canonical artifact kind, public protocol, provider choice, or product decision outside approved V10 scope.

### Work Unit B: Authorization, Privacy, And Cancellation Safety

Objective: adversarially assess whether grant binding, permission coverage, frozen inputs, result normalization, and cancellation semantics fail closed without claiming sandboxing.

Scope boundary: threat model and negative-test obligations only; no implementation edits or execution of adapters.

Likely files or docs: V10 spec, plan, test plan, ADR 0002, permission helpers, RunEvent schema, privacy rules, and research snapshot.

Dependencies: proposed V10 contract.

Conflict zones: none; read-only.

Context bundle: source artifacts above plus `src/permissions.ts`, `src/privacy.ts`, `schemas/v1alpha1/run-event.schema.json`, and `adapter-manifest.schema.json`.

Agent role or capability: application security and distributed-lifecycle reviewer.

Allowed actions: read and reason from repository evidence; no edits, external execution, secret access, network use, installation, or state mutation.

Verification evidence: threat-ranked findings, required invariants, abort-race scenarios, and negative tests mapped to acceptance criteria.

Handoff format: verdict, threat summary, must-fix findings, required tests, safe choices, residual risks, and ADR recommendation.

Stop conditions: safety would require a real sandbox, privileged host, provider credential, or unverifiable external guarantee.

### Work Unit C: Developer Experience And Testability

Objective: assess whether an IDE or adapter author can understand, implement, test, and recover from the V10 boundary without mistaking it for a scheduler or provider runtime.

Scope boundary: embedding ergonomics, naming, result semantics, examples, compatibility, and test design; no visual or marketing redesign.

Likely files or docs: README, handbook quick path, V10 package, ADR 0002, package exports, and current consumer tests.

Dependencies: proposed API and non-goals.

Conflict zones: none; read-only.

Context bundle: source artifacts above plus `README.md`, `docs/ai/handbook.md`, `src/index.ts`, and clean-consumer test patterns.

Agent role or capability: developer-tools API and testing reviewer.

Allowed actions: read and return a structured handoff; no edits, dependency installation, provider calls, commits, or merges.

Verification evidence: first-use walkthrough, ambiguity findings, minimum example, and testability recommendations.

Handoff format: verdict, usability blockers, simplifications, validated choices, test gaps, and acceptance recommendation.

Stop conditions: a recommendation requires a CLI, hosted service, stable package name, or real provider integration in V10.

## Fan-Out Plan

- Start all three read-only units from the same feature and architecture package.
- No unit may edit shared files, so the run has no write conflict zone.
- The integration owner continues refining the concrete API and tests without duplicating the assigned reviews.

## Fan-In Plan

- Integration owner: primary IDE agent.
- Merge order: no code merge; synthesize security findings first, then architecture, then developer experience.
- Conflict-resolution approach: prefer fail-closed behavior, honest lifecycle evidence, and the smallest embeddable surface.
- Integrated verification: map every must-fix finding to ADR text, a task, and an automated test obligation.
- Review owner: primary IDE agent, with final branch merge still gated by the human owner.

## Verification Matrix

| Work Unit | Local Evidence | Integrated Evidence |
| --- | --- | --- |
| A | API and lifecycle findings | Coherent ADR and public type boundary |
| B | Threats, invariants, and negative tests | Fail-closed preflight and honest cancellation semantics |
| C | First-use walkthrough and test gaps | Minimal docs, deterministic test executor, and consumer test |

## Stop Or Redesign Triggers

- A declaration can become authority without an explicit host grant.
- Cancellation can create a false terminal event while work may still be live.
- The kernel must dynamically load code, execute a shell, or persist sensitive provider output.
- Two reviewers identify the same high-severity API ambiguity.
- A new artifact version or external dependency becomes necessary.

## Memory Updates

- History ledger: record the V10 review run and final version outcome.
- Retrieval index: add the feature package, ADR, research snapshot, review, and milestone.
- Decisions: add the accepted executor and authority boundary after verification.
- Known issues: preserve cooperative-cancellation and host-sandbox limitations.
- Patterns: promote the host-grant and honest-terminal patterns if implementation proves them.
