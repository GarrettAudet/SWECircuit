# Verify Module

## Purpose

Produce evidence that the work satisfies acceptance criteria.

## Input

- Diff or artifact change.
- Acceptance criteria.
- Test plan.

## Action

Run relevant checks, tests, builds, manual scenarios, or review commands.

## Output

- Verification evidence.
- Skipped-check rationale.
- Failure route if needed.

## Gate

Evidence passes, or work routes to `fix`, `diagnose`, or `clarify`.

## Outcome

`pass`, `fix`, `diagnose`, or `clarify`.

## Artifacts

- Test output.
- Manual evidence.
- Review notes.

## Adapter

CI or evaluation tools can become optional verification adapters after conformance review.
