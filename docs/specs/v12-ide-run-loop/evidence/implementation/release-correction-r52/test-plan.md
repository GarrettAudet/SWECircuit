# Revision 52 Test Plan

## Focused Regressions

- Resolve the npm CLI from the bound launcher and execute it through bound Node.
- Accept npm 10 or newer under private empty npm configuration.
- Reserve, publish, and reject replacement of one candidate evidence slot.
- Remove the evidence slot, materialization, and Git context after preparation failure.
- Serialize cleanup attempts to avoid Windows directory-pruning races.
- Reconstruct the canonical command and runtime lock tuple independently in R2.

## Pre-Commit Gates

- JavaScript syntax checks.
- Complete release contract suite.
- Exact-lock install, real typecheck, fresh ESM imports, and cleanup probe.
- Template, format, lint, and diff checks.
- Fresh exact-byte independent review.

## Post-Commit Gates

- Exact copied production lifecycle.
- Full `npm.cmd run verify`.
- One canonical gate invocation for the exact commit.
- Fresh three-lane R2.
- Hosted CI.
