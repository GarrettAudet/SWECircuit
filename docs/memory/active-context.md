# Active Context

## Current Focus

Obtain exact-commit review and hosted CI for the complete V10 bounded-executor acceptance state on `codex/v10-executor-adapter`, while keeping owner-approved V9 on `main` as the stable baseline.

## Current Stage

V10 implements one provider-neutral, host-injected work-packet executor with an invocation-scoped grant and caller-owned V9-compatible journal. Runtime candidate `9d8907a` passed 275 tests, all three exact reviews, and run `29357443883`. Later closeout candidates exposed lifecycle, authority, and public-summary drift. Candidate `394612d` returned `REVISE` from correctness, security, and API/documentation for list-contained fences, legacy raw structural checks, non-unique required headings, and overstated docs. GitHub Actions run `29372879405` passed all six kernel-toolchain jobs but failed Template Check because a fixture assumed host-native newlines against LF-normalized Markdown. The current correction recognizes container-contained backtick and tilde fences, routes legacy structural owners through active Markdown, requires exact unique required headings, and makes the fixture CRLF/LF-neutral. The positive checker and all 77 scenarios pass: 73 expected rejections, four expected acceptances, and 30 parity cases; the final nested-container run finished in 256.7 seconds after prior full runs at 259.2, 258.2, and 259.1 seconds. The current acceptance state awaits a new immutable candidate, exact-commit review, all seven hosted jobs, evidence-only closeout, and owner approval. V10 is not merged, and `main` remains the V9 baseline.

The reviewed V9 kernel payload at `3c7a876` is merged to `main` after owner approval; all seven jobs passed for that exact payload in GitHub Actions run `29316575767`. The V9 dogfood baseline additionally includes its merge-provenance record. V8.2 was the prior baseline at `5caaa29`. V9 adopted it at 35f96d2, recorded the architecture gate at 349fc04, accepted the private toolchain at 5e44035, and froze v1alpha1 at 9932371. T006 validation is complete at a364bf6 with GitHub Actions run 29277160551 green. T007 initialization is complete at 095a391 with run 29281182002 green. T008 trace inspection is complete at 36efbf1 after preimplementation `REVISE -> REVISE -> REVISE -> REVISE -> PASS`, implementation `REVISE -> REVISE -> PASS`, 202 local tests, and GitHub Actions run 29288359476 passing all seven jobs. T009 public surface is complete at c9d7e4f after contract `REVISE -> PASS`, implementation `REVISE -> REVISE -> PASS`, 205 local tests, 42 checker scenarios, and GitHub Actions run 29292597506 passing all seven jobs. T010 dogfooding is complete at `6d4e60a` after 209 local tests, 42 checker regressions, measured failure/retry evidence, independent `REVISE -> PASS`, and GitHub Actions run `29310133523` passing all seven jobs. T011 is complete. Package-gate commit `0341345` passes 209 local tests, the private packed-consumer gate, all 42 checker scenarios, package-review `PASS`, and GitHub Actions run `29312736158`. Final closeout review returned `REVISE`, then immutable candidate `0717c91` passed all seven jobs in run `29314459583` and independent re-review returned `PASS` with no findings. AC1-AC8 and T001-T011 are complete; milestone V9 is merged to `main` and is now the dogfood baseline. The repository remains unlicensed.

## Important Current Constraints

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
- `main` contains the owner-approved V9 kernel at `3c7a876`; future version work must branch from the merge-provenance baseline.

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

## Next Likely Work

- Freeze the corrected V10 acceptance state as a new immutable candidate, then submit it to exact-commit correctness, security, and API/documentation review plus hosted CI.
- Obtain explicit correctness, security, and API/documentation `PASS` verdicts against the exact commit.
- Record the evidence-only closeout and request owner approval before merging V10 to `main`.
- After V10 adoption, evaluate one real provider adapter only through a new adapter evaluation and ADR; keep scheduling and merge authority outside core.
- Resolve licensing before broad external reuse or package distribution.
