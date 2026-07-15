# V11 Test Plan

## Status

Revision 2 architecture-gate plan. No V11 runtime tests exist yet. Every Round 1 finding below is converted into a required fixture before implementation can be accepted.

## Acceptance Mapping

| Criterion | Required evidence |
| --- | --- |
| AC1 | One-profile `runGoal` E2E, concurrency-one default, no provider configuration, usability review |
| AC2 | Circuit-to-plan derivation fixtures, proposal permutations, policy-escalation rejection, zero worker calls |
| AC3 | PlanningSession transition matrix, clarification binding, stale/replay/wrong-role/round-limit negatives |
| AC4 | Capacity-constrained matching properties, shuffled inputs, least-authority and metadata-influence negatives |
| AC5 | Claim-before-effect assertions, path normalization, overlap matrix, unknown-scope serialization |
| AC6 | Complete-wave batch matrix, arrival-order permutations, duplicate/substitution rejection, revision checks |
| AC7 | Total V10-to-parent mapping, uncertainty quarantine, no retry/transfer/join after unknown effect |
| AC8 | `all`/`any` matrices at concurrency one and many, deterministic winner and loser settlement |
| AC9 | Completion-predicate negatives for every missing gate, deadlock, active claim, input, and owner approval |
| AC10 | Parent/child trace reconstruction, evidence ownership, bounded journal, privacy canaries |
| AC11 | Two independent host wrappers, canonical byte comparison, provenance-aware semantic projection |
| AC12 | Four-role dogfood, clarification, failure-to-diagnosis, fan-in, integrated gates, timing and evidence equivalence |
| AC13 | Inherited tests, package consumer, local/hosted gates, four independent PASS reviews, milestone and memory |

## Contract And Identity Matrix

- Accept exactly the five orchestration root kinds and their closed nested unions.
- Reject orchestration roots in the existing project-artifact validator and reject project artifacts in orchestration validators.
- Keep all existing six project artifact kinds and V10 RunEvent 1.0.0 fixtures byte-compatible.
- Prove RFC 8785 plus SHA-256 known vectors, property ordering, escaped strings, safe integers, digest-field exclusion, and no implicit Unicode normalization.
- Reject unknown fields, wrong discriminators, unsafe numbers, missing identities, revision overflow, malformed digests, duplicate identifiers, cycles, accessors, proxies, and oversized snapshots.
- Prove every published JSON schema and runtime validator accept and reject the same corpus.

## Operation Result And Transition Matrix

- Reject every planning result that combines an advanced session with rejection diagnostics or omits the unchanged session digest on rejection.
- Reject every run result that combines successor state/events with `transition_rejected` or `transition_deferred`.
- Require `transition_deferred` to preserve the exact ready-state digest and use only a closed temporary reason.
- Require `runGoal` to return exactly one of `input_required`, `waiting`, `completed`, `failed`, `blocked`, `cancelled`, or `uncertain` with case-specific fields only.
- Exercise every operation from every PlanningSession and OrchestrationState variant. Assert each accepted next state in ADR 0003 and byte-identical state for all invalid pairs.
- Prove terminal states reject all operations and emit no event.
- Prove no-capacity with statically compatible profiles returns `waiting`/deferred ready state, while an unreachable graph becomes terminal `blocked` and the facade never busy-loops.

## Planning And Graph Authority Matrix

| Scenario | Expected result | Effects |
| --- | --- | ---: |
| Valid proposal instantiates permitted fan-out | Canonical compiled plan | 0 workers |
| Planner returns one bounded question | `input_required` revision | 0 workers |
| Authorized exact response | Resume same session | 0 workers until compiled |
| Wrong request, digest, revision, role, or session | Stable rejection, unchanged session | 0 |
| Ninth planner round or second pending request | `blocked` with limit diagnostic | 0 |
| Proposal adds module, route, gate, join, integration owner, exit, or optional path | Policy-escalation rejection | 0 |
| Proposal omits required Circuit node or acceptance mapping | Contract rejection | 0 |
| Prerequisite delays readiness only | Same policy routes and transfers | 0 |
| Prerequisite activates, routes, transfers, or skips | Rejection | 0 |
| Same proposal and inputs in shuffled object order | Byte-identical plan and digest | 0 |

## Authority And Matching Matrix

- Reject a RunAuthority created by planner output or altered after planning begins.
- Reject Circuit, Module, WorkPacket, profile, availability, assignment, ticket, or V10 grant authority that expands its predecessor.
- Reject an AgentProfile absent from the RunAuthority digest allowlist.
- Reject availability that changes profile content, binds a different manifest, exceeds profile capacity, or targets the wrong state revision.
- Reject free-form capability matching; require exact capability identifiers and Module/input/output compatibility.
- Find a maximum-cardinality assignment under slot capacity before applying preferences.
- Prefer non-dominated permission ceilings, then lower capability surplus, explicit non-quality priority, profile identifier, and version.
- Prove shuffled profiles, invocations, object keys, and availability rows produce identical assignments.
- Prove provider, model, API, IDE, price, prompt, and hidden score fields are rejected or have zero influence.
- Prove a low-priority flexible profile is preserved for a uniquely constrained packet when that maximizes assignment count.

## Scope And Wave Matrix

| A scope | B scope | Parallel |
| --- | --- | --- |
| read `src/a/` | read `src/a/` | Yes |
| write `src/a/` | write `src/b/` | Yes |
| write `src/a/` | write `src/a/x.ts` | No |
| write `src/a/` | read `src/a/x.ts` | No |
| conflict zone `schema` with writer | same zone with reader or writer | No |
| complete reader | unknown reader | Yes when neither writes |
| any writer | incomplete or unknown scope | No |

