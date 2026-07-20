# V12 IDE Run Loop Architecture Decision

## Verdict

`pass`. V12 should be an additive, immutable evidence reducer over one exact approved V11 specialist package. It may verify the package and raw handoffs, derive dependency eligibility, expose routing, and identify specialist fan-in closure. It must not launch, schedule, persist, retry, cancel, integrate, merge, or mutate memory.

This decision is bound to source checkpoint `38dbfac`, compilation `sha256:662a7ca9303d3d347dbbe32835b3f2635b37f22ef8b051214a9e5924cb3f6415`, package `sha256:a119a349e0705f73c15ac3f2c8757e4964ecf16e4dc445bc2e62f8ba51691c87`, and fan-in content digest `sha256:8fef3bf188095b65105c93ff5d05dcf293815d7c833b40ed2490096db178ac25`.

The bounded circuit is:

`verified V11 package + external expectation + immutable session + exact raw handoff | create, restore, inspect, record | new immutable session, immutable inspection, or stable diagnostic`

## Source Integrity

All six declared repository sources matched their contract-bound raw SHA-256 and byte counts before use:

| Source | Bytes | Raw SHA-256 |
| --- | ---: | --- |
| `docs/architecture/decisions/0004-specialist-compiler-first.md` | 7732 | `f8f62c11f4b408a1eeac32597f08dd214fffa53ccf155c921045c0ab911ac654` |
| `docs/specs/v11-specialist-compiler/specialist-compiler-contract.md` | 36886 | `ab2c0f09a38e5de51f14c6af1c912bbc37f5ec8c27bd589273202741c94297b9` |
| `docs/specs/v11-orchestration-planner/revision-5-correction-design.md` | 4159 | `89d962f6b1a67911cee1c9b0f0c8dfca676f90aaa123a810e30858615b1ed91d` |
| `docs/ide/specialist-agent-kickoff.md` | 17565 | `8ceec4c3478b9f2adc7000893705f41b09b153d9747637884ac07e46b416eaf3` |
| `docs/specs/v12-ide-run-loop/evidence/architecture/inputs/goal-synthesis.md` | 3943 | `ecb7ee7725a8e86b46b91c6802f90e7b60a8b7c949b06a650c5c6f433f733a8e` |
| `docs/specs/v12-ide-run-loop/evidence/architecture/inputs/spec.md` | 5069 | `669126e41e8a219c39c7ebd15c6d93e19206f124faf8fbef67b2124b8153d258` |

The product, authority/portability, and lifecycle/recovery handoffs were accepted only under the host-supplied V11 verification statement: required 3, received 3, missing 0, and `integrationReady: true`. This synthesis performed no edits, tests, network access, Git changes, or descendant launches.

## Reconciled Decisions

