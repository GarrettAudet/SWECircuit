# Implement Module

## Purpose

Make the smallest coherent change that satisfies the active task.

## Input

- Task.
- Plan.
- Relevant context.
- Scope boundary.

## Action

Edit only the required files, follow local patterns, and record deviations.

## Output

- Diff.
- Implementation notes.
- Updated artifacts.

## Gate

Change is ready for verification, or work routes to `diagnose`, `clarify`, or `redesign`.

## Outcome

`pass`, `diagnose`, `clarify`, or `redesign`.

## Artifacts

- Diff.
- Implementation notes.
- New or updated tests.

## Adapter

Subagents may execute bounded implementation slices after decomposition readiness.
