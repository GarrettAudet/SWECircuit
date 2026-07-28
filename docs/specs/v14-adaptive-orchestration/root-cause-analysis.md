# V14 Adaptive Orchestration Root-Cause Analysis

## Status

Resolved.

## Trigger

Independent release review found that high-risk dogfood generation could overwrite stale evidence
before the gate established the comparison baseline.

## Reproduction

Change one bound source byte without updating descendants, then run the former release gate. The
generator rewrites the assignment and run evidence; the later repeated-run comparison sees only
the already-refreshed tree.

## Confirmed Root Cause

The gate proved determinism between two generated outputs, not identity between the committed
preimage and the first output. Generation and verification were ordered incorrectly.

## Why It Was Missed

Focused tests validated semantic and digest consistency after generation. They did not assert that
the complete evidence tree was immutable across the first generator invocation.

## Fix

Capture a recursive, sorted path/byte/SHA-256 snapshot before generation. Compare the complete tree
after replay one and replay two. Bind the real native launch authorization, prompt, receipt, raw
handoff, semantic digest, verifier result, runtime, and honest permission-observability claim.

## Regression Coverage

`scripts/run-v14-release-gate.mjs` now fails on added, removed, renamed, resized, or rehashed
evidence at either replay boundary. RunView adversarial tests also reject closed-schema widening,
unknown nested claims, unsafe bidi controls, lone surrogates, and stale self-digests.

## Follow-Up Work

Run the hardened release gate unchanged in local canonical verification and hosted Windows CI.

## Memory Update

Promote the rule that generated evidence must be compared to its pre-generation committed
preimage, not only to a second generated result.