| Question | Implementation decision | Reason |
| --- | --- | --- |
| Digest-only state or source-preserving restart | Reject digest-only restart. The session embeds the complete verified `RenderedSpecialistPackage` and canonical base64 for every exact accepted raw handoff. The trusted digest pair remains external. | Digests bind identity but cannot reconstruct package verification or raw-handoff semantics after deserialization. |
| Three or four operations | Export four pure operations: create, restore, inspect, and record. Do not add a serialize operation. | A raw restore boundary is required to reject duplicate JSON keys, malformed UTF-8, unsafe text, noncanonical base64, and forged self-digests before a parsed object is trusted. |
| Package placement | Store the complete canonical verified package inside the session and require `SpecialistPackageExpectation` separately on every public operation. The host also preserves the original approved package as external evidence. | This makes one session restartable without treating package-carried digests as approval. |
| Raw handoff retention | Store exact raw bytes as standard padded base64 plus byte count and raw SHA-256. The host also preserves each original raw byte artifact outside core. | Restore can decode and rerun V11 verification; no normalized or prose-only substitute becomes evidence. |
| Integration gate | Use one deterministic virtual external integration sink whose direct dependencies are every sink blueprint in the selected DAG. Do not accept a caller-selected target or gate. | The transitive closure of all DAG sinks is the complete selected blueprint set. `goal.integrationOwner` is a destination string, not an agent ID. |
| Exact replay | After full verification, a byte-for-byte replay of the already accepted handoff is an idempotent success returning the same canonical session and `contentDigest`. A different second handoff for that agent fails closed. | This supports acknowledgment recovery without claiming exactly-once execution. |
| Readiness terminology | The normative API term is `dependencyEligible`, not running, queued, scheduled, dispatched, or launched. | Core proves package-bound dependency evidence only. The external host must still check approval, context delivery, permissions, isolation, capacity, and duplicate live work. |
| Non-pass behavior | A verified non-`pass` is successfully recorded as the terminal route for that session. It never satisfies a dependency. After routing, only exact replay is accepted. | Retry and recovery policy remain outside V12. Late results stay host-preserved evidence and may be checked directly with V11, but do not rewrite the routed session. |
| Closeout | `integrationReady` closes specialist fan-in only. No typed merge, release, or memory closeout operation is added. | Integration, repository verification, independent review, merge, milestone, and memory remain separately governed external stages. |

## Public Surface

Use a new additive namespace with exact constant `SPECIALIST_RUN_API_VERSION = swecircuit/specialist-run/v1alpha1` and exact readonly `SPECIALIST_RUN_KINDS = [SpecialistRunSession, SpecialistRunInspection]`. Keep all seven V11 operations and both V11 schema identities unchanged.

1. `createSpecialistRunSession(renderedPackage, approvedExpectation): OperationResult<SpecialistRunSession>`

   Verify the complete package through `verifySpecialistPackage`, derive the exact selected roster and manifest contract bindings, embed the verified package, initialize no accepted handoffs, compute the session digest, detach, and deeply freeze. There is no roster subset, target-agent, integration-gate, provider, or host-state input.

2. `restoreSpecialistRunSession(rawSessionBytes, approvedExpectation): OperationResult<SpecialistRunSession>`

   Bound raw bytes before parsing, require strict UTF-8 and duplicate-aware closed JSON, verify the session digest, verify the embedded package against the external expectation, decode every base64 row, rerun `verifySpecialistHandoff`, validate uniqueness and pass-only dependency closure, normalize ordering, recompute the canonical value, detach, and deeply freeze. Property order and harmless outer whitespace may vary; semantics may not.

3. `inspectSpecialistRunSession(session, approvedExpectation): OperationResult<SpecialistRunInspection>`

   Treat the object as untrusted, revalidate the complete session and external expectation, then derive status, dependency-eligible exact contracts, accepted evidence bindings, blockers, route, specialist outcome, integration readiness, and one closed external next action. Inspection has no effect and does not accept host assertions.

4. `recordSpecialistRunHandoff(session, approvedExpectation, rawHandoffBytes): OperationResult<SpecialistRunSession>`

   Revalidate the prior session, snapshot and verify the exact raw bytes through V11, apply the normative transition precedence, and return a new canonical frozen session or a null value with stable diagnostics. The prior session remains structurally unchanged and frozen.

A returned session is ordinary closed JSON data, so canonical property order permits `JSON.stringify` for persistence. Restore, rather than a new serializer, is the raw trust boundary. Export the closed session and inspection schema through package path `./schemas/specialist-run.schema.json`. There is no `runGoal`, dispatch, claim, retry, cancel, close, merge, persistence, or memory operation.

## Session Contract

`SpecialistRunSession` has exactly these root fields:

- `apiVersion` and kind `SpecialistRunSession`.
- `goal` containing exact `id`, `revision`, `digest`, and external `integrationOwner`.
- `compilationDigest`, `packageDigest`, and `selectedCandidateId`.
- `package`, the complete canonical `RenderedSpecialistPackage` returned by V11 verification.
- `acceptedHandoffs`, ordered by the existing V11 ordinal agent-ID comparator.
- `contentDigest`.

