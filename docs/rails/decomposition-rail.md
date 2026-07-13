# Decomposition Circuit

## Purpose

Use the decomposition circuit when a goal can safely fan out across modules, agents, reviewers, or independent work units.

## Composition

```txt
goal | retrieve | spec | architecture_review | decompose | contract_work_units | fanout | synthesize | integrate | verify | review | memory
```

## Modules

| Module | Input | Action | Output | Gate | Outcomes | Artifacts |
| --- | --- | --- | --- | --- | --- | --- |
| Retrieve | Goal | Build the smallest shared context bundle needed for decomposition. | Shared context bundle | Context is sufficient and source-linked. | `pass`, `clarify`, `block` | Context bundle |
| Spec | Goal and context | Define shared acceptance criteria and scope boundaries. | Acceptance criteria | Criteria are stable enough to split. | `pass`, `clarify`, `split` | Feature spec |
| Architecture review | Spec | Identify boundaries, dependencies, conflict zones, and integration constraints. | Constraints and conflict zones | Design is safe to decompose. | `pass`, `clarify`, `redesign`, `block` | Architecture note |
| Decompose | Spec and constraints | Build independent work units and a dependency graph. | Work-unit graph | Units are coherent and sufficiently independent. | `pass`, `split`, `redesign` | Decomposition plan |
| Contract work units | Work-unit graph | Assign scope, context, authority, evidence, handoff, and stop conditions. | Work-unit contracts | Every unit is independently actionable and verifiable. | `pass`, `clarify`, `redesign`, `block` | Work-unit contracts |
| Fanout | Approved contracts | Dispatch bounded units through an external agent runtime and monitor stop conditions. | Worker handoffs | Workers stay within authority and return required evidence. | `pass`, `fix`, `diagnose`, `block` | Fan-out log, handoffs |
| Synthesize | Handoffs | Compare findings or diffs and identify conflicts, omissions, and dependencies. | Combined findings | Conflicts and coverage gaps are understood. | `pass`, `fix`, `diagnose`, `redesign` | Synthesis note |
| Integrate | Findings and diffs | Apply or merge coherent results under one integration owner. | Integrated change | Conflicts are resolved and scope remains aligned. | `pass`, `fix`, `diagnose`, `redesign`, `block` | Integrated diff |
| Verify | Integrated change | Run worker-local and integrated checks against shared criteria. | Integrated evidence | Evidence supports the complete goal. | `pass`, `fix`, `diagnose`, `clarify` | Verification matrix |
| Review | Spec and evidence | Review integration, architecture, risks, and hidden follow-ups. | Review outcome | Findings are resolved or explicitly routed. | `pass`, `fix`, `diagnose`, `clarify`, `redesign`, `split` | Review |
| Memory | Review | Promote source-linked lessons and run retrieval pointers. | Durable lessons | The run is auditable and retrievable. | `pass`, `learn`, `block` | Run record, memory entries |

## Artifacts

- Decomposition plan.
- Work-unit contracts.
- Orchestration run record.
- Worker handoffs.
- Integrated verification.
- Review and memory.

## Stop Conditions

- Work units overlap in risky conflict zones.
- Requirements are ambiguous.
- A worker exceeds authority.
- Fan-in cannot reconcile outputs.
