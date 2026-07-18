# V11 Release Verification: Attempt 13

## Outcome

`PASS` for the complete executable release lane. Revision 13 remains ineligible overall because the independent security/trace lane returned `FIX`.

## Candidate Binding

- Goal revision: 13.
- Compilation: `sha256:e285fa743d83da8c340749e96daba48baaf5499ca08fea349d262e890314071b`.
- Package: `sha256:4641f6d3e61f40d96a11106cb40d55268a9535688b1e5aa677b41fa0381d3e65`.
- Context: 19/19 matched before and after verification.

## Verification

- Strict schema: 7/7.
- Compiler and golden suite: 35/35.
- Dogfood host: 18/18.
- Canonical kernel: format 72 files, lint 60 files, typecheck/build, 335/335 tests, V10/V11 dogfood, package and consumer gates, all `PASS`.
- Package dry run: 105 files, 122.9 kB packed, 685.6 kB unpacked.
- Installed consumer: offline TypeScript compile and execution plus approval-bound verification, `PASS`.
- Template checker: `PASS`.
- Complete checker regression matrix: `PASS` in 740.8 seconds.
- Post-run scratch check: zero owned `dist/sc-ct-*` directories.

One checker launch reached a 120.4-second host timeout after 19 expected outcomes; its scratch tree was verified and removed before the complete successful rerun.

Agent thread: `019f6af8-950d-7f91-8456-1bd3349e663d`.

