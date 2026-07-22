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
- Core suite after lifecycle serialization: `pass`, 435 of 435; runner duration 460,709.572 ms.
- Serialized lifecycle at checkpoint `4a3437a`: `pass`, 1 of 1; runner duration 2,237,591.634 ms.
- V11 Revision 41 two-package replay: `pass`; Candidate A `sha256:4394f9bbc2be8871b1b04f1b3b8202b43928251bbd8b996cc9cdeb9d5c84c055` / `sha256:9eea6f0084c5705d448aba40a50d1fb42401a1a8d6be53f847751f6c55a4bde1`, Audit B `sha256:fa7f65178897bae642e165df81fdfb0484e004ab942a9217c0ed1f7baae74371` / `sha256:b9e26224028a040da07780f747ba752174a8e424603c03981dd1abaffda85598`.
- Audit B binder attempt 41a: `block`, exact 5,295-byte handoff preserved after the host omitted explicit receipt delivery.
- Audit B binder attempt 41b: `pass`, exact 6,862-byte handoff at `sha256:0726e1f8314fa71cdfe25c4a72f95db01a7a8e601d0234a7792f896f98abc5e1`; host verification and dependency fan-in are ready.
- Audit B semantic review: `pass`, exact 7,691-byte handoff at `sha256:fe44783daa4071bdd56b107c53cb2015ab741e1596ae42ae410a6b3f7873e260`; launch authorization and complete evidence replay pass.
- V12 dogfood: `pass`; package dry run: `pass`, 148 files; clean offline installed consumer: `pass`.

## Checkpoints And Attempts

- `4a24027`: initial TypeScript execution checkpoint; complete lifecycle returned `diagnose` on a stale production identity manifest.
- `e5fa310`: corrected lifecycle checkpoint; exact lifecycle returned `pass`.
- Neither checkpoint is a release candidate and neither consumed a one-shot canonical candidate gate.

## Remaining Gates

- Replay canonical mutable-source `npm.cmd run verify` and repository workflow checkers from the Revision 41 checkpoint.
- Obtain a new package-bound independent semantic review over exact Revision 27 snapshots.
- Freeze a fresh candidate only after both gates pass.

## Route

Integration-owner result: `pass` to aggregate mutable-source verification and independent semantic review. Release remains blocked until the remaining gates pass.
