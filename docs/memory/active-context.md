# Active Context

## Current Focus

Dogfood the technically accepted V10 contracts to design V11 as an IDE-, model-, and provider-agnostic orchestration control plane. Keep `codex/v10-executor-adapter` immutable and unmerged behind its owner gate, and keep the stacked `codex/v11-orchestration-planner` branch planning-only until architecture review passes.

## Current Stage

V10 technical acceptance is complete at immutable candidate `fa4371e` with evidence closeout `8ac3372`. The exact candidate passed the canonical local gate with 275 tests, the 119-scenario checker matrix, independent correctness, security, and API/documentation review, and all seven GitHub Actions jobs. V10 remains unmerged; `main` remains the owner-approved V9 baseline at `2b7bef3`.

V11 T001 architecture bootstrap is complete and validated on `codex/v11-orchestration-planner`, stacked from `8ac3372` so V10 remains immutable. The feature package, decomposition record, orchestration record, dated primary-source scan, proposed ADR 0003, draft milestone, and review packet define the intended boundary. The template checker and canonical package gate pass with 275 inherited V9/V10 tests. No V11 kernel, schema, package, executor, scheduler, merge, or memory-write behavior has changed. T002 starts only from an immutable design candidate and completes only after independent review. V11 cannot be accepted or merged until V10 is owner-approved or the branch is rebased to an approved replacement, and the exact V11 architecture candidate passes independent review.

## Important Current Constraints

- SWECircuit is an IDE-, model-, and provider-agnostic software-engineering control plane, not an API gateway or model router.
- The human supplies the goal and material decisions; selected circuits and module contracts shape decomposition, capability requirements, gates, and completion evidence.
- A host-injected planner may propose work, but deterministic SWECircuit validation, compilation, matching, readiness, fan-in, and trace rules remain authoritative.
- Specialized-agent matching uses declared capabilities, contract support, authority ceilings, capacity, and isolation facts; it ignores provider, model, API, and IDE identity.
- V11 state transitions are planned as pure immutable reductions. Cross-process claim exclusivity requires host serialization or atomic compare-and-swap persistence and is not a stateless-core guarantee.
- Parallel writes serialize by default when scopes overlap. Any exception requires explicit runtime isolation assertions plus actual host enforcement.
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

## Next Likely Work

- Validate the complete V11 bootstrap with the template checker, byte-shape checks, and diff review.
- Run bounded read-only product, API, lifecycle, and security reviews against the exact immutable V11 design candidate.
- Resolve every material finding and accept ADR 0003 only when the reviewed contract remains simple, portable, and truthful about host enforcement.
- Keep the separate V10 owner merge gate open; do not merge V10 or V11 as part of V11 planning.
- After architecture acceptance and an approved baseline, implement the smallest control-plane vertical slice and dogfood it with four specialized work units, safe parallelism, clarification, diagnosis, fan-in, integrated verification, and parent trace reconstruction.
- Resolve licensing before broad external reuse or package distribution.
