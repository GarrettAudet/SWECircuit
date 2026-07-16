# Active Context

## Current Focus

Present the standalone V11 Specialist Compiler revision-6 candidate for owner approval without widening its pure-core boundary. Technical acceptance is bound to compilation `sha256:ac1707213d9c22314d4c5a3d0bc6a838ef31863b63a9e2dac5993541d919c161` and package `sha256:838019281b732ec238e4460c03167087b7a63c409348ee66322cc5535469774d`. The larger scheduler/restart/parent-trace/merge control plane remains deferred with its failed-review evidence preserved.

## Current Stage

V10 technical acceptance remains preserved at candidate `fa4371e` with evidence closeout `8ac3372` and is still owner-gated. Main remains the V9 baseline.

V11 universal-runtime Round 4 failed against `d486b7f` with four REVISE verdicts, 10 high findings, and 9 medium findings. Raw evidence and correction design were committed at `6da0376`; the workflow emitted `split` rather than another broad patch cycle.

The standalone V11 Specialist Compiler revision-6 candidate has now passed technical acceptance in the shared `codex/v11-orchestration-planner` worktree. Preparation matched 34/34 source bindings, with `context.spec` bound only to the immutable pre-integration snapshot. Product/API passed 12/12 context items, algorithm/lifecycle 14/14, and security/trace 32/32, each with no findings against the same digest pair.

Canonical release verification matched 19/19 assigned contexts and 9/9 package files; focused schema 7/7, compiler/golden 35/35, host containment 6/6, and `npm.cmd run verify` 323/323 tests passed. Both dogfoods, the offline installed consumer, package verification, template checker, 105-file package inspection, and the complete 744.9-second negative matrix passed. Attempt 5 remains `FIX` after post-integration replay found a mutable live-spec binding. Release-host attempts 6A and 6B remain `FIX` for a 265-character Windows root and reviewer removal of the offline cache; neither changed source or the revision-6 pair. No hosted CI result is claimed for this candidate.

Dogfood exact search evaluated 203 candidates, found 52 eligible, and selected six task-shaped specialists at projected makespan 23. The serial baseline projected 40 and was ineligible for requested evidence independence. These are deterministic planning units, not elapsed-time or provider-runtime measurements.

AC1-AC13 and T009-T010 are closed. The integration owner reconstructed both trusted digests after the authorized output updates, and post-integration replay passed. T011 remains open for a clean pushed branch and the explicit stacked V10+V11 merge decision. No commit, push, hosted CI, merge, provider execution, or V11 runtime enforcement is claimed yet for this shared-worktree candidate.

## Important Current Constraints

- An `ExecutionGrant` carries invocation-scoped identity and permission assertions bounded by manifest requests and packet ceilings. The stateless kernel does not authenticate the issuer, establish freshness or single use, enforce or revoke the grant, consume it, or prevent reuse or replay.
- Cancellation uses absolute monotonic observations. A no-call abort or deadline can terminate because work never started. After invocation, in-window executor promise settlement counts only when all activity capable of advancing the invocation or producing invocation effects has stopped; transfer of live work is not acknowledgment. `abort_unconfirmed` is deliberately non-terminal and means work may still be live.
- V11 constructs task demand and a reviewed launch package; it does not execute agents, select models/providers, enforce permissions, create worktrees, schedule host capacity, merge, or mutate memory.
- Any release document integration may mutate is a live output and must be reviewed through an immutable pre-integration snapshot. The integration owner must reconstruct the exact approved compilation/package pair after output mutation and before branch freeze.
- Product clarification and atomic semantic work decomposition remain visible IDE/human responsibilities. Core optimizes grouping of those fixed work units and rejects structurally or authoritatively invalid input.
- A role label is never a specialist contract. Every selected blueprint binds exact work units, objectives, Module actions and ports, dependencies, context uses with expected digest/bytes, least filesystem scope and permissions, capabilities, evidence duties, handoff, and stop conditions.
- Correctness, owner authority, evidence ownership, requested producer/checker independence, and acyclic dependencies are hard gates. They cannot be traded for speed.
- Selection order is projected makespan, conflict pairs, cross-agent handoffs, duplicated context bytes, duplicated permission scopes, agent count, then canonical partition identity.
- Search is exact only through eight work units. Larger goals use a named bounded structural search plus validated supplied candidates and must not be described as globally optimal.
- Planning weights, startup cost, and handoff cost are relative deterministic estimates, not elapsed-time promises or benchmark results.
- Logical arrays and candidate partitions are normalized; labels, proposal order, and input insertion order must not influence selected semantics.
- Every rendered file and launch entry binds the exact compilation digest. Any changed goal, work unit, candidate, or blueprint requires recompilation and a new review.
- The Round-4 runtime corrections in docs/specs/v11-orchestration-planner/revision-5-correction-design.md remain mandatory input for a later runtime layer.
- V11 remains stacked on owner-gated V10 for continuity. Its technical acceptance gate passed; branch preparation may proceed, but merge still requires an explicit baseline decision and owner approval.

