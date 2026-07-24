# Revision 45 Attempt History

## R44 Lifecycle

Gate authority completed, then a later negative review route exposed the leaked dependency-root key. The route ordering made the authority leak visible before the intended digest failure.

## Correction

The review-parent environment now strips both gate-only supply keys. The existing consumer test injects both values and proves their absence.

## Current Result

The release-review suite passed 35/35. Exact Revision 45 still reproduced the ancestor fallback because gate-owned private temp storage remained beneath repository `.local`; environment isolation alone was insufficient. No candidate-addressed canonical gate was consumed. Revision 45 is retired in favor of Revision 46.