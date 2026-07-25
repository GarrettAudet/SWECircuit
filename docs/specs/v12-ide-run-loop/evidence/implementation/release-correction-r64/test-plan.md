# Revision 64 Test Plan

## Focused

- Authenticate the renamed R61 stream's exact byte count, digest, LF-only form, and intentional
  whitespace count.
- Confirm the old path is absent and the new `.log` path is tracked.
- Confirm the exact `.gitignore` exception and unchanged hosted `.log` exemption.
- Confirm `.gitattributes` and V11-approved source identities remain unchanged.
- Run strict V11 dogfood and the V12 release-gate and release-review suites.

## Pre-Freeze

- Reproduce the hosted tracked-whitespace policy against tracked files.
- Run format, lint, typecheck, build, core tests, template checker, checker mutation tests,
  V10/V11/V12 dogfood, specialist example, package inspection, and installed consumer.
- Complete an independent correction and release-boundary review.
- Freeze one exact Revision 64 commit.

## Exact Candidate

1. Run copied lifecycle from the exact commit.
2. Run the complete canonical verifier from the exact commit.
3. Run the non-consuming exact-candidate rehearsal.
4. Require all seven hosted CI jobs to pass.
5. Confirm a clean tracked worktree and an absent Revision 64 evidence slot.
6. Invoke the Revision 64 canonical gate exactly once.
7. On `pass`, run fresh three-domain R2 against the exact digest pair.

## Stop Rule

Any failed exact, hosted, canonical, or independent check retires Revision 64. A consumed
canonical gate is never rerun.
