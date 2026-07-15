# V11 Architecture Review Round 1

## Status

Complete with outcome `REVISE`. All four independent reviewers inspected exact commit `f559b4aec54f0e12e947bd9feb00e7ba67e4bf32` on `codex/v11-orchestration-planner` and returned material findings. No reviewer edited files, ran tests, installed dependencies, used network, staged changes, committed, or pushed.

## Candidate

- Commit: `f559b4aec54f0e12e947bd9feb00e7ba67e4bf32`
- Source baseline: V10 closeout `8ac3372df60afcd04fe272d66d6724142606ba70`
- Integration owner: main IDE agent
- Review mode: four fresh read-only contexts, centralized fan-in
- Gate outcome: `redesign`; implementation remains prohibited

## Reviewer Verdicts

| Scope | Reviewer | Verdict | High | Medium |
| --- | --- | --- | --- | --- |
| Product and architecture | `019f6538-cf2a-7101-a2be-1fd4441ab674` | REVISE | 2 | 3 |
| Public API and compatibility | `019f6538-e38e-7aa3-9711-4ebdc10a53ee` | REVISE | 0 | 6 |
| Workflow and concurrency | `019f6538-f7b1-74b0-a7ee-06c07c7f6ef9` | REVISE | 0 | 7 |
| Security and trace | `019f6539-0d40-7230-b2b9-f5926abc92ee` | REVISE | 0 | 6 |

## High-Severity Blockers

### Circuit And Plan Graph Authority

The existing Circuit contract owns module nodes, routes, joins, fan-outs, and integration ownership. Candidate `f559b4a` also allowed a planner proposal to create dependencies, joins, gates, and integration relationships without defining which graph was authoritative.

Impact: either planner output could silently become workflow policy, or the plan could not instantiate variable goal work from a static circuit.

Required correction: define two non-overlapping graph layers. Circuit owns workflow policy and outcome routing. A compiled plan may instantiate packet work and execution prerequisites only within explicit Circuit nodes and fan-out regions; it may not create or override modules, routes, joins, gates, fan-outs, or integration ownership.

Candidate evidence: `schemas/v1alpha1/circuit.schema.json` lines 21, 101, and 152; ADR 0003 at `f559b4a` line 78.

### Portable Child Output And Handoff

V10 returns a normalized execution summary and optional evidence references, but not typed bindings from produced outputs to module ports, packet content, baseline, workspace, assignment, or downstream inputs.

Impact: fan-in would depend on implicit shared-workspace knowledge. A reducer could not prove which source result fed a dependent packet or reconstruct integration precisely.

Required correction: add a bounded child-result envelope around the V10 summary. It must bind parent run, plan and packet digests, circuit node and invocation, assignment and claim, profile and executor, baseline, child run and attempt, output-port references and digests, child journal reference and digest, and ownership roles.

Candidate evidence: `schemas/v1alpha1/module.schema.json` line 45; `schemas/v1alpha1/circuit.schema.json` line 80; ADR 0002 line 104; ADR 0003 at `f559b4a` lines 188 and 204.

## Converged Material Findings

### 1. Separate Contract Family

The six `swecircuit/v1alpha1` Project artifact kinds and RunEvent `1.0.0` are closed contracts. Adding orchestration roots or event types to those enums would surprise exhaustive consumers; leaving them unspecified would not be portable.

Decision required: define a separate closed `swecircuit/orchestration/v1alpha1` JSON contract family. Do not make its roots Project-discoverable in V11 and do not widen RunEvent `1.0.0`.

Sources: API reviewer findings 1 and 5; security reviewer finding 5.

### 2. Planning Must Have State Before A Plan Exists

The planner could return clarification before an OrchestrationPlan or OrchestrationState existed, while the candidate required plan and state revisions for resume.

Decision required: add a serializable PlanningSession with its own identity, revision, request digest, consumed-request state, block result, and `resumePlanning` transition. No worker may run before compilation.

Sources: product reviewer finding 3; API reviewer finding 2; lifecycle reviewer finding 2.

### 3. Plan Owns Requirements, State Owns Dynamic Assignment

The candidate assigned work during compilation but also matched against invocation-scoped capacity at readiness time.

Decision required: the immutable plan contains packet requirements only. A revisioned wave-preparation transition captures one availability snapshot and creates assignments, claims, and execution tickets in state. No caller-supplied assignment object is accepted.

Sources: product reviewer finding 4; API reviewer finding 3; lifecycle reviewer findings 3 and 4.

### 4. Commit Claims Before Effects

A pure claim successor could be computed by two processes and both could invoke workers before either persisted state.

Decision required: V11 supports one serialized coordinator. It installs the claimed successor state before any V10 call. Workers may run in parallel after that point. Distributed coordinators, remote queues, and cross-process claim guarantees are out of scope.

Source: lifecycle reviewer finding 3.

### 5. Closed Result And Routing Matrix

V10 can return completed or failed summaries without `workflow`, plus cancellation, timeout, and `abort_unconfirmed` dispositions. Circuit routing needs a known outcome.

Decision required: define a total V10-to-orchestration mapping. Missing required workflow data is a contract failure; no disposition may invent success. `abort_unconfirmed` makes the parent run terminally uncertain and prohibits retry, workspace reuse, fan-in, verification, review, or merge.

Source: lifecycle reviewer findings 1 and 5.

### 6. Closed Parent Lifecycle

The candidate listed fields but did not exclude invalid combinations or close deadlock, retry, diagnosis, parent cancellation, verification, review, and merge-decision transitions.

