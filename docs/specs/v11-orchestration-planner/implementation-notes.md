# V11 Implementation Notes

## Status

Design only. Round 3 returned four `REVISE` verdicts against exact commit `79f2b4e`; specialist and architecture-coherence preflights then returned four high/four medium and six high/six medium findings. Their revision-4 contract corrections are integrated in the current working tree, which is locally verified but not yet frozen or independently reviewed. No V11 schema, source, package, scheduler, executor, merge, or memory behavior is implemented.

## Summary Of Changes

- Preserved Round 1, Round 2, and Round 3 commit-bound review evidence.
- Added a normative property-level `orchestration-contract.md`, provider-neutral `specialist-agent-compiler.md` module, repository-shipped IDE kickoff contract, and dogfood `goal-synthesis.md`.
- Replaced implicit fan-out slots with host-authored OrchestrationPolicy replication regions over exact Circuit subgraphs.
- Put acceptance coverage policy in GoalContract, made Plan coverage compiler-derived, added integration bindings, and separated WorkPacket logical ownership from runtime Assignment.
- Revision 4 closes total starts, self-contained continuations, causal clarification, per-activation approval, qualified EvidenceSatisfactions, declared exits, exhaustive terminal closure, opaque dispatch capture, final repository-state witness, closed SourceReferences, accepted-work width projection, exact resource arithmetic, portability, and package inventory.
- Added a two-layer Specialist Compiler: serial/candidate semantic synthesis plus independent profile-free `compileAgentBlueprints` shared by `compilePlan`, predecessor-safe EvidenceBindings, one task-shaped supply-free AgentBlueprint per intent, exact registered context-use/field digests and structural measurements, later blueprint-to-profile Assignment, and a prompt-free AgentMaterializationReceipt.
- Defined `synthesizeGoal` as the one-message IDE kickoff: compose only approved catalog modules, create `goal-synthesis.md`, compare a serial baseline with legal candidates, map owner decisions to launched structured fields, and stop for unresolved novel or high-risk contracts.
- Added AcceptedWorkAccumulator, status-specific facade interactions/start rejection, detached GrantOffer references, and an acyclic pre-request -> completed state/event -> AcceptedWorkProjection -> MergeReadyEvidence construction order.

## Deviations From Plan

Revision 2 and revision 3 were each expected to pass architecture review. Neither did. The workflow correctly emitted `redesign` before implementation both times. Revision 4 must close the full Round-3 lifecycle, continuation, evidence, authority, repository-state, portability, and resource findings while also satisfying the owner-required specialist-agent compiler and one-message kickoff. A subsequent read-only product preflight exposed four high and four medium specialist-construction gaps and correctly emitted `redesign`; the source is preserved in `specialist-compiler-preflight.md`. A separate coherence preflight exposed six high and six medium construction-order, continuation, API-union, digest, and byte-reachability defects and also emitted `redesign`; the source is preserved in `architecture-coherence-preflight.md`.

V11 remains stacked on owner-gated V10 for planning continuity. It cannot be accepted or merged until V10 is approved or V11 is rebased and fully reverified.

`apply_patch` is intermittently unavailable in this Windows sandbox with `helper_unknown_error`; exact bounded direct writes are followed by byte, placeholder, diff, checker, and canonical verification.

## Assumptions Used

- One serialized coordinator is sufficient for the first portable implementation.
- The host can author and digest-bind replication policy, authenticate actors, and verify external observations.
- Goal/input bodies can remain external behind closed SourceReference locators and digests.
- Conformance requires no live model/provider.

## Follow-Up Work

- Complete the final source-chain audit, then freeze, commit, and push one immutable revision-4 candidate.
- Run four fresh Round-4 reviewers against its exact hash.
- Begin schema/runtime contracts only after four `PASS` verdicts.

## Verification Performed

Revision 2 commit `5d82394` passed placeholder, BOM-free LF, 138-reference source, diff, template, and canonical package gates with 275 inherited tests before review. Four Round 2 reviewers independently confirmed the exact clean commit and returned source-only findings.

The revision-3 working tree passes placeholder, BOM-free LF, source-reference, `git diff --check`, template-checker, readonly declaration, and exact export-inventory checks. The declaration probe compiled the complete normative API surface; all 56 existing public exports match `src/index.ts`, and 92 proposed names have no duplicate or existing-name collision. `npm.cmd run verify` passed in 22.1 seconds with all 275 inherited tests, deterministic V10 dogfood, dry-run package inspection, and the offline packed consumer. Product, API, and lifecycle read-only preflights informed corrections; the security preflight returned no handoff and is not review evidence. These are source-coherence and inherited-runtime gates only. No V11 runtime evidence exists.

Revision 3 was frozen and pushed as `79f2b4e069d13910b561ffe4f6ca04a1b13acb61`. Four fresh reviewers independently confirmed the exact clean hash and returned four `REVISE` verdicts with 15 high and 10 medium raw findings. The full source record and 14 converged revision-4 obligations are in `architecture-review-round-3.md`.

An earlier in-progress revision-4 source state passed `git diff --check`, a strict TypeScript 7.0.2 declaration probe, and an export inventory preserving all 56 current root exports while proposing 123 collision-free names. The specialist and coherence redesigns changed the declaration and inventory, so those results are superseded.

The corrected uncommitted revision-4 working tree now passes `git diff --check`, the strict TypeScript 7.0.2 declaration probe over the complete normative API fence, and an exact inventory of all 56 current root exports plus 130 unique proposed names with zero duplicates or current-name collisions. The template checker passed, the Markdown audit resolved all 153 local links, and the 119-scenario checker regression matrix passed in 653.9 seconds. The latest `npm.cmd run verify` passed in 20.8 seconds with formatting, lint, typecheck, build, all 275 inherited tests, deterministic V10 dogfood, dry-run package inspection, and the offline packed consumer. This is current source-coherence, workflow, and inherited-runtime evidence only; it is not immutable-candidate review or V11 runtime evidence. `docs/memory/known-issues.md` retains the checker-performance observation.

## Durable Learnings

- Named states are not closed contracts until required/forbidden properties and start/rejection cases are explicit.
- Dynamic decomposition needs host-authored machine policy; planner prose cannot create replication safely.
- Acceptance speed without criterion-to-verifier evidence mapping is not traceable quality.
- Cross-agent handoffs need an uninterrupted authority and content-digest chain.
- One-agent simplicity can coexist with deep internal contracts when the facade owns continuation.
- Parallel execution must be explicit; supplying extra profiles is capacity, not permission to fan out.
- A specialist is a complete task contract, not a role label: semantic AgentBlueprintIntent must be explicit; pure `compileAgentBlueprints` must exclude runtime supply even transitively; EvidenceBindings must construct before AgentBlueprints; Assignment alone binds AgentProfile supply; and AgentMaterializationReceipt records the host configuration claim.
- Restartable terminal evidence requires a canonical AcceptedWorkAccumulator; retaining only current root/tail and historical digests is insufficient.
- Post-terminal artifacts need an explicit acyclic construction order, and every declared count maximum must be reachable under its byte ceilings.
- Post-dispatch overflow and callback failure require uncertainty semantics, not pre-effect rejection.
- A queued request seed must defer only the next prompt, never the current response action.
- Evidence origin must match what core can actually observe; external output bytes and agent materialization remain host-attested.
- Normative public declarations must preserve the package's readonly type convention, not merely describe immutability in prose.
- Semantic optimization needs named baselines and independent quality review; deterministic core metrics cannot prove global optimality.
