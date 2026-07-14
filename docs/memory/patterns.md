# Patterns

## Workflow Patterns

### Simple Surface, Deep Protocols

Keep the first thing a user sees simple, but make deeper protocols available when complexity appears.

### Typed Stage Outcomes

Every workflow stage emits one of:

```txt
pass | fix | diagnose | clarify | redesign | split | block | learn
```

This prevents vague handoffs and makes loops explicit.

### Diagnosis Before Broad Fixes

When a failure is unclear or recurring, reproduce it, gather evidence, test hypotheses, and confirm root cause before broad implementation changes.

### Version Dogfooding

When a workflow version is complete, use that version for the next workflow-stack change. Record friction in the feature package and promote durable fixes into the next version.

### Development Milestone

When a version finishes, create a short milestone overview that summarizes goal, shipped changes, evidence, approval gate, residual risks, and next work. Use it to notify the user.

### Milestone Approval Gate

Every version milestone should state source branch, target branch, current merge state, required human decision, and post-approval merge action. This keeps approval state visible without turning the milestone into a full release log.

### Branch Baseline Loop

Use a clean baseline branch, create a version branch, complete feature package and review, write the milestone, get approval, then merge back to the stable baseline.

### IDE Workflow Visibility

For meaningful IDE work, show workflow or branch, stage, active artifact, assumptions, evidence, next action, verification state, and approval gate in concise chat updates.

### Standalone Agent Work Package

For one agent owning a meaningful goal end to end, define goal, completion evidence, scope, authority, context bundle, independence readiness, verification plan, stop conditions, handoff, and memory updates.

### Read-Only Fan-Out Before Write Fan-Out

When proving a new orchestration workflow, start with read-only review agents on disjoint scopes. Preserve handoffs, synthesize through one integration owner, then move to write-enabled fan-out only after branch state, conflict zones, contracts, and verification evidence are explicit.

### Parallel Work-Unit Contract

Do not fan out work until each unit has objective, scope boundary, likely files, dependencies, conflict zones, context bundle, agent role, verification evidence, handoff format, and stop conditions.

### Integration Owner

Parallel agents can explore and implement slices, but one owner must integrate, verify, review, and record lessons across the full change.

### Modular Framework Kernel

Keep the core workflow file-based and stable, then use modules and optional adapters to plug in best-in-class practices only when they solve a real problem.

### Adapter Evaluation Before Installation

Before adding a tool dependency, preserve a dated source snapshot, evaluate fit, record the practice-register decision, update the module registry, and define rollback.

### Decomposition As The Scaling Artifact

For many agents, create one shared goal, a dependency graph, conflict zones, bounded work-unit contracts, fan-in plan, integrated verification, and memory updates.

### Diagnosis Fan-Out Before Fix Fan-Out

When one ticket reveals bug after bug, parallelize reproduction, evidence gathering, history review, related-code inspection, and hypothesis tests before applying fixes.

### Parser-Consumer Boundary Probe

Dependency spikes must pass real parser output into downstream validators, especially arrays of objects that trigger equality or uniqueness logic. Preserve duplicate-aware structural checks, then materialize ordinary JSON values only after strict parsing succeeds when a consumer requires standard object prototypes.

### Decision Seam Before Native Fixture

Extract deterministic security classification from operating-system mechanics. Test the decision seam on every platform, retain native fixtures for observable integration behavior, and defer only metadata the approved runtime genuinely cannot inspect.

### Capability Adapter

When an external project has a useful practice but should not become a dependency, extract the capability as a SWECircuit contract, preserve a dated source scan, and keep installation optional.

### Skills-Driven Development Transition

Use a triggered-skill style bridge from idea to spec to approved implementation plan when the user intent is still forming and the agent needs readable checkpoints before code.

### Orchestration Compiler

For larger multi-agent work, synthesize project-specific roles, scopes, handoffs, critic duties, synthesis duties, permissions, and integration order from repository context before fan-out.
### Circuit Composition

Model meaningful work as `input | module | module | output`. Each module has input, action, output, gate, and outcome so the same primitive can represent features, diagnosis, adapters, releases, and multi-agent decomposition.

### Gate As Router

A gate decides whether a circuit continues, loops, splits, blocks, diagnoses, or records learning. Failed gates must emit typed outcomes instead of becoming silent retries.
### Circuit And Module Catalogs

Normalize reusable workflow behavior into catalog entries. Circuits compose modules; modules expose input, action, output, gate, outcome, artifacts, and adapter.

### Swappable Review Gates

Architecture review (`architecture_review`), security, performance, documentation, and other focused reviews should be modeled as modules. Insert them into circuits where their gates matter, require evidence and a typed outcome, and delegate to a dedicated subagent only after scope, context, authority, and handoff are clear.

### Pack Field Conformance

