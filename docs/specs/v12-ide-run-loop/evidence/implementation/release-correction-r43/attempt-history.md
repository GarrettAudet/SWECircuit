# Revision 43 Attempt History

## R42 Preflight

The exact lifecycle rejected the stale byte count before executing candidate code. No canonical gate was invoked.

## Correction

The integration owner corrected the expected gate source length from 47,517 to 47,552 bytes without changing runtime code.

## Current Result

Exact Revision 43 passed identity authentication, then its isolated copied gate failed because host dependency closure still resolved copied candidate-local `node_modules`. No candidate-addressed canonical gate was consumed. Revision 43 is retired in favor of Revision 44.