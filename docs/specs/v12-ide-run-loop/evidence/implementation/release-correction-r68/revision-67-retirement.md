# Revision 67 Retirement

## Exact Candidate

- Commit: `7e2bf60b652be65dfc8b5c9bcf21fcf91701852d`
- Tree: `df8360c9476f80381e33088c6e372d5a6cdc5dee`
- Subject: `test(v12): make long-path fixture portable`

## Local And Hosted Outcomes

- Exact copied lifecycle: `pass`, 2/2.
- Complete verification: `pass`.
- Non-consuming exact-candidate rehearsal: `pass`.
- Hosted run `30170911153`: `pass`, all seven jobs.
- One-shot canonical gate: consumed exactly once and `pass`.
- Canonical receipt: 14,108 bytes,
  `sha256:c3b9ce5e0fd84df8e5c7695f987d82542307b32896515f68f63dcfb5a55c6f04`.
- Canonical stdout: 305,753 bytes,
  `sha256:e41452739c59096b344d6aa6613f1baf0a52ed352e082d05f475e8994b7ea10a`.
- Canonical stderr: 25,923 bytes,
  `sha256:916ed20ef7b4f5bb27887bbfdf6eb2c7182eaf5313ead05a8acc4a98e7f7c791`.

## Fresh R2 Outcome

- Product/API/IDE: `pass`.
- Lifecycle/correctness: `pass`.
- Security/trace/authority: `fix`.
- Compilation digest:
  `sha256:b95b58cac6c313cc268fb706014a14b33aefc81f5aad4315123cc62c8ecda07`.
- Package digest:
  `sha256:44ad34ef9cd4c733eece02f71c7653d823e5282ac8884b188c28249c86e77e04`.
- Verified parent fan-in: complete roster, `releaseReady: false`.
- Parent verification receipt: 314,136 bytes,
  `sha256:f209b557ba4eb606533a4f580cad26122f3055e85f0ed98989b5f3d0aeedaaa8`.

The security reviewer found that candidate workers did not bind the complete effective process
environment and that the authority-bearing parent source was absent from immutable reviewer
context. Both findings are preserved in the exact raw handoff.

## Disposition

Revision 67 is permanently retired despite every preceding gate passing. A canonical pass does
not override a verified fresh-review `fix`, and the consumed one-shot gate is never rerun.
