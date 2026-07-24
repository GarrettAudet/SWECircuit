# Revision 46 Attempt History

## R45 Lifecycle

Environment isolation passed, but the nested fixture remained under source ancestry through the gate-owned private temp directory.

## Correction

The release gate now derives an owned external scratch base from canonical host temp storage and fails closed if that path resolves inside the source repository. The long-path Git-context regression asserts the boundary.

## Current Result

Focused gate and review suites passed 53/53. Exact Revision 46 externalized scratch and reached the R2 compile worker, which rejected only the non-canonical Windows `npmScriptShell` path binding. No candidate-addressed canonical gate was consumed. Revision 46 is retired in favor of Revision 47.