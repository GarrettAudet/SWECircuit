# Revision 60 Freeze Contract

## Frozen Scope

- Match release-review lock applicability to operating system, architecture, and Linux libc.
- Canonicalize temporary-root, cache, ancestor, and cleanup comparisons across Windows and macOS aliases.
- Preserve case-insensitive comparison only on Windows; keep Linux and macOS cleanup ownership case-sensitive.
- Reduce specialist-session peak allocation without changing the 16-agent or byte limits.
- Isolate full-size specialist limit scenarios into fresh test processes without removing required semantics.
- Preserve Revision 59 retirement evidence and leave its one-shot gate unconsumed.

## Frozen Source Identities

- `scripts/run-v12-release-review.mjs`: 104,087 bytes, `sha256:8a051a1cdb0b08dd61271569ffef7f460ef964ef7501c236c7b570e52613688e`.
- `src/specialist-run-session.ts`: 19,225 bytes, `sha256:2a763993ef0d190ff81b8b234081d3dcd8c470faaa3a6c8ae76da114ecb43367`.
- `test/helpers/v12-release-review-lifecycle.mjs`: 85,469 bytes, `sha256:735f31711f1f01d3d41221fc00a5eb2ea401c0614460a1473d095a304c424a9b`.
- `test/helpers/specialist-run-fixture.mjs`: 9,645 bytes, `sha256:2bad9cd515d3c170588799f3eaf4db65b1c257dc8eca58982200653eb3dd1d87`.
- `test/specialist-run.test.mjs`: 21,858 bytes, `sha256:3bf68e69a8193b996ac69d32cd01d8c43e71126c338efb8e532fa36d59626331`.
- `test/specialist-run-limits.test.mjs`: 5,580 bytes, `sha256:84bd3cedab2982a446d6db3ea0aa4d6048d3e09120b926a669036160e1400cca`.
- `test/specialist-run-boundaries.test.mjs`: 2,746 bytes, `sha256:78e56386b3399f0303b64e1383b9bb1a8eb5090b55f0b05552ebea325b150485`.
- `test/typescript-toolchain.test.mjs`: 13,559 bytes, `sha256:b42bf11d065036064394612d889d1bc02acc7781483f710ce975210d51155e2b`.
- `test/v12-release-gate.test.mjs`: 74,562 bytes, `sha256:83b2fa6945f75d2740a63097b9f2be1acbe5c22a952670f6f17b2da229c23ce4`.
- `test/v12-release-review.test.mjs`: 80,531 bytes, `sha256:96d864571fadfe601b302f8dad8541cba40f3122af03d23f86e5f80b06a8cc67`.

## Eligibility

Focused regressions, 461/461 core tests, both workflow checkers, format, lint, typecheck, build, V10/V11/V12 dogfood, package inspection, installed-consumer verification, and independent final-delta review pass.

After commit, source may change only for an evidence-backed failure from exact lifecycle, full verification, hosted CI, the one-shot canonical gate, or fresh R2. Any source change creates a new revision and identity.

## Post-Commit Gates

- Exact copied lifecycle.
- Full `npm.cmd run verify`.
- Hosted Linux, Windows, and macOS matrix on Node 22 and 24 plus template check.
- One canonical gate invocation for the exact commit; never rerun it.
- Fresh three-domain R2 with complete all-pass fan-in.
- Milestone, memory, owner merge, and release closeout.
