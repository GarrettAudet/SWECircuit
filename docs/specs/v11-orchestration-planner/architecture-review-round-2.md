# V11 Architecture Review Round 2

## Status

Complete with outcome `REVISE`. Four independent reviewers inspected exact revision-2 commit `5d82394268a5e4af7769a3090c1a8e97213df2bf` on `codex/v11-orchestration-planner`. No reviewer edited files, ran tests, installed dependencies, used network, staged, committed, switched branches, or pushed.

## Candidate

- Commit: `5d82394268a5e4af7769a3090c1a8e97213df2bf`
- Source baseline: V10 closeout `8ac3372df60afcd04fe272d66d6724142606ba70`
- Prior review: Round 1 `REVISE` against `f559b4a`
- Local evidence: placeholder, BOM-free LF, 138-reference source audit, diff, template, and canonical package gates passed; 275 inherited tests
- Gate outcome: `redesign`; implementation remains prohibited

## Reviewer Verdicts

| Scope | Reviewer | Verdict | High | Medium |
| --- | --- | --- | ---: | ---: |
| Product and architecture | `019f6566-a392-7c70-8ef4-ede275fe0998` | REVISE | 3 | 1 |
| Public API and compatibility | `019f6566-b7da-7c50-bfb9-b6fb69993640` | REVISE | 6 | 1 |
| Lifecycle and concurrency | `019f6566-ccef-73c3-968f-80ac5fd58654` | REVISE | 4 | 3 |
| Security, privacy, and trace | `019f6566-e136-7ae0-8240-117214bf852b` | REVISE | 4 | 3 |

Round 2 produced 17 high and 8 medium findings before deduplication. The convergence is stronger than the raw count: reviewers independently identified the same missing property-level contracts from different risk angles.

## Converged Findings

### 1. Host-Authored Replication Policy

Revision 2 called Circuit authoritative but referred to fan-out slots and ranges that the unchanged V9 Circuit schema does not contain. Fixed Circuit branch IDs cannot both remain fixed and support variable decomposition without another normative contract.

Revision-3 requirement: add a closed, host-authored, digest-bound OrchestrationPolicy root. It binds one exact Circuit and Module set and may designate only machine-checkable replication regions with template subgraphs, minimum and maximum lanes, derived routes/transfers/joins, logical roles, and authority bounds. Nodes outside a region instantiate exactly once. Planner output chooses only permitted lane counts and packet content.

Sources: product findings 1 and 3; API finding 1.

### 2. Acceptance Coverage And Logical Ownership

Acceptance criteria lacked stable identities and a canonical mapping to WorkPackets, verifier/reviewer invocations, and evidence. Existing WorkPacket `role.owner` was also ambiguous beside dynamic AgentProfile assignment.

Revision-3 requirement: define a digest-bound GoalContract with criterion IDs. Plan maps every criterion exactly once to producer, verifier, reviewer, and evidence-requirement IDs. WorkPacket `role.owner` is a Circuit/Policy logical role, never a profile or executor; Assignment is the only runtime assignee.

Sources: product findings 2 and 3.

### 3. Closed Property-Level Public Unions

Named states and result tags did not define required and forbidden properties, initial identity ownership, unbound rejection, deferred reasons, or the simple facade continuation cases.

Revision-3 requirement: publish property-level discriminated unions for PlanningSession, OrchestrationState, planning/run operations, and `runGoal` commands/results. Distinguish unbound rejection from bound unchanged-state rejection. Require a supplied allowlisted profile; default only capacity and concurrency to one.

Sources: product finding 4; API finding 3.

### 4. V11 Child Result Variants

V10 has no `not_started` disposition, and a rejected V10 OperationResult has no ExecutionSummary or journal. Revision 2 required both for every child result.

Revision-3 requirement: define `executed`, `v10_rejected`, `not_started`, and `effect_unknown` ChildResultEnvelope variants with exact required/forbidden fields. Only coordinator-observed or explicitly host-attested zero-call work may be `not_started`; ambiguous effect state is `effect_unknown` and makes the parent uncertain.

Sources: API finding 2; lifecycle finding 1; security finding 4.

### 5. Identity, Digest, And Authority Chain

RunAuthority was described as nested instead of an independently digest-bound root. Claimed state, availability, reservation, assignment, manifest, V10 grant, ticket, and result bindings remained incomplete. Digest projection and identifier ownership were underspecified.

Revision-3 requirement: publish an identity table for every root and nested digestible value. Use one `contentDigest` rule, preserve nested digests, define creators and uniqueness scopes, eliminate circular references, make RunAuthority a root, and bind its digest plus every immutable predecessor through tickets, results, and authority events.

Sources: API finding 5; security findings 1 and 2.

### 6. Exact Matching And Wave Selection

