# Active Context

## Current Focus

Dogfood the technically accepted V10 contracts to design V11 as an IDE-, API-, model-, and provider-agnostic software-work coordinator. The target is one visible path from a user message to approved module composition, explicit AgentBlueprintIntents, supply-free task-specific AgentBlueprints, attested materialization, high-value bounded conflict-safe parallel work, deterministic integration, qualified evidence, independent verification/review, final repository proof, owner approval, trace, and learning. Keep V10 immutable behind its owner gate and V11 planning-only until one later architecture candidate passes independent review.

## Current Stage

V10 technical acceptance is complete at immutable candidate `fa4371e` with evidence closeout `8ac3372`. The exact candidate passed the canonical local gate with 275 tests, the 119-scenario checker matrix, independent correctness, security, and API/documentation review, and all seven GitHub Actions jobs. V10 remains unmerged; `main` remains the owner-approved V9 baseline at `2b7bef3`.

V11 architecture review has completed three immutable dogfood rounds. Round 1 against `f559b4a` returned four `REVISE` verdicts. Revision 2 commit `5d82394` passed placeholder, BOM-free LF, 138-reference source, diff, template, and canonical package gates with 275 inherited tests, then four fresh reviewers returned `REVISE` with 17 high and 8 medium raw findings. Implementation correctly stopped both times. Revision 3 now defines an exact PolicyBundle/template closure, host-owned criterion coverage, compiler-derived integration, explicit requested concurrency, logical-role/runtime-assignment separation, root RunAuthority, content-bound transition/journal cursors, total comparators/signatures, formal matching and reserved waves, attempt replay prevention, one-shot dispatch truth, four child variants, two-pass mixed batches, queued input/cancellation, MemoryProposal-to-Candidate production, post-terminal MergeReadyEvidence, graph-wide portability, and the actual additive export inventory. Product/API/lifecycle preflights informed these corrections; the interrupted security preflight returned no evidence. No V11 kernel, schema, package, scheduler, merge, or memory-write behavior exists. Revision 3 exact commit `79f2b4e` passed source/template/declaration/export and canonical package gates with 275 inherited tests, then four fresh reviewers returned `REVISE` with 15 high and 10 medium raw findings. Revision-4 redesign is active against the 14 converged obligations in `architecture-review-round-3.md` plus the owner-required specialist-agent compiler and one-message approved-catalog kickoff. The initial revision-4 candidate added self-contained continuations, causal clarification, qualified evidence, declared exits, exhaustive closure, opaque dispatch capture, final repository witness, closed references, accepted-work projection, exact resources, and one complete AgentBlueprint per invocation. A read-only specialist-construction preflight then found four high and four medium gaps: missing semantic intent input, no repository-shipped synthesis surface, overclaimed optimization, supply-bound demand, no materialization receipt, weak baselines, and incomplete metric formulas. It correctly emitted `redesign`. The subsequent architecture-coherence preflight found six high and six medium defects: repository/projection/merge and evidence/blueprint construction cycles, incomplete fresh-process evidence, missing facade start rejection, impossible GrantOffer bounds, broad public unions, nonexistent context-use digests, width-equivalence drift, underspecified derived digests, terminal prose drift, and an unbound kickoff decision. It also emitted `redesign`. The current working tree is integrating a two-layer Specialist Compiler with pure profile-free `compileAgentBlueprints`, serial/candidate comparison, task-shaped intents, predecessor-safe EvidenceBindings, a derived-digest registry, AcceptedWorkAccumulator, status-specific continuations, detached offers, acyclic repository/projection/merge construction, and six golden baselines. These edits are unreviewed and no V11 runtime exists. V11 cannot be accepted or merged until V10 is owner-approved or V11 is rebased to an approved replacement.

## Important Current Constraints

- SWECircuit is an IDE-, model-, and provider-agnostic software-engineering control plane, not an API gateway or model router.
- The repository-shipped `synthesizeGoal` IDE kickoff creates `goal-synthesis.md`, compares a serial baseline with legal task-shaped candidates, may select existing owner-approved catalog modules, and must ask before novel modules, gates, authority, public behavior, or destructive/security-sensitive capability. Every required decision maps to the launched structured field that reflects it. The resulting host-approved PolicyBundle binds one exact Circuit plus exact Module/WorkPacket-template closures; execution-planner data only chooses permitted lane counts and narrowed packet content.
- Goal criteria map mechanically to compiler-derived producer, verifier, reviewer, integration, EvidenceBinding, and EvidenceSatisfaction records. The independent `compileAgentBlueprints` operation accepts only Goal/Policy/TaskAuthority and proposal semantics, derives EvidenceBindings before task-shaped AgentBlueprints, and accepts no runtime supply. AgentProfile is supply; Assignment is their sole binding; AgentMaterializationReceipt is a host attestation of pre-dispatch configuration.
- V11 selects a deterministic bounded earliest-feasible conflict-safe wave, then applies the normative maximum-cardinality lexicographic objective to assign that selected wave. It does not claim globally maximum conflict packing or semantic decomposition; exact measurements and independently reviewed baselines make optimization claims auditable.
- V11 uses one serialized coordinator that reserves worst-case reduction, consumes grant-attempt keys, installs a complete claimed wave before execution callbacks, and reduces one complete result batch in two passes. Distributed coordinators and cross-process claim guarantees are deferred.
- Read/read overlap may parallelize. Write/write, write/read, shared writer conflict zones, and unresolved path/alias scopes serialize with no V11 isolation exception.
- Child results are exactly executed, v10_rejected, not_started, or effect_unknown. Core alone observes zero dispatch, validates a prompt-free AgentMaterializationReceipt before entry, and holds the actual V10 return in an opaque process-local capture; host materialization remains an attestation, and post-entry mismatch, ambiguity, or overflow is uncertain.
- AcceptedWorkAccumulator preserves finalized host-neutral work semantics through every state/continuation. Completion derives RepositoryStateRequest from the pre-request state, closes the completed state/event and witness, then derives AcceptedWorkProjection before MergeReadyEvidence; no successor or evidence graph contains a digest cycle.
- `docs/specs/v11-orchestration-planner/orchestration-contract.md` is the property-level source; `docs/modules/specialist-agent-compiler.md` is the provider-neutral task-specific agent-construction contract; `docs/ide/specialist-agent-kickoff.md`, `goal-synthesis.md`, `specialist-compiler-preflight.md`, and `architecture-coherence-preflight.md` own the human entrypoint and dogfood evidence.
- V11 is stacked on owner-gated V10 for planning continuity only. Neither version may be merged without satisfying its own owner and technical gates.

