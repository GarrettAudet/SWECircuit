# V12 Revision 73 Release Closeout

## Qualified Source

- Commit: `a645f985dbb7b05f5b3656cd138968c456887568`
- Tree: `f3f873a5236169bd8ea0b32557455c2554041ab0`
- Files: 4,698
- Bytes: 162,491,537
- Source digest: `sha256:25fa1d1e0a51be4414e52be5b5dc7e8bbcc3d6196f5c312b452febcb0ddcc7f8`
- Platform scope: Windows v0.1

## Mechanical Qualification

- Copied-production lifecycle: 2/2 pass.
- Complete `npm.cmd run verify`: pass, including 487/487 core and 2/2 lifecycle tests.
- Non-consuming exact-candidate rehearsal: pass.
- Hosted Windows run
  [30239349407](https://github.com/GarrettAudet/SWECircuit/actions/runs/30239349407):
  Template Check, Node 22, and Node 24 pass.
- One protected canonical invocation: pass.
- Canonical receipt:
  `sha256:0320921876a00df3d98c75afb55b8ef54cda5a79a234b4c44560c40801d40bde`
- Canonical stdout:
  307,260 bytes,
  `sha256:8af05db6de7214a2c97a58190de0d2ccbd02c9b9a885bd1696fce1208cb70fb2`
- Canonical stderr:
  25,923 bytes,
  `sha256:916ed20ef7b4f5bb27887bbfdf6eb2c7182eaf5313ead05a8acc4a98e7f7c791`

## Independent R2 Fan-In

- Compilation:
  `sha256:c53f05b73aafae0a39b08b4a2c09116ab59c9063c1d2dabb63486ea66aa83160`
- Package:
  `sha256:3dbd23419c4ae9e2dc0dac280f1d5727376c55afe81d0f2b437d0db1a50e5a2f`
- Product/API/IDE:
  `pass`, 8,522 bytes,
  `sha256:bdefd82ca2cf0cd55912b393f413fa7df79ff844941b46a7c1e351c3a42a2d6f`
- Lifecycle/correctness:
  `pass`, 8,078 bytes,
  `sha256:aa091b38eb6038bf9d7bae61d09bb4d845efded2a5eac8bb497386424302353c`
- Security/trace/authority:
  `pass`, 8,113 bytes,
  `sha256:15ef2c27b9456701c1f26ca45506485b50bb21dbf01523425199fd3b2b558590`
- Expected roster complete: true.
- Final verifier result: `releaseReady: true`.

The exact run is preserved under
`docs/specs/v12-ide-run-loop/evidence/release-review-r2/runs/a645f985dbb7b05f5b3656cd138968c456887568/`.

## Source Alias Reconstruction

The R2 run mapped extensionless alias
`inputs/s/090270ae3a06a7e23578f40d74d214cfaf71e036497a136d1b69fd2eef929f66`
to candidate path
`docs/specs/v12-ide-run-loop/evidence/release-review-r2/inputs/canonical-gate.stderr.log`,
Git object `d05fb59c6601024251f255296156b12c1ca577a1`, 11,763 bytes, and
`sha256:4381d1a9ce1c36beb8723eadfb3619288935b9d095de672c450121c23dc0dfad`.

The tracked closeout does not duplicate that whitespace-bearing `.log` under its extensionless
runtime alias. Its exact bytes remain in the frozen candidate and can be reconstructed from the
object ID; `inputs/candidate.json` preserves the complete alias binding. No evidence byte was
normalized.

## Decision

The owner approved the exact evidence-backed candidate for merge to `main`.

V12 core is deterministic and IDE-, model-, provider-, and API-neutral. External hosts continue to
own runtime selection, spawning, isolation, permission enforcement, tool execution, persistence,
integration effects, merge, and memory mutation.
