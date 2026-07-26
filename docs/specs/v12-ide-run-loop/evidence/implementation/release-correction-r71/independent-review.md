# Revision 71 Independent Review

## Scope

Read-only review of the R71 Windows snapshot-locator correction, its exact R70 evidence, copied
lifecycle identities, and causal tests. The reviewer made no file, Git, network, or runtime changes.

## Attempt 1

Outcome: `fix`.

- The Windows regression recomputed its source roster without binding it to the preserved R70
  candidate manifest.
- The 180-character path cap bypassed explicit snapshot paths.
- Collision and over-budget behavior lacked negative tests.

The correction authenticated the 305,897-byte R70 manifest at
`sha256:28ef7cb5e60c2448ba19e18cd63c783fefb145c96934891852ff44ebf72d880e`,
deep-compared all 225 source identities, applied the cap to both path forms, preflighted collisions
before writes, and added negative tests.

## Attempt 2

Outcome: `fix`.

- One patch-fallback line retained CRLF inside the otherwise LF harness, so its mutable identity
  differed from the future Git-normalized blob by one byte.
- Verification still recorded the pre-correction 2/2 and 51/51 counts.

The correction normalized the harness and lifecycle helper to LF, rebound the harness to 160,229
bytes at `sha256:eb8a25f813da3787b5eaf94da8000d3dd159380d83c4dbf2734a0eb9f33f72e8`,
proved filtered and raw Git object identity equal, and updated the evidence counts.

## Attempt 3

Outcome: `pass` with no findings.

The reviewer independently confirmed:

- Zero CR bytes and freeze-equivalent Git identity.
- Exact copied-lifecycle identity binding.
- Exact R70 manifest, hosted evidence, canonical receipt, and 225-source roster authentication.
- Focused freeze-equivalent tests: 5/5 pass.
- Complete release-review suite: 53/53 pass.
- `git diff --check`: pass with no review-created drift.

## Attempt 4

Outcome: `fix`, then `pass` with no findings.

After the active status was refreshed, the reviewer found that one replacement assertion checked
only phrase order. The correction now binds the exact R70 commit, canonical pass, fresh R2
`pass` / `pass` / `block` result, 48-of-224 Windows failure, permanent retirement, and consumed
canonical gate. The reviewer independently reran the 53/53 release-review suite, format check, and
scoped diff check; all passed without Git drift.

## Route

`pass`. Revision 71 may proceed to exact source freeze and immutable qualification.
