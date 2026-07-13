# Debug Notes

Use this file when verification or review finds a non-obvious, recurring, or confusing failure.

## Status

Complete.

## Failure Summary

The workspace patch helper failed before file access while creating the V9 source package. This is the same known Windows sandbox-helper failure preserved by V8.1.

## Reproduction

1. Invoke the required patch helper with new V9 files and bounded updates.
2. Observe helper_unknown_error during sandbox refresh before any file is created.
3. Confirm the intended V9 spec path does not exist and the working tree remains unchanged.

## Stable Evidence

- The patch call reported: fs sandbox helper failed with status exit code 1 and helper_unknown_error.
- Test-Path for docs/specs/v9-devrail-kernel/spec.md returned False immediately after the failure.
- git status showed no new files before recovery.

## Failure Classification

- Environment or tooling issue.

## Context Retrieved

- docs/specs/v8.1-baseline-integrity/debug-notes.md
- docs/specs/v8.1-baseline-integrity/root-cause-analysis.md
- docs/memory/failed-attempts.md
- docs/memory/patterns.md

## Hypotheses

| Hypothesis | Evidence For | Evidence Against | Experiment |
| --- | --- | --- | --- |
| The known Windows patch-helper setup failure recurred before file access. | Error signature matches V8.1 and the target file was absent afterward. | No contrary evidence. | Use the bounded PowerShell fallback, then inspect diff and run both checkers. |

## Experiments

| Experiment | Hypothesis | Result | Conclusion |
| --- | --- | --- | --- |
| Bounded PowerShell fallback plus independent verification | Known helper failure can be recovered without broad edits. | Passed | Only expected paths changed; the positive checker and all fifteen regression cases passed. |

## Current Status

The cause is confirmed and the bounded recovery passed independent validation. No product or kernel behavior was implicated.

## Next Action

Retain this evidence and continue to the V9 architecture clarification gate.

## T006 Parser And Validator Boundary Incident

### Failure Summary

The first complete-project validation crashed inside Ajv uniqueItems instead of returning structured diagnostics.

### Reproduction

1. Parse a valid artifact containing arrays of objects with jsonc-parser getNodeValue.
2. Pass the parsed value to a package-owned schema containing uniqueItems.
3. Observe TypeError: a.valueOf is not a function from Ajv's equality helper.

### Stable Evidence

- The new parallel-project integration fixture reproduced the failure consistently.
- A focused probe confirmed that getNodeValue creates null-prototype objects and that their valueOf member is undefined.
- Existing schema tests did not fail because they used ordinary objects returned by JSON.parse.

### Failure Classification

- Parser and validator integration defect.

### Hypotheses And Experiment

| Hypothesis | Evidence For | Experiment | Result |
| --- | --- | --- | --- |
| Ajv's object equality path assumes ordinary JSON object prototypes. | Stack trace entered fast-deep-equal; focused probe showed null prototypes and no valueOf. | Materialize the already validated strict JSON text with JSON.parse after duplicate-aware tree checks. | Confirmed; the value shape now matches ordinary JSON consumers without weakening duplicate detection. |

### Current Status

Root cause confirmed. The parser tree remains authoritative for syntax, duplicate keys, depth, and numeric checks; schema input is materialized as an ordinary JSON value.

### Next Action

Retain the complete parallel-project fixture as the regression and continue the T006 semantic matrix.