## Recently Learned

- A specialized agent is not a role label: semantic intent must be explicit, deterministic demand must exclude runtime supply even transitively, EvidenceBindings must be constructible before blueprints, and materialization must be trace-bound before dispatch.
- Restartability requires finalized accepted-work semantics in canonical state; a tail event and digest-only history are insufficient for terminal evidence.
- Post-terminal evidence needs an explicit acyclic construction order: completed state/event, then accepted-work projection, then merge evidence.
- Static count ceilings must be byte-reachable under their enclosing root/callback ceilings; detached references can preserve capacity without bloating canonical roots.
- Exact structural metrics measure a decomposition; they do not prove semantic quality or global optimality. Named baselines and independent review are required.
- A one-message human surface and a structured deterministic kernel boundary are compatible when the repository ships the synthesis contract and preserves its launch artifact.

- Two read-only schema reviewers independently found useful gaps without creating write conflicts.
- One explicit Project artifact list is simpler and leaves each target envelope authoritative for kind.
- Instance identities and versioned reusable definitions must remain distinct.
- Free-form package compatibility ranges are premature; v1alpha1 compatibility is exact API-version membership.
- A permission requirement/ceiling relationship is clearer than fields that could look like grants.
- Port transfers, fan-out declarations, and joins make parallel composition statically reviewable.
- Every cyclic route must be bounded; one bounded edge cannot make another cycle safe.
- time can remain optional because sequence and causation determine trace order.
- High-confidence secret detection is warning-only suppression; forbidden capture fields remain schema errors.
- Resource limits must be independently reachable. The graph ceiling is 10,000 edges so its overflow can be tested before the 1 MiB artifact ceiling.
- Biome plus strict Ajv catches portability and contract-quality issues before implementation.
- The known Windows patch-helper sandbox refresh failure still requires bounded direct-write recovery plus independent verification.
- A duplicate-aware parser and a downstream validator must be integration-tested together; jsonc-parser's null-prototype values exposed an Ajv equality assumption that isolated library probes missed.
- Deterministic security classification should be extracted and tested separately from native operating-system fixture creation; this preserved `SC1014` coverage without pretending pure Node can inspect every reparse attribute.
- A successful filesystem create is not cleanup-owned until identity capture succeeds; track the gap as pending and preserve it on uncertainty.
- A concurrency test must place its barrier after preflight and immediately before the contended mutation; worker readiness before entering the operation does not prove a race was exercised.
- Independent review remained useful after the first hardening pass: two `REVISE` rounds found ownership and test-validity gaps that a green local suite missed.
- Event ceilings must bound retained records before rejection; validating a count after materialization leaves a memory-amplification path.
- Allocate bounded readers from verified input size plus the smallest growth-detection margin, not from the maximum accepted size.
- Bind case-matrix variants to table-driven tests so coverage statements fail when executable evidence drifts.
- A single reviewer loop caught six T008 defects despite a green suite, reinforcing review as an evidence-producing gate rather than ceremony.
- A public workflow visual must encode the executor, verification order, terminology, and scaled legibility; correct adjacent prose is not enough.
- A documented quick start should execute literal relative arguments and compare the complete example tree before and after read-only operations.
- Negative overclaim checks need passing provenance and truthful-negation cases so they enforce honesty without erasing history.
- Measured dogfood tests should compare stable semantics while treating elapsed time as environment-qualified observation data.
- Every action after workspace identity capture belongs inside cleanup protection; a setup callback is still a failure boundary.
- When review changes measured code, recapture the observation and rebind its digest instead of carrying stale evidence forward.
- Two T010 reviewer stalls confirmed that file contracts represent liveness but cannot enforce external runtime deadlines; centralized narrowing and retry remain necessary.
- A caller-authored trace can honestly preserve failed state and retry lineage when its source observation is content-digested and the kernel is described only as the inspector.
- A packed-consumer check needs an exact lock-backed production closure; cached tarballs alone do not give loose offline resolution the registry metadata it would otherwise request.
- Reviewer authority must name allowed read-only inspection commands separately from forbidden mutation, installation, test, network, and Git actions.
- Four additional reviewer stalls confirm that liveness is an external-runtime concern even after contracts are narrowed; preserve every attempt and require a returned verdict.
- Completion claims must bind to an immutable commit and exact CI/review scope; a green implementation checkpoint does not verify a later milestone and memory diff.
- An evidence-only attestation can close the record after an immutable candidate passes CI and independent review, without pretending the attestation changed or re-proved executable behavior.

