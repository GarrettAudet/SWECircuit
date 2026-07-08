# Orchestration Patterns

## Purpose

Use this guide to choose the simplest orchestration pattern that can satisfy the goal with traceability and verification.

## Selection Rule

Start single-agent. Add orchestration only when the work shape proves it needs more structure.

```txt
single-agent -> skill/context module -> router -> subagents -> handoffs -> directed graph -> hierarchical crew
```

## Pattern Matrix

| Pattern | Use When | Avoid When | Evidence Required |
| --- | --- | --- | --- |
| Single-agent | Goal is bounded, context fits, files are not broadly conflicting. | The work needs independent research, review, or implementation slices. | Normal feature package, verification, review, memory update. |
| Skill or context module | A repeatable specialized capability can be loaded on demand. | The capability needs runtime collaboration or shared state. | Module contract and stage hooks. |
| Router | Work needs classification to the right module, agent, or path. | The categories are unclear or overlapping. | Routing criteria and fallback path. |
| Subagents | Independent research, diagnosis, review, tests, or implementation slices can run in parallel. | Requirements are ambiguous or agents would edit the same conflict zone. | Work-unit contracts, handoffs, integration review. |
| Handoffs | A user or task needs to move between specialized agents while preserving state. | The work can be completed with one owner. | Handoff reason, state transferred, acceptance criteria. |
| Directed graph | The process has deterministic stages, gates, retries, or fan-in. | The work is exploratory and the graph would be fiction. | Graph stages, gate outcomes, retry rules, terminal states. |
| Hierarchical crew | Many tasks need manager-style coordination and role assignment. | Coordination overhead exceeds the task size. | Manager role, delegation rules, checkpoints, integrated verification. |

## Scale Rule

For ten agents, do not create ten independent interpretations of the same goal. Create one shared goal, one decomposition plan, one integration owner, and ten bounded contracts.

At scale, each worker needs:

- Objective.
- Scope boundary.
- Context bundle.
- Conflict zones.
- Dependencies.
- Allowed actions.
- Verification evidence.
- Handoff format.
- Stop conditions.

The integration owner needs:

- Work-unit roster.
- Dependency graph.
- Fan-out order.
- Fan-in order.
- Conflict-resolution plan.
- Integrated verification plan.
- Review criteria.
- Memory update plan.

## Bug Cascade Rule

If one ticket reveals bug after bug, switch from implementation fan-out to diagnosis fan-out.

Useful diagnostic splits:

- Reproduction owner.
- Evidence and logs owner.
- Related-code owner.
- Prior-history and memory owner.
- Hypothesis tester.
- Regression-test owner.
- Review owner.

Do not merge multiple speculative fixes. Confirm root cause first, then implement the smallest causal fix.

## Cost Rule

Every additional agent has coordination cost. Add agents when the expected benefit is independent evidence, faster retrieval, stronger review, or safe implementation parallelism. Remove agents when they add ambiguity, duplicated work, or conflict risk.
