# V11 Revision-5 Correction Design

## Status

Preserved design evidence. Three read-only specialists converted the 19 Round-4 findings into coherent correction contracts. The integration owner then emitted `split`: V11 will ship the independent Specialist Compiler first, while these runtime-control-plane corrections remain required input for a later orchestration layer.

## Source Handoffs

| Scope | Specialist | Outcome |
| --- | --- | --- |
| Product/API closure | `019f68db-5c83-77f2-9778-e2c9dc1e1da0` | scoped pass |
| Lifecycle/concurrency | `019f68db-70a4-7cf2-af21-0fb5deddaec3` | scoped pass |
| Context/security | `019f68db-8552-7873-856e-a3cef5059e5d` | scoped pass |

All three remained read-only and changed no files, Git state, dependencies, network state, or tests.

## Compiler-Bound Corrections

These corrections move into the standalone V11 Specialist Compiler:

1. `AgentBlueprintCompilation` is one digestible, supply-free result containing the TaskAuthorityProjection, candidate semantics, EvidenceBindings, AgentBlueprints, and exact optimization record.
2. `deriveTaskAuthorityProjection` is a pure public operation. Runtime profile, provider, executor, grant, and attestor supply cannot affect its result.
3. A reviewed launch binds the exact compilation digest. An IDE cannot show one roster and execute another.
4. RunAuthority supplies an owner-approved `contextSourceCeiling`; every candidate context reference must match one entry exactly.
5. Repository context must fit an exact read permission, include scope, and every upstream ceiling. External context must use an approved closed SourceReference.
6. Every context item binds expected payload digest and byte count. Materialization later must preserve those semantics.
7. Canonical owner, subject, context-target, and locator ranks are explicit. Unknown ranks reject.
8. Generic role labels remain invalid without exact objective, ports, context uses, authority, evidence, handoff, and stop conditions.

## Deferred Runtime Corrections

The later runtime control plane must implement all of these before it can be accepted:

- Chained, source-preserving RunEvidenceBundle values for every pause, terminal, and resumable rejection boundary.
- Closed OrchestrationSemanticProjection and AcceptedWorkProjection shapes with a complete derived-digest registry.
- ProvisionalSettlement persistence and deterministic finalize/suppress behavior for unresolved `any` joins.
- Supply-bound IndependenceProfileWitness rows that preserve reviewer independence across concurrency widths without changing AgentBlueprint demand.
- A nominal package-local ExecutionCapture and closed dispatch success/rejection result.
- Complete continuations for every nonterminal bound facade rejection.
- Exact route-budget and join terminal precedence.
- Scoped AttestorAuthorization claim kinds and context-resolution/materialization bindings.
- Compact `plan.compiled` evidence using blueprint count plus ordered-list digest.
- Closed WaitGuard presence unions, serializable command-data limits, exact public constants, accumulator row keys, and every missing comparator.

## Why Split

The Specialist Compiler can deliver immediate IDE-agnostic value: compare legal decompositions, choose a bounded specialist team, emit exact task-shaped agents, and produce a reviewable file-based execution package. The failed candidate coupled that capability to a universal scheduler, callback protocol, crash/restart semantics, repository attestation, and merge-evidence API. Four architecture rounds showed that coupling was delaying the owner-priority capability and obscuring the simple product surface.

The split does not discard runtime work. `architecture-review-round-4.md` remains the source record, and this file preserves the correction design that the later layer must retrieve before implementation.

## Next Gate

Replace the V11 acceptance target with one small standalone compiler contract, implementation, golden candidate baselines, IDE-host materialization fixtures, dogfood evidence, and independent review. No deferred runtime claim may appear in the V11 milestone or package surface.
