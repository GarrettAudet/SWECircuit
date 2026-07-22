# Revision 27 Integration Assessment

## Semantic Result

The exact package and 13,404-byte raw handoff verify successfully. The reviewer authenticated all 36 declared inputs and returned `fix` for two blocking execution-identity defects:

1. The packed-consumer check retains only the resolved pathname and later compiles through a direct spawn, discarding the authenticated binding and version receipt.
2. The shared launcher authenticates a pathname before and after child execution, but the child reopens that pathname. A concurrent swap-and-restore can therefore execute different bytes while both checks observe the approved file.

The reviewer disclosed one read-only command that escaped the declared snapshot path because PowerShell misparsed its argument. It excluded that output. The integration owner independently reproduced both findings from the authenticated source snapshots, so the non-pass causal route is accepted; this attempt is not eligible as final pass evidence.

## Integration Result

- `semanticRouteAccepted: true`
- `correctionAccepted: false`
- `phaseReady: false`
- `candidate13Consumed: false`

The generated artifact is exactly `independent-revision-27-release-correction-review.md`. Static path, link, containment, metadata, lifecycle, and Revision 41 success-route controls remain accepted.

## Route

Open Revision 28. Read and authenticate the compiler entrypoint once, then execute those exact captured bytes through one shared child primitive without reopening the approved pathname. Route version inspection, build, typecheck, canonical-gate supply, and packed-consumer compilation through that primitive and retain the complete receipt.

Add regressions for swap-and-restore substitution, mutation during compilation, packed-consumer mutation after initial resolution, and selectable ambient and candidate-local command wrappers. Make the copied lifecycle execute a valid distinguishable external compiler. Annotate, but do not rewrite, the non-authorizing Revision 41 attempt-41a digest-label inconsistency. Repeat focused, lifecycle, aggregate, and package-bound independent review gates before freezing Candidate 13.