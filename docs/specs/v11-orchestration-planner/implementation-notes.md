# V11 Implementation Notes

## Status

Design only. Round 3 returned four `REVISE` verdicts against exact commit `79f2b4e`; revision-4 integration is active. No V11 schema, source, package, scheduler, executor, merge, or memory behavior is implemented.

## Summary Of Changes

- Preserved Round 1, Round 2, and Round 3 commit-bound review evidence.
- Added a normative property-level `orchestration-contract.md`.
- Replaced implicit fan-out slots with host-authored OrchestrationPolicy replication regions over exact Circuit subgraphs.
- Put acceptance coverage policy in GoalContract, made Plan coverage compiler-derived, added integration bindings, and separated WorkPacket logical ownership from runtime Assignment.
- Closed root/nested identities, content-bound transition/journal integrity, own-field/SnapshotDigests, readonly operation signatures, comparators, requested concurrency, planner limits, matching, reserves/attempt replay, paths, dispatch truth, mixed-batch reduction, queued input/cancellation, joins, memory/merge evidence, payload classes, byte limits, graph-wide semantic projection, and the actual package export inventory.
- Kept requested concurrency one as the simple default, required explicit parallelism, and excluded IDE/API/model/provider selection.

## Deviations From Plan

Revision 2 and revision 3 were each expected to pass architecture review. Neither did. The workflow correctly emitted `redesign` before implementation both times. Revision 4 must close the full Round-3 lifecycle, continuation, evidence, authority, repository-state, portability, and resource findings while preserving the simple human surface.

V11 remains stacked on owner-gated V10 for planning continuity. It cannot be accepted or merged until V10 is approved or V11 is rebased and fully reverified.

`apply_patch` remains unavailable in this Windows sandbox with `helper_unknown_error`; exact bounded direct writes are followed by byte, placeholder, diff, checker, and canonical verification.

## Assumptions Used

- One serialized coordinator is sufficient for the first portable implementation.
- The host can author and digest-bind replication policy, authenticate actors, and verify external observations.
- Goal/input bodies can remain external behind source references and digests.
- Conformance requires no live model/provider.

## Follow-Up Work

- Integrate every Round-3 finding into one revision-4 source chain.
- Validate, freeze, commit, and push one immutable revision-4 candidate.
- Run four fresh Round-4 reviewers against its exact hash.
- Begin contracts only after four `PASS` verdicts.

## Verification Performed

Revision 2 commit `5d82394` passed placeholder, BOM-free LF, 138-reference source, diff, template, and canonical package gates with 275 inherited tests before review. Four Round 2 reviewers independently confirmed the exact clean commit and returned source-only findings.

The revision-3 working tree passes placeholder, BOM-free LF, source-reference, `git diff --check`, template-checker, readonly declaration, and exact export-inventory checks. The declaration probe compiled the complete normative API surface; all 56 existing public exports match `src/index.ts`, and 92 proposed names have no duplicate or existing-name collision. `npm.cmd run verify` passed in 22.1 seconds with all 275 inherited tests, deterministic V10 dogfood, dry-run package inspection, and the offline packed consumer. Product, API, and lifecycle read-only preflights informed corrections; the security preflight returned no handoff and is not review evidence. These are source-coherence and inherited-runtime gates only. No V11 runtime evidence exists.

Revision 3 was frozen and pushed as `79f2b4e069d13910b561ffe4f6ca04a1b13acb61`. Four fresh reviewers independently confirmed the exact clean hash and returned four `REVISE` verdicts with 15 high and 10 medium raw findings. The full source record and 14 converged revision-4 obligations are in `architecture-review-round-3.md`.

## Durable Learnings

- Named states are not closed contracts until required/forbidden properties and start/rejection cases are explicit.
- Dynamic decomposition needs host-authored machine policy; planner prose cannot create replication safely.
- Acceptance speed without criterion-to-verifier evidence mapping is not traceable quality.
- Cross-agent handoffs need an uninterrupted authority and content-digest chain.
- One-agent simplicity can coexist with deep internal contracts when the facade owns continuation.
- Parallel execution must be explicit; supplying extra profiles is capacity, not permission to fan out.
- Post-dispatch overflow and callback failure require uncertainty semantics, not pre-effect rejection.
- A queued request seed must defer only the next prompt, never the current response action.
- Evidence origin must match what core can actually observe; external output bytes remain host-attested.
- Normative public declarations must preserve the package's readonly type convention, not merely describe immutability in prose.
