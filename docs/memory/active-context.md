# Active Context

## Current Focus

V12 IDE Run Loop is in release correction on `codex/v12-ide-run-loop` from released V11.1 baseline `c2f974d2288fc510cb8388fbc8e6abe9fd5d9e8c`. The product implementation is complete. Candidate 4 `eff7d7afd5cb57a655f41803da96d824b9ba3438` is retired after its exact committed-tree gate passed source and repository integrity but failed five Git-aware regressions inside a metadata-free materialization. R11 is the active isolated Git-context and external-evidence correction; Candidate 5 and complete R2 review remain.

## Current Stage

V11.1 remains the released public baseline on `main`. V12 is the active dogfood version and is not merge-ready until one exact candidate passes the canonical gate, all three independent R2 reviewers, hosted CI, and the owner merge gate. V12 remains provider-neutral: the external IDE owns concrete model/effort selection, skills, tools, spawning, isolation, execution, persistence, integration effects, and merge.

V11 universal-runtime Round 4 failed against `d486b7f` with four REVISE verdicts, 10 high findings, and 9 medium findings. Raw evidence and correction design were committed at `6da0376`; the workflow emitted `split` rather than another broad patch cycle.

Revision 6 remains historical technical evidence. Attempts 7-17 continued production hardening. Revision 17 completed separate Audit B approval, preparation, product/API review, and algorithm/lifecycle review before security/trace returned `REVISE`; release was stopped and no specialist output was integrated. Its Candidate A pair, Audit B pair, approvals, raw handoffs, and generated artifacts remain preserved, but none can authorize a later revision.

The attempt-17 causes are confirmed: locator syntax was not connected to source `readScope`, launch authorization did not parse the bound Audit B handoff, and Unicode bidirectional formatting controls survived shared text validation. Those causal fixes passed the revision-18 pre-candidate gates: formatting, lint, typecheck, build, 343/343 kernel tests, V10 dogfood, 105-file package inspection, offline installed-consumer execution, and the template checker.

Revision 19 compiled owner-approved Candidate A `sha256:a2c43d26932e169707129065da52bdbef0b6e525a95cd0adf30d7a22c71ae807` / `sha256:d273142d00b9b960c99afb61d0e4236dec94b48d074a579dbef1ce8d486a94ed` and Audit B `sha256:d13e9dc388779d797cf5c412458a8a9ccc695001dbc1bee94de99df516bd9acb` / `sha256:6e2de8a87e484ea7261ecbea0c972c558e907bc06e8af8b8efc2d20d3a21ded4`. The verification receipt, Audit B binding and semantic review, cross-package authorization, preparation, algorithm/lifecycle review, and fresh product/API review passed. Security/trace returned `REVISE` for accepted escaped lone surrogates; release returned `FIX` for undeclared system-temp writes and a 264-character Windows checker path. Wave 3 did not launch. The complete run is preserved under `evidence/dogfood/runs/attempt-19/`.

Revision 20 compiled owner-approved Candidate A `sha256:ec43b1976764681faca6e43dcdf34c85f9efced49afb97d4569be1cac75d9406` / `sha256:bea5349d71c6da3c86178815d0f03dcb2fe64616ea23d32b4cab2109ac634025` and separately approved Audit B `sha256:b5e04d4af3d2dc9f7309690f42d297f8cc0612c7ad24709bbc755fd8a567e608` / `sha256:9c808ccd5ab7359f894c5a67d6b3995627711f9f88e2c1d63e76b59c9d1da8bf`. Audit B, preparation, algorithm/lifecycle, and product/API passed. Security/trace returned `REVISE` because high-confidence secrets and escaped TAB/LF/CR could enter semantic handoffs and a variable handoff path lacked scalar validation. Release verification passed its initial matrix, then correctly returned source-freshness `FIX` after the causal edits. Integration did not launch, and the complete retired run is preserved under `evidence/dogfood/runs/attempt-20/`.

Revision 21 compiled Candidate A `sha256:d8ebaaa5e5fd1fe5b6c575c5b53d64b4d495ce5007c987e9189c53614a401266` / `sha256:651bdc5ab823d8fb490b5c48f7212d07f042fc1cafbd07efc3460b9954001f7e` and Audit B `sha256:56436e40b2aa999dce21672ec59056cde96f2e5bf08bea9c16fb9302f213694c` / `sha256:2c8708ec0e11ec0e5c7e29e182170030129e2a7ffeb2ac40575e1fd396136d90`. Audit B, preparation, product/API, and security/trace passed. Algorithm/lifecycle returned `REVISE` because canonical digesting sorted nested record keys while normalized compilation objects retained caller insertion order, so logically equivalent inputs could render different package bytes and package digests. Release returned `FIX` after all preceding gates passed because the serial negative-checker harness remained nonterminal at 900.5 seconds. Integration did not launch; the complete run is preserved under `evidence/dogfood/runs/attempt-21/`.

