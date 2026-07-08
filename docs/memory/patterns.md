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
### Capability Adapter

When an external project has a useful practice but should not become a dependency, extract the capability as a TraceRail contract, preserve a dated source scan, and keep installation optional.

### Skills-Driven Development Transition

Use a triggered-skill style bridge from idea to spec to approved implementation plan when the user intent is still forming and the agent needs readable checkpoints before code.

### Orchestration Compiler

For larger multi-agent work, synthesize project-specific roles, scopes, handoffs, critic duties, synthesis duties, permissions, and integration order from repository context before fan-out.
### Rail Composition

Model meaningful work as `input | module | module | output`. Each module has input, action, output, gate, and outcome so the same primitive can represent features, diagnosis, adapters, releases, and multi-agent decomposition.

### Gate As Router

A gate decides whether a rail continues, loops, splits, blocks, diagnoses, or records learning. Failed gates must emit typed outcomes instead of becoming silent retries.
### Rail And Module Catalogs

Normalize reusable workflow behavior into catalog entries. Rails compose modules; modules expose input, action, output, gate, outcome, artifacts, and adapter.

### Pack Field Conformance

Official packs need field-level checks for status, provides, requirements, permissions, contracts, verification, maintenance, and recommendation evidence. Heading checks make packs visible; field checks make them safer to use.

### Packs Before Core

Community and ecosystem extensions should start as packs. Promote into recommended or core status only after conformance, dogfooding, permissions review, rollback, and maintainer ownership are clear.

### Optional Downloads

External best-practice tools are optional downloads or adapters. Core TraceRail must remain useful with only files, templates, checks, review, and memory.
## Memory Patterns

### Source First, Summary Second

Preserve feature packages, evidence, snapshots, debug notes, RCA, and review notes before writing compact memory summaries.

### Ledger Plus Index

Use `history-ledger.md` for chronological traceability and `retrieval-index.md` for fast lookup by topic, feature, stage, file, or decision.

## Documentation Patterns

### Agent Contract And Router
Keep `AGENTS.md` as the must-follow agent contract and routing index. Put long explanations, examples, and detailed protocols in the handbook, rails, modules, packs, feature packages, research snapshots, or memory files.

### One Handbook

Keep process guidance in `docs/ai/handbook.md` unless a separate artifact is required for work execution.

### File-Based First

Start with Markdown and a local checker. Add tools only when they remove real friction.
