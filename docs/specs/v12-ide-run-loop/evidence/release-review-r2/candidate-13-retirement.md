# Candidate 13 Retirement

## Identity

- Commit: `e61932f2d5067559332790b370f1bf510d0064fc`
- Tree: `cb35f33f4bd579e9b2730929493c270b125b7ba4`
- Canonical gate outcome: `fail`
- Receipt: `inputs/canonical-gates/e61932f2d5067559332790b370f1bf510d0064fc/canonical-gate-receipt.json`

## Stable Evidence

- Candidate source: 3,474 files, 105,131,002 bytes, `sha256:a4c20b8ccdefdd95471b5eee8ef06dffdfc58525c3c6f51af68034b8c3451f0c`.
- Materialization digest, candidate Git context, source repository, and cleanup remained exact.
- Canonical verification completed 439 core tests: 437 passed and two failed.
- Receipt: 2,296 bytes, `sha256:2ed3d9989f433f85c98718f3da12e98a0daf414116479aa5364eae0b8d60b114`.
- Stdout: 37,356 bytes, `sha256:b341a9904200e852063fa4fc1856c184cf763242b07da00c049fcd6544822f34`.
- Stderr: 19,548 bytes, `sha256:d7a90861417245e1f48ddfffcb12310b7402e500f726f023b548169c6487888d`.

## Retirement Reason

Two anti-drift tests rejected live milestone sections that named this candidate as pending or unconsumed. A frozen source cannot truthfully describe its own numbered identity that way after the one-shot gate consumes it. Revision 30 moves volatile consumption and outcome state to candidate-addressed external evidence and keeps numbered identities in immutable history.

## Route

Outcome: `diagnose -> fix`.

Never rerun this candidate's exact gate. Any later release evidence must bind a different committed source identity.
