# Scoped Timeout Termination Diagnosis

## Reproduction

After the Revision 35 status correction passed its focused 2/2 gate, the complete
release-review file passed 30/31 tests. The scoped timeout regression reported
`termination.accepted: false` even though the timeout fired, the direct fallback
returned `accepted: true`, the owned temp root was removed, and the descendant no
longer existed.

## Stable Evidence

- Restricted IDE host, five repeated probes: `taskkill` status 1, direct fallback
  accepted, and descendant absent after 100 ms in every run.
- A direct restricted-host probe captured `taskkill` stderr as `ERROR: Access denied`.
- Native Windows path, five repeated probes outside the restricted host: `taskkill`
  status 0, no fallback, and descendant absent after 100 ms in every run.
- Before correction, the exact focused test reproduced the false negative twice.

## Confirmed Cause

`terminateProcessTree` exposed the fallback result but defined top-level
`accepted` from only the primary tree operation. A host that denied `taskkill` but
accepted Node's direct kill therefore recorded contradictory evidence.

## Causal Correction

Define top-level acceptance as primary acceptance or explicit fallback acceptance
on both Windows and POSIX paths. Preserve the primary result and fallback result
separately. The regression derives the Windows acceptance equation from those raw
fields and still requires the descendant to be gone.

## Verification

- Restricted-host focused regression: 5/5 `pass`.
- Native Windows focused regression: 1/1 `pass`; native probe: 5/5 primary
  `taskkill` acceptance with no fallback.
- Complete `test/v12-release-review.test.mjs`: 31/31 `pass`.

## Route

`verify -> diagnose -> fix -> verify`. This is release-harness evidence
classification, not a V12 product-contract change. A fresh immutable aggregate and
package-bound independent review remain required.