Official packs need field-level checks for status, provides, requirements, permissions, contracts, verification, maintenance, and recommendation evidence. Heading checks make packs visible; field checks make them safer to use.

### Packs Before Core

Community and ecosystem extensions should start as packs. Promote into recommended or core status only after conformance, dogfooding, permissions review, rollback, and maintainer ownership are clear.

### Optional Downloads

External best-practice tools are optional downloads or adapters. Core SWECircuit must remain useful with only files, templates, checks, review, and memory.

### Bound Before Materialization

Enforce count and output ceilings while constructing retained state, not after every input has been materialized. Continue only the minimum scan needed to preserve higher-priority diagnostics.

### Ceiling Is Not Allocation

Treat a resource limit as the maximum accepted input, not the default buffer size. Allocate from verified input state plus only the margin needed to detect growth or truncation.

### Executable Coverage Claims

Give case-matrix variants stable names and bind them from table-driven tests. A coverage statement should fail automatically when its executable evidence disappears.

## Memory Patterns

### Source First, Summary Second

Preserve feature packages, evidence, snapshots, debug notes, RCA, and review notes before writing compact memory summaries.

### Ledger Plus Index

Use `history-ledger.md` for chronological traceability and `retrieval-index.md` for fast lookup by topic, feature, stage, file, or decision.

## Documentation Patterns

### Agent Contract And Router
Keep `AGENTS.md` as the must-follow agent contract and routing index. Put long explanations, examples, and detailed protocols in the handbook, circuits, modules, packs, feature packages, research snapshots, or memory files.

### One Handbook

Keep process guidance in `docs/ai/handbook.md` unless a separate artifact is required for work execution.

### Professional Public Surface

A framework repository should expose contribution, security, support, conduct, changelog, docs index, file architecture, quality standards, issue templates, and CI validation as part of the baseline. The checker should require these files so repository polish remains durable.
### File-Based First

Start with Markdown and a local checker. Add tools only when they remove real friction.



### Repo Concept Visual

For a public framework README, the first visual should explain the user-level path, not the internal implementation map. Make the product, primitive, and outcome legible in seconds.
### Comprehension Before Visual Polish

For public README visuals, teach the reader's product story before internal framework vocabulary. Use one accepted primary visual and concise text; keep animations only when they clarify a specific state change.
### Deterministic Text-Heavy Visuals

For README or docs visuals with exact labels, prefer deterministic source generation over opaque one-off images. Keep tracked output assets, preserve the generator when practical, inspect representative frames, and link the feature package that explains the visual change.

### Accepted Asset Over Generated Substitute

When the owner supplies and approves a public asset, preserve that exact artifact and build the copy hierarchy around it. Do not replace it with another generated interpretation unless a new version explicitly reopens the design.

### Current Capability Versus Target Model

When a public visual shows an intended end-to-end system, state which steps the current release executes and which remain human-, IDE-, or adapter-driven.

### Visual Semantics Are Contract

Review a public workflow visual for actor, order, terminology, and scaled legibility. Adjacent prose cannot repair a diagram that assigns execution to the wrong system or places integration before evidence.

### Literal Quick Start Replay

Execute documented commands with their literal relative arguments and compare the complete example tree before and after read-only operations. Testing equivalent absolute paths or only one input file leaves documentation drift and side effects unproved.

### Positive Exceptions For Negative Rules

Pair public-claim rejection tests with passing provenance links and truthful negations. A rule that blocks overclaims must not erase history or reject accurate limitations.

### Measure Semantics, Observe Timing

For workflow dogfood, assert deterministic step order, outcomes, diagnostics, mutations, recovery, and cleanup while treating duration as environment-qualified observation data. Normalize timing before repeatability comparison and require a separate benchmark design before making performance claims.

### Rebind Evidence After Review

When review changes code that produced a measured artifact, rerun the final implementation, replace the observation, recompute its digest, and update every binding. A previously valid report becomes stale evidence after a causal implementation fix.

### Negative Fixtures For Semantic Checks

A structural checker needs permanent malformed-artifact fixtures. A positive pass proves the repository fits the checker; negative fixtures prove the checker rejects the failure modes it claims to enforce.

### Bounded Worker Recovery

Parallel work needs explicit deadlines, observable worker state, typed failure outcomes, and a single integration owner who can retry, narrow, or recover a failed unit without hiding the failure. When the runtime cannot enforce the deadline, record the still-running attempt and manual closure rather than presenting the retry as automatic.
### Literal Replay For Generated Scripts

When a generated or mechanically edited script is corrupted, restore that file from a known branch baseline and replay bounded edits through literal, boundary-checked transformations. Validate syntax after every rewrite; do not pass source containing dollar signs through regex replacement-string semantics.
### Pending Ownership Before Cleanup

