# Root-Cause Analysis

## Status

Resolved.

## Trigger

The required final reconstruction rejected the previously approved package immediately after V13
closeout documentation and memory were updated.

## Reproduction

Run `node scripts/run-v13-dogfood.mjs inspect` while the live product specification contains
post-run status and checkbox edits. Compilation produces a new identity, so the original approval
fails closed before package or session acceptance.

## Confirmed Root Cause

The V13 harness bound the mutable feature `spec.md` path directly as an approved context source.
Closeout then used that same file as a progress record. Changing `Active` to `Complete` and checking
acceptance criteria changed 74 bytes, so reconstruction correctly produced a different compilation
and package than the approval authorized.

## Why It Was Missed

The first final inspection ran before closeout documentation. The template convention encouraged
updating feature status in place, while the specialist contract requires every approved source byte
to remain immutable. No explicit rule separated launch-time specification identity from mutable
completion state.

## Fix

- Restored `spec.md` to the exact 4,048 approved bytes.
- Kept completion evidence in `tasks.md`, `test-plan.md`, `review.md`, the V13 milestone, and durable
  memory rather than changing the launch contract.
- Replayed reconstruction, approval verification, package verification, session restoration, and
  final inspection against the original digest pair.

## Regression Coverage

- Current `spec.md` raw identity equals
  `sha256:7874343e2b81af39e7b26777a22152d1fb7a26b4faa8da939f48fa7acdbc9e69` at 4,048 bytes.
- Final inspect returns `stage: integration_ready`, `specialistOutcome: pass`, and
  `integrationReady: true` with session
  `sha256:166276daee93c8f2f4dbe42c2c528d4bf9393e1a3818c683b06fd35117716f8e`.
- The template checker and 13 application tests pass after the repair.

## Follow-Up Work

V14 should snapshot or freeze every launch context source before approval, keep mutable run status
outside those sources, and make closeout reject or explicitly revise any bound-input mutation.

## Memory Update

Recorded the immutable-launch-input pattern and the resolved V13 closeout-freshness issue in durable
memory.
