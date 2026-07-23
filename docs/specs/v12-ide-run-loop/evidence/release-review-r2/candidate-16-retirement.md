# Candidate 16 Retirement

## Identity

- Commit: `a9ee60d31cf302c91f6600ac977d0b62cb153f3f`
- Tree: `8dad28ed47e8dc10e2655f4b42d986baf4033781`
- Canonical gate outcome: `pass`
- Receipt: `inputs/canonical-gates/a9ee60d31cf302c91f6600ac977d0b62cb153f3f/canonical-gate-receipt.json`

## Stable Evidence

- Candidate source: 3,658 files, 112,617,713 bytes, `sha256:594c3a1bfc2325b418195ac16e8259816293346a2ac1bb9a65976edc30c1b360`.
- Materialization digest, disposable Git context, source repository, and cleanup remained exact.
- The core suite passed 447 of 447 tests; copied lifecycle, package inspection, and offline installed-consumer verification also passed.
- Receipt: 2,297 bytes, `sha256:2139ded7581b86d560e592ee77e7e1ffd6bac328fa1b0891392b2419b0579b19`.
- Stdout: 303,745 bytes, `sha256:08077c4b651bfb513f77f8f59486cee83bd6f9f02242e780de43bdcac0b1c124`.
- Stderr: 26,319 bytes, `sha256:c620ad4eb01b894d5789b5f44fd9ad8397e84e0d7b3dea11a07e64c5eee567cd`.

## Retirement Reason

Fresh R2 preparation authenticated the candidate and its gate, then routed `diagnose` before package compilation:

```txt
Correction revision sequence is not contiguous from revision 1: missing revision 30.
```

The release-review lineage scanner classified every `release-correction-rN` diagnostic directory as a package-backed specialist revision. Package-backed corrections are contiguous through Revision 22; later diagnosis and attempt folders intentionally contain no package envelope, approval, or handoff verification. Their directory numbers therefore created a false package-lineage gap.

## Route

Outcome: `verify -> pass -> review -> diagnose -> fix`.

Never rerun this candidate's exact gate. Revision 40 must distinguish complete package-backed correction evidence from diagnostic-only folders, reject partial package marker sets, preserve the exact Candidate 16 gate evidence, and freeze a new source identity before another one-shot gate.
