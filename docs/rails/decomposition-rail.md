# Decomposition Rail

## Purpose

Use the decomposition rail when a goal can safely fan out across modules, agents, reviewers, or independent work units.

## Composition

```txt
goal | retrieve | spec | architecture_review | decompose | contract_work_units | fanout | synthesize | integrate | verify | review | memory
```

## Modules

| Module | Input | Output | Gate |
| --- | --- | --- | --- |
| Retrieve | Goal | Shared context bundle | Context is enough for decomposition or route to `clarify`. |
| Spec | Goal and context | Acceptance criteria | Criteria are stable or route to `clarify`. |
| Architecture review | Spec | Constraints and conflict zones | Design is safe to split or route to `redesign`. |
| Decompose | Spec and constraints | Work-unit graph | Units are independent enough or route to `split` or `redesign`. |
| Contract work units | Work-unit graph | Work-unit contracts | Contracts include scope, context, evidence, and stop conditions. |
| Fanout | Contracts | Worker handoffs | Work stays inside contracts or route to integration owner. |
| Synthesize | Handoffs | Combined findings | Conflicts are understood or route to critic review. |
| Integrate | Findings and diffs | Integrated change | Conflicts are resolved or route to `redesign`. |
| Verify | Integrated change | Integrated evidence | Evidence passes or route to `fix` or `diagnose`. |
| Review | Spec and evidence | Review outcome | Approved or follow-up route is explicit. |
| Memory | Review | Durable lessons | Lessons and retrieval pointers are recorded. |

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
