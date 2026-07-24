# Revision 54 Test Plan

## Focused Checks

- JavaScript syntax for the lifecycle test.
- Fast `lifecycle test hooks are bound before isolated execution` regression.
- Lifecycle production identity checks.
- Format, lint, typecheck, template, and diff checks.
- Independent exact-byte review of the bounded change.

## Post-Commit Gates

- Exact copied production lifecycle.
- Full `npm.cmd run verify`.
- One canonical gate invocation for the exact successor commit.
- Fresh three-lane R2.
- Hosted CI.

## Stop Condition

Do not invoke the canonical gate until the exact committed lifecycle and full verifier pass.
