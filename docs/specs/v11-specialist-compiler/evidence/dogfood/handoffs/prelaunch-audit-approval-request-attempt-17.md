# V11 Prelaunch Audit B Approval Request: Attempt 17

## Requested Approval

Approve only this exact read-only Audit B package:

- Compilation: `sha256:a832ba62027737d4ea804d64e47fbd3cd53b78c4756524586d147dca0a0722ff`.
- Package: `sha256:b5aa9a0db063fd06d1302842e7994d0ed6695182815520d7adbb3d0d612331eb`.

This does not approve Candidate A for launch.

## Candidate Being Audited

- Goal revision: 17.
- Candidate compilation: `sha256:3677db46ecd2a387239887ecff6d131f1d0616a2dba972ffbe63bdc0ee6b9984`.
- Candidate package: `sha256:1cc61cead6a953633c8369e29270c92318e9c58381e2389a971bad5e1ecc72b0`.
- Change from revision 16: reject C1 controls through U+009F and add focused compiler, diagnostic, and rendering regressions.
- Kernel evidence before compilation: format, lint, typecheck, focused 36/36, and complete 340/340 tests passed.

## Audit Shape

Exact search evaluated both partitions. The serial baseline is ineligible because one agent cannot independently bind and review the candidate. The selected two-agent audit runs sequentially:

1. Binder `agent.9f9fd5395838da0f13e564652146ade213b2e333d8156e78186497962e5b9da6`
   - Contract: 13,433 raw bytes.
   - Contract SHA-256: `sha256:3330fd208de7e331f9c190712a8b663c2aaf2ced860ac1fb6a0aac5797b3ae83`.
2. Independent semantic reviewer `agent.cec0a4a4c0a86828188bb999c7fe0375dde4a93469ea4ebd765463c6e48bae64`
   - Contract: 34,314 raw bytes.
   - Contract SHA-256: `sha256:cad3477ec0f92d9b14cfd999f323d6a80e9ad27543b72ab5638253055d9c04ed`.

Both contracts are read-only. Audit B authenticates all ten Candidate A artifacts plus the security-sensitive compiler context. It does not execute Candidate A, merge, update memory, access a provider, or recursively review itself.

## After Approval

The host will bind `prelaunch-audit/approval.json` to the exact pair, verify the package, run the binder, preserve its raw handoff, run the independent semantic reviewer, and require `PASS`. Only then will a cross-package launch authorization and separate Candidate A approval request be created.
