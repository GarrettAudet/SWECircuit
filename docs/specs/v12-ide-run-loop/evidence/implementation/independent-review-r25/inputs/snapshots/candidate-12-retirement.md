# Candidate 12 Retirement

## Identity

- Commit: `6f08e0a50ec6fd7fee76254ebd07995ae6f692db`
- Tree: `e0bac28cca7d8e4582c139d658f47d70b9da4545`
- Canonical gate outcome: `fail`
- Receipt: `inputs/canonical-gates/6f08e0a50ec6fd7fee76254ebd07995ae6f692db/canonical-gate-receipt.json`

## Stable Evidence

- Candidate source: 3,070 files, 95,127,574 bytes, `sha256:a41d288296a2d65a67211968f6cd3b7fc386e88001d5397f88e146af20cff29a`.
- Materialization digest remained unchanged before and after the gate.
- Candidate Git context and source repository remained clean at the same commit.
- Canonical verification completed 426 tests: 425 passed and one failed.
- Stdout: 34,499 bytes, `sha256:6f24723686d68e4e26ffc8af2d42035f3612b5b3873f16a8163e0ed17b385e2b`.
- Stderr: 19,354 bytes, `sha256:b56200af44effdd399efe987862a1241bdd2054970cac157087dca1e86845c24`.

## Retirement Reason

The isolated copied-production lifecycle failed while creating its fixture commit. The exact release gate supplied a disposable candidate Git context through `GIT_DIR`, `GIT_WORK_TREE`, and `GIT_INDEX_FILE`; the lifecycle helper copied those repository-scoped variables into its nested fixture commands. The nested `git commit` therefore targeted the outer candidate context instead of the newly initialized fixture repository and exited with no committable change.

## Route

Outcome: `diagnose -> fix`.

Never rerun this candidate's exact gate. Revision 25 must close the nested Git-environment boundary, prove the correction in focused and complete lifecycle tests, receive independent semantic review, and freeze a new commit before the next one-shot gate.