A successful filesystem create is not safe to remove until the creator captures and later rechecks its identity. Track the create-to-capture interval explicitly; when capture or ownership proof fails, preserve the path and report incomplete cleanup. Once identity is captured, begin cleanup protection before callbacks, child creation, or any other fallible setup action.

### Barrier At The Contended Boundary

A concurrency test proves a race only when every participant reaches a barrier after preflight and immediately before the same exclusive mutation. Readiness before entering the operation can pass while exercising only ordinary collision detection.

### Lockfile-Driven Offline Consumer

A clean package-consumer gate should pack the actual artifact, derive the exact production dependency closure from the pinned lock, install with a run-owned or repository-owned cache in offline mode, resolve the installed entry canonically, execute supported operations, and identity-check cleanup. Cached tarballs alone are not enough for loose offline dependency resolution.

### Positive Read Authority

A read-only reviewer contract must name the local inspection commands or tools it may use. "Do not run commands" can accidentally prohibit the evidence retrieval required for review; forbid mutations, installs, tests, network, and external actions separately from allowed reads.

### Immutable Acceptance Candidate

Freeze the complete implementation, milestone, and memory state before the final gate. Run CI and independent review against that exact commit, then use a bounded evidence-only attestation to record the commit, run, and verdict without implying that earlier evidence covered later files.

### Host-Injected Executor Port

Keep declarative manifests non-executable. Let the embedding host inject trusted code through one small typed port, bind it to one checked runtime grant, and retain host ownership of isolation, credentials, persistence, scheduling, and integration.

### Three-Direction Permission Coverage

Before invocation, prove that every manifest request is granted, every grant entry was requested, and every grant entry fits inside the work-packet ceiling. No single direction is sufficient, and the checked relationship still does not prove host enforcement.

### Honest Abort State

Treat cancellation as observed protocol state, not a wish. An abort or deadline that wins before invocation can be terminal because no executor work started. After invocation, emit a terminal cancellation or timeout only when settlement is observed before an acknowledgment bound anchored to the abort observation; otherwise retain a non-terminal potentially-live state.

### Absolute Monotonic Bound

Represent timeout and acknowledgment as absolute monotonic points. Treat timers as wake-up hints that may fire early, re-arm after early wake-ups, compare settlement observation timestamps to the bound, and place the final check beside the effectful call.

### Proxy Before Reflection

Reject detectable proxies before `Array.isArray`, prototype, key, descriptor, signal, or method reflection. Bound array length or object key count before descriptor traversal, then read descriptors individually without invoking accessors.

### Independent Declaration Consumer

Public declarations must compile from the installed tarball under consumer-owned compiler settings. Internal source typechecking cannot prove emitted declaration portability, package completeness, root-export narrowing, or installed documentation integrity.

### Snapshot And Timestamp Together

When asynchronous provider-owned data is attributed to an observation time, detach and normalize it in the fulfillment observer before recording the timestamp. Carry only the immutable snapshot into later continuations so queued mutation cannot rewrite earlier evidence.

### Whole-Contract Closeout Search

A focused review file list does not prove repository-wide semantic consistency, and one literal query does not prove semantic coverage. Before closing a cross-document contract change, define and inspect a claim-family search across tracked specs, plans, governance, architecture, guides, milestones, and memory; include synonyms and opposite-path terms; and preserve reviewer verdicts only for the scope they actually inspected.

## Source Map

Each named pattern maps to the strongest existing source artifact. Patterns sharing the same provenance are grouped.

