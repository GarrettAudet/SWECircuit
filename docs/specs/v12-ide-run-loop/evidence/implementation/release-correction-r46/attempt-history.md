# Revision 46 Attempt History

## R45 Lifecycle

Environment isolation passed, but the nested fixture remained under source ancestry through the gate-owned private temp directory.

## Correction

The release gate now derives an owned external scratch base from canonical host temp storage and fails closed if that path resolves inside the source repository. The long-path Git-context regression asserts the boundary.

## Current Result

Focused gate and review suites pass 53/53. Revision 46 awaits exact committed lifecycle verification.