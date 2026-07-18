# V11 Release Verification: Attempt 14

## Outcome

`FIX` for the candidate as a whole. The executable lane was stopped after the independent algorithm/lifecycle review made revision 14 ineligible.

## Candidate Binding

- Goal revision: 14.
- Compilation: `sha256:7b75efba6021c181740bb85362e0e497ef7c8644d87e5beab6bf74a7ccd9e6d3`.
- Package: `sha256:ed306ba563ed9c0fae177ed1999c613ddee78ee0fe671cba0f61b3ca9836ad7e`.
- Context: 19/19 matched before the partial release run.

## Completed Verification

- Build: `PASS`.
- Strict schema: 7/7.
- Compiler and golden suite: 35/35.
- Dogfood host: 18/18.
- Canonical kernel: format 72 files, lint 60 files, typecheck/build, and 335/335 tests, `PASS`.
- Package dry run: 105 files.
- Installed consumer compile, execution, structured receipt, and approval-bound verification: `PASS`.
- Template checker: `PASS`.

## Incomplete Verification

The complete checker regression matrix did not finish. Its first launch timed out; the rerun was stopped after the algorithm review returned `FIX`. None of the completed checks constitute release acceptance for revision 14, and a corrected candidate must run the full gate again.

Agent thread: `019f6b17-0c81-7373-a744-55d7476b1e18`.
