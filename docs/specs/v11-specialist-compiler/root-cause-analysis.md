# Root Cause Analysis

## Status

Not required for the active implementation. The architecture split is documented as a design correction, not a production incident.

## Incident Summary

No runtime incident occurred.

## Impact

The original V11 design delayed a usable specialist compiler through four failed architecture-review rounds.

## Reproduction

Review exact candidate `d486b7f49724651cc12a115ee483e70d67e62bbb` against the product, API, lifecycle, and security contracts recorded in `../v11-orchestration-planner/architecture-review-round-4.md`.

## Evidence

Round 4 produced 10 high and 9 medium findings; the correction design is preserved in `../v11-orchestration-planner/revision-5-correction-design.md`.

## Hypotheses Considered

- Continue revising the universal runtime contract.
- Ship the independent Specialist Compiler first and defer the effectful runtime layer.

## Confirmed Root Cause

The feature boundary coupled pure task-team construction to scheduler, callback, restart, attestation, merge, and memory protocols that were not required to deliver the owner-priority capability.

## Causal Fix

ADR 0004 makes the standalone Specialist Compiler the V11 implementation target and preserves runtime obligations for a later version.

## Regression Coverage

Architecture review must reject any V11 implementation that reintroduces provider/runtime supply or claims scheduler, merge, or memory behavior.

## Durable Learning

Split pure planning demand from effectful runtime control when either layer can deliver independently reviewable value.
