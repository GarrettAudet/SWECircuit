# Candidate 6 Retirement

## Candidate

- Commit: `0df22a9f0142cfeb5f3c625ceb30b2d70e41b4f7`.
- Tree: `d9c906bf31ef5dd1c618c64da4287a16775fccaf`.
- Source: 2,008 files, 56,485,122 bytes, `sha256:6bea9eb4e708b506577f3cee47ca36aba9f75abfcb1e660c4569387e3efdacf3`.

## Outcome

`fail`. The exact source digest, post-command digest, disposable Git context, live repository state, and cleanup all passed. The canonical command reached the installed-consumer gate after all earlier stages passed, then failed because `scripts/check-packed-consumer.mjs` resolved TypeScript under the dependency-free candidate materialization.

## Evidence

- Receipt: `inputs/canonical-gates/0df22a9f0142cfeb5f3c625ceb30b2d70e41b4f7/canonical-gate-receipt.json`.
- Stdout: 297,080 bytes, `sha256:e8f7e95b1ed84a9b86d4182675f419b1983a5c06e205067751b1337f37535bc1`.
- Stderr: 27,686 bytes, `sha256:4cfd6815e2a9db4b05b103c8d3bcfcfbbce07ac56dfc167895307e96b0bb3262`.

## Route

Candidate 6 is permanently retired and must not be rerun. Revision 13 must make the TypeScript compiler an explicit host-owned toolchain input outside the candidate materialization, retain a repository-local default for ordinary development, add focused path and supply regressions, rebuild affected V11 evidence, and freeze a new candidate.
