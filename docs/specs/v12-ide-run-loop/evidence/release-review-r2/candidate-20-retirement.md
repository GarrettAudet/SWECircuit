# Candidate 20 Retirement

## Candidate

V12 Revision 43 commit `c3cd70bddf9279bfd5ca87b1da5e909a486b3fac`, tree `2b7b984538e4d3b350530d9402333ff89ad59e75`.

## Verification Outcome

The exact copied-production lifecycle authenticated the committed source and advanced through the corrected TypeScript supply. Its nested isolated gate then failed after 41.0 seconds while resolving copied candidate-local `node_modules`.

## Root Cause

The host dependency closure remained bound to `ROOT/node_modules`. In a copied committed candidate, `ROOT` is the dependency-free materialization rather than the host checkout that supplies the offline toolchain.

## Retirement

No candidate-addressed Revision 43 canonical gate was consumed. Candidate 20 is retired. Revision 44 makes the dependency root an explicit, closed, receipt-bound host supply.