# Debug Notes

## Status

No active product defect. Preserve any dogfood failure before correction.

## Reproduction

Not applicable at architecture kickoff.

## Evidence

- The first branch creation attempt was denied because Git refs live in the original worktree metadata outside the temporary checkout sandbox.
- The exact `git switch -c codex/v12-ide-run-loop` operation succeeded after bounded escalation.

## Stable Evidence

- The template checker rejected the first feature package with eleven exact missing-heading diagnostics.
- No code, package, or runtime behavior was involved in that failure.
- The first package-approval command stopped with `TypeError` before writing approval or launching an agent.
- The preserved package envelope exposes root `compilationDigest` and `packageDigest` fields and no `compilation` object.

## Failure Classification

Workflow artifact conformance and host integration mismatch: `fix`, then `diagnose`.

## Hypotheses

- Confirmed: the dogfood host copied a nonexistent nested path from an assumed envelope shape.
- Rejected: compilation or package rendering omitted the digest; both exact root digest fields are present.

## Experiments

- Add only the required structural headings and rerun the same checker.
- Read the preserved envelope keys without mutation, correct only the field access, require both digest strings, and rerun approval-bound verification.

## Next Diagnostic Trigger

Enter `diagnose` if compilation, package verification, raw handoff verification, fan-in assessment, or integrated verification fails non-obviously or repeatedly.
