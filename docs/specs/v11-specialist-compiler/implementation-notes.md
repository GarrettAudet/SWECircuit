# V11 Specialist Compiler Implementation Notes

## Status

Implementation, technical acceptance, and post-integration reconstruction are complete for the revision-6 digest-bound candidate. Clean branch preparation, the explicit owner merge decision, and merge remain open.

## Summary Of Changes

- Preserved the four failed runtime architecture rounds instead of rewriting their evidence.
- Split the independent Specialist Compiler into the active V11 product slice.
- Added a closed GoalContract and SpecialistCompilationRequest schema, deterministic candidate construction, exact and bounded search modes, a fixed optimization comparator, task-shaped AgentBlueprints, and digest-bound rendering.
- Added a separately named public specialist API without widening the six canonical V9 artifact kinds.
- Added all supplied proposal evaluations to the compilation trace, full-digest team and agent identifiers, exact filesystem-authority narrowing, and manifest bindings for every launch payload.
- Dogfed attempt 1 through compiled product/API, algorithm/lifecycle, security/trace, and release-gate specialists; preserved the rejected package and every raw handoff.
- Corrected canonical assumptions and unresolved decisions, explicit search/selection evidence, permission-kind type closure, semantic parent-path rejection, package-root trust, deterministic package verification, and security-review context closure.
- Preserved attempt 5 as `FIX` after its authorized integration changed a live spec still used as review context; revision 6 binds `context.spec` only to the immutable pre-integration snapshot.
- Closed revision-6 technical acceptance with exact source/package binding, all canonical gates, three no-finding independent reviews, and source-linked acceptance, review, milestone, and memory records.

## Deviations From Plan

The original V11 plan attempted to design compiler, scheduler, restart protocol, parent trace, repository proof, merge evidence, and memory proposal flow together. Round 4 returned four `REVISE` verdicts. The workflow emitted `split`: V11 now ships specialist construction and package rendering; the runtime control plane is deferred with its corrections preserved.

## Assumptions Used

- Goal clarification and atomic semantic work decomposition remain visible IDE/human work.
- Core can optimize grouping from stable work-unit contracts without provider supply.
- Planning weights are useful for deterministic comparison but are not elapsed-time promises.
- Exact scope keys plus declared conflict zones are safer and more portable than hidden path-overlap heuristics.

## Follow-Up Work

- Freeze and push the complete reviewed candidate, then update the milestone with the immutable commit.
- Request the owner decision for merging the stacked V10+V11 line; after approval, merge it, verify the resulting `main`, and refresh pre-approval public status text.
- Implement the deferred runtime obligations in a later version only after V11 is adopted.
- Evaluate learned candidate-generation heuristics from real runs before widening bounded search.

## Verification Performed

- Revision-6 preparation passed 34/34 authorized source bindings for compilation `sha256:ac1707213d9c22314d4c5a3d0bc6a838ef31863b63a9e2dac5993541d919c161` and package `sha256:838019281b732ec238e4460c03167087b7a63c409348ee66322cc5535469774d`; `context.spec` targeted only the immutable pre-integration snapshot.
- Dogfood exact search evaluated 203 candidates, found 52 eligible, and selected six specialists at projected makespan 23. The serial baseline projected 40 and was ineligible for requested evidence independence.
- Focused schema 7/7, compiler/golden 35/35, and host-containment 6/6 passed.
- `npm.cmd run verify` checked format across 72 files, lint across 60 files, passed typecheck/build, and passed 323/323 tests. Both dogfoods, the offline installed consumer, package verification, package inspection, and the template checker passed.
- The complete negative checker matrix passed in 744.9 seconds.
- Product/API (12/12 context), algorithm/lifecycle (14/14), and security/trace (32/32) each returned PASS with no findings against the same digest pair.
- Post-integration evidence reconstruction returned `PASS` for both owner-retained revision-6 digests after the authorized output updates.
- The exact accepted evidence is preserved in `evidence/dogfood/report.json` and the revision-6 PASS handoffs. Attempts 1-4, the attempt-5 post-integration replay `FIX`, and release-host attempts 6A/6B remain failure and correction provenance.
- No hosted CI, immutable commit, clean branch, push, merge, provider execution, or runtime enforcement is claimed by this integration record.

## Release Integration Friction

- During attempt-5 integration, the workspace patch helper failed twice during sandbox refresh before changing any file. Integration used bounded exact-match PowerShell replacements under the declared write scopes, followed by diff, link, checker, and immutable-byte verification.
- One initial tuple-verification command had a PowerShell pipeline parse error, and the first exact replacement guard used the wrong `String.Split` overload. Both failed before writes and were corrected without changing candidate evidence.
- The first attempt-5 post-integration template check rejected milestone headings `Shipped Candidate` and the missing `Why It Matters`; the milestone adopted the exact required headings and the immediate rerun passed.
- Attempt 5 then emitted post-integration replay `FIX` because its `context.spec` locator still named the mutable live spec. Revision 6 removes that alias and treats the live document only as an integration output.
- Release-host attempt 6A emitted `FIX` after a nested TEMP/TMP root produced a 265-character Windows path. Attempt 6B emitted `FIX` after the reviewer removed host-owned offline `_cacache`; neither changed source or the approved pair.
- The successful revision-6 release preserved `_cacache`, used `.local/npm-cache` directly as TEMP/TMP, and completed the exact 744.9-second matrix.

## Durable Learnings

- A useful compiler and a universal runtime are separate ownership boundaries.
- Hyper-specialization begins with exact task demand and candidate-team comparison, not generic role labels.
- Search mode and objective evidence must be visible so "optimized" remains an auditable claim.
- Package integrity requires an expected digest retained outside the package being verified.
- Review-agent construction must close over security-sensitive helper context, not only top-level feature files.
- Any artifact integration may mutate must be reviewed through an immutable pre-integration snapshot, with the live path reserved as an output.
- Post-integration reconstruction against both owner-retained digests is mandatory before branch freeze; a mismatch retires the candidate instead of being explained away.
