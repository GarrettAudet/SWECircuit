# V11 Release Verification: Attempt 10

## Outcome

`PASS`

## Candidate Binding

- Goal revision: 10.
- Compilation: `sha256:b5afa1bc523606956225516689dcda762758852aa1bcbd9463dd4b5ad9b923b4`.
- Package: `sha256:0c367895e0194b2fb543494c6df3c1172987eb457a4f1d19ab27d7fb5c600480`.
- Release contexts: 19/19 before and after commands.
- Goal sources: 39/39 reconstructed.
- Rendered package: 9/9 files, 316,272 bytes before and after commands.
- Contract, manifest, approval, and revision bindings: 8/8.

## Verification

- Focused schema: 7/7 in 581.1 ms.
- Specialist compiler and golden cases: 35/35 in 1,762.6 ms.
- Dogfood host: 17/17 in 244.4 ms.
- Focused total: 59/59.
- Canonical `npm.cmd run verify`: `PASS` in 29.1 seconds.
- Full test suite: 334/334 in 8.95 seconds.
- Format: 72 files; lint: 60 files.
- V10 and V11 dogfood: `PASS`.
- Offline installed consumer: `PASS`.
- Template checker: `PASS` in 4.8 seconds.
- Template regression matrix: 95/95 in 691.2 seconds.
- Final V11 evidence replay: `PASS` in 7.2 seconds.

## Package Inspection

The dry-run package contained 105 files, measured 122.9 kB packed and 685.6 kB unpacked, and reported SHA-1 `0dbe1652a658210a444d43be2bff5288f538fc29`.

## Findings And Risks

No release finding remained within this specialist boundary. External runtime supply, workspace isolation, and permission enforcement remain host responsibilities. Host-owned `_cacache` was preserved and only command-authorized temporary outputs were touched.

## Follow-Up

Fan in the independent handoffs, update the release record, and replay both trusted digests after integration.

Agent thread: `019f6abb-be9a-7fc0-9270-8547d54b5a0f`.