Each accepted row has exactly `agentId`, `blueprintDigest`, `outcome`, `rawEncoding` with literal value `base64`, `rawBytes`, `rawDigest`, and `rawBase64`. Base64 must be standard, padded, canonical, and whitespace-free. Decoding must reproduce the stored byte count and digest, and the decoded value must pass V11 verification against the embedded package and external expectation.

Do not duplicate blueprint dependency rows, contract contents, artifact contents, or evidence duties outside the embedded package and raw handoffs. They are derived after reverification. Do not store stage, readiness, blockers, next action, revision counters, timestamps, random IDs, run nonces, host paths, callbacks, providers, models, prompts, executors, credentials, grants, workspaces, process state, launch waves, attempts, or capacity.

Register two digest domains: `swecircuit/specialist-run/session/v1alpha1` over the closed canonical session root excluding `contentDigest`, and `swecircuit/specialist-run/inspection/v1alpha1` over the closed canonical inspection root excluding `contentDigest`. Use the existing V11 framed canonical-JSON digest construction and ordinal comparator. All IDs are ASCII-constrained, all sets have one exact comparator, and independent pass-handoff arrival orders normalize to the same final session.

The session digest detects corruption and binds semantics; it is not authentication, approval, durable history, or freshness. The host must retain the trusted expectation outside the session and protect persisted state at its own boundary.

## Limits

Export these exact readonly `SPECIALIST_RUN_LIMITS` values:

| Limit | Value |
| --- | ---: |
| `rawSessionInputBytes` | 67108864 |
| `canonicalSessionBytes` | 134217728 |
| `acceptedHandoffs` | 16 |
| `rawHandoffBytes` | 1048576 |
| `rawHandoffBase64Chars` | 1398104 |
| `canonicalInspectionBytes` | 67108864 |

The V11 package aggregate-content ceiling of 4194304 bytes and all V11 text, schema, and handoff limits remain normative and are not widened. Enforce the 64 MiB `rawSessionInputBytes` ceiling before parse or decode, and independently enforce the conservative 128 MiB `canonicalSessionBytes` safeguard before returning a successor. A maximum fixture must prove that one maximum valid V11 package plus one maximum raw handoff for each of 16 blueprints fits the canonical-session safeguard. At-limit and one-byte-over tests are release gates; do not silently truncate, omit sources, or fall back to digest-only state.

## Transition And Recovery Semantics

A session contains at most one accepted handoff per exact blueprint. A new handoff is dependency-eligible only when every transitive prerequisite already has an accepted `pass` handoff in the prior session. Readiness must reuse the V11 package DAG and be differentially checked against `assessSpecialistHandoffs`; projected launch waves and `maxConcurrency` never affect it.

The record precedence is normative:

1. Validate and reverify the prior session and embedded package.
2. Bound, snapshot, and run V11 verification on the submitted raw bytes.
3. If the same agent already has byte-for-byte identical raw bytes, return the same canonical session as idempotent success.
4. If the same agent has different bytes, reject conflicting settlement.
5. If the session already contains a non-`pass` route, reject a new settlement.
6. If any transitive dependency lacks an accepted `pass`, reject dependency-ineligible input.
7. Construct the successor and reject it if the aggregate run limit is exceeded.
8. Insert the canonical row. If its exact outcome is non-`pass`, derive the terminal route; otherwise continue collecting.

A verified non-`pass` record is operation success and workflow non-success. Its exact canonical outcome remains visible. It cannot be overwritten, cannot unlock dependents, and keeps `integrationReady` false. Any later independent raw result is preserved by the host and may be verified with V11, but V12 returns the routed-session diagnostic and leaves state unchanged.

