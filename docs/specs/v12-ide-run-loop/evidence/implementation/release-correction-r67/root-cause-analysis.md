# Revision 67 Root-Cause Analysis

## Status

Root cause confirmed. The bounded multi-segment fixture correction is implemented.

## Reproduction

Run the complete verifier for Revision 66 commit
`33dbd5c9829446b51b04d589fc963f8b7095d442` on Ubuntu.

Both Node 22 and Node 24 fail at `test/v12-release-gate.test.mjs:962` while the new R66
four-level path-budget regression passes.

## Stable Evidence

- Workflow run: `30166591953`, conclusion `failure`.
- Ubuntu Node 22 job: `89700575073`.
- Ubuntu Node 24 job: `89700575081`.
- Failed step: `Verify kernel`.
- Shared assertion:
  `causal tracked entry did not cross the Windows long-path boundary`.
- Node 22 raw log: 222,082 bytes,
  `sha256:e1c7d6f74a9111f27184f8ad11530c8e386039bf88bb0ac2f30ca2933f5c9633`.
- Node 24 raw log: 102,760 bytes,
  `sha256:38b83750d3f7e9a2f598a2bc9ebe42b744b2678b7566dfe076d067f13b551b5b`.

Five other jobs pass, including both Windows versions. The R66 exact copied lifecycle, complete
verifier, and fourth-level exact-candidate rehearsal also pass.

## Confirmed Cause

The existing Git-context test tries to make the synthetic worktree 160 characters long but caps
one added directory at 96 characters. R66 shortened the private materialization root. On the
shorter Ubuntu temporary root, one bounded directory can no longer reach 160 characters, so the
tracked fixture path stays below 260 and the causal assertion correctly fails.

This is a test-construction defect, not evidence of a runtime, cleanup, authority, or R66
four-level path-budget failure.

## Causal Correction

Compose as many bounded directory components as needed to reach the 160-character worktree target.
Each component remains at most 96 characters. A platform-independent `node:path.posix` projection
uses `/tmp/swg/w/long-path-context-XXXXXX`, requires more than one component, reaches exactly 160
characters, and proves the tracked entry exceeds 260 characters.

No production source changes.

## Regression Strategy

1. Assert the deterministic short Linux projection requires multiple bounded components.
2. Assert that projection reaches the exact 160-character worktree target.
3. Assert its tracked entry crosses 260 characters.
4. Run the real fixture under the current host with the same constructor.
5. Preserve and byte-verify both failed Ubuntu logs and the seven-job matrix.
6. Repeat the full exact and hosted release sequence before consuming the one-shot gate.