Revision 22 compiled Candidate A `sha256:642ad0726e8019231d6e357a8602c387a47a637d2ce94fc0701efedaf1ae5869` / `sha256:8ddb1130c6af875f708fb347d46473d532dec0ff796834869ee644f6ee488bbc` and Audit B `sha256:0b9d61f44a25d5fc13eb5cfea82bd51c1417bc113fe52f0651f719e8293835ac` / `sha256:c6ec32f791ed698956d9b953596a9afae2636e65edb1cb069113fe4de62294e8`. Audit B, preparation, product/API, algorithm/lifecycle, and release verification passed. Release completed 353/353 tests and the 119-case matrix in 217.4 seconds. Security/trace returned `REVISE` because exported diagnostic artifact sanitization omitted lone-surrogate and secret detection, while pointer sanitization omitted lone-surrogate detection. Integration did not launch; the complete run is preserved under `evidence/dogfood/runs/attempt-22/`.

Revision 23 compiled Candidate A `sha256:36ebb90c8420a368e4246ce22e7804a0952396c526c36b3b498436d2919f20b6` / `sha256:232d928ae4e0e92f9cc2e25a611df8c6922eefe343a6ba7dee0f7aabccae99bc` and Audit B `sha256:ced8b145b120e77e349a02c3ebbe55c94d960854ad9fd71988126444b9a0517e` / `sha256:08fc0af95b9613308d25bbb5e2c40bb369c7753cc7b75e809b716d08b8645343`. Audit B independently reproduced all 203 partitions and both package identities; preparation authenticated 37 sources; product/API, algorithm/lifecycle, and release verification passed. Release completed 354/354 tests and all 119 checker cases. Security/trace returned `REVISE` because token-local secret detection allowed a credential assignment or Bearer value split across pointer delimiters to survive in the cumulative public pointer. Integration did not launch; the complete retired run is preserved under `evidence/dogfood/runs/attempt-23/`.

`safePointer` validates each candidate emitted pointer prefix and its decoded semantic prefix before appending a token, preserving only the longest prefix that does not match the shared high-confidence secret detector. Revisions 24-29 then added candidate analysis, strict raw handoffs, transitive fan-in, a truthful first run, packed-consumer parity, the corrected prelaunch superset, restored public compatibility, self-sufficient generated handoff contracts, complete fan-out rejection evidence, approval-freshness enforcement, and a hardened first-run host boundary. Revision 30 bound the corrected bytes, repeated the complete two-package audit and Candidate A cycle, passed technical integration, and passed all seven jobs in hosted run `29659867978` at published commit `461354c6f5e7c07fb78160d46d8c236c55fb91cf`. The owner-approved closeout fast-forwarded V11 to `main` at `759b2e7ac71a0fbc5f1e8e4e4d5158299561fd5a`; no provider execution or V11 runtime enforcement is claimed.

Revision 24 added a non-launchable candidate-analysis result, strict raw-handoff verification, transitive dependency fan-in, a truthful first run, and packed-consumer coverage. Candidate A and Audit B compiled and approval-verified, but prelaunch inspection found the custom `PrelaunchAuditHandoff` omitted the blueprint-required `agent` and `compilationDigest` fields while its closed validator rejected those fields. No Audit B agent launched; both revision-24 approvals are retired.

Revision 25 compiled Candidate A `sha256:6fd3f23139663de4dbb1950043dc02e2dc90e6da284f8ade1e99cfcc5b2f6404` / `sha256:1c7e875c0aad3c1b4a0987b14ec9be57b73c533c03779236889ce547db3e5af8` and Audit B `sha256:3cdf00aaa53b2d4b0a3a72789a6d654b49e4cbfbbd58e9b6a45c085ee05483a6` / `sha256:bc806f5007a87f2c5363c3cd0f3c35371e0c8ed6dda7ad46003ac88dd4fc7dac`. Both packages and the external receipt verified, and 364/364 kernel tests passed. Before accepting any Audit B result, the workflow checker rejected the concise README because it had removed stable workflow headings, the existing-kernel init path, active minimal/executor links, and explicit host boundaries. The binder was interrupted before handoff; no semantic result or launch authorization exists. Revision 25 is archived under `evidence/dogfood/runs/attempt-25/`.

