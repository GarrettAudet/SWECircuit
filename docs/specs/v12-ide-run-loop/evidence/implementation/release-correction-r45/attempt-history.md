# Revision 45 Attempt History

## R44 Lifecycle

Gate authority completed, then a later negative review route exposed the leaked dependency-root key. The route ordering made the authority leak visible before the intended digest failure.

## Correction

The review-parent environment now strips both gate-only supply keys. The existing consumer test injects both values and proves their absence.

## Current Result

The release-review suite passes 35/35. Revision 45 awaits exact committed lifecycle verification.