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