Recovery is deterministic: replay after persistence uncertainty is idempotent; malformed, stale, substituted, premature, or conflicting evidence leaves the prior state unchanged; independent pass arrivals converge through canonical ordering; a fresh process restores from session bytes plus the external expectation. Core does not merge divergent successors or decide whether a host process is still live. The host must serialize persistence or use its own compare-and-swap check keyed by prior `contentDigest`.

## Inspection And Routing

`SpecialistRunInspection` contains the exact goal and digest bindings, session digest, stage, one status row per selected blueprint, manifest-resolved dependency-eligible contract files, accepted handoff and artifact/evidence bindings, blockers, route, `specialistOutcome`, `integrationReady`, next action, and inspection `contentDigest`. Artifact and evidence rows expose exact names, media types, byte counts, raw digests, semantic digests, and statuses, but do not duplicate raw artifact content.

The closed stages are `collecting`, `routed`, and `integration_ready`. Each blueprint has exactly one status:

- `accepted_pass`: its verified exact outcome is `pass`.
- `accepted_non_pass`: it owns the session's exact route.
- `dependency_eligible`: it is unsettled and every transitive prerequisite is accepted `pass`.
- `waiting_for_dependencies`: it is unsettled and lists canonical direct prerequisites not yet accepted `pass`.
- `session_routed`: it is unsettled after a route and lists the route origin plus every transitive non-pass blocker that applies.

Resolve eligible contract path, media type, digest, byte count, and content only through the reverified manifest. Never construct a filename from an agent ID. The canonical API field is `dependencyEligibleContracts`. An IDE may say eligible for host launch only while visibly stating that the host still owns every launch precondition and effect.

`specialistOutcome` is null while collecting, the exact accepted non-`pass` outcome while routed, and `pass` only after every selected blueprint has one accepted pass handoff. The virtual integration sink depends on every graph sink; therefore `integrationReady` is true exactly when every blueprint in the complete selected roster has one verified `pass` handoff. A target blueprint's prerequisite readiness remains an agent status, not a caller-selected overall gate.

The closed next actions are:

- `external_host.evaluate_dependency_eligible_contracts` while collecting, with exact agent and contract bindings.
- `integration_owner.route_specialist_outcome` while routed, with exact origin and outcome.
- `integration_owner.integrate_and_verify` when specialist fan-in is complete.

Core does not return `await_handoff` because it has no in-flight knowledge. Repeated inspection may expose the same eligible contract; the host owns deduplication and must never interpret eligibility as an at-most-once dispatch authorization.

## Diagnostics

Preserve delegated V11 diagnostics `SC4307`, `SC4308`, `SC4309`, `SC4310`, `SC4311`, `SC4312`, `SC4313`, and `SC9001` without reclassification. Add only these run-specific codes:

| Code | Meaning | Route |
| --- | --- | --- |
| `SC4401` | Invalid closed session, session digest, embedded binding, canonical ordering, base64 row, or restore semantics | `fix` or `block` |
| `SC4402` | Run-session or inspection aggregate limit exceeded | `split` or narrow the approved package |
| `SC4403` | Different second handoff for an already settled agent | `block` and create a new reviewed run boundary |
| `SC4404` | Handoff submitted before every transitive dependency has accepted `pass` | `fix` by recording prerequisites first |
| `SC4405` | New handoff submitted after the session routed | route externally; session unchanged |

Every failure returns `ok: false`, `value: null`, stable ordered diagnostics, and no mutation. Exact replay is not a diagnostic. A valid non-`pass` handoff is not an operation failure.

## External Host Boundary

The host alone obtains and retains two-digest approval, verifies delivered context bytes, enforces permissions and isolation, selects runtime supply, launches work, prevents duplicate live launches, tracks in-flight processes, preserves original package and raw result artifacts, persists sessions, protects evidence, serializes concurrent updates, handles uncertain effects, integrates changes, runs repository gates and independent reviews, merges, and updates milestones and memory.

