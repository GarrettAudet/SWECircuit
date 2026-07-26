# Revision 71 Verification

## Current Outcome

Revision 71 passed the complete mutable-source gate set, independent review, exact copied
lifecycle, complete immutable verification, and a disposable exact-candidate rehearsal. Hosted run
`30203059470` then failed both Windows kernel jobs at the same module-dependent PowerShell hash
probe while Template Check passed. The protected R71 canonical gate was never invoked. Revision 71
is permanently retired and Revision 72 supersedes it.
`releaseReady: false`.

## Completed Evidence

- Exact R70 source, hosted, canonical, compilation, package, and verified handoff evidence is
  preserved.
- R70 is permanently retired and its one-shot canonical gate is permanently consumed.
- Snapshot aliases use a full SHA-256 canonical-tuple digest and retain original-path metadata.
- Logical reviewer snapshot paths are hard-capped at 180 characters.
- Alias collisions fail closed.
- Exact R70-derived ordinary Windows PowerShell regression: 225/225 sources pass existence, byte,
  and SHA-256 checks.
- Exact preserved R70 manifest and source-roster authentication: 225/225 rows match.
- Focused reviewer snapshot tests: 4/4 pass.
- Complete release-review suite: 53/53 pass.
- Complete release-gate suite: 30/30 pass.
- Complete core suite: 480/480 pass.
- Format, lint, typecheck, and build: pass.
- Template checker and complete checker regression matrix: pass.
- V11 and V12 dogfood: pass.
- Changed production identities match their final formatted bytes.
- Freeze-equivalent code and lifecycle-helper bytes use normalized LF.
- Independent read-only review Attempts 3 and 4: final outcome `pass` with no findings.
- Exact R71 commit `841b38a1430ec9b7845dcb11e1104ecbf7f1d75d`, tree
  `4f0d242099983e1dda06a103ab9d5ab07dc6e5a9`.
- Hosted Node 22 and Node 24 each passed 479/480 core tests and failed only
  `reviewer snapshot aliases remain byte-readable through ordinary Windows PowerShell paths`
  because `Get-FileHash` was unavailable in the child host.

## Supersession

Revision 72 retains the approved alias implementation and replaces only the regression's
module-autoload-dependent hashing operation with a .NET SHA-256 stream read.