| Source Artifacts | Named Patterns |
| --- | --- |
| [V1 milestone](../milestones/v1.md) | Simple Surface, Deep Protocols; One Handbook; File-Based First |
| [Handbook state machine](../ai/handbook.md#4-state-machine) | Typed Stage Outcomes |
| [Handbook problem-solving protocol](../ai/handbook.md#8-problem-solving-and-root-cause-protocol) | Diagnosis Before Broad Fixes |
| [V2 spec](../specs/v2-dogfood-parallel-agents/spec.md) | Version Dogfooding; Parallel Work-Unit Contract; Integration Owner; Diagnosis Fan-Out Before Fix Fan-Out; Source First, Summary Second; Ledger Plus Index |
| [V3 spec](../specs/v3-milestones-and-branch-flow/spec.md) | Development Milestone; Branch Baseline Loop |
| [Approval-gate spec](../specs/v6-approval-gate-hardening/spec.md) | Milestone Approval Gate |
| [V4 spec](../specs/v4-agent-work-packages/spec.md) | IDE Workflow Visibility; Standalone Agent Work Package |
| [Dogfood-run spec](../specs/v6-orchestration-readiness-dogfood/spec.md) | Read-Only Fan-Out Before Write Fan-Out |
| [V5 spec](../specs/v5-modular-orchestration-framework/spec.md) | Modular Framework Kernel; Adapter Evaluation Before Installation; Decomposition As The Scaling Artifact |
| [Capability adapter snapshot](../research/snapshots/2026-07-08-capability-adapter-scan.md) | Capability Adapter; Skills-Driven Development Transition; Orchestration Compiler |
| [Rail Composition snapshot](../research/snapshots/2026-07-08-rail-composition-scan.md) | Circuit Composition; Gate As Router |
| [V6 catalog spec](../specs/v6-module-rail-catalog/spec.md) and [implementation notes](../specs/v6-module-rail-catalog/implementation-notes.md) | Circuit And Module Catalogs; Swappable Review Gates; Packs Before Core; Optional Downloads; Agent Contract And Router |
| [Pack conformance spec](../specs/v6-pack-conformance-checker/spec.md) | Pack Field Conformance |
| [Repository professionalization spec](../specs/v6-repo-professionalization/spec.md) | Professional Public Surface |
| [V8 root-cause analysis](../specs/v8-readme-visual-clarity/root-cause-analysis.md) and [implementation notes](../specs/v8-readme-visual-clarity/implementation-notes.md) | Repo Concept Visual; Comprehension Before Visual Polish; Accepted Asset Over Generated Substitute |
| [V7 implementation notes](../specs/v7-readme-demo-polish/implementation-notes.md) | Deterministic Text-Heavy Visuals |
| [V8.1 spec](../specs/v8.1-baseline-integrity/spec.md), [test plan](../specs/v8.1-baseline-integrity/test-plan.md), [debug notes](../specs/v8.1-baseline-integrity/debug-notes.md), [root-cause analysis](../specs/v8.1-baseline-integrity/root-cause-analysis.md), and [orchestration run](../specs/v8.1-baseline-integrity/orchestration-run.md) | Current Capability Versus Target Model; Negative Fixtures For Semantic Checks; Bounded Worker Recovery; Literal Replay For Generated Scripts |
| [V9 T006 RCA](../specs/v9-devrail-kernel/root-cause-analysis.md) and [validation run](../specs/v9-devrail-kernel/validation-orchestration-run.md) | Parser-Consumer Boundary Probe; Decision Seam Before Native Fixture |
| [V9 T007 initialization plan](../specs/v9-devrail-kernel/initialization-decomposition-plan.md) and [run](../specs/v9-devrail-kernel/initialization-orchestration-run.md) | Pending Ownership Before Cleanup; Barrier At The Contended Boundary |
| [V9 T008 trace plan](../specs/v9-devrail-kernel/trace-decomposition-plan.md) and [run](../specs/v9-devrail-kernel/trace-orchestration-run.md) | Bound Before Materialization; Ceiling Is Not Allocation; Executable Coverage Claims |
| [V9 T009 public-surface plan](../specs/v9-devrail-kernel/public-surface-decomposition-plan.md) and [run](../specs/v9-devrail-kernel/public-surface-orchestration-run.md) | Visual Semantics Are Contract; Literal Quick Start Replay; Positive Exceptions For Negative Rules |
| [V9 T010 dogfood plan](../specs/v9-devrail-kernel/dogfood-decomposition-plan.md), [run](../specs/v9-devrail-kernel/dogfood-orchestration-run.md), and [RCA](../specs/v9-devrail-kernel/root-cause-analysis.md#t010-dogfood-review-and-cleanup-rca) | Measure Semantics, Observe Timing; Rebind Evidence After Review |
| [V9 T011 final plan](../specs/v9-devrail-kernel/final-acceptance-decomposition-plan.md), [run](../specs/v9-devrail-kernel/final-acceptance-orchestration-run.md), and [RCA](../specs/v9-devrail-kernel/root-cause-analysis.md#t011-packed-consumer-gate-rca) | Lockfile-Driven Offline Consumer; Positive Read Authority; Immutable Acceptance Candidate |
| [V10 ADR](../architecture/decisions/0002-bounded-executor-boundary.md), [implementation review](../specs/v10-executor-adapter/review.md), [postimplementation RCA](../specs/v10-executor-adapter/root-cause-analysis.md#postimplementation-timing-and-reflection-rca), [exact-candidate RCA](../specs/v10-executor-adapter/root-cause-analysis.md#exact-candidate-settlement-detachment-rca), [first closeout audit](../specs/v10-executor-adapter/debug-notes.md#closeout-contract-surface-audit), and [expanded claim-family audit](../specs/v10-executor-adapter/debug-notes.md#expanded-claim-family-audit) | Host-Injected Executor Port; Three-Direction Permission Coverage; Honest Abort State; Absolute Monotonic Bound; Proxy Before Reflection; Independent Declaration Consumer; Snapshot And Timestamp Together; Whole-Contract Closeout Search |