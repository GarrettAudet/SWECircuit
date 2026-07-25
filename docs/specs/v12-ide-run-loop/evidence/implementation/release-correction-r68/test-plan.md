# Revision 68 Test Plan

## Focused

- Parse parent, harness, verifier, fixture, tests, and production identity helper.
- Compare all three effective-environment binding implementations.
- Run fresh-process exact and hostile harness/verifier probes.
- Assert verifier order and runtime policy before candidate reads or imports.
- Verify parent and fixture security-review source coverage.
- Run the complete release-review and release-gate pair.

## Broad

- Run format, lint, typecheck, build, core, dogfood, package, consumer, and workflow checker gates.
- Obtain independent final-delta review and clear every finding.

## Exact Candidate

1. Freeze and commit one exact Revision 68 source.
2. Run the copied four-phase lifecycle from that commit.
3. Run complete verification and a non-consuming exact-candidate rehearsal.
4. Require all seven hosted jobs to pass.
5. Confirm a clean candidate and an absent Revision 68 canonical evidence slot.
6. Invoke the Revision 68 canonical gate exactly once.
7. On `pass`, run fresh source-bound R2 across all three domains.
8. Close memory and milestone evidence, then merge to `main`.

## Failure Rule

Any failed exact, hosted, canonical, or independent check retires Revision 68. Revision 67's
consumed canonical gate is never invoked again.
