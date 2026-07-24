# Revision 42 Attempt History

## R41 Exact Verification

The full verifier reproduced one copied-production lifecycle failure after core verification passed. No R41 canonical gate was invoked.

## Diagnosis

A direct lifecycle rerun reproduced the same missing candidate-local TypeScript path. Inspection confirmed that the explicit host supply was dropped when the gate derived its child environment.

## Correction

The host TypeScript entrypoint is now resolved once at startup and passed as one exact environment value. The lifecycle production identity pin was updated to the corrected bytes.

## Current Result

Syntax and the focused release-gate suite passed. Exact Revision 42 failed its lifecycle identity preflight because the corrected digest retained the stale gate byte count. No canonical gate was invoked; Revision 42 is retired in favor of the one-field Revision 43 correction.