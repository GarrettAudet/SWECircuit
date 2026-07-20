# Candidate 4 Retirement

## Candidate

- Commit: `eff7d7afd5cb57a655f41803da96d824b9ba3438`.
- Tree: `b21fb93315684d33dff258e666598f6c28bb20e6`.
- Source: 1,963 files, 55,546,458 bytes, `sha256:7b5127e589c8b88a005d90c3a6f0b35d4097fdbe85519ed8bab3ff1dd67cca3e`.

## Gate Outcome

`fail`. The exact command completed 392 of 397 tests before stopping. All five failures required Git operations from a direct blob materialization that intentionally contained no `.git` directory. Pre/post materialization digests match, cleanup passed, and the live candidate HEAD and tracked state remained exact and clean.

The exact receipt and raw logs are preserved under `inputs/canonical-gates/eff7d7afd5cb57a655f41803da96d824b9ba3438/`.

## Confirmed Causes

- Exact candidate files were isolated, but Git-aware R9/R10 tests had no disposable candidate-bound metadata, ref, object lookup, or index.
- Related-code retrieval proved R10 also expected this candidate's post-commit gate receipt and logs to be blobs inside the same candidate commit, an impossible self-reference.

## Route

Candidate 4 is permanently retired and must never be reviewed or merged. Revision 11 must preserve exact source isolation, add a disposable Git execution view outside the materialized tree, and snapshot post-commit gate outputs as external immutable package-bound evidence. A newly frozen Candidate 5 must repeat the complete gate before R2 reviewers launch.