Decision required: publish a discriminated planning union, a discriminated run union, a wave-boundary transition table, one no-progress rule, and explicit terminal dispositions. Integration, verification, review, diagnosis, and memory remain ordinary Circuit module work; owner merge approval is a wave-boundary input gate.

Source: lifecycle reviewer finding 7; API reviewer findings 2 and 6.

### 7. Deterministic Capability And Capacity Semantics

Existing WorkPacket capability prose and authority instructions are not sufficient machine identifiers, and incomparable authority sets lacked a total allocation policy.

Decision required: use exact capability identifiers in the orchestration plan; preserve existing WorkPacket prose as human guidance. Filter by exact support and authority coverage, prefer strict permission subsets, use explicit host priority for incomparable minimal profiles, then profile ID. Allocate packets by topological rank then packet ID against a captured availability snapshot.

Sources: API reviewer finding 4; lifecycle reviewer finding 4.

### 8. Independent Run Authority Root And Profile Provenance

The planner-created packet ceiling had no independent owner-provided maximum. Profile capability and isolation claims had no allowlist, digest, provenance, or executor binding.

Decision required: add one immutable host-supplied RunAuthority envelope. Every packet ceiling narrows it. Only allowlisted profile digests are eligible; a run-scoped availability entry binds profile digest to executor and manifest identity before matching.

Sources: security reviewer findings 1 and 2; API reviewer finding 3.

### 9. Conservative Parallel Write Policy

The candidate referred to actual read/write sets and an isolation assertion that neither WorkPacket nor V11 defined.

Decision required: each plan packet declares normalized repository-relative read and write prefixes plus conflict-zone IDs within the WorkPacket scope. Reads may overlap. Any write/read or write/write prefix overlap, shared write conflict zone, or unknown scope serializes. V11 has no overlapping-write isolation exception.

Sources: lifecycle reviewer finding 6; security reviewer finding 3.

### 10. Exact Join Closure

The candidate described configurable `any` thresholds although Circuit defines only `all` or `any`, where `any` means one success. Failure, active losers, and uncertainty were not closed.

Decision required: preserve existing semantics. `all` opens only after all sources succeed. `any` chooses the lowest-ID successful source after a complete wave batch, skips unclaimed losers, records settled loser evidence, and never advances while any claimed loser is potentially live. A failed join follows Circuit outcome routing or blocks on no progress.

Sources: API reviewer finding 6; lifecycle reviewer finding 5.

### 11. Versioned Parent Trace And Evidence Ownership

RunEvent `1.0.0` cannot encode plan, claim, clarification, join, and qualified child-journal bindings. V10 child event IDs also repeat across journals, and evidence references are schema-checked rather than verified.

Decision required: add a separate OrchestrationEvent union. Parent events reference qualified child run and attempt identity plus summary and journal digests; they never copy child events. Producer, claimant, executor, verifier, and persistence-owner roles remain distinct. Worker evidence alone cannot satisfy a verifier-owned gate.

Sources: API reviewer finding 5; security reviewer finding 5.

### 12. Privacy, Bounds, And Disclosure

The candidate called planner input privacy-screened and bounded without a disclosure contract, numeric limits, aggregate-byte accounting, or check order.

Decision required: planner context is references-only by default. Inline excerpts require explicit host selection and bounded source metadata. Bound direct snapshots before planner invocation by aggregate UTF-8 bytes, strings, depth, nodes, collections, packets, edges, profiles, capabilities, rounds, waves, events, and evidence references. High-confidence scanning remains defense in depth, not a complete confidentiality guarantee.

Source: security reviewer finding 6; API reviewer finding 6.

### 13. Standalone Simple Path

The candidate exposed only low-level pieces and made one-agent use pay the full orchestration integration cost.

Decision required: ship one `runGoal` facade with in-memory serialized state, one agent profile, and concurrency one by default. Supplying multiple profiles and a higher bounded concurrency value uses the same contract rather than a second programming model.

Source: product reviewer finding 5.

## Required Negative Fixtures

The next design and test plan must preserve at least these cases:

- Planner cannot add Circuit nodes, routes, joins, gates, fan-outs, or integration owners.
- Planner cannot raise RunAuthority or packet permission ceilings.
- Unknown, drifted, or executor-mismatched profiles are rejected.
- Provider, model, API, or IDE metadata cannot influence matching.
- Claim state is installed before any worker call.
- Reversed child arrival produces one canonical wave reduction.
- Child result with wrong run, plan, packet, profile, claim, baseline, executor, grant, summary, or journal digest is rejected.
- Completed child without required workflow data cannot become pass.
- Failed `all`, successful `any` with losers, deadlock, parent cancellation, and `abort_unconfirmed` all close deterministically.
- Overlapping or unknown write scope serializes.
- Worker evidence cannot satisfy a verifier-owned gate.
- Parent trace cannot copy or reattribute child events.
- Wrong, expired, consumed, or unauthorized planning and run responses are rejected.
- Oversized, accessor-bearing, proxied, cyclic, secret-bearing, or malformed planner input and output produce zero forbidden calls and unchanged state.

## Round 2 Gate

A revised immutable candidate must:

1. close every decision above in ADR 0003, the spec, plan, and test plan;
2. preserve one simple facade and one advanced deterministic contract;
3. distinguish core checks from host enforcement in every authority, persistence, privacy, and evidence claim;
4. run the template and canonical local gates;
5. receive `PASS` from product, API, lifecycle, and security reviewers against the same exact commit.

No implementation task may begin before this gate passes.
