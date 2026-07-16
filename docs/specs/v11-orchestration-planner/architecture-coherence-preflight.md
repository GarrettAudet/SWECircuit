# Architecture Coherence Preflight

## Status

Revision 4 preflight completed on 2026-07-15. Outcome: `redesign`.

This read-only review tested whether the in-progress specialist-agent redesign remained constructible, restartable, byte-reachable, and closed at the public TypeScript boundary. It returned six high and six medium findings. No runtime implementation may begin until every disposition below is reflected in the contract and verification plan.

## Findings

| Severity | Finding | Required disposition |
| --- | --- | --- |
| High | RepositoryStateRequest contained the digest of the successor state that embedded it. | Bind the request to the preceding pre-request state, then embed it in the successor `repository_required` state. |
| High | AcceptedWorkProjection and MergeReadyEvidence had no acyclic construction order. | Define a pre-merge terminal source bundle, derive the projection after state/event closure, then derive merge evidence. |
| High | AgentBlueprint and EvidenceBinding predecessor claims were not constructible. | Bind EvidenceBinding to invocation ID/address and intent digest, derive it first, then bind its ID/digest from the blueprint. |
| High | A fresh-process continuation lacked the accepted source semantics needed for terminal evidence. | Retain a digestible accepted-work accumulator in state and every run continuation. |
| High | `runGoal` could not represent an identified start rejection. | Add explicit identified and unidentified facade start-rejection variants. |
| High | The maximum embedded GrantOffer count could not fit the root byte ceiling. | Detach complete offers behind bounded references and lower the count to a byte-reachable ceiling. |
| Medium | Public declarations allowed invalid optional-field combinations. | Replace conditional optional fields with closed status and presence unions. |
| Medium | AgentMaterializationReceipt referred to nonexistent ContextUseBinding digests. | Define exact domain-separated row digests or carry complete canonical rows. |
| Medium | Width equivalence incorrectly referred to one immutable Plan despite concurrency being Plan-bound. | Compare two Plans compiled from identical semantic inputs except requested concurrency through concurrency-stripped accepted-work projections. |
| Medium | Several derived digests lacked exact domain tags and preimages. | Add one normative derived-digest registry. |
| Medium | Terminal facade prose and declarations disagreed. | Make every terminal result status-specific and require completion evidence only for `completed`. |
| Medium | The pre-kernel owner gate had no binding contract. | Record the noncanonical decision and require its selected values to be reflected in GoalContract, PolicyBundle, and RunAuthority inputs. |

## Specialist Capability Correction

The owner additionally requires hyper-specialization rather than generic role routing. Revision 4 therefore exposes one repository-shipped Specialist Compiler capability with two layers:

1. The IDE-neutral semantic layer designs and compares bounded decomposition candidates, records exact context-use and specialization intent, and selects a reviewed candidate against a named baseline.
2. The pure `compileAgentBlueprints` kernel operation deterministically validates the candidate and emits supply-free task-demand blueprints, evidence bindings, and exact structural measurements. `compilePlan` must reuse the same implementation.

Runtime profiles remain capability supply. Assignment remains the only demand-to-supply binding. Materialization remains host-attested and provider-specific prompts remain transient.

## Evidence

- Reviewer role: independent architecture-coherence preflight.
- Review mode: read-only exact working-tree inspection.
- Raw result: six high and six medium findings returned in the V11 dogfood session.
- Next gate: all dispositions closed, declaration probe passed, export inventory reconciled, and fresh exact-commit review.