Revision 26 restored those public anchors and compiled Candidate A `sha256:f3658ec182621f9a3485915cd260046d70e7fb1dcd84770f5b03ed3c9d05bb8e` / `sha256:f888a1a784d203d51bcb5d780b71167e0012662d30cec3dbab0d6e34afcab13a` and Audit B `sha256:9823e1919504fd757584f8eb24f2720c8ff34df4834e52a3d3a096a34304115f` / `sha256:3661bf2fcdfeaa88f43bf5fdf22b9f6c54f7ac908d70e96540b03f56714be1d1`. Both packages and the external receipt `sha256:61884e10b8bf190b102ead9d6fab0c5e9ea24326155142fbaa2f6975d2db6716` verified. The binder's exact raw result `sha256:72e5af3d45abe6b4de0b48bde25fc63bc91307a1320df5f742b64f379b261ae4` failed `SC4310`: artifact content was an object, `mediaType` was missing, and evidence omitted `status` and artifact references. The 119-case checker matrix also found one fixture expected the AGENTS diagnostic while hiding the handbook link. Revision 26 is archived under `evidence/dogfood/runs/attempt-26/`; zero results were accepted and its identities are retired.

Revision 27 compiled Candidate A `sha256:db47c3393dca0ede877bf07eecc89cd89cb7241f8380fb65f1ed8513221b2dd7` / `sha256:fde922b7e3c2f4747e04c92dacea8af3c7083fa87cd3bcf029f92b2b1ce632b3` and Audit B `sha256:183c968974eab7b6d7bd4451ceec2d35d16784265deb6b333836a7726b216d6c` / `sha256:c163c1c5eefc6900234fd781877677c0a41cbd6ffc7cd104b749bcf952f18841`. Audit B, launch authorization, preparation, and algorithm/lifecycle passed. Product/API, security/trace, and release returned `FIX`; complete fan-in remained non-ready and no integration occurred. Revision 27 is archived and retired.

Revision 28 compiled Candidate A `sha256:18e40b2586375f0b7004fe088b7b2ebc2f0bd607dec27963c1b68c7ee719df7c` / `sha256:7dd562d20096778abcd15601edc4226064865cf418c33f07f8e8ad25878faba0` and Audit B `sha256:044b44b21d22e5692a5edfb51de76813c689e8b244c58464d8ab55613a30dc3d` / `sha256:86d47a8b1ead37e6a920472fe153bc0d97b9c0340c59246ab5768c762a8f9c42`. Receipt, Audit B, launch authorization, preparation, algorithm/lifecycle, and security/trace passed. Product/API and release returned `FIX` for the same stale first-run approval; complete fan-in was non-ready and no integration occurred. Revision 28 is archived and retired. Its approval was corrected before the later revision-29 freeze.

Revision 29 compiled Candidate A `sha256:10cc520eb9c4f277876e76cd82908baa3cfcc01e1b84d5ae7c16d910b88075da` / `sha256:1e3afc96dc43950e21b3db94752a6f6fe9c33931ab36b0ce4a2adc2229a59994` and Audit B `sha256:17d7985ed3c4d0f817550b29d9b95308d11a5acaf13dabdee288e3b1d692742d` / `sha256:807d04eb877751acbe4802ccf147bf0853ac4df3390a953ed4669fc572bbbfb7`. Receipt, Audit B, launch authorization, preparation, algorithm/lifecycle, and release passed. Product/API and security/trace returned `FIX` for incomplete final-authorization summaries and unsafe first-run approval/source boundaries; complete fan-in was non-ready and no integration occurred. Revision 29 is archived and retired. At that stage, the summaries, host, tests, and retained approval were corrected for a fresh revision.

Revision 30 compiled and separately approved Candidate A `sha256:ced8186898ebb27bac53e50e6b803c353766ae015464a2bae2b758cb6cf6cc36` / `sha256:ddb642a474815b4ded464b40f5bd8225a404f610d3bd4a91d0ab2d43dc695f43` and Audit B `sha256:79c5a7103225b12398e27c0e959b993597f38dcc5ddca6d9750a4d2b62f2d065` / `sha256:367d9b3d57b918aabc6543dae16b9b3cf5fee81338fd241226ef9bef2209510f`. The external receipt, semantic Audit B, launch authorization, preparation, product/API, algorithm/lifecycle, security/trace, and release retry 30b all passed. Final machine fan-in has no missing dependency and `integrationReady: true`. Technical integration, post-integration replay, archival, branch publication, hosted CI, owner approval, and the fast-forward to `main` are complete.

## Important Current Constraints

