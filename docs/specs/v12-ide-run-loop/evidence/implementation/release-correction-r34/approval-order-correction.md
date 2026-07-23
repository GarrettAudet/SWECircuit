# Revision 44 Approval-Order Correction

## Reproduction

After compiling Revision 44 Candidate A and Audit B, both approval files were updated before the independent audit executed. Candidate A approval became 195 bytes / `sha256:590606176235d6ae249c0ece8598c77654aa045307a5484ce9a8636cabf5488d`, while `launch-authorization.json` still bound Revision 43 at 985 bytes / `sha256:9635eba70581ddd334f03bb6b1c739e4f6bdc6fc2ac32ccde791bef340516ec1`.

The generated package-verification receipt remained a non-launching pass: 2,255 bytes / `sha256:72b341d8edeb06796d23bbd057041a8b18d94498efbe6aa3ffb4efe87568cc76`, with `candidateLaunchApproved: false`. No Candidate A contract was launched or consumed.

## Confirmed Cause

The host treated both digest-pair approval files as one preparation step. The two-phase protocol assigns them different gates: Audit B approval authorizes only the read-only audit package, while Candidate A approval must follow the exact semantic `pass` and cross-package launch authorization.

## Correction

Candidate A approval was revoked before semantic Audit B launch by restoring the exact archived Revision 43 approval bytes: 201 bytes / `sha256:761bc2a1fd4029862f2c718167d8778959a4eea7e2542da52ed4e349b0a308e4`. The Audit B approval remained bound to Revision 44 at 195 bytes / `sha256:07427ef7b1b16e44d4b99ac71bdbea3009e1547ebc33ddc5215b5e8a5a6be758`.

The replay then produced:

- Candidate A: `pending`.
- Audit B: `pass`.
- Package-verification receipt: exact unchanged `pass`, still non-launching.
- Launch authorization: `pending`.
- Dedicated V11 dogfood regressions: 31/31 `pass`.

The semantic reviewer later returned a 10,233-byte exact `pass` at raw `sha256:3a53b4ba416dba1fb9aac2296bd2817863e61f2f913f2fb7bdb39cd4a31388fb`. Cross-package authorization was then created at 985 bytes / `sha256:f1c82e979257bc55022b4b63a2432d262ae61d83faf089d0feac275698d9054b`. Candidate A approval was reissued only after those bindings existed, and strict `--check-evidence` replay passed.

The authorization writer refuses to mutate authorization unless Candidate A still has the exact unapproved bytes, Audit B approval and receipt match their exact Revision 44 bindings, and the semantic handoff is a closed `pass` bound to both package pairs.

## Route

`review -> fix -> verify -> pass`. The premature approval was not consumed and did not retire Revision 44. Future hosts must treat Audit B approval, semantic authorization, and Candidate A approval as three ordered events.
