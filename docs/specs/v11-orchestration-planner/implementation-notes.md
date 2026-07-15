# V11 Implementation Notes

## Status

Design only. No V11 schema, source, package, or runtime behavior has been implemented. Round 1 review stopped implementation and revision 2 is being prepared for a second independent gate.

## Summary Of Changes

- Created the V11 source chain on `codex/v11-orchestration-planner`, stacked from V10 closeout `8ac3372`.
- Bound the bootstrap design to commit `f559b4aec54f0e12e947bd9feb00e7ba67e4bf32`.
- Ran four independent read-only specialist reviews; all returned `REVISE`.
- Preserved their findings in `architecture-review-round-1.md`.
- Redesigned V11 around one `runGoal` facade, Circuit-owned policy, a separate orchestration contract family, host-rooted authority, dynamic assignment, one serialized coordinator, complete safe waves, conservative conflict rules, total child-result mapping, deterministic joins, source-preserving parent events, and exact bounds.

## Deviations From Plan

The bootstrap expected architecture review to pass before implementation. It did not. The system correctly emitted `redesign` instead of beginning code work. V11 also started while V10 remains owner-gated; this permits planning continuity but prohibits V11 acceptance or merge until the baseline is approved or replaced and fully reverified.

`apply_patch` continues to fail in this Windows workspace with `helper_unknown_error`. The already-documented bounded direct-write fallback was used only for exact text files, followed by byte, placeholder, diff, checker, and canonical validation.

## Assumptions Used

- One serialized coordinator is sufficient to prove the portable product model.
- One-agent IDE use is the default case; multiple agents add capacity, not another workflow.
- The host can install claimed state before callbacks and can authenticate people and executors.
- Parallel V11 work has disjoint write scopes; overlapping-write isolation is deferred.
- V10 remains the only child-effect primitive.

## Follow-Up Work

- Validate and commit revision 2.
- Run four fresh Round 2 reviews against the same exact commit.
- Begin contracts only after four `PASS` verdicts.
- Resolve the separate V10 owner gate before V11 acceptance.

## Verification Performed

Bootstrap commit `f559b4a` passed placeholder scan, BOM/LF audit, source-reference audit, `git diff --check`, the template checker, and `npm.cmd run verify` with 275 inherited tests. The four reviewers independently confirmed a clean exact tree before and after review.

Revision 2 passed the placeholder scan, BOM-free LF byte audit across 15 changed files, `git diff --check`, template checker, and a concrete source-reference audit covering 138 existing paths while explicitly excluding future schema paths and illustrative scope examples. `npm.cmd run verify` passed in 19.7 seconds with all 275 inherited tests, deterministic V10 dogfood, package inspection, and the offline installed consumer. No V11 runtime evidence exists because implementation remains blocked.

## Durable Learnings

- Commit-bound multi-role review found structural flaws that green baseline tests could not find.
- Parallel review is useful before parallel implementation: four specialists exposed independent graph, API, lifecycle, and security failures without shared-file conflicts.
- A portable orchestrator needs a clear authority root, exact handoff identities, and a closed reducer before scheduling code.
- Simplicity improves when multi-agent behavior is expressed as the one-agent contract plus profiles and bounded capacity.
