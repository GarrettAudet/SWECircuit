# Revision 47 Attempt History

## R46 Lifecycle

External scratch solved ancestor fallback. R2 receipt validation then isolated the remaining `npmScriptShell` mismatch.

## Diagnosis

A field-name-only validator diagnostic and isolated producer probe showed a Windows casing-only difference. Native realpath returned the same canonical casing as receipt binding.

## Correction

Startup authority now uses native realpath. The producer regression requires exact shell equality and the strict consumer remains unchanged except for safe failed-field names.

## Current Result

The combined release suite passes 53/53. The complete direct copied lifecycle passes in 494 seconds with cleanup and source immutability. Exact committed verification remains pending.