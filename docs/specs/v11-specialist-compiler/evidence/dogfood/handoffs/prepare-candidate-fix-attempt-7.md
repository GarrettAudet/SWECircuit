# V11 Candidate Preparation Integration Decision: Attempt 7

## Outcome

`FIX`

## Decision

The integration owner accepts the preparation specialist's material round-trip risk. Although all 34 source tuples and both trusted digests matched, revision 7 cannot proceed to independent review because its checkout-canonical guard can accept LF bytes under `eol=crlf` and can bypass active smudge behavior when raw and clean object IDs match.

## Required Correction

1. Inspect `text`, `eol`, `filter`, and `working-tree-encoding` for every repository context path.
2. Reject active custom filters and working-tree encodings.
3. Require CR-free bytes for `eol=lf`.
4. Require canonical CRLF bytes for `eol=crlf`, even when raw and clean object IDs match.
5. Add direct regressions for LF-under-CRLF and active-filter bypass.
6. Increment the GoalContract revision, regenerate both trusted digests, and repeat preparation before launching review specialists.

Revision 7 is retired and preserved under `evidence/dogfood/runs/attempt-7/`.
