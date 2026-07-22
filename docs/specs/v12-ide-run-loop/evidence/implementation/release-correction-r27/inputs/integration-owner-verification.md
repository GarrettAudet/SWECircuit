# Revision 27 Integration-Owner Verification

## Correction Evidence

- Build and typecheck execute `scripts/run-typescript.mjs` directly rather than resolving bare `tsc` through `PATH`.
- Release-gate and packed-consumer paths use the same resolver.
- The resolver binds canonical path, bytes, SHA-256 digest, link count, supply origin, and observed version.
- Supplied paths reject duplicate keys, invalid paths, aliases, candidate containment, and hard links.
- Repository fallback canonicalizes dependency-directory aliases while preserving exact target authentication.
- Binding bytes are reauthenticated before and after version inspection and compilation.
- Biome's configured include scope covers the new launcher.

## Verification

- Adversarial TypeScript binding suite: `pass`, 6 of 6; runner duration 618.8745 ms.
- Authenticated build: `pass`; TypeScript 7.0.2 receipt emitted.
- Authenticated typecheck: `pass`; the same path and digest were emitted.
- Installed-package consumer gate: `pass`.
- Release-gate suite: `pass`, 16 of 16; runner duration 417,712.4983 ms.
- Fast lifecycle boundary checks: `pass`, 2 of 2; runner duration 106.1986 ms.
- Corrected complete exact lifecycle: `pass`, 1 of 1; runner duration 2,201,441.4493 ms.
- Scoped syntax, Biome, and Git whitespace checks: `pass`.

## Checkpoints And Attempts

- `4a24027`: initial TypeScript execution checkpoint; complete lifecycle returned `diagnose` on a stale production identity manifest.
- `e5fa310`: corrected lifecycle checkpoint; exact lifecycle returned `pass`.
- Neither checkpoint is a release candidate and neither consumed a one-shot canonical candidate gate.

## Remaining Gates

- Run canonical mutable-source `npm.cmd run verify` and repository workflow checkers.
- Obtain a new package-bound independent semantic review over exact Revision 27 snapshots.
- Freeze a fresh candidate only after both gates pass.

## Route

Integration-owner result: `pass` to mutable-source verification and independent semantic review. Release remains blocked until the remaining gates pass.
