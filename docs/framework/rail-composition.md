# Rail Composition

## Purpose

Rail Composition is the core TraceRail abstraction. It gives software work the same simple feel that pipeline composition gives model apps: small typed modules connected in order, with artifacts and evidence flowing between them.

The mental model is:

```txt
input | module | module | module | output
```

For TraceRail, the thing flowing through the rail is not only text. It is a traceable work package: goal, context, assumptions, spec, plan, tasks, code changes, evidence, review, and memory.

## Core Formula

```txt
rail = ordered modules + typed artifacts + gates
```

Equivalent shorthand:

```txt
rail = context | contract | capability | gate | artifact
```

The simplest feature rail is:

```txt
goal | clarify | spec | plan | implement | verify | review | memory
```

## Module Interface

Every module must have the same basic shape.

| Field | Meaning |
| --- | --- |
| Input | The context, artifact, evidence, or decision the module receives. |
| Action | What the module does: transform, decide, retrieve, execute, verify, synthesize, or record. |
| Output | The artifact, evidence, decision, or handoff the module emits. |
| Gate | The condition that decides whether the rail continues, loops, splits, blocks, or learns. |
| Outcome | One of `pass`, `fix`, `diagnose`, `clarify`, `redesign`, `split`, `block`, or `learn`. |

Short form:

```txt
module(input) -> output + evidence + outcome
```

## Composition Rules

- A module output must be usable as the next module input.
- A gate must state what evidence is sufficient to continue.
- A failed gate must route with a typed outcome.
- A rail may branch only when the split has ownership, conflict zones, and fan-in rules.
- A rail may use an external adapter only after adapter evaluation and approval.
- Every rail ends with review and memory unless the work is explicitly tiny and non-durable.

## Standard Rails

### Feature Rail

```txt
goal | clarify | spec | architecture_review | task_plan | implement | verify | review | memory
```

Use for ordinary features, refactors, process changes, and bounded docs work.

### Diagnosis Rail

```txt
failure | reproduce | evidence | classify | retrieve | hypotheses | experiment | root_cause | fix | regression | memory
```

Use when a failure is unclear, recurring, flaky, or starts producing bug cascades.

### Decomposition Rail

```txt
goal | retrieve | spec | architecture_review | decompose | contract_work_units | fanout | synthesize | integrate | verify | review | memory
```

Use when the work can safely fan out across agents or independent work units.

### Adapter Rail

```txt
candidate | source_scan | adapter_evaluation | practice_register | module_registry | pilot | review | memory
```

Use when a new external tool, skill, plugin, MCP server, framework, or service is proposed.

### Release Rail

```txt
version_goal | feature_package | implementation | verification | review | milestone | approval | merge | history | memory
```

Use for TraceRail versions and other milestone-driven work.

## Gates

A gate is a named decision point between modules. Gates keep composition from becoming a vague checklist.

Useful gate types:

- Clarification gate: requirements are clear enough or the rail routes to `clarify`.
- Architecture gate: design is local and compatible or the rail routes to `redesign`.
- Verification gate: evidence proves the acceptance criteria or the rail routes to `fix` or `diagnose`.
- Review gate: implementation aligns with intent or the rail routes to `fix`, `split`, or `redesign`.
- Adapter gate: tool value beats complexity or the rail routes to `deferred`, `watch`, or `rejected` in the register.
- Merge gate: branch is verified, reviewed, documented, and approved.

## Artifacts

Artifacts are the typed objects that move through rails.

Common artifact types:

- Goal.
- Context bundle.
- Assumption.
- Spec.
- Architecture note or ADR.
- Task plan.
- Work-unit contract.
- Patch or diff.
- Test result.
- Debug note.
- Root-cause analysis.
- Review.
- Milestone.
- Memory entry.
- Retrieval pointer.

## Human-Visible Form

When an IDE agent is using a rail, it should make the rail visible:

```txt
Rail:
Current module:
Input artifact:
Gate:
Outcome:
Next module:
Evidence:
```

This lets the user see the system operating without drowning them in process.

## Adapter Mapping

Rail Composition can later be backed by runtime tools, but it is file-based by default.

| Runtime Idea | TraceRail Equivalent |
| --- | --- |
| LangChain chain | Rail |
| Runnable component | Module |
| Prompt or tool input | Input artifact |
| Parser or structured output | Output artifact |
| Middleware or guardrail | Gate |
| Trace or observability span | Evidence and review |
| LangGraph workflow | Directed rail with branches and fan-in |

## Done Definition

Rail Composition is being followed when:

- The active rail is named.
- Each module has input, action, output, gate, and outcome.
- Artifacts are preserved in the feature package, framework docs, review, or memory.
- Failed gates route explicitly instead of becoming silent retries.
- The final output is verified, reviewed, and linked into memory.
