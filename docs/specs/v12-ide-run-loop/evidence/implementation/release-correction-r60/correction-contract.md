# Revision 60 Correction Contract

## Trigger

Revision 59 commit `e253a2ab4df7d5cebf9ed7cee6af0fea268ee3c2` passed its local pre-freeze suite and independent review, then failed all six hosted kernel jobs in run `30147355030`. The hosted template check passed.

## Objective

Close the cross-platform defects exposed by the exact hosted matrix without weakening path, package-supply, cleanup, memory, or release-gate guarantees.

## Required Behavior

1. Preserve Revision 59 evidence and leave its one-shot gate unconsumed.
2. Evaluate optional lockfile packages against operating system, architecture, and Linux libc in both release paths.
3. Use one canonical filesystem identity for temporary roots, ancestor scans, cleanup ownership, and cache-overlap checks across Windows and macOS aliases.
4. Keep supplied TypeScript alias rejection fail-closed while constructing test-owned valid paths from canonical roots.
5. Make the maximum supported specialist-run aggregate complete below the default hosted Node heap limit without raising the release verifier's memory allowance.
6. Add causal regression coverage for every corrected route.
7. Re-run focused, core, lifecycle, full, hosted, and independent verification before any one-shot gate invocation.

## Scope Boundary

Production and test changes must remain limited to the confirmed package-applicability, canonical-path, cache-overlap, specialist-run allocation, and bound lifecycle identity surfaces. No model, provider, IDE, scheduler, agent-spawn, permission-enforcement, merge, or memory-persistence effect may be added.

## Route

`verify -> diagnose -> fix -> verify -> review -> freeze`
