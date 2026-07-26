# Revision 72 Mutable Verification

## Outcome

`pass`.

The mutable R72 correction is eligible to freeze. This result is not release approval and does not
consume the protected canonical gate. `releaseReady: false`.

## Causal Proof

- Focused R72 path-probe, evidence-binding, and active-status tests: 8/8 pass.
- Complete V12 release-review tests: 55/55 pass.
- Complete V12 release-gate tests: 30/30 pass.
- Complete core test suite: 482/482 pass.
- The positive probe opens every exact R71 reviewer snapshot alias through ordinary Windows
  PowerShell and compares a module-independent .NET stream SHA-256 digest with the source digest.
- The negative probe uses two byte-identical rows, forces the second hash operation to fail, and
  requires nonzero exit, empty stdout, and nonempty stderr.

## Static And Repository Gates

- Format check: pass after one mechanical line wrap.
- Lint: pass with the repository's existing 9 warnings and 71 informational diagnostics.
- Typecheck: pass.
- Build: pass.
- Template checker: pass.
- Complete template-checker regression matrix: pass.
- `git diff --check`: pass before this review-output-only record.
- `.gitattributes` and `.gitignore`: byte-identical to R71.

## Dogfood Gates

The complete V11 specialist-compiler dogfood passed:

- Candidate compilation:
  `sha256:b5cf6ea32968febbb9846ddaa718f4777f3aac3d1654fa3bf999e4f382def0ff`.
- Candidate package:
  `sha256:e320eaf9e29aac7c7a31bd651fd09c1cdeb0d6fb8f88f7fe7450d7e9151edd4d`.
- Audit compilation:
  `sha256:ec7a601571d54c5138b380367b974db39663820aa0b6103406374608c3160249`.
- Audit package:
  `sha256:f331b294dd1f79fb3589bc0d5e8ea3f851953296a581de2a0e38783362c4a40f`.
- Prelaunch verification receipt:
  `sha256:72b341d8edeb06796d23bbd057041a8b18d94498efbe6aa3ffb4efe87568cc76`.

The V12 run-loop dogfood passed, including deterministic replay.

## Independent Review

- Attempt 1: `block`. It found reusable loop state after a non-terminating PowerShell method error
  and stale active status.
- Attempt 2: `block`. It cleared the fail-open probe but found remaining status drift and an omitted
  external-evidence authority statement.
- Attempt 3: `pass`. The fresh bounded reviewer found no remaining issue in the corrected delta.

## Evidence Authority

- Exact R71 run metadata, job metadata, and both raw hosted kernel logs are preserved in
  source-preserving Base64 envelopes.
- Both envelopes reconstruct to their declared raw byte counts and SHA-256 digests.
- R71's protected canonical gate was never invoked and no R71 run slot exists.
- Candidate-addressed external evidence remains authoritative for live release state.

## Verification Friction

- Sandboxed process-spawn and build attempts produced environment-only `EPERM` or access-denied
  failures; the exact commands passed when rerun in the permitted host context.
- The first independent review expanded beyond its intended time box. Subsequent specialist reviews
  used an explicit bounded scope and separate owner aggregation.
- Neither item changed product behavior or release requirements.

## Next Gate

1. Freeze the exact R72 commit and tree.
2. Run immutable copied-lifecycle, complete verification, and disposable exact-candidate rehearsal.
3. Require exactly three hosted Windows jobs to pass on that commit.
4. Invoke the R72 protected canonical gate exactly once.
5. Require a fresh compiled, approved, exact three-agent R2 roster to return three verified `pass`
   outcomes.
6. Complete milestone and memory closeout, merge to `main`, and verify the merged release.
