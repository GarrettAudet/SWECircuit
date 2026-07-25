# Revision 66 Correction Contract

## Goal

Preserve Windows dependency-install headroom across the complete four-level exact-candidate
release topology.

## Scope

- `scripts/run-v12-release-gate.mjs`
- `test/helpers/v12-release-review-lifecycle.mjs`
- `test/v12-release-gate.test.mjs`
- `test/v12-release-review.test.mjs`
- Revision 66 release evidence and live routing status

## Invariants

- Revision 65 is permanently retired and its one-shot canonical gate remains unused.
- Candidate source, exact lock, offline cache, private runtime, Git authority, cleanup, and
  one-shot semantics do not change.
- Only private scratch directory labels and their authenticated identities change.
- The regression models four namespace occurrences, three private Git runtimes, and the final
  candidate install.
- A 64-character Windows temp root retains at least 24 characters of legacy-path headroom.
- Product runtime, public APIs, schemas, compiler behavior, and IDE host boundaries do not change.

## Completion Evidence

- Exact R65 standalone passes and failed rehearsal are source-preserved.
- The failure regression proves the exact rehearsal introduced a fourth namespace occurrence.
- The R66 layout reduces that four-level path by 78 characters.
- One exact Revision 66 candidate passes copied lifecycle, complete verification, non-consuming
  rehearsal, all seven hosted jobs, the one-shot canonical gate, and fresh three-domain R2.

## Route

`verify -> diagnose -> redesign -> Revision 66`
