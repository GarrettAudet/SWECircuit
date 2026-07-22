# Revision 27 Test Plan

## Toolchain Binding

- Execute a distinguishable external compiler sentinel through the real launcher while hostile `PATH` and candidate-local `.bin` sentinels are present; require only the declared sentinel to run.
- Execute the repository-local fallback through the same launcher with no declared supply.
- Require the emitted binding receipt's canonical path, bytes, digest, link count, and observed version to match the executed file.
- Use a self-mutating version sentinel to prove the launcher stops before compilation when the authenticated file changes.
- Reject duplicate case-insensitive supplies, empty and relative values, missing paths, directories, final symbolic links, linked ancestor directories, hard links, and supplied candidate-contained files.
- Prove that a repository fallback behind a linked dependency directory canonicalizes to and executes the exact target without relaxing supplied-path checks.

## Integration

- Prove package build and typecheck scripts call the launcher and contain no bare `tsc` command.
- Prove the release gate and packed-consumer path use the shared resolver rather than independent validation copies.
- Run existing release-gate, packed-consumer, specialist, dogfood, and release-review regressions.
- Run syntax, Biome, diff, template, checker-mutation, and V11 evidence replay checks.

## Complete Lifecycle

Run the complete copied-production lifecycle from exact Git blobs under a disposable candidate Git context. Require external npm and TypeScript supplies, compile/package/approve/verify, handoffs, negative routes, immutable materialization, and cleanup to pass.

## Pre-Freeze

- Run `npm.cmd run verify` from mutable source.
- Obtain a new package-bound independent semantic review over immutable Revision 27 snapshots.
- Only after a `pass` verdict, freeze a fresh candidate and run its canonical gate exactly once.
