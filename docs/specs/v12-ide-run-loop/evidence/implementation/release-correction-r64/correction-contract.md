# Revision 64 Correction Contract

## Goal

Align the immutable R61 rehearsal stream with the repository's established hosted-log policy
without changing its bytes, weakening whitespace checks, or changing runtime behavior.

## Scope

- Retire Revision 63 without invoking its one-shot gate.
- Preserve Revision 63's exact local and hosted outcomes.
- Move the exact R61 stdout blob from `.txt` to `.log`.
- Add one exact `.gitignore` exception so copied repositories retain the tracked log.
- Update the evidence manifest and add release-boundary regression coverage.

## Non-Goals

- No kernel, public API, schema, host-runtime, compiler, or timeout behavior change.
- No change to the hosted whitespace scanner or its exemption set.
- No mutation of the preserved R61 stdout bytes.
- No canonical-gate invocation before all repeatable exact and hosted checks pass.

## Acceptance

- R61 stdout remains 2,244 bytes at
  `sha256:2b7149346d0d201d32d9ec2d9f7beff3f217d4853892dd660bcf951665d5820b`.
- The blob remains LF-only and retains its seven intentional trailing-whitespace lines.
- The old `.txt` path is absent and the `.log` path is tracked.
- The workflow continues to scan every tracked non-exempt regular file and retains `.log` as an
  established evidence exemption.
- `.gitattributes` and every V11-approved source retain their authenticated identities.
- Focused, broad, exact-candidate, hosted, canonical, and independent release gates pass.
