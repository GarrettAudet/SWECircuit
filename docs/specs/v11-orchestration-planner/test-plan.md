# V11 Test Plan

## Status

Revision 4 architecture-gate plan. No V11 runtime test is claimed. Every material finding from Rounds 1-3 plus the task-specific agent-compiler requirement maps to a required negative, closure, or equivalence fixture before implementation acceptance.

## Acceptance Mapping

| Criterion | Required evidence |
| --- | --- |
| AC1 | Omitted/explicit concurrency facade start/input/wait/resume/terminal E2E and usability review |
| AC2 | Replication-region zero/min/max lane fixtures and canonical graph derivation |
| AC3 | PolicyBundle closure and planner escalation matrix with zero worker calls |
| AC4 | Host-owned GoalContract coverage, compiler derivation, and logical evidence-owner matrix |
| AC5 | WorkPacket narrowing, AgentBlueprint completeness/context-use closure, logical-role stability, and exact matching property tests |
| AC6 | Deterministic wave, claim reserve, attempt replay, conflicts, paths, and waiting tests |
| AC7 | Four child variants, dispatch truth, result limits, and identity substitution |
| AC8 | Mixed-batch permutations, two-pass winner routing, cancellation, and terminal matrix |
| AC9 | Width-independent `all`/`any` branch, loser, and recovery matrices |
| AC10 | Pre-execution/outcome/owner requests, queue order, role, replay, and direct completion |
| AC11 | Existing/narrowed cycle budgets, diagnosis/fix, terminal reserve, failed/blocked tests |
| AC12 | Content-bound journal, AcceptedWorkAccumulator restart, acyclic pre-merge projection/merge construction, memory ownership, and privacy canaries |
| AC13 | Every byte/count ceiling at minus one/exact/plus one with pre/post-dispatch effect counters |
| AC14 | Two byte-identical hosts and one different-provenance graph-wide semantic projection |
| AC15 | Four-blueprint dogfood with optimization metrics, memory/merge evidence, and equivalent serial/parallel accepted-work semantics/timing |
| AC16 | Inherited suite, packed consumer, local/hosted gates, four independent PASS reviews |
| AC17 | One-message IDE kickoff, approved-catalog module composition, visible assumptions, and novel/high-risk owner gate |

## IDE Kickoff Matrix

- Start from one user message plus the repository's approved module catalog and require visible GoalContract, PolicyBundle, Circuit/module selection, assumptions, and proposed AgentBlueprint roster without manual artifact assembly.
- Execute the repository-shipped `docs/ide/specialist-agent-kickoff.md` contract, create a complete feature-package `goal-synthesis.md`, and distinguish the human `synthesizeGoal` entrypoint from structured kernel `runGoal(start)`.
- Auto-select only existing allowlisted modules inside repository policy.
- For each novel module, gate, route, authority grant, public-behavior choice, destructive action, and security-sensitive capability, require exactly one recorded owner decision before effects plus a map to the exact GoalContract, PolicyBundle, or RunAuthority field that reflects it; reject a note whose launched value disagrees.
- Reject hidden module/catalog lookup, silent authority expansion, and a planner that mutates the assembled PolicyBundle after `runGoal(start)`.
- Require a serial baseline and, for a decomposable goal, at least one legal parallel candidate; reject a candidate roster made only of generic role labels or one that adds agents without safe concurrency or independent quality evidence.
- Dogfood the same kickoff through at least two IDE-host adapters or equivalent deterministic fixtures and require the same portable workflow semantics.

## Policy And Replication Matrix

- Validate OrchestrationPolicy against one exact Circuit plus the exact Module and WorkPacket-template SnapshotDigest closures.
- Reject a missing, extra, drifted, duplicate, unknown, or unreferenced Circuit/Module/template value or digest.
- Validate five representative specializations (`frontend`, `backend`, `test`, `docs`, `security`) through the same variant contract without provider fields.
- Accept zero replication regions and require one invocation per reachable Circuit node.
- Test each region at zero when permitted, minimum, middle, maximum, and maximum plus one lanes.
- Derive canonical lane/node invocation IDs independent of proposal object order.
- Clone only region-internal routes and transfers lane-locally.
- Derive shared join sources for every concrete lane terminal and preserve static branch sources.
- Reject overlapping regions, external incoming routes, cross-lane routes, invalid roots, entry/exit/join/fan-out-source/integration-owner members, illegal region exits, and more than 256 concrete invocations.
- Reject planner attempts to add or modify regions, cardinality, roles, node functions, routes, transfers, joins, gates, owners, authority, or completion.
- Prove a Circuit without a region cannot become parallel through proposal data.

