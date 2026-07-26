# Revision 18 Independent Security And Architecture Review

## Findings

1. **Critical: Candidate source is not revalidated after install/build and before execution.** Exact source checking happens before setup (`scripts/run-v12-release-review.mjs:471-510`), followed by npm and TypeScript execution (`:1200-1201`). The later Git check ignores untracked files (`:1018-1030`), and those files become trusted baseline inventory (`:1219-1220`). The worker compares the Git object tree, not materialized source bytes (`run-release-review.mjs:948-951`), before importing runtime (`:990-992`). A build-created file outside `dist` can therefore execute without entering `candidateSource` or `generatedRuntime`. Revalidate a closed working-tree inventory after install, after build, and immediately before spawn.

2. **Critical: Prior-phase and package substitution is accepted.** The parent seeds every file beneath the gate and run roots (`scripts/run-v12-release-review.mjs:856-868`) and automatically trusts pre-existing entries (`:945-951`). Approval derives its expected digests from the package being approved (`run-release-review.mjs:2917-2925`) instead of reconstructing the compile result. Verification checks selected summary fields and the envelope (`verify-release-review-handoffs.mjs:449-499`) but not the exact materialized package directory. Use closed, mode-specific seed manifests bound to prior parent receipts and reconstruct every package file during approval and verification.

3. **High: Promotion can follow links and leave partial live evidence.** Promotion uses lexical containment, `mkdir`, `readFile`, and `link` without checking every ancestor and target for symlinks, junctions, reparse points, or `nlink > 1` (`scripts/run-v12-release-review.mjs:1114-1141`). Multi-file promotion occurs before its receipt (`:1289-1327`), so failure can leave an unreceipted partial run that later becomes trusted seed input. Preflight all destinations using `lstat` plus verified realpaths, reject linked targets, and commit the output set transactionally.

4. **High: Runtime-root and dependency-resolution confinement remain open.** Root disjointness is lexical (`scripts/run-v12-release-review.mjs:127-133`), while materialization uses ambient `%TEMP%` rather than a verified short realpath (`:1189-1191`). Supply validation checks only root production dependencies (`:638-654`); Node's dynamic import can still search ancestor `node_modules` (`run-release-review.mjs:990-992`). Require realpath-disjoint roots and enforce resolver confinement through an external sandbox/loader or a verified ancestor chain with no fallback supply.

5. **High: The live parent remains a self-authenticating trust root.** It begins executing at `scripts/run-v12-release-review.mjs:1172` and authenticates its own bytes only later (`:439-453`, `:1187`). A compromised candidate parent can bypass the check that supposedly authenticates it. The smallest robust design is a host-pinned launcher or expected parent digest supplied through an independent trusted channel; otherwise this limitation must be added explicitly to the external-host boundary in `correction-contract.md:39`.

6. **Medium: Cache, environment, and toolchain claims are broader than the evidence.** The cache silently defaults to a repository path rather than requiring explicit host supply (`scripts/run-v12-release-review.mjs:49`, `:657-661`). `HOME` and `USERPROFILE` remain inherited, allowing unbound npm configuration (`:260-322`), while npm/Git identity hashes only their entrypoint files (`:336-358`). Either close and bind those inputs or describe them as observed entrypoint facts under external-host responsibility.

7. **Medium: Critical guarantees are tested as source text rather than behavior.** Digest continuity is regex-tested (`test/v12-release-review.test.mjs:187-199`), and cleanup/promotion ordering uses `indexOf` assertions (`test/v12-release-gate.test.mjs:707-777`). Existing filesystem tests (`:618-705`) do not exercise linked promotion targets, post-build source additions, ancestor package fallback, package substitution, partial promotion, or cleanup failure, leaving `test-plan.md:13-25` materially uncovered.

## Verdict

`REVISE`

Revision 18 is not accepted for integration or release. Its exact specialist `pass` remains valid implementation evidence, while this independent review routes the workflow to a replacement correction.
