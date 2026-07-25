# Revision 66 Root-Cause Analysis

## Status

Root cause confirmed. The R66 private layout and four-level regression are implemented.

## Reproduction

Run the non-consuming exact-candidate rehearsal against Revision 65 commit
`e1b2c38b3c794fc3d4d8a967a20305885baa8662`.

The exact candidate completed format, lint, typecheck, build, and 467 core tests before the
path-headroom regression rejected a 283-character projected dependency leaf.

## Stable Evidence

- Rehearsal: status 1, null signal, 65,164 ms.
- Failure: `nested install path lacks headroom`.
- Projected path: 283 characters.
- Namespace occurrences: four.
- Stdout: 38,236 bytes,
  `sha256:864d5ee33fd2b820ee646ebb8455354f81dc1ff25731ec017f814e222458a07e`.
- Stderr: 19,096 bytes,
  `sha256:4d597e3a9f43acbe878966423f4251d762b2537d21f5f6cfcc9b0e93417de929`.

The rehearsal stopped at the regression before the copied lifecycle. This evidence proves an
insufficient path budget; it does not claim that an R65 nested install was attempted or timed out.

## Confirmed Cause

The R65 top-level regression modeled three namespace occurrences. A non-consuming exact-candidate
rehearsal adds one enclosing materialization, producing four namespaces, four work directories,
three Git runtimes, and three nested temp directories. Shortening only the namespace did not leave
enough headroom for that complete topology.

## Causal Correction

Use compact private labels:

- Namespace: `swg`
- Materialization parent: `w`
- Private runtime: `r`
- Private temp: `t`

Random candidate and Git prefixes, ownership checks, containment, environment closure, and cleanup
remain unchanged. On the observed R65 topology, the projected leaf falls from 283 to 205
characters. With a fixed 64-character Windows temp-root budget, it falls from 314 to 236
characters, a 78-character reduction with 24 characters of headroom.

## Regression Strategy

1. Bind the complete private layout through test-only hooks.
2. Recheck the current process topology on Windows.
3. Model four namespace occurrences with `node:path.win32`.
4. Require a 64-character temp-root budget.
5. Require the exact 78-character reduction and at least 24 characters of headroom.
6. Preserve and byte-verify the complete R65 rehearsal streams.
7. Repeat the exact and hosted release sequence before consuming the one-shot gate.
