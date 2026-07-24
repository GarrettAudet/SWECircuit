# Revision 51 Correction Contract

## Trigger

Revision 50's independent review returned `fix` on runtime portability, evidence-slot ownership, and circular lock-tuple verification.

## Objective

Bind a portable candidate-private npm supply, own the evidence slot before preparation, and make R2 derive the same-host runtime tuple independently.

## Required Behavior

1. Support authenticated npm 10 or newer on Node 22 across Windows and POSIX.
2. Reserve the candidate evidence directory and raw logs before materialization.
3. Remove owned evidence after pre-execution setup failure.
4. Bind platform, architecture, and libc in the receipt.
5. Have R2 independently derive and compare the same-host tuple.

## Route

`review -> fix -> verify -> review`