## Goal, Coverage, And Ownership Matrix

- Reject duplicate, unknown, missing, over-limit, or malformed criterion IDs.
- Put exactly one coveragePolicy on each GoalContract criterion and forbid PlanProposal acceptance coverage.
- Derive exactly one Plan acceptanceCoverage row per criterion after lane selection.
- Exercise producer aggregation `all`, `join_winner`, and verification-only `none`; reject skipped alternatives as required winner coverage.
- Require valid producer, verifier, reviewer, and qualified evidence requirement references according to approval policy.
- Derive one integration binding per Circuit join plus exact primary-integrator and memory invocation IDs.
- Reject worker-local evidence substituted for verifier/reviewer evidence.
- Reject coverage that points to a node with the wrong Policy node function.
- Require every generated WorkPacket `role.owner` to equal its Policy logical role.
- Prove profile, executor, and planner IDs cannot appear as logical WorkPacket owners.
- Derive OutputReference and evidence ownership from logical role, node function, and Assignment, ignoring hostile worker owner fields.

## Specialist Agent Compiler Matrix

- Call the built-in pure `compileAgentBlueprints` operation directly with no profiles or optional adapter, then require `compilePlan` to produce byte-identical projection, EvidenceBindings, AgentBlueprints, and AgentOptimizationRecord through the shared implementation before supply checks.
- Require one address-bound AgentBlueprintIntent and compile exactly one AgentBlueprint for every concrete invocation; create neither value for an absent lane.
- Require intent and blueprint ordinals plus exact invocation, Goal, Policy, supply-free TaskAuthorityProjection, Circuit, Module, template, concrete WorkPacket, criterion, evidence, dependency, handoff, and independence bindings; forbid proposal, session, profile, executor, and full RunAuthority demand bindings.
- Recompute every WorkPacket field-projection and ContextUseBinding-row digest through the exact derived-digest registry; reject domain-tag, framing, null-placeholder, order, and one-field substitutions independently.
- Require exactly one intent-supplied context-use row per concrete WorkPacket context reference; reject missing, duplicate, unowned, empty-use, empty-target, wrong-source, and unresolved rows, and prove core never invents a use or specialization reason.
- Prove a generic role label alone cannot make a blueprint valid when objective, ports, context, scope, authority, evidence, verification, handoff, or stop conditions are missing.
- Recompute every exact AgentOptimizationRecord formula: blueprint, dependency-edge, conflict-pair, handoff, context-reference, context-target, permission-scope, dependency-critical-path-component, declared-fan-out, and serial-blueprint counts; test SCCs, self-loops, no-fan-out, overflow, and shuffled inputs.
- Test specialization reasons, including exclusive `serial_required`, and reject an unsupported reason or a claimed parallel blueprint with unresolved conflict scope.
- Require at least one allowlisted compatible AgentProfile for every blueprint; compile byte-identical blueprints from the same Goal/Policy/TaskAuthority/WorkPacket/Intent values under shuffled or changed profile supply, while allowing Plan feasibility and Assignment to change.
- Pass the exact blueprint to the execution adapter; validate one prompt-free AgentMaterializationReceipt at dispatch; and reject ticket, Assignment, blueprint, context/capability/port/constraint, adapter, attestor, grant, result, receipt, or capture substitution.
- Keep provider-specific rendered instructions, model configuration, prompts, and hidden reasoning transient and absent from roots/events.

## Closed Contract And Digest Matrix

- Accept exactly seven orchestration root kinds and every documented nested discriminator, including TaskAuthorityProjection, AgentBlueprintIntent, AgentMaterializationReceipt, AcceptedWorkAccumulator, MemoryProposal, MemoryCandidate, and MergeReadyEvidence.
- Reject orchestration values in `validateArtifactValue` and project artifacts in `validateOrchestrationValue`.
- Reject every unknown field and every required/forbidden variant-field violation.
- Test RFC 8785 vectors, property order, escaping, safe integers, no Unicode normalization, nested digest retention, and own-field-only omission.
- Test SnapshotDigest over complete detached Circuit, Module, WorkPacket, AdapterManifest, ExecutionGrant, V10 OperationResult, ExecutionSummary, and RunEvent values; reject arbitrary unchecked JSON and unknown/malformed digest kinds.
- Reject malformed or substituted contentDigest, snapshot digest, identifier, ordinal, revision, or uniqueness scope.
- Prove OrchestrationState has no ticket and ExecutionTicket is derived after claimed-state digest; derive RepositoryStateRequest from the pre-request state; derive EvidenceBinding before AgentBlueprint; and derive AcceptedWorkProjection before MergeReadyEvidence, with no cycle in any predecessor graph.
- Tamper each event tail/cause/prior-root/successor-projection/journal digest or byte count and require continuation rejection before callbacks.
- Assert every documented sorted array uses its exact total comparator across shuffled inputs and equal-prefix edge cases.
- Compile the normative public operation/callback signatures as closed exhaustive readonly TypeScript unions; reject half-present ref/digest pairs, broad continuation states, illegal continuation interactions, and conditional availability/response fields.
- Test identified and unidentified facade start rejection separately, unbound rejection only for an unparseable continuation, and bound rejection with exact unchanged session/state digest.
- Reject generic success-plus-error, deferred-plus-successor, and terminal-plus-active fields.

## Planning And Facade Matrix

| Scenario | Expected result | Planner calls | Worker calls |
| --- | --- | ---: | ---: |
| valid start, concurrency omitted | ready with requested concurrency 1 | bounded by L | 0 before compiled |
| valid start, explicit bounded concurrency | ready with exact requested value | bounded by L | 0 before compiled |
| no supplied profile with one trustworthy start identity | identified start_rejected | 0 | 0 |
| planner result before round L | proposal/question/block semantics | one each | 0 |
| valid response | ready, same round | 0 until resumed facade calls planner | 0 |
| proposal or block on call L | compiled or blocked at round L | one | 0 |
| question on call L | blocked at round L | one | 0 |
| result at round L | bound rejection unchanged | 0 | 0 |
| result while input pending | bound rejection unchanged | 0 | 0 |
| stale/wrong/replayed/role-mismatched response | rejection unchanged | 0 | 0 |
| planning continuation | input-required continuation plus explicit callback/input interaction; exposes an accepted answer once without embedding it in the returned continuation | bounded | 0 until compiled |
| run continuation after waiting | uses exact state and changed availability | 0 | bounded |

Run the table for RunAuthority planner-call limits 1 through 8. Assert facade returns only input_required, waiting, completed, failed, blocked, cancelled, uncertain, start_rejected, rejected_unbound, or rejected_bound with case-specific fields. Assert unchanged availability returns waiting once and never busy-loops. Prove extra profiles/slots cannot exceed omitted concurrency one.

## Authority, Profile, And Matching Matrix

- Reject any RunAuthority not independently host-supplied and digest-bound to GoalContract and PolicyBundle.
- Require AvailabilitySnapshot to retain only sorted GrantOffer ID/digest references; reject missing, extra, duplicate, drifted, or over-2,048 detached offers and exercise both the 1 MiB root and 8 MiB callback-result byte ceilings.
- Reject any Plan, WorkPacket, AgentBlueprint, profile, availability, assignment, manifest request, or V10 grant that expands an earlier ceiling.
- Accept a WorkPacket with no filesystem permission when its non-empty include names metadata-only context; prove includes never grant authority and every filesystem permission is covered by an include.
- Require every independence target to dominate the constrained activation from a strictly earlier SCC; reject same-SCC/cyclic or nondominating targets.
- Reject profiles absent from the RunAuthority digest allowlist.
- Build candidate edges only for exact AgentBlueprint, Module, I/O, capability, authority, reservation, and grant compatibility.
- Normalize permissions and capabilities as sorted sets; test every surplus tuple dimension.
- Priority is required, range is 0-65535, lower wins, and callers use explicit neutral 32768; no schema default fills an omission.
- Compare profile IDs, versions, reservation IDs, and slot ordinals by the documented ASCII/ordinal rule.
- Enumerate small candidate graphs and compare implementation output to exhaustive maximum-cardinality plus lexicographically smallest assignment-vector truth.
- Include the constrained-profile case where a flexible profile must remain available to maximize cardinality.
- Shuffle blueprints, profiles, slots, invocations, object keys, and capabilities and require identical assignments.
- Reject or ignore IDE, API, model, provider, prompt, price, and hidden-score fields before candidate construction.