- A timer is a wake-up hint, not proof that an absolute deadline arrived; always recheck monotonic time and re-arm early wake-ups.
- Cancellation acknowledgment must be measured from the abort observation, not from when abort delivery returns.
- Put the last no-call gate directly beside the effectful invocation and emit running evidence immediately after invocation begins.
- Reject live proxies before reflection; revoked-proxy tests alone do not prove traps remain dormant.
- Compile and execute an installed TypeScript consumer because repository-local typechecking cannot prove emitted declaration portability or package completeness.
- Untracked implementation files are invisible to ordinary commit diffs; stage the complete candidate before commit-bound review.
- A fulfillment timestamp and the settlement attributed to it must cross the ownership boundary together; detach first, then timestamp the completed snapshot.
- Green local and cross-platform CI evidence cannot override an independent review finding against the same exact commit.
- A focused exact-review file list and one literal phrase search can still miss normative synonyms; closeout needs a reviewed claim-family query across every tracked contract, governance, plan, and memory surface.
- Security-significant adjectives must match enforceable guarantees; invocation-scoped does not imply ephemeral, fresh, single-use, authenticated, revoked, or replay-resistant.
- Installed guides and schema READMEs are public contract surfaces; summaries must carry the ADR preconditions and explicit non-guarantees that make their outcomes truthful.
- Markdown register rows require structural placement checks as well as text presence; a row below a later heading is not part of the intended table.
- High-risk ADR claims need an explicit public-surface matrix and executable negative fixtures; prose searches and positive checks alone do not prevent prerequisite loss.
- Public-contract parity must bind required terms to the intended active paragraph or table row and reject contradictory positive claims even when canonical prose remains elsewhere in the section.
- Markdown contract checks must normalize logical statements across soft wraps, scope paragraphs to their exact heading owner, require keyed rows in the first contiguous table, preserve truthful-negative acceptance cases, and assert the diagnostic that caused each rejection.
- Active Markdown must recognize fenced content inside blockquotes and ordered or unordered lists, and every structural heading owner must use that same active view with exact uniqueness where required.
- A portable regression fixture must follow the tracked file's newline representation rather than `[Environment]::NewLine`; directly probe LF and CRLF when both are supported.
- README prose, navigation, repository identity, and semantic capability guards belong to active Markdown; raw source remains appropriate for literal command examples and command-claim checks.
- Exact line owners need horizontal whitespace, explicit optional carriage returns, and bounded indentation; `\s` is too broad for Markdown heading identity.
- Current status must state the invariant acceptance gate and must not require creating a candidate that may already exist when the text is reviewed.
- Fenced Markdown ownership must bind a closer to the opener's normalized container stack and derive list continuation indentation from marker width plus following indentation.
- A parser fast path is valid only when an ambiguity scan proves all relevant fences are top-level; rejection and preservation fixtures must remain equivalent across fast and rich paths.
- Grammar coordinates must survive through the final matcher: a raw-character regex cannot infer container-relative tab-expanded fence indentation after prefixes are stripped.
- A parser fast path must conservatively route every syntax class owned by its rich path; ambiguity detection should recognize possibility while exact grammar acceptance remains centralized.
- Ambiguity probes must cover continuation-only mixed horizontal whitespace as well as explicit nested-container prefixes; one tab can satisfy list continuation and leave valid relative fence indentation.
- Current status records should name invariant gates rather than candidate-creation actions that become false when the record is committed.
- Chronological memory must derive event dates from authoritative Git, hosted-run, or other primary timestamps rather than session-start metadata that can survive a midnight boundary.
- Verification evidence belongs to the exact tree it exercised; inherited evidence must name its owning candidate and must not be blended with current-tree checks.
- Historical correction narratives must name the later frozen candidate that actually ran their resulting matrix; row context alone is not evidence ownership.
- SWECircuit's target orchestration layer owns portable goal decomposition, capability matching, dependency-aware fan-out and fan-in, gates, and trace semantics. Optional policy compilers emit those standard contracts; IDE, model, and provider execution adapters perform assigned work and side effects without owning workflow policy.

