# Active Context

## Current Focus

Complete V11 Specialist Compiler revision 21 without widening its pure-core boundary. Revision 20 is retired after independent review exposed three final semantic-handoff and path-validation defects; current work must bind their tested corrections into fresh Candidate A and Audit B packages, approvals, reviews, release evidence, integration replay, and milestone acceptance.

## Current Stage

V10 technical acceptance remains preserved at candidate `fa4371e` with evidence closeout `8ac3372` and is still owner-gated. Main remains the V9 baseline.

V11 universal-runtime Round 4 failed against `d486b7f` with four REVISE verdicts, 10 high findings, and 9 medium findings. Raw evidence and correction design were committed at `6da0376`; the workflow emitted `split` rather than another broad patch cycle.

Revision 6 remains historical technical evidence. Attempts 7-17 continued production hardening. Revision 17 completed separate Audit B approval, preparation, product/API review, and algorithm/lifecycle review before security/trace returned `REVISE`; release was stopped and no specialist output was integrated. Its Candidate A pair, Audit B pair, approvals, raw handoffs, and generated artifacts remain preserved, but none can authorize a later revision.

The attempt-17 causes are confirmed: locator syntax was not connected to source `readScope`, launch authorization did not parse the bound Audit B handoff, and Unicode bidirectional formatting controls survived shared text validation. Those causal fixes passed the revision-18 pre-candidate gates: formatting, lint, typecheck, build, 343/343 kernel tests, V10 dogfood, 105-file package inspection, offline installed-consumer execution, and the template checker.

Revision 19 compiled owner-approved Candidate A `sha256:a2c43d26932e169707129065da52bdbef0b6e525a95cd0adf30d7a22c71ae807` / `sha256:d273142d00b9b960c99afb61d0e4236dec94b48d074a579dbef1ce8d486a94ed` and Audit B `sha256:d13e9dc388779d797cf5c412458a8a9ccc695001dbc1bee94de99df516bd9acb` / `sha256:6e2de8a87e484ea7261ecbea0c972c558e907bc06e8af8b8efc2d20d3a21ded4`. The verification receipt, Audit B binding and semantic review, cross-package authorization, preparation, algorithm/lifecycle review, and fresh product/API review passed. Security/trace returned `REVISE` for accepted escaped lone surrogates; release returned `FIX` for undeclared system-temp writes and a 264-character Windows checker path. Wave 3 did not launch. The complete run is preserved under `evidence/dogfood/runs/attempt-19/`.

Revision 20 compiled owner-approved Candidate A `sha256:ec43b1976764681faca6e43dcdf34c85f9efced49afb97d4569be1cac75d9406` / `sha256:bea5349d71c6da3c86178815d0f03dcb2fe64616ea23d32b4cab2109ac634025` and separately approved Audit B `sha256:b5e04d4af3d2dc9f7309690f42d297f8cc0612c7ad24709bbc755fd8a567e608` / `sha256:9c808ccd5ab7359f894c5a67d6b3995627711f9f88e2c1d63e76b59c9d1da8bf`. Audit B, preparation, algorithm/lifecycle, and product/API passed. Security/trace returned `REVISE` because high-confidence secrets and escaped TAB/LF/CR could enter semantic handoffs and a variable handoff path lacked scalar validation. Release verification passed its initial matrix, then correctly returned source-freshness `FIX` after the causal edits. Integration did not launch, and the complete retired run is preserved under `evidence/dogfood/runs/attempt-20/`.

The handoff gate now applies the shared secret detector, separates all-C0 metadata rejection from LF-only Markdown evidence, and rejects lone surrogates in relative and explicit paths before filesystem access. Focused verification passes 65/65 and the full kernel passes 353/353 with format, lint, and typecheck. Revision 21 must run canonical verification with TEMP, TMP, and npm cache resolved inside declared `.local/npm-cache/**` authority and use a verified short-path spelling of that same target for the Windows negative checker matrix. No hosted CI, merge, provider execution, or V11 runtime enforcement is claimed.


