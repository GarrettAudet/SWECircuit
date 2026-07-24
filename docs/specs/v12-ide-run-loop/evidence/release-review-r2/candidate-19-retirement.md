# Candidate 19 Retirement

## Candidate

V12 Revision 42 commit `a093e475f662868b938c9b33078c7f86ede5d34c`, tree `f17384ac77055717e2658e1b0e0e32ef5f608c66`.

## Verification Outcome

The exact copied-production lifecycle stopped after 169.6 ms at its committed production-identity preflight.

- Gate digest: correct, `sha256:5f8820b9ec79252aa519346246f3dd3d436e206208d9bfefe66a612cbaf22f61`.
- Expected bytes: stale, 47,517.
- Actual bytes: 47,552.

No candidate lifecycle body or canonical gate executed.

## Retirement

Candidate 19 is retired. Revision 43 corrects only the stale byte count and must pass the same preflight before execution.