- Current orchestration ecosystems converge on inspectable graphs, bounded specialized contexts, explicit input-required pauses, dependency-aware claims, host-enforced isolation, independent fan-in, and one integration owner; SWECircuit can standardize those semantics without adopting a provider runtime.
- Four independent V11 architecture reviews found material graph, handoff, API, lifecycle, and security gaps before code existed; pre-implementation fan-out is now evidenced as a quality gate, not just a proposed pattern.
- Multi-agent simplicity comes from one contract: requested concurrency defaults to one, profiles describe eligible capacity, and only an explicit bounded value above one permits parallel waves without changing policy, trace, or completion semantics.
- Plans should own immutable work instances while assignments own live profile, availability, executor, and claim identity; compiling assignments too early makes portability and resume semantics dishonest.
- Deterministic complete-wave reduction trades some tail latency for a much smaller race surface and a reconstructable one-coordinator baseline.
- A fixed Circuit cannot imply variable task decomposition; dynamic lanes require a separate host-authored, digest-bound replication policy with exact graph derivation.
- Acceptance criteria need stable IDs and host-authored producer/verifier/reviewer/evidence policy; compiler-derived coverage and integration must exist before parallel worker success can become traceable product quality.
- A named union is not implementation-ready until required and forbidden fields, unbound rejection, digest projection, and identity ownership are explicit.
- V10 operation rejection, zero-call work, executed summaries, and unknown effects are distinct facts and must never share a fabricated result envelope.
- Preflight fan-out before an immutable review candidate is useful, but an interrupted agent without a handoff is no evidence and cannot satisfy a gate.
- Memory and merge-readiness claims need explicit production paths and acyclic binding, not completion prose alone.

- Four failed reviews of a coupled compiler/runtime design are evidence to split ownership boundaries, not an invitation to keep enlarging one contract.
- Hyper-specialization is an optimization over exact task demand: stable work units, hard quality/authority gates, a serial baseline, legal team partitions, and a total comparator.
- Exhaustive partition search is honest only under a fixed small limit; larger search must name its bounded candidate strategy and preserve alternatives plus evaluation evidence.
- A reviewed roster needs one content digest carried into every agent and integration handoff so the host cannot silently substitute a different team.

- Exact source tuples plus externally retained compilation/package digests can bind an immutable review candidate in a shared dirty worktree, but they do not substitute for a clean commit, push, hosted verification, or owner approval.
- V11 dogfood justified six specialists because the serial candidate failed requested evidence independence; projected makespan improved from 40 to 23 planning units, while duplicated context and permission demand remained visible costs.
- Host containment must cover fixed goal, approval, package, and evidence control paths as well as declared context reads; installed examples must exercise the same trust rule they document.
- A pre-integration PASS does not survive automatically when integration mutates a bound live input; preserve the failed replay, revise the contract to a snapshot, and repeat every affected lane.
- Release cleanup owns only attempt-created outputs. Preserve host-owned offline caches, retain Windows path headroom, and rerun the complete immutable contract after host-only `FIX` outcomes.

## Next Likely Work

- Integration owner reconstructs compilation `sha256:ac1707213d9c22314d4c5a3d0bc6a838ef31863b63a9e2dac5993541d919c161` and package `sha256:838019281b732ec238e4460c03167087b7a63c409348ee66322cc5535469774d` after the integration outputs settle.
- Owner reviews `docs/milestones/v11.md`, `docs/specs/v11-specialist-compiler/review.md`, and the exact digest pair.
- Reconcile the shared tree, create and push the reviewed candidate, and update the V11 milestone with the immutable commit.
- Request the explicit owner decision on merging the stacked V10+V11 line; after approval, merge to `main`, verify the resulting tree, and record provenance.
- Use V11 as the next dogfood baseline only after adoption; retrieve the deferred runtime correction package when a later runtime version is deliberately opened.