## Important Current Constraints

- An `ExecutionGrant` carries invocation-scoped identity and permission assertions bounded by manifest requests and packet ceilings. The stateless kernel does not authenticate the issuer, establish freshness or single use, enforce or revoke the grant, consume it, or prevent reuse or replay.
- Cancellation uses absolute monotonic observations. A no-call abort or deadline can terminate because work never started. After invocation, in-window executor promise settlement counts only when all activity capable of advancing the invocation or producing invocation effects has stopped; transfer of live work is not acknowledgment. `abort_unconfirmed` is deliberately non-terminal and means work may still be live.
- V11 constructs task demand and a reviewed launch package; it does not execute agents, select models/providers, enforce permissions, create worktrees, schedule host capacity, merge, or mutate memory.
- A repository context locator must be syntax-safe and its fragment-free path must be covered by the source `readScope`; work-unit permissions and the owner ceiling must cover that same scope.
- Audit B semantic acceptance requires the exact closed `PrelaunchAuditHandoff`; a filename, Markdown claim, bound bytes, or launch-authorization outcome cannot establish `PASS` alone.
- Contract and handoff text rejects secrets, C0/C1 controls, DEL, malformed Unicode, and Unicode bidirectional formatting controls before rendering; metadata rejects every C0 control, Markdown evidence permits normalized LF only, and paths reject non-scalar text before filesystem access.
- Release evidence is valid only when every temporary workspace resolves inside declared authority; a Windows short-path spelling must be identity-checked against the same authorized target before use.
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
- V11 remains stacked on owner-gated V10 for continuity. Revision-21 technical acceptance, replay, branch publication, baseline selection, and owner merge approval are all still open.

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
- Context authentication is not authority unless the locator's actual path is transitively covered by source scope, work-unit demand, and the owner ceiling.
- Digest-bound bytes prove identity, not semantic approval. A launch gate must parse a closed handoff and bind its verdict, reviewer, goal, evidence duties, and both package identities.
- An audit package cannot digest-bind its own final package without self-reference. The external host must preserve a closed `PrelaunchPackageVerificationReceipt` outside both packages, deliver it only through declared runtime input ports, keep `candidateLaunchApproved: false`, and bind its exact bytes into final authorization.
- Integrity does not make visually reordered text safe; reject bidirectional formatting controls before human review and rendering.
- Digest-bound JSON can still contain non-scalar strings after parsing; validate lone surrogates at the semantic handoff boundary before byte measurement or launch.
- A functional test pass is not authority-compliant evidence when its temporary workspaces escape declared write scope; bind TEMP/TMP first and verify any path alias resolves to the authorized target.
- A semantically closed handoff still needs the same privacy scanner as compiler input; digest integrity must never preserve a credential-shaped value.
- Metadata and document bodies need different control policies: reject all C0 in metadata, while Markdown may permit only normalized LF line endings.
- Validate Unicode scalar structure before a user-controlled path reaches host resolution; filesystem behavior is not a provider-neutral validation rule.

## Next Likely Work

- Freeze the current feature spec and active context as immutable revision-21 integration inputs and refresh all 41 repository source tuples.
- Generate deterministically reproducible Candidate A and Audit B packages from the corrected source tree.
- Request separate owner approval for the exact Audit B pair, create and bind the exact `PrelaunchPackageVerificationReceipt`, run the binder and semantic reviewer, then preserve the strict `PrelaunchAuditHandoff` and cross-package authorization.
- Request separate owner approval for Candidate A only after Audit B `PASS`, then launch only its exact verified contracts.
- Require preparation, product/API, algorithm/lifecycle, security/trace, authority-contained release verification, integration-owner review, and post-integration package replay to pass before branch freeze.
- Update review, memory, and milestone evidence, then request owner merge approval without claiming runtime effects or hosted CI that did not occur.
