# Revision 67 Correction Contract

## Goal

Make the causal long-path Git-context fixture deterministic across short Linux, macOS, and
Windows temporary roots without changing release runtime behavior.

## Scope

- `test/v12-release-gate.test.mjs`
- `test/v12-release-review.test.mjs`
- `test/helpers/v12-release-review-lifecycle.mjs`
- Revision 67 evidence and live release-routing status

## Invariants

- Revision 66 is permanently retired and its one-shot canonical gate remains unused.
- The R66 private scratch layout, product runtime, public APIs, schemas, permissions, cleanup, and
  host boundaries do not change.
- The fixture still creates a worktree below 260 characters and a tracked entry above 260
  characters.
- Every synthetic path component remains at most 96 characters.
- A deterministic short Linux projection must require multiple bounded components and reach the
  same 160-character worktree target.
- Primary R66 workflow, job, and failed Ubuntu logs remain exact raw bytes.

## Completion Evidence

- Both R66 Ubuntu failures are source-preserved and classify to the same assertion.
- The R67 targeted fixture and complete release-gate suite pass.
- One exact R67 candidate passes copied lifecycle, complete verification, non-consuming rehearsal,
  all seven hosted jobs, the one-shot canonical gate, and fresh three-domain R2.

## Route

`hosted verify -> diagnose -> fix -> Revision 67`