Also reject absolute paths, drive paths, backslashes, empty segments, dot segments, parent traversal, false string-prefix overlaps such as `src/a` versus `src/ab`, out-of-WorkPacket paths, duplicate scopes, and more than 256 entries.

`prepareWave` tests must prove the returned state is `claimed` before any execution callback. Tickets must form the complete committed wave, be ordered canonically, never exceed 32, and contain no conflicting pair. A stale prepare request, duplicate reservation, or reentrant callback must invoke zero workers.

## Result And Lifecycle Matrix

Every state-operation pair must have a closed expected result. Invalid operations leave the original immutable state byte-identical.

| Child result | Parent transition |
| --- | --- |
| `not_started`, zero calls proven | Release to `ready` |
| completed plus valid workflow outcome | Exact Circuit route |
| completed without workflow outcome | `diagnose` route or `blocked` |
| failed plus valid workflow outcome | Exact Circuit route |
| failed without workflow outcome | `diagnose` route or `blocked` |
| acknowledged cancellation during parent cancel | `cancelled` after complete batch |
| unexpected child cancellation | Circuit route or `blocked` |
| confirmed timeout | `diagnose` route or `blocked` |
| `abort_unconfirmed` or ambiguous call state | Terminal `uncertain` |

Required negatives include missing batch member, extra result, duplicate result, wrong run/plan/state/wave/assignment/claim/invocation/packet/profile/executor/manifest/V10 attempt, bad summary or journal digest, wrong output port, changed path outside scope, invalid commit lineage, and evidence ownership mismatch.

Apply every permutation of a valid complete result batch and require the same next state and events. Apply the same batch twice and require unchanged state on the second call. Attempt input, new preparation, fan-in, verification, review, retry, and completion from `claimed` or `uncertain` and require rejection.

## Join, Routing, And Completion Matrix

- `all`: zero, one, and many branches; one failure; one block; one input; one uncertainty; claimed branch still active.
- `any`: success in first, middle, and later contiguous wave; multiple successes in one wave; claimed losers; unclaimed losers; all branches fail; one uncertain branch.
- Compare concurrency one, two, and maximum for identical canonical winner, output transfer, route, and final evidence.
- Verify only the winning `any` output transfers and every settled loser keeps its evidence.
- Verify diagnosis and fix are Circuit modules, not automatic retry labels.
- Verify integration, architecture, verification, review, approval, and memory are scheduled through ordinary module contracts.
- Remove each completion condition one at a time and require a non-completed state with a stable explanation.
- Create an acyclic-looking but unreachable plan and a no-capacity/no-input ready state; require deterministic deadlock or explicit host-block handling, never an infinite loop.

## Trace, Privacy, And Handoff Matrix

- Reconstruct one complete, one blocked, one input-required, one cancelled, and one uncertain parent run from OrchestrationEvents and referenced roots.
- Prove parent sequence and causation are monotonic and child RunEvents are referenced by qualified identity and digest, never copied or renumbered.
- Prove producer roles distinguish planner, worker, integration, verifier, reviewer, owner, and host.
- Bind OutputReferences to ports, producer, digest, size, kind/version, and source reference.
- Insert prompt, chat, hidden-reasoning, credential, environment, command-output, provider-payload, and evidence-body canaries and require exclusion or preflight rejection.
- Permit planner source references by default; accept inline excerpts only when host-selected and within per-item and aggregate bounds.
- Prove MemoryCandidates contain source references and evidence digests and cannot mutate memory.

## Exact Limit Tests

Test each ADR 0003 ceiling at minus one, exact, and plus one: direct bytes, strings, identifiers, depth, graph nodes, source references, excerpts, aggregate excerpts, profiles, capabilities, Circuit/Module references, invocations, prerequisites, bindings, scope entries, planning rounds, pending requests, concurrency, wave size, retries, revisions, events, outputs, and evidence references.

Every over-limit test records planner-call and worker-call counters. Rejection must occur before the relevant effect.

## Portability And Dogfood

Host A uses the advanced reducer operations directly. Host B uses `runGoal`. Given identical logical identities and fixtures, they must produce byte-identical plans, states, and events. A second case uses different executor identities and requires the documented semantic projection to match while provenance correctly differs.

The dogfood target uses four specialist roles over disjoint scopes plus one integration owner. It must include:

- one user clarification before compilation;
- at least two work packets in one safe parallel wave;
- one worker failure routed to a diagnosis module and then a causal fix;
- an `all` fan-in with port-bound outputs;
- integrated acceptance verification and independent review;
- owner approval recorded before merge-ready;
- one source-linked MemoryCandidate;
- serial and parallel controls with equivalent final evidence;
- measured elapsed time and coordination overhead reported without a universal speed claim.

## Canonical Gates

- `npm.cmd run format:check`
- `npm.cmd run lint`
- `npm.cmd run typecheck`
- `npm.cmd run build`
- `npm.cmd test`
- `npm.cmd run verify`
- `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\check-template.ps1`
- `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\test-check-template.ps1` after checker changes
- offline packed-consumer install, compile, and execution
- Windows and Linux hosted CI
- independent product, public API, lifecycle, and security review against one exact commit

## Intentionally Deferred Tests

Live provider calls, distributed coordinators, remote queues, crash recovery, worktree enforcement, overlapping writes, automatic merge, automatic memory mutation, and recursive agent spawning are outside V11. Documentation and source guards must prevent claims that these features exist.
