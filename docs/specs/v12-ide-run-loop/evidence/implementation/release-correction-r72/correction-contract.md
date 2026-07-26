# Revision 72 Correction Contract

## Goal

Make the R71 Windows snapshot-readability regression independent of PowerShell module autoload
while preserving its exact path, byte-count, and SHA-256 proof.

## Scope

- Treat candidate-addressed external evidence as authoritative for exact-candidate state.
- Preserve the full-SHA-256 reviewer aliases and every R71 product/runtime behavior.
- Preserve the ordinary Windows PowerShell child process and legacy path surface.
- Replace only `Get-FileHash` with a .NET file-stream SHA-256 computation.
- Preserve exact R71 local, rehearsal, hosted-job, and failure-log evidence.
- Retire R71 without invoking its protected one-shot canonical gate.
- Rerun the complete mutable, independent-review, immutable, hosted, canonical, and R2 ladder for
  a newly frozen R72 source.

No V12 product API, scheduler, model, provider, IDE adapter, permission, process, merge, or memory
effect changes. The external host remains responsible for runtime supply and effects.

## Completion Evidence

- The exact R70-derived 225-source path probe passes from ordinary Windows PowerShell without
  invoking `Get-FileHash`.
- Every PowerShell read/hash error terminates the probe, cannot reuse prior row state, and produces
  no success output.
- Release-review, release-gate, core, static, checker, and dogfood gates pass.
- Independent read-only review confirms that the edit changes only hash implementation and retains
  all path and byte assertions.
- One immutable R72 source passes copied lifecycle, complete verifier, non-consuming rehearsal,
  hosted Template Check and Windows Node 22/24, one canonical gate, and fresh three-domain R2.

## Stop Conditions

- Any missing source, content mismatch, lost path assertion, or broader behavior change emits
  `fix`.
- Any hosted failure occurs before and prevents the R72 canonical gate.
- Any verified non-pass fresh R2 outcome permanently retires R72.
- The R72 canonical gate may run exactly once and only after all prior immutable and hosted gates
  pass.
