# Revision 60 Test Plan

## Focused Checks

1. Inject glibc and musl runtime identities and prove the release-review parent selects exactly the applicable optional package.
2. Exercise canonical TypeScript, ancestor-supply, cleanup-root, cache-location, and cache-overlap paths.
3. Run the maximum 16-agent specialist-run aggregate under a bounded default-compatible heap.
4. Run release-gate, release-review, TypeScript-toolchain, specialist-run, and lifecycle-focused tests.

## Broad Checks

1. Template checker and complete mutation matrix.
2. Format, lint, typecheck, and build.
3. Complete core and lifecycle suites.
4. V10, V11, and V12 dogfood.
5. Package inspection and clean installed consumer.

## Exact Release Checks

1. Complete independent review and freeze one exact Revision 60 commit.
2. Run the copied lifecycle and full verifier against that exact commit.
3. Require all seven hosted jobs to pass on the exact commit.
4. Invoke the canonical one-shot gate only after every prerequisite passes.
5. Complete fresh package-bound R2 review, milestone, memory, merge, and release closeout.

## Failure Routing

Any failed exact or hosted check retires Revision 60 without consuming its one-shot gate.