## Path, Conflict, And Wave Matrix

- Accept only the documented ASCII literal-prefix grammar.
- Reject root, drive, colon, backslash, glob, empty/dot/parent, control, trailing-dot/space, Windows device, ADS, and Unicode path forms.
- Compare segment prefixes in exact and ASCII-lowercase forms; reject false string prefix such as `src/a` versus `src/ab`.
- Require host path observations for existing targets and observed parents for new targets.
- Treat link/reparse, containment, alias, case, or canonicalization uncertainty as unknown.

| Scope A | Scope B | Parallel |
| --- | --- | --- |
| read same canonical prefix | read same canonical prefix | Yes |
| disjoint complete writes | disjoint complete writes | Yes |
| write ancestor | write or read descendant | No |
| shared writer conflict zone | reader or writer same zone | No |
| any writer | unknown scope | No |

- Run the normative earliest-feasible wave algorithm against shuffled inputs and an independent reference implementation.
- Test conflicting earlier versus nonconflicting later work, including the canonical `A` versus disjoint `B+C` counterexample; capacity-constrained candidates; matching-feasibility rejection; concurrency 1 and 32; and empty selection. Assert exact maximum cardinality only for assignment of the selected wave and never claim globally maximum conflict packing.
- Assert requested concurrency caps selection, claim reserve fits before dispatch, claimed state is installed before the first execution callback, and tickets bind claimed-state digest plus exact result limits including maxMaterializationReceiptJcsBytes.
- Reoffer a consumed grant-digest/run/attempt tuple after executed, rejected, not-started, cancellation, and cycle reactivation; every replay is ineligible.
- Distinguish completed, blocked/deadlock, and capacity-deferred empty waves.

## Ticket, Observation, And Result Matrix

- Substitute each ticket/result binding independently: authority, policy, plan, claimed state, wave, claim, Assignment, invocation, AgentBlueprint, packet, logical role, profile, availability, reservation, executor, manifest, grant, V10 run/attempt/correlation, criterion, port, and evidence digest.
- Require the complete batch to reject unchanged on the first mismatch.

| Variant | Positive case | Required negatives |
| --- | --- | --- |
| executed | successful V10 OperationResult/ExecutionSummary plus settled dispatch observation | missing summary, rejected result, result/journal mismatch, hostile outputs, memory proposal on non-memory node |
| v10_rejected | rejection digest, settled dispatch observation, sanitized codes | fabricated summary/journal/output, raw diagnostic value |
| not_started | zero-call plus not-dispatched observation | callback began, V10 fields present, forged attestor |
| effect_unknown | fixed code plus unknown dispatch observation | workflow success, output/memory transfer, retry |

- Core-observed not-started requires a dispatch counter of zero; counter one plus exception or oversized report is effect_unknown.
- Test second dispatch-capability use, exception before dispatch, exception after dispatch, V10 return/digest mismatch, forged or foreign opaque capture, registered context-use digest mismatch, and every resultLimits field at minus one/exact/plus one.
- Reject every host-attested substitute for core-observed not-started; only counter-zero pre-dispatch return or exception may produce that variant.
- Verify journal/output/VCS/path facts only through matching HostObservation kinds and digests.
- Require core-counted `journal_bytes` for every executed result and one matching host-attested `output_bytes` observation for every OutputDraft; core validates the declared size/digest without claiming to observe external bytes.
- For every filesystem-write ticket, require exactly one result-time `vcs_baseline` matching RunAuthority, one `vcs_head`, and one `changed_paths` observation binding both; missing or inconsistent post-dispatch evidence is `effect_unknown`, while a proven outside-scope change is `out_of_scope_effect`.
- Derive evidence ownership independently of child payload.

## Batch, Cancellation, And Run Input Matrix

