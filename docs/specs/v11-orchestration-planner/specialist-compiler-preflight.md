# V11 Specialist Compiler Preflight

## Status

Read-only dogfood preflight completed against the uncommitted revision-4 working tree on 2026-07-15. This is redesign evidence, not an architecture verdict.

## Question

Does V11 construct optimized task-specific agents from a user goal, or only validate and route generic roles supplied by an external host?

## Findings

| Severity | Finding | Required correction |
| --- | --- | --- |
| High | Context-use and specialization semantics had no closed planner input, so core would have to invent them. | Add one address-bound AgentBlueprintIntent per invocation; core validates and compiles intent rather than inventing it. |
| High | The one-message construction promise was outside `runGoal` and had no repository-shipped reference capability. | Ship a provider-neutral IDE kickoff/synthesis contract and fixtures; keep `runGoal` as the structured deterministic boundary. |
| High | “Maximum useful parallel work” contradicted the normative earliest-feasible wave algorithm. | Describe V11 as optimizing for high-value bounded safe parallelism; reserve exact maximum claims for the maximum-cardinality matching step only. |
| High | Semantic optimization language was not mechanically testable, while the metric record had no baseline proof. | Separate host-reviewed semantic judgment from exact core metrics and add golden baseline/delta benchmarks with independent review. |
| Medium | AgentBlueprint bound full RunAuthority and therefore runtime profile supply. | Derive and bind a supply-free TaskAuthorityProjection; keep profile supply in Plan feasibility and Assignment. |
| Medium | Trace proved blueprint transport but not runtime materialization. | Require a bounded host-attested AgentMaterializationReceipt at the one-shot dispatch boundary without retaining prompts or hidden reasoning. |
| Medium | Dogfood could pass with four labels without proving useful specialization. | Add one-agent-optimal, under-split, over-split, conflict-heavy, genuinely parallel, and generic-role baseline tasks. |
| Medium | ContextUseBinding and AgentOptimizationRecord lacked exact formulas. | Close their schemas, units, SCC treatment, comparators, and derivation formulas. |

## Outcome

`redesign`

No revision-4 commit or Round-4 review may begin until these obligations are integrated and the normal source gates pass.