- An `ExecutionGrant` carries invocation-scoped identity and permission assertions bounded by manifest requests and packet ceilings. The stateless kernel does not authenticate the issuer, establish freshness or single use, enforce or revoke the grant, consume it, or prevent reuse or replay.
- Cancellation uses absolute monotonic observations. A no-call abort or deadline can terminate because work never started. After invocation, in-window executor promise settlement counts only when all activity capable of advancing the invocation or producing invocation effects has stopped; transfer of live work is not acknowledgment. `abort_unconfirmed` is deliberately non-terminal and means work may still be live.
- V11 constructs task demand and a reviewed launch package; it does not execute agents, select models/providers, enforce permissions, create worktrees, schedule host capacity, merge, or mutate memory.
- Candidate analysis explains the compiler's exact normalized evaluation but never authorizes launch; `compileAgentBlueprints` remains fail-closed when no candidate is eligible.
- The first-run reference host treats retained approval and source paths as untrusted: bounded duplicate-aware closed parsing and canonical contained-file reads must complete before launchable output.
- Runtime handoffs must be preserved as exact raw UTF-8 bytes, verified against trusted package expectations, and assessed as a complete transitive dependency closure before dependent integration. Advertised specialist schemas are usable only with the publicly exported common schema registered in the same strict schema registry.
- Generated agent contracts must include a concrete closed handoff example with exact nested shapes; top-level required-field lists alone are insufficient runtime instructions. Hosts must preserve the example's deterministic media type, and verified artifact content permits normalized LF but rejects TAB, CR, CRLF, and all other unsafe controls.
- A repository context locator must be syntax-safe and its fragment-free path must be covered by the source `readScope`; work-unit permissions and the owner ceiling must cover that same scope.
- Audit B semantic acceptance requires the exact closed `PrelaunchAuditHandoff`; a filename, Markdown claim, bound bytes, or launch-authorization outcome cannot establish `PASS` alone.
- Contract, handoff, and public diagnostic text reject secrets, C0/C1 controls, DEL, malformed Unicode, and Unicode bidirectional formatting controls before becoming evidence; metadata rejects every C0 control, Markdown evidence permits normalized LF only, paths reject non-scalar text before filesystem access, and diagnostic pointers preserve only the longest safe prefix.
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
- V11 is the current merged baseline. V11.1 changes only the public explanation, deterministic visual, checker guards, and release records; it adds no runtime effect.

## Recently Learned

- A concise public README needs stronger executable truth guards because fewer words carry more semantic weight.
- Public capability checks should cover bounded core aliases and affirmative modal grammar while retaining truthful-negative controls.
- Host prompts must distinguish agent effects from read-only tools used to deliver declared context; over-constraining that translation can block a valid specialist contract.
- Public documentation tests remain compatibility contracts during concision work; independent semantic review does not replace the canonical repository gate.

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
- Public documentation can be concise without silently breaking prior contracts; stable headings, runnable source-checkout paths, active links, and host-boundary statements belong in automated parity checks.
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
- Canonical digest equality is weaker than reproducible package identity when normalized records retain caller insertion order; assert ordinary serialization and every rendered byte, not only deep equality or a sorted digest projection.
- A regression matrix is a product gate only if its harness is bounded and terminal. Exclude checker-irrelevant evidence, reuse a fixed fixture pool, mutate with copy-on-write, and preserve exact per-case outcomes.
- Downstream handoff validation cannot compensate for an unsafe exported diagnostic constructor. Apply the same scalar and privacy policy at every public evidence boundary and test direct, parser-mediated, and I/O-mediated paths.
- Token-local privacy checks are insufficient for delimited evidence. Validate both the exact cumulative string that can be returned and its decoded semantic form before extending a safe prefix.

- Planning recovery must preserve fail-closed launch semantics: a no-eligible analysis result is useful evidence, not a roster.
- Raw handoff verification must reject proxies and accessors before caller code can run, then bind semantic acceptance to the exact preserved bytes.
- Dependency fan-in must compute complete transitive closure and require explicit verified `PASS`; missing, duplicate, malformed, stale, or non-pass evidence cannot be inferred away.
- A custom semantic handoff may add stricter bindings, but it must still contain every required field advertised by its compiled blueprint; duplicate standard and custom identities must be equality-checked.

## Next Likely Work

- Freeze Candidate 4, run the exact committed-tree canonical gate, and preserve its candidate-addressed receipt and raw logs.
- Compile, approve, and launch the three exact R2 reviewers; accept release only if the complete package-bound roster returns `pass`.
- After V12 release, open a dedicated version for provider-neutral runtime demand, IDE capability inventory, deterministic model/effort assignment, and native host spawning; use the 2026-07-20 routing scan as intake.
