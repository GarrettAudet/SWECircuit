# Revision 65 Root-Cause Analysis

## Status

Root cause confirmed. The smallest causal correction is implemented and the focused release-gate
suite passes.

## Reproduction

Run the non-consuming exact-candidate rehearsal against Revision 64 commit
`7d30a276d547cd501d93e6a698c84fff111bd8a4`.

The exact diagnostic replay materialized 4,085 files and ran the canonical
`node npm-cli.js run verify` command. Core passed 466/466 before the copied lifecycle failed.

## Stable Evidence

- Full replay: status 1, null signal, 1,898,645 ms.
- Lifecycle: 1 pass, 1 fail, 1,836,834.2537 ms.
- Failing test: 1,836,726.2587 ms.
- Failure: `copied production canonical gate timed out`.
- Replay stdout: 39,404 bytes,
  `sha256:5d90cbc23c7c152cffc867eca1df5c3c45d8b658c23afd8c5488083b3db3fcc6`.
- Replay stderr: 19,096 bytes,
  `sha256:4d597e3a9f43acbe878966423f4251d762b2537d21f5f6cfcc9b0e93417de929`.
- The nested candidate root was 207 characters. A lock-supplied TypeScript leaf projected to
  293 characters.
- The nested offline `npm ci` remained CPU-bound with `node_modules` absent until the enclosing
  1,800,000 ms gate timeout.
- The same package and lock completed offline with scripts disabled at
  `C:\tmp\swc-r64-short-ci` in 2,442.5591 ms.

The first failed rehearsal's raw outer tool stream was truncated. The diagnostic record explicitly
keeps that limitation and preserves the exact replay streams as base64. Replay bytes are not
misrepresented as the original first-run bytes.

## Hypotheses

- Insufficient timeout only: rejected. The deep install made no dependency-tree progress over
  the extended 30-minute bound, while the short-path counterfactual completed in 2.44 seconds.
- Product, core-test, or V11 regression: rejected. Core passed 466/466, exact standalone
  lifecycle and complete verification passed, and all seven hosted jobs passed.
- Network or lifecycle-script wait: rejected. The install was offline and lifecycle scripts were
  disabled.
- Corrupt package or lock: rejected. The exact same package and lock passed the short-path
  counterfactual.
- Recursive private-scratch path expansion: confirmed.

## Confirmed Cause

Exact verification legitimately nests release-gate materialization while preserving isolated Git
and temporary-runtime authority. The 27-character `swecircuit-v12-release-gate` namespace appeared
three times in the Windows path. The inner candidate root reached 207 characters, and the
lock-supplied TypeScript leaf reached 293 characters. Git long-path support did not make npm's
candidate-private install progress in that topology.

## Causal Correction

Rename only the internal release-gate scratch namespace to `swc-v12-g`. Under the same three-level
topology, the candidate root projects to 153 characters and the causal dependency leaf to 239,
a 54-character reduction. Authority, random ownership, containment, cleanup, dependency identity,
and external interfaces remain unchanged.

## Regression Strategy

1. Expose the exact materialization base through test-only hooks.
2. Require the short namespace.
3. Prove the causal lock-supplied dependency exists.
4. Reconstruct the exact nested topology and require the corrected Windows leaf below 260.
5. Require the 54-character reduction from the retired layout.
6. Repeat the complete exact and hosted release sequence before consuming the one-shot gate.