- Apply every permutation of one valid complete result batch and require byte-identical state/events.
- Reject missing, extra, duplicate, replayed, partial, or cross-wave batches unchanged.
- Apply the same batch twice and require rejection unchanged on the second call.
- Test uncertainty plus cancellation, cancellation plus completion/failure/timeout/not-started, and normal mixed results; require uncertainty then cancellation then two-pass routing precedence.
- In a mixed normal batch, determine every `any` winner before mutation; claimed losers retain evidence but transfer no output, route no successor, and consume no budget.
- Combine not-started with terminal results; install waits only for released work whose branch remains live after winner resolution.
- First cancel advances parent revision while retaining immutable WaveClaim/ticket binding; an exact repeated digest defers before stale checks and a different active request rejects with cancellation_conflict.
- Accept results against the active immutable claim after cancellation revision changes.
- Require run InputRequest/InputResponse exact run/plan/policy/authority/prior/current state/request/responder/decision/digest binding.
- Reject stale, replayed, consumed, wrong-purpose, wrong-role, wrong-attestor, and wrong-decision responses.
- Create pre-execution risk requests before availability/execution, outcome clarification requests only from the declared `clarify` output, and final owner approval only after every other predicate.
- Create multiple clarification triggers in one wave, store one active InputRequest plus canonical PendingRequestSeeds, apply each accepted response action before promoting the next seed against the new successor revision, and consume exactly one response per transition without staleness, loss, or replay; a terminal response deterministically discards unpromoted seeds.
- Final owner approval transitions directly to completed when it is the last predicate; decline executes its fixed block action and cancel becomes cancelled.

## Result Mapping, Routes, And Budgets

Execute every ChildResult/V10 case in the normative mapping and assert exact route or terminal result. Completed or failed summaries without workflow cannot become pass. V10 rejection routes diagnosis or blocks. Acknowledged child cancellation and confirmed timeout route `diagnose` when declared, otherwise fail with `child_cancelled` or `child_timed_out`. Unknown effect always becomes uncertain.

- Reject every reachable cycle lacking its own Circuit maxTraversals; Policy/RunAuthority may narrow but never supply or widen a missing bound.
- Snapshot and decrement each route budget exactly.
- Test diagnosis/fix success, repeated failure, last legal traversal, and exhausted traversal.
- Define `failed` only after executed unrecoverable work or exhausted recovery; define `blocked` for unambiguous no-progress/pre-effect closure.
- Reserve one event/revision for resource_limit_imminent terminal closure and test exact pre-limit behavior.
- Prove terminal states reject every operation without event or mutation.

## Join And Completion Matrix

- Derived join source count: zero invalid, one valid, two and many valid; preserve the existing Circuit fan-out rule independently.
- `all`: one, two and many branches, failure, block, input, requeue, recovery, uncertainty, active claimed branch.
- `any`: earlier success, later success, multiple successes, earlier not-started, earlier diagnosis/fix, earlier terminal failure, claimed lower-priority losers, unclaimed losers, all fail, uncertainty.
- Compare concurrency 1, 2, and 32 for identical accepted winner, transferred outputs, EvidenceSatisfactions, routes, terminal code, repositoryTreeDigest, and accepted-work projection; require raw claims, revisions, states, and events to remain truthful rather than identical.
- Assert only a terminal non-success lets a later success win; requeued/routed work stays active.
- Assert claimed losers settle and preserve evidence while only winner outputs transfer.
- Remove each completion predicate in turn: successful-or-skipped invocation closure, declared exit, join, transfer, criterion EvidenceSatisfaction coverage, per-join/primary integration evidence, verifier, reviewer, final RepositoryStateWitness/tree/change/write-set closure, owner approval against that witness, memory proposal/candidate, and no claim/input/wait/uncertainty/deadlock. Completion must fail with one stable reason.
- Prove only the memory invocation can emit MemoryProposals; expose exact eligible prior output/evidence/event source digests in its ticket, reject empty or out-of-ticket proposal provenance, derive one candidate per proposal in order, and return post-terminal MergeReadyEvidence without a state/event digest cycle.

## Event, Privacy, And Trace Matrix