V12 must not claim actor authentication, approval provenance, run freshness, anti-replay across sessions, exactly-once execution, runtime capacity, permission enforcement, context delivery, process state, durable persistence, integration, merge readiness, release, or memory completion. V11 handoffs have no run nonce, so the same valid handoff can be replayed into another session for the same approved package. A decorative run ID would not fix that and is forbidden in this increment.

## IDE Journey And Evidence

The IDE guide should show this one-message path:

1. Derive and visibly review the `GoalContract`; ask one focused question only for a blocking decision.
2. Compile and show the serial baseline, exact search claim, selected partition, selection reason, blueprints, and compilation digest.
3. Render the exact package, preserve two-digest approval externally, and verify it.
4. Create and inspect the run session; show stage, package identity, dependency eligibility, reasons, evidence, blockers, readiness, and next external actor.
5. The external host resolves contracts through verified manifest metadata, verifies delivered source bytes, enforces authority and isolation, checks duplicate live work, and decides whether to launch.
6. The host preserves every exact raw result. Core records valid evidence into a new immutable session and the IDE reinspects after each accepted transition.
7. A non-`pass` routes visibly. Complete all-`pass` fan-in assigns integration to the external owner without claiming it occurred.
8. The external owner snapshots mutable inputs where required, integrates, runs canonical verification and independent review, reconstructs the approved package after integration, and completes milestone and memory stages separately.

Indispensable evidence is the approved V11 package and `compilation.json`, the external expectation and approval record, serialized session checkpoints, each original exact raw handoff, inspections and diagnostics, integrated verification, independent reviews, immutable pre-integration snapshots where needed, and milestone and memory records. Do not add a duplicate roster, dispatch receipt, provider profile, run event journal, workspace model, or core closeout envelope.

## Implementation Work Units

| ID | Objective and scope | Dependencies | Required evidence | AC |
| --- | --- | --- | --- | --- |
| `contract.run-session` | Freeze the ADR, normative contract, closed TypeScript types, schema, constants, status and next-action unions, comparator use, digest registry, and diagnostics. Own new `src/specialist-run-types.ts` and `schemas/v1alpha1/specialist-run.schema.json`. | None | Schema/type/contract conformance review | AC1-AC6 |
| `implement.session-create-restore` | Implement package-bound construction, duplicate-aware raw restore, source retention, canonicalization, digesting, limits, detachment, and deep freeze in a new session implementation module using V11 package verification. | `contract.run-session` | Positive and adversarial create/restore fixtures | AC1, AC6 |
| `implement.handoff-transition` | Implement V11 handoff composition, pass-only dependency gates, exact replay, conflicting settlement, terminal non-pass routing, unchanged-state rejection, and aggregate checks in a transition module. | `implement.session-create-restore` | Transition matrix and immutability evidence | AC3, AC4 |
| `implement.session-inspection` | Implement manifest-only contract resolution, every-agent statuses, blockers, evidence bindings, virtual external sink, closed stages and next actions, and inspection digest in an inspection module. | `implement.session-create-restore` | DAG and V11 differential readiness evidence | AC2, AC5 |
| `integrate.public-surface` | Export constants, operations, and types from `src/index.ts`; add the `./schemas/specialist-run.schema.json` package export and packed-consumer use without changing V11 exports. | `implement.handoff-transition`, `implement.session-inspection` | Build declarations and packed-consumer evidence | AC6, AC9 |
| `verify.run-session` | Add negative, boundary, permutation, fresh-process, authority, parser, package-substitution, replay, route, limit, and public-export tests. | `integrate.public-surface` | Canonical repository and packed-consumer gate logs | AC1-AC6, AC9 |
| `dogfood.ide-run-loop` | Update the IDE kickoff and use the exact V12 operations on V12's implementation package. Preserve package, approval, sessions, raw handoffs, inspections, immutable integration snapshot, and friction measurements. | `verify.run-session` | Dogfood record and measured friction | AC7, AC8 |
| `review.release-candidate` | Bind product, lifecycle, security, and API reviews to the exact release candidate after canonical verification; then complete integration, milestone, and memory evidence externally. | `verify.run-session`, `dogfood.ide-run-loop` | Four independent reviews plus release evidence | AC9 |

The transition and inspection units may proceed independently after the shared session validator is frozen; `integrate.public-surface` is the sole owner of shared exports and package metadata. No unit may add provider data, callbacks, effects, or a caller-selected roster. Any need for those emits `split` into the deferred runtime layer.

## Acceptance Mapping

| Criterion | Required implementation and proof |
| --- | --- |
| AC1 | Creation verifies both external digests, embeds the exact reconstructed package, derives the complete selected roster, rejects subsets and substitutions, and returns a detached deeply frozen value. Cover wrong expectations, coordinated rewrites, missing files, forged manifest bindings, stale candidate IDs, proxies, and accessors. |
| AC2 | Inspection returns all and only dependency-eligible manifest-resolved contracts and one closed reason for every other blueprint. Cover roots, chains, diamonds, fan-out, fan-in, disconnected DAGs, partial passes, and routed sessions. |
| AC3 | Recording returns a canonical successor, an identical value for exact replay, or a stable null diagnostic while the prior value remains deeply equal and frozen. Cover malformed UTF-8, duplicate keys, stale identity, unknown agent, substitution, premature dependency, conflict, and every diagnostic precedence edge. |
| AC4 | Exercise every canonical non-`pass` workflow outcome. Each is retained exactly, settles only its origin, unlocks nothing, makes routing visible, rejects later new settlements, and keeps integration false. |
| AC5 | Differentially compare per-agent dependency eligibility with V11 transitive assessment. Prove the virtual all-sinks closure equals the complete selected roster and that exactly one verified `pass` per blueprint, with no non-pass, is the only integration-ready state. |
| AC6 | Serialize, restore in a fresh process using the external expectation, and reinspect with equal canonical semantics and digests. Vary property and independent pass arrival order; reject duplicate keys, unknown fields, noncanonical base64, unsafe Unicode, changed sources, and provider, model, executor, callback, time, random, or host-state fields. |
| AC7 | Replace the prose gap with the eight-step journey above and a compact status view showing stage, specialist outcome, exact evidence, blockers, dependency eligibility, integration readiness, next action, and responsible external actor. |
| AC8 | Dogfood the release candidate and measure blocking questions, approval prompts, core calls, manual contract lookups, rejected transitions, serialized session size, reverification cost, resume equality, persistence steps, and adapter-only translation. Targets are zero manual filename construction and zero hidden host effects. |
| AC9 | Run the canonical repository gate and packed-consumer gate on the exact candidate, then obtain independent product, lifecycle, security, and API reviews. Include maximum-size, parser, replay-claim, authority-negative, package-substitution, immutability, dependency, route, schema, and export coverage. |

## Stop Conditions And Deferred Work

Stop and route `block` on an untrusted expectation, package mismatch, source loss, unsafe content, or identity substitution. Route `clarify` or `redesign` when product semantics, integration ownership, authority, or acceptance evidence changes. Route `split` when the fixed resource bounds are exceeded. A changed goal, roster, blueprint, package file, or handoff contract requires a new V11 compilation, render, external approval, and V12 session.

Keep all of the following deferred: provider and model selection, prompts and credentials, runtime profiles, capacity and projected-wave dispatch, launch claims, in-flight state, worktrees and sandbox enforcement, permission grants, context materialization claims, V10 invocation, retries, cancellation, deadlines, provisional or `any` joins, route budgets, live-effect crash recovery, distributed persistence or CAS, multi-package graphs, run challenges and actor authentication, repository attestation, automatic integration, merge readiness, release, and durable memory mutation.

This is the smallest implementation-ready V12 boundary that closes restart trust and IDE usability without reviving the deferred universal scheduler.