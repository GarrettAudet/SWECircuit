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

## Foundation Attempt 1

### Reproduction

Launch the approval-bound Foundation Revision-1 contract from the temporary `C:\tmp\swecircuit-identity-main` worktree and attempt its first scoped edit with native `apply_patch`.

### Evidence

- All 22 declared sources matched their exact byte and SHA-256 bindings.
- Native `apply_patch` failed before mutation with the recurring Windows sandbox refresh error.
- Wrapper and escalated wrapper invocations were denied.
- All six target files remained unchanged.
- The exact 3,776-byte handoff verified through V11 with outcome `block` and raw digest `sha256:81471e5dd7363a856e0825b35c337aa7bd0ac507b5e9b39d34418eed71aca008`.

### Classification

Host edit-capability mismatch: `block`, then revise the reviewed execution authority without changing product scope.

### Next Action

Compile Foundation Revision 2 with the same source and write ceiling plus explicit permission for a precondition-hash-guarded PowerShell fallback only after native `apply_patch` fails before mutation.