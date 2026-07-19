# Root-Cause Analysis

## Status

Confirmed and resolved for the Revision 5 release candidate.

## Trigger

Revision 3 capability review found narrowed decomposition ownership and ordinary alias/modal bypasses. The first ownership correction failed its conjunctive negative fixture. Later, Revision 4 passed independent review but canonical verification found that the concise README removed two commands owned by the executable quick-start contract.

## Reproduction

1. Replace the approved decomposition sentence with `the developer and IDE close the goal and decompose it into atomic work units`.
2. Append claims such as `Core dispatches agents.`, `The compiler persists handoffs.`, or `SWECircuit can enforce permissions.`.
3. Remove either `node dist/cli.js validate --project examples/minimal` or `node dist/cli.js inspect --project examples/minimal --trace traces/example.jsonl`.
4. Run the checker matrix and `node --test test/quick-start.test.mjs`.

Before the final correction, at least one invalid ownership claim or missing public command escaped the narrower gate.

## Confirmed Root Cause

- Ownership was encoded as one exact conjunctive README string instead of a disjunctive owner grammar.
- The first disjunctive regex could start at the `IDE` tail inside `developer and IDE`.
- Forbidden capability patterns recognized only `SWECircuit` or `SWECircuit core` followed by selected present-tense verbs.
- Tests mirrored that narrow grammar, so aliases and modal variants were absent.
- The concise rewrite treated the existing minimal-project commands as removable detail, while `test/quick-start.test.mjs` owned them as a repeatable read-only public contract.
- The template checker did not independently require those two commands, so pre-canonical validation could not expose their removal.

## Why It Was Missed

The earlier capability matrix varied objects more than subject and verb grammar. Separately, review focused on clarity and capability truth, not every executable README consumer. A green reviewer set and public checker therefore did not replace the canonical repository gate.

## Fix

- Accept developer-only, IDE-only, and developer-or-IDE decomposition.
- Reject an owner match immediately preceded by `and `.
- Share bounded subjects for SWECircuit, core, and compiler aliases.
- Share affirmative modal grammar for `can`, `will`, `may`, `must`, and `does`.
- Apply those forms to every explicit V11 host-owned exclusion family.
- Restore both tested read-only CLI commands in the 45-line quick start.
- Require and independently remove each command in checker fixtures.

## Regression Coverage

- Positive: developer-only, IDE-only, and disjunctive ownership.
- Negative: conjunctive ownership and core-owned decomposition.
- Negative: direct, alias, and modal claims for all eight host-owned capability groups.
- Control: truthful negation and fenced examples remain accepted.
- Commands: targeted quick-start suite 3/3 pass; each command has a missing-command checker case.
- Complete matrix: pass in 282.9 seconds.
- Kernel suite: 370/370 pass.

## Revision 31 Dogfood Refresh

The full canonical gate then failed closed because V11 Revision 30 still bound the previous raw bytes for `README.md`, `scripts/check-template.ps1`, and `scripts/test-check-template.ps1`. The failure was correct: documentation and checker changes are part of V11's reviewed public contract and cannot inherit a stale package identity.

The active GoalContract moved to Revision 31, refreshed only those three exact tuples, and rebuilt Candidate A plus the separately approved Audit B package. The first binder returned `block` because the host did not deliver the closed verification receipt as a runtime input. That raw result was preserved. The same immutable contract passed after explicit delivery; core verified the 4,625-byte handoff and reported the dependent review `integrationReady: true`. Independent Audit B then returned the 6,913-byte semantic `pass` envelope, and cross-package authorization plus separate Candidate A approval made strict `--check-evidence` replay pass.

The systemic friction is scope, not correctness: binding broad public files into the full V11 trust root makes a concise documentation release require a full compiler reapproval cycle. This remains a known issue for a later design that can tier trust roots without weakening source freshness.

## Follow-Up Work

Natural-language checking remains bounded and lexical. A later version may introduce a closed machine-readable public capability declaration, but this release should not add that complexity.

## Memory Update

The causal lessons are recorded in `implementation-notes.md`, `debug-notes.md`, `docs/memory/active-context.md`, and the `Concise Public Contract` pattern.
