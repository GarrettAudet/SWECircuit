# Candidate 14 Retirement

## Identity

- Commit: `74397e30be5d185a14ecef1a838aa7767ffdf60f`
- Tree: `ec124cc7664692b9a60a0051f3dd33a2cbd1e260`
- Canonical gate outcome: `fail`
- Receipt: `inputs/canonical-gates/74397e30be5d185a14ecef1a838aa7767ffdf60f/canonical-gate-receipt.json`

## Stable Evidence

- Candidate source: 3,477 files, 105,198,478 bytes, `sha256:90097d36f74019e8004f3d2245d368bc4050cfa042e8a1ea2b34228586e9d1e4`.
- Materialization digest, candidate Git context, source repository, and outer cleanup remained exact.
- The core suite passed 439 of 439 tests.
- The copied-production lifecycle stopped during the primary verify parent after 2,960,137 ms of lifecycle execution.
- Receipt: 2,296 bytes, `sha256:f9960ddb3cf3b15cbc03fbdb7d016b1eb520b833fb2183dcfdd67b984cc560c2`.
- Stdout: 36,810 bytes, `sha256:dfa57323ce8e81452cf51a5fe862b34e0b9019dd05eb09b90af55425f9393138`.
- Stderr: 19,354 bytes, `sha256:0d0f997717d3a289caa495f1426091e27604f6829fd49be9af82f472e9d60758`.

## Retirement Reason

The lifecycle helper diffed every global `swr2-*` directory and asserted cleanup before reporting the child process's timeout, signal, or status. The surviving two-file root localized the interruption before materialization but did not prove ownership. The production parent also launched one synchronous Git object process per tree entry, creating avoidable file-count-driven pressure. Revision 31 batches binary Git reads, scopes temp ownership per invocation, terminates the full process tree at timeout, orders process classification before cleanup assertions, and surfaces cleanup failures.

## Route

Outcome: `diagnose -> fix`.

Never rerun this candidate's exact gate. Broader correction verification and a different committed source identity are required before another one-shot gate.
