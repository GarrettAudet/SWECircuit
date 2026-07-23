# Revision 29 Exact-Checkpoint Aggregate Verification

## Identity

- Checkpoint: `f1454b6008de1498e72f9cc5a36fd1234b50e028`.
- Tree: `8da892a7f9446ef6f84f0fe91859bff2052d67bc`.
- Command: `npm.cmd run verify`.
- Result: `pass`, exit 0 in 2,623,400 ms.
- Worktree: clean before and after; commit and tree unchanged.

## Evidence

- Core tests: 439 of 439 pass in 413,162.4353 ms.
- Exact copied-production lifecycle: 1 of 1 passes in 2,172,935.5496 ms.
- V10, V11 Revision 43, and V12 dogfood pass.
- The specialist example, 148-file package inspection, and clean offline installed consumer pass.
- Raw log: 657,576 bytes at `sha256:1635092c047e9a8a2fe6cb42b6a07fecf1b865fd52eab3a50d38c4f72944c399`.
- The exact log, supervisor metadata, and receipt are preserved under `independent-review-r29/attempt-2/inputs/snapshots/`.

## Review

Attempt 1's verified `fix` remains preserved: it correctly rejected relabeling the older `f1d4fd0` log as proof of `f1454b6`. Attempt 2 authenticates this distinct rerun and returns a package-verified `pass`.

## Route

`pass` to Candidate 13 freeze. This record does not approve Candidate 13, hosted CI, release, or merge.