- Validate every OrchestrationEvent 1.0.0 type and reject cross-variant fields.
- Require global sequence from 1, one earlier same-orchestration cause after the first, and parent event IDs separate from child RunEvent IDs.
- Reconstruct complete, failed, blocked, input-required, cancelled, and uncertain runs from roots/events and referenced child digests.
- Prove child events are referenced, never copied, renumbered, or re-owned.
- Verify actor/evidence roles derive from policy, assignment, responder, and host observation.
- Insert goal/prompt/question/answer/review/block/memory/excerpt/raw exception/command/log/output/evidence/environment/credential/reasoning/provider canaries; canonical roots/events retain only allowed IDs/codes/refs/digests.
- Ensure diagnostics never echo hostile rejected values.
- Prove MemoryProposal/MemoryCandidate cannot mutate memory, preserve prior source provenance, and contain only allowed source/evidence/body references and digests.
- Recompute the complete event-cause/root-projection/journal chain and reject tail substitution, truncation, reordering, or detached-source digest drift.

## Resource Matrix

Test minus one, exact, and plus one for every normative boundary: direct input bytes, root bytes, state bytes, result-batch bytes, event bytes, aggregate journal bytes, string bytes, ID length, depth, nodes, invocations, lanes, profiles, blueprints, context-use rows, capabilities, matching edges, concurrency, wave size, source refs, excerpts, aggregate excerpts, prerequisites, bindings, scope entries, outputs, evidence, observations, planner calls, pending requests, revisions, events, and zero retries.

Use incremental allocation, claim-reserve, and callback counters. Over-limit pre-dispatch input must fail before the forbidden successor/effect; an over-limit post-dispatch report must become uncertain with no output/route/integration advance. Verify the reserved worst-case accepted reduction always fits.

## Portability And Package Matrix

- Host A uses advanced operations; Host B uses `runGoal`; identical host IDs and inputs produce byte-identical Plans, states, and events. Resume both after process replacement using only a returned continuation and require the AcceptedWorkAccumulator to preserve terminal accepted-work and merge semantics.
- Host C uses different executor/reservation/attestor provenance; apply the exact semantic projection and require equality while raw provenance remains different.
- Verify different planner proposals are not claimed equivalent; the same proposal compiles byte-identical AgentBlueprints, optimization metrics, and Plan.
- Snapshot every actual current `src/index.ts` export and compile an unchanged V9/V10 exhaustive consumer against type-identical declarations; do not assume internal ArtifactKind/ArtifactEnvelope are public.
- Import every exact newly listed orchestration root/nested/callback/result name, operation, and explicit JSON schema subpath from the packed artifact; reject unlisted/wildcard paths.
- Install, compile, and run the packed consumer offline.

## Dogfood

Use revision 4 itself to compile AgentBlueprintIntents and task-specific AgentBlueprints for concrete source-chain integration, declaration verification, checker verification, product review, API review, lifecycle review, and security review work packets rather than generic role labels. Exercise one clarification, explicit concurrency above one, one policy-bounded replicated region, one failure routed through diagnosis/fix, one fan-in/integration witness, host-owned criterion coverage, independent verification/review, owner approval, MemoryProposal-to-MemoryCandidate learning, and MergeReadyEvidence.

Compile two Plans from identical semantic inputs except requested concurrency and run the deterministic work at concurrency one and safe bounded parallelism. Final criteria, outputs, evidence, routes, accepted-work projection, repositoryTreeDigest, and terminal status must match; Plan/state digests plus raw wave and trace topology may differ. Separately evaluate one-agent-optimal, under-split, over-split, conflict-heavy, genuinely parallel, and generic-role golden tasks with an independent semantic reviewer, a named baseline, exact structural deltas, elapsed time, accepted quality evidence, and coordination overhead. Do not claim a universal speedup or global optimum.

## Canonical Gates

- Placeholder, BOM-free LF, source-reference, and `git diff --check` audits.
- `scripts/check-template.ps1` and checker matrix after checker changes.
- `npm.cmd run verify`.
- Offline packed consumer.
- Hosted Windows and Linux CI.
- Independent product, API, lifecycle, and security review against one exact commit.

## Deferred Tests

Live providers, distributed coordinators, durable queues, crash recovery, overlapping writes, worktree enforcement, recursive spawning, automatic retry, merge, memory mutation, and credential/sandbox enforcement are outside V11 and must remain explicit non-capabilities.