Maximum-cardinality matching lacked a total assignment-vector objective, exact permission/capability surplus ordering, priority direction, version/slot tie-breaks, and a deterministic subset rule for mutually conflicting ready work.

Revision-3 requirement: define canonical invocation and capacity-slot order, candidate rank, lexicographic maximum-cardinality assignment, and a deterministic greedy conflict-compatible wave algorithm with matching-feasibility checks.

Sources: API finding 4; lifecycle finding 5.

### 7. Run Input, Approval, And Cancellation

Planning input was bound more strongly than run clarification and owner approval. `resumeRun` could not complete after final approval. Cancelling a claimed state changed revision without explaining how original tickets remained valid or how mixed results reduce.

Revision-3 requirement: use one-use run request/response contracts bound to run, plan, prior and current state, request, responder role, decision, and content digests. Separate immutable claim revision from current parent revision. Repeated cancellation is idempotent. Uncertainty wins, then requested cancellation, then normal routing.

Sources: lifecycle findings 2 and 3; security finding 3.

### 8. Width-Independent Join Semantics

`any` winner selection could differ when an earlier branch was requeued and a later branch succeeded in the same parallel wave. Diagnosis/fix successors and claimed losers were also ambiguous.

Revision-3 requirement: define a canonical branch priority independent of wave width. A success wins only after every higher-priority branch is terminal non-success; requeued or routed branches remain active. Unclaimed lower-priority branches skip, claimed lower-priority branches settle, and only the winner transfers outputs.

Source: lifecycle finding 4.

### 9. Route Budgets And Terminal Closure

Repeated diagnosis/fix cycles, revision/event exhaustion, and the distinction between `failed` and `blocked` were not closed.

Revision-3 requirement: every reachable cycle must have a finite snapshotted traversal budget. Reserve one revision and event for terminal closure. `failed` follows executed work with an unrecoverable declared outcome or exhausted recovery budget; `blocked` is pre-effect/no-progress policy, input, capacity-contract, or deadlock closure.

Source: lifecycle finding 6.

### 10. Parent Event Vocabulary And Payload Classification

OrchestrationEvent had no enumerated vocabulary, payload unions, independent event version, or causation domain. Goal, input, excerpt, diagnostic, and memory bodies lacked canonical-versus-external classification.

Revision-3 requirement: enumerate all parent event variants and exact payload references. Version the vocabulary independently. Canonical roots and events contain fixed codes, IDs, digests, bounded metadata, and source references only; sensitive or free-form bodies stay external and diagnostics never echo rejected values.

Sources: API finding 6; security finding 6.

### 11. Portable Paths And Host Observations

Lexical prefix checks did not close case folding, aliases, links, Windows reserved forms, or independently verified changed paths. Worker assertions could masquerade as observed VCS/output facts.

Revision-3 requirement: define a stricter ASCII literal-prefix grammar, conservative case-fold comparison, host canonicalization and containment observations, unknown-alias serialization, and host-attested VCS/output facts. Evidence ownership derives from Circuit/Policy and Assignment, not worker payload.

Source: security findings 4 and 5.

### 12. Incremental Resource Bounds

`direct object` bytes and aggregate run/journal memory were undefined. Event count alone allowed excessive retained bytes.

Revision-3 requirement: define per-call, per-root, per-event, per-state, result-batch, and aggregate-journal byte ceilings with incremental UTF-8 accounting before allocation or descent, plus exact boundary and zero-effect fixtures.

Source: security finding 7.

### 13. Additive Package Surface

Revision 2 did not freeze existing exhaustive artifact types or define how orchestration validators, schemas, constants, and types reach packed consumers.

Revision-3 requirement: existing API_VERSION, ArtifactKind, ArtifactEnvelope, validateArtifactValue, and schema paths remain type-identical. Add separately named orchestration constants, envelope/types, validator, operations, and package schema subpaths with offline consumer coverage.

Source: API finding 7.

### 14. Planning Round Semantics

The eighth question, ninth planner call, ninth response, and second pending request had contradictory block-versus-reject expectations.

Revision-3 requirement: round count starts at zero and increments for each accepted planner result. At round seven, an eighth proposal compiles and an eighth block blocks; an eighth question advances directly to blocked because no ninth planner call is allowed. Applying a result at round eight or while input is pending rejects unchanged.

Source: lifecycle finding 7.

## Revision-3 Gate

A new immutable candidate must:

1. preserve this complete Round 2 record;
2. add one normative property-level orchestration contract;
3. align ADR, spec, plan, tests, review packet, run record, milestone, and memory;
4. preserve the one-agent surface and explicit non-routing product boundary;
5. pass placeholder, byte, source, diff, template, and canonical package gates;
6. receive independent product/API/lifecycle/security `PASS` against one exact commit.

No schema or runtime implementation begins before this gate passes.
