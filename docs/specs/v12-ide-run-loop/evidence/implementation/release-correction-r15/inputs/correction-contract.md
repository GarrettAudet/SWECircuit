# Candidate 8 R2 Context-Bound Correction Contract

## Goal

Retire Candidate 8 and make candidate-bound R2 context scale within the Specialist Compiler's closed limits without removing authoritative correction evidence or widening any limit.

## Frozen Failure

Candidate 8 passed its exact canonical gate. R2 preparation authenticated its tree, gate evidence, V11 chain, and fourteen correction revisions, then generated 261 context sources and 261 read scopes. Compilation failed closed with two `SC4308` diagnostics before package rendering or reviewer launch. Total context bytes remained below the byte limit.

## Required Correction

- Keep every correction package envelope, owner approval, raw handoff, handoff-verification report, replan, and non-navigation evidence directly reviewable.
- Continue excluding rendered `package/` duplicates.
- Exclude correction `inputs/`, `request.json`, `phase-metadata.json`, and `compilation-summary.json` from reviewer context because package envelopes and verified raw outcomes already bind their authoritative contract and execution meaning.
- Apply the exclusion only to correction roots, not product source, security-causal source, current V11 evidence, gate evidence, or other primary evidence sets.
- Preserve complete primary-evidence coverage assertions.
- Add a regression that constructs the current candidate review source set, proves context and read scopes remain within 256, confirms retained and excluded classes, and successfully compiles the resulting three-reviewer request.
- Preserve Candidate 8's prepared run and failure evidence unchanged.

## Authority

The specialist may edit only `docs/specs/v12-ide-run-loop/evidence/release-review-r2/run-release-review.mjs` and `test/v12-release-gate.test.mjs`. It may run local Node, npm, and PowerShell verification. It may not change Git state, use network access, edit evidence, launch descendants, widen compiler limits, or prepare/compile R2 again for Candidate 8.

## Pass Condition

Return `pass` only if the selector is causal and correction-root-specific, all authoritative evidence remains covered, the new compile-bound regression passes, the full focused release-gate suite passes, and formatting/lint checks require no fixes.