- SWECircuit is the repository and project name, not a reserved package, domain, CLI, or hosted-service namespace.
- V9 on `main` is bounded to initialize, validate, and read-only trace inspection.
- V10 on its feature branch adds exactly one host-selected packet invocation through trusted injected code; it does not schedule, discover, retry, persist, merge, or update memory automatically.
- An `ExecutionGrant` carries invocation-scoped identity and permission assertions bounded by manifest requests and packet ceilings. The stateless kernel does not authenticate the issuer, establish freshness or single use, enforce or revoke the grant, consume it, or prevent reuse or replay.
- Cancellation uses absolute monotonic observations. A no-call abort or deadline can terminate because work never started. After invocation, in-window executor promise settlement counts only when all activity capable of advancing the invocation or producing invocation effects has stopped; transfer of live work is not acknowledgment. `abort_unconfirmed` is deliberately non-terminal and means work may still be live.
- In-process executor code can block the event loop or retain ambient authority; hosts needing preemption must isolate it outside the kernel process.
- V9 does not launch agents, schedule work, write traces, execute adapters, fetch evidence, or merge code.
- swecircuit.json is the sole project discovery authority; no ancestor search or recursive artifact scan is allowed.
- Canonical machine input is strict UTF-8 JSON under swecircuit/v1alpha1.
- Supported kinds are Project, Module, Circuit, WorkPacket, RunEvent, and AdapterManifest.
- Historical Markdown and rail-named files remain checker-supported provenance and are not kernel inputs.
- Module permissions are requirements, WorkPacket permissions are ceilings, and Adapter permissions are declaration-only requests. None grants runtime authority.
- Circuit routes own exact port transfers; cyclic routes are bounded; parallel fan-out and fan-in are explicit.
- Sequence and causation are authoritative; timestamps are optional evidence only.
- Trace inspection takes one explicit repository-relative caller-owned JSONL file, does not scan the manifest, and never writes, executes, fetches, or dereferences content.
- Trace bytes, lines, events, retained framing, evidence summaries, and read allocation are independently bounded; the byte limit is a ceiling rather than a fixed allocation.
- Full chats, prompts, environment dumps, command output, credentials, and evidence content are excluded from traces by default.
- T010's harness is caller-side repository support: it measures and orchestrates the three kernel operations, authors no kernel trace, and removes only an identity-rechecked run-owned temporary root.
- T010's 2,457.835 ms result is one Node v24.14.1/Windows x64 observation, not a benchmark, threshold, or production-readiness claim.
- Diagnostic codes, rules, severity, pointer conventions, sort order, and exit classes are frozen in schemas/v1alpha1/diagnostic-catalog.json.
- The primary README visual is the reviewed SWECircuit target model; it explicitly attributes execution to an external IDE or agent runtime and preserves the TraceRail image only as historical provenance.
- Pure Node cannot inspect every opaque same-path Windows reparse attribute; links, junctions, canonical divergence, regular-file state, containment, and descriptor identity remain enforced, while that native metadata boundary is explicitly deferred.
- Pure Node initialization cannot atomically bind directory creation to first identity capture or final identity checks to pathname removal. X07 names both malicious replacement windows; pending creations force `SC1022`, and detected mismatches are preserved.
- Public reuse remains legally unclear until the owner selects a license.
- `main` contains the owner-approved V9 kernel at `3c7a876`; completed V10 remains isolated on `codex/v10-executor-adapter` behind the explicit owner merge gate.

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

## Next Likely Work

- Integrate every Round-3 finding into one revision-4 source chain while preserving all three historical review records.
- Validate, commit, and push one clean immutable revision-4 candidate.
- Run fresh bounded read-only product, API, lifecycle, and security reviews against that exact commit.
- Route any material finding back to redesign; authorize the first schema slice only after four `PASS` verdicts.
- Keep the separate V10 owner merge gate open; do not merge V10 or V11 during architecture review.
- After architecture acceptance and an approved baseline, implement contracts first and prove one-agent continuation before multi-agent dogfood.
- Resolve licensing before broad external reuse or package distribution.
