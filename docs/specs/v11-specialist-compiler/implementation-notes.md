# V11 Specialist Compiler Implementation Notes

## Status

Implementation, technical acceptance, post-integration reconstruction, and branch publication are complete for the revision-6 digest-bound candidate. The explicit owner merge decision and merge remain open.

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

- Candidate `191d9339da383a2133377dcca564d7202b7ad66d` is frozen and pushed; preserve it unchanged through the owner gate.
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
- Candidate `191d9339da383a2133377dcca564d7202b7ad66d` is committed and pushed. No hosted CI, merge, provider execution, or runtime enforcement is claimed by this integration record.

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

## Revision 20 Hardening

- Revision 20 proved the two-package approval and fan-out path, then stopped correctly when security review found three semantic-handoff and path-validation gaps.
- The correction reuses the core secret detector, splits metadata from LF-only Markdown policy, and centralizes lone-surrogate path rejection.
- Focused verification passes 65/65 and the full kernel passes 353/353 with format, lint, and typecheck.
- Release freshness rejected the mutated approved candidate, demonstrating that successful earlier gates cannot authorize later source bytes.
- The complete retired candidate, approvals, packages, immutable inputs, and raw handoffs are archived under `evidence/dogfood/runs/attempt-20/`.
- Revision 21 must repeat every approval and review gate; no revision-20 approval or PASS is reusable.

## Revision 21 Hardening

- Revision 21 proved the complete prelaunch trust chain and passed preparation, product/API, and security/trace review before two independent gates stopped integration.
- The compiler now reconstructs nested closed records in schema order, closing the gap between canonical semantic digesting and byte-stable rendered package identity.
- The logical-permutation regression now compares ordinary compilation JSON, the full rendered package, and the root package digest rather than relying on deep equality and sorted digest projection alone.
- The 119-case checker harness now uses a thin baseline and four reusable copy-on-write fixture slots. It preserves exact case semantics while completing in 213.3 seconds instead of remaining nonterminal at 900.5 seconds.
- Focused compiler coverage, 353/353 kernel tests, format, lint, typecheck, build, PowerShell parsing, and all 119 checker cases pass on the corrected live tree.
- The complete revision-21 run is archived under `evidence/dogfood/runs/attempt-21/`; its approvals and PASS results cannot authorize revision 22.

## Revision 22 Hardening

- Revision 22 passed the complete two-package trust chain, preparation, product/API, algorithm/lifecycle, and release verification before security review stopped integration.
- Public diagnostics now apply the shared malformed-Unicode and secret policy at construction time rather than relying on downstream handoff validation.
- Direct `createDiagnostic`, `parseJsonBuffer`, contained-read, and supplementary-Unicode regressions bind the correction to every exposed path identified by review.
- Focused suites pass 43/43 and the complete kernel passes 354/354 with format, lint, typecheck, and build.
- The complete revision-22 run is archived under `evidence/dogfood/runs/attempt-22/`; its approvals and PASS results cannot authorize revision 23.

## Revision 23 Hardening

- Revision 23 passed the complete two-package trust chain, preparation, product/API, algorithm/lifecycle, and release verification before security review stopped integration.
- Public pointer sanitization now evaluates the cumulative emitted and decoded forms before extending the safe prefix, closing delimiter-spanning credential and Bearer leaks.
- Exact regressions preserve the longest safe prefix and prove the secret-bearing suffix is absent from public diagnostics.
- Focused suites pass 43/43 and the complete kernel passes 354/354 with format, lint, typecheck, and build.
- The complete revision-23 run is archived under `evidence/dogfood/runs/attempt-23/`; its approvals and PASS results cannot authorize revision 24.
