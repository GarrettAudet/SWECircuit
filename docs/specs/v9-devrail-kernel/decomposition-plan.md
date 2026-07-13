# Decomposition Plan

## Status

Complete.

## Goal

Independently review ADR 0001 before SWECircuit freezes its first executable contracts, using bounded read-only work units that test architecture coherence, security and trace safety, and developer experience without duplicating implementation work.

## Source Artifacts

- Feature package: `docs/specs/v9-devrail-kernel/`
- Architecture: `docs/architecture/decisions/0001-executable-kernel-foundation.md`
- Research: `docs/research/snapshots/2026-07-09-v9-kernel-architecture-scan.md`
- Memory: `docs/memory/active-context.md`, `docs/memory/decisions.md`, and `docs/memory/known-issues.md`

## Branch And State

- Source branch: `codex/v9-devrail-kernel`
- Target branch: `codex/v9-devrail-kernel`
- Baseline commit: `35f96d2`
- Dirty state before fan-out: clean
- Approval gate: owner acceptance or revision of ADR 0001 before executable contracts are frozen
- Merge target: no merge; read-only handoffs return to the integration owner

## Module Selection

| Needed Capability | Module | Reason |
| --- | --- | --- |
| Architecture | Architecture review | Challenge long-lived runtime, schema, and compatibility choices. |
| Security | Security review | Test privacy, permissions, path handling, traces, and adapter boundaries. |
| Developer experience | Review | Test whether the proposed kernel stays simple to adopt and evolve. |
| Integration | Verification and review | Reconcile findings against evidence and the product goal. |

## Decomposition Summary

The review can fan out because each unit evaluates a distinct quality dimension and makes no edits. All units share the same ADR and feature package, return evidence-ranked findings, and leave synthesis and any document changes to the integration owner.

## Dependency Graph

```txt
V9 spec + research + ADR
  -> architecture/API review
  -> security/trace review
  -> developer-experience/evolution review
all handoffs -> integration owner -> ADR decision brief -> owner gate
```

## Work Units

### Work Unit A: Architecture And API Coherence

Objective: determine whether the proposed runtime, package shape, canonical data, validation layers, and compatibility policy form the smallest coherent executable kernel.

Scope boundary: ADR architecture and public-contract choices only; no naming, license, visual, or implementation edits.

Likely files or docs: ADR 0001, V9 spec, plan, tasks, test plan, and architecture scan.

Dependencies: approved SWECircuit repository identity and V8.2 baseline.

Conflict zones: none; read-only.

Context bundle: goal, ADR, V9 package, research snapshot, active context, and known issues.

Agent role or capability: senior framework/API architect.

Allowed actions: read repository files and return findings; no edits, commits, network changes, or dependency installation.

Verification evidence: prioritized findings tied to exact sections, explicit recommendation, and unresolved owner decisions.

Handoff format: verdict, must-fix findings, should-fix findings, validated choices, assumptions, and recommended ADR disposition.

Stop conditions: evidence needed outside the supplied sources, product intent ambiguity, or a recommendation that materially expands V9 scope.

### Work Unit B: Security, Privacy, And Trace Safety

Objective: adversarially review event persistence, redaction, path handling, permissions, liveness records, and adapter metadata for unsafe defaults or unverifiable claims.

Scope boundary: security and operational safety of modeled contracts; no runtime implementation or edits.

Likely files or docs: ADR 0001 security, event, liveness, adapter, and verification sections; V9 risks and test plan.

Dependencies: proposed architecture only.

Conflict zones: none; read-only.

Context bundle: ADR, V9 spec and test plan, architecture scan, V8.1 liveness RCA, and known issues.

Agent role or capability: application security and observability reviewer.

Allowed actions: read and analyze; no edits, execution of untrusted content, secrets access, or external changes.

Verification evidence: threat-oriented findings, missing invariants, required negative fixtures, and a go/revise recommendation.

Handoff format: threat summary, must-fix findings, test obligations, safe choices, residual risks, and recommendation.

Stop conditions: review would require secret data, live adapters, or assumptions about future hosted infrastructure.

### Work Unit C: Developer Experience And Evolution

Objective: assess whether init, validate, trace inspect, JSON manifests, diagnostics, compatibility, and one-package distribution remain understandable for first-time users and extensible for future agents.

Scope boundary: developer workflow, ergonomics, migration, and version evolution; no visual redesign or edits.

Likely files or docs: README, ADR 0001, V9 spec, plan, tasks, test plan, handbook quick path, and framework contracts.

Dependencies: current checked protocol and proposed executable boundary.

Conflict zones: none; read-only.

Context bundle: public README, ADR, V9 package, handbook quick path, and 0.x compatibility guidance.

Agent role or capability: developer-tools and SDK reviewer.

Allowed actions: read and return a structured handoff; no edits, dependency installation, or API invention beyond bounded recommendations.

Verification evidence: first-run walkthrough, complexity risks, compatibility gaps, and recommended minimum public surface.

Handoff format: usability verdict, must-fix findings, simplifications, validated choices, and acceptance recommendation.

Stop conditions: recommendation changes product positioning, requires a hosted service, or needs user research not present in the repository.

## Fan-Out Plan

- Start all three read-only units from baseline `35f96d2`.
- No unit may edit shared files, so there are no write conflicts.
- The integration owner continues local evidence review while the units run.

## Fan-In Plan

- Integration owner: primary IDE agent.
- Merge order: no code merge; synthesize A, B, then C by severity and contract impact.
- Conflict resolution: prefer source-backed safety and simplicity; surface product tradeoffs to the owner.
- Integrated verification: compare every must-fix finding to ADR sections, acceptance criteria, and planned fixtures.
- Review owner: primary IDE agent, with final technical freeze gated by the human owner.

## Verification Matrix

| Work Unit | Local Evidence | Integrated Evidence |
| --- | --- | --- |
| A | Section-linked architecture findings | ADR coverage and coherent public boundary |
| B | Threats, invariants, and fixture obligations | Security/privacy requirements mapped to schemas and tests |
| C | First-run and evolution analysis | Minimum CLI and compatibility surface mapped to AC1, AC2, and AC7 |

## Stop Or Redesign Triggers

- A reviewer identifies a public contract with no source evidence.
- Two reviewers independently find the same high-severity ambiguity.
- Security requires executing third-party code in V9.
- The minimum kernel cannot remain init, validate, and trace inspect.
- Owner product intent is required to choose between incompatible public behaviors.

## Memory Updates

- History ledger: record the architecture review run when integrated.
- Retrieval index: add the run and final ADR decision brief.
- Decisions: update only after ADR disposition is accepted.
- Known issues: record unresolved safety or compatibility limits.
- Patterns: promote only a reusable review or decomposition lesson with source evidence.
