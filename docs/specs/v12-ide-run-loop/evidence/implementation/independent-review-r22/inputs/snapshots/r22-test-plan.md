# Revision 22 Test Plan

## Provenance

- Verify the approved specialist package through V11 core.
- Verify every immutable pre-edit and Revision 21 evidence source by raw byte count and SHA-256 before semantic use.
- Require every authorized live source to equal its pre-edit snapshot before the first edit.
- Report exact final identities and prove every immutable snapshot stayed unchanged.

## Closed npm Configuration

- Exercise production config creation and validation with two distinct private empty files.
- Invoke the installed npm CLI under the exact production closed environment.
- Require npm --version to pass on npm 11.
- Require npm config get userconfig and npm config get globalconfig to return the two private paths.
- Reject same-path, alias, linked, non-empty, missing, out-of-root, and substituted config files before npm execution.
- Require config cleanup with the operation root.

## Lifecycle

- Run the copied canonical gate and separate copied compile, standalone approve, and verify parents.
- Use the actual installed npm CLI; no compatibility adapter may delete a config variable or restore a host config.
- Preserve exact shared outputs, approval bytes, package pair, three package-bound handoffs, parent receipts, ten negative routes, and cleanup assertions.
- Prove the fixture repository is outside the source repository with platform-neutral path logic.

## Commands

Run at minimum:

~~~powershell
node --check scripts/run-v12-release-review.mjs
node --check docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs
node --check test/v12-release-review.test.mjs
node --check test/v12-release-gate.test.mjs
node --check test/helpers/v12-release-review-lifecycle.mjs
node --test test/v12-release-review.test.mjs test/v12-release-gate.test.mjs
npm.cmd run format:check
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
git -c core.longpaths=true diff --check
~~~

Use a timeout above the complete lifecycle floor. Do not run a real-repository release gate or R2 phase, refresh V11, stage, commit, or merge.

## Evidence

Report the exact package pair, pre-edit and post-edit identities, npm and Node versions, private config identities and containment, host-config exclusion, fixture commit and exception, raw output comparisons, reviewer handoffs, receipts, negative routes, command results, duration, cleanup, assumptions, and residual external-host boundaries.
