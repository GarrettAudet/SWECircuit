# Revision 60 Root-Cause Analysis

## Status

All hosted failure classes are confirmed and locally corrected. Independent review found one additional cleanup-ownership widening, which is also corrected. Hosted CI remains the portability proof.

## Reproduction

Run hosted workflow `30147355030` against exact commit `e253a2ab4df7d5cebf9ed7cee6af0fea268ee3c2`.

## Stable Evidence

- Template check: pass.
- Six kernel jobs: fail.
- Ubuntu core suite: 460 pass before the copied lifecycle fails on an absent musl-only Biome package.
- Windows failures consistently compare long user paths with `RUNNER~1` aliases or reject cleanup for the same aliased temp parent.
- macOS failures consistently compare `/private/var` with `/var`, reach Node's copy-overlap error before the project guard, or exhaust the default heap in the maximum specialist-run aggregate.

## Confirmed Linux Cause

The canonical release gate evaluates optional lockfile packages by operating system, architecture, and libc. The release-review parent evaluated only operating system and architecture. On Ubuntu glibc, npm correctly omitted the musl Biome package, but the parent incorrectly marked it applicable and read its missing manifest.

## Hypothesis Results

| Hypothesis | Status |
| --- | --- |
| One canonical temp-root identity closes Windows 8.3 and macOS `/var` alias cascades without weakening alias rejection | Confirmed |
| Canonicalizing the destination's existing parent lets the cache-overlap guard reject aliases before `cp` | Confirmed |
| Repeated deep snapshots and whole-session canonical string comparisons create avoidable maximum-run heap amplification | Confirmed |
| Raising `NODE_OPTIONS` is required | Rejected; optimize the bounded operation before changing host memory policy |

## Causal Corrections

1. Parent lock supply now uses fail-closed runtime libc detection and evaluates `os`, `cpu`, and `libc`.
2. Temporary fixture roots, ancestor expectations, cache locations, and prospective cache destinations use canonical identities.
3. Cleanup canonicalizes the root and temporary parent, requires a plain immediate child with the owned prefix, and removes the exact checked path.
4. Cleanup comparison folds case only on Windows. Linux and macOS require exact canonical spelling.
5. Session restore preserves the original raw byte limit, copies untrusted bytes once, and trims only legal outer JSON whitespace before parsing.
6. The full 16-agent aggregate and raw boundary scenarios run in fresh test processes; the existing smaller permutation test retains order-independence coverage.

No published limit was reduced and no hosted heap allowance was increased.

## Regression Evidence

- TypeScript authority: 7/7 pass.
- Specialist execution under a 1 GB heap: 7/7 pass, including the full 16-agent aggregate and exact raw boundaries.
- Release gate: 27/27 pass.
- Release review: 37/37 pass.
- Complete core: 461/461 pass.
- Independent review: `fix`, correction, then final-delta `pass`.

Hosted CI remains the final portability proof.