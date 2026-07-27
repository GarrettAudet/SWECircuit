# Revision 72 Retirement

## Candidate

- Commit: `5bc547eab6b22b862e798ad72df0d35aaa64771f`.
- Tree: `e7352a65cd57ad26b56d13562cf41448b7287388`.
- Source: 4,658 files, 160,485,628 bytes,
  `sha256:bd4a623b4114dd84182f640340d3e0a62c1babdd42cb4bd7f898bd00707b9827`.

## Gates Before Canonical

- Mutable qualification and three-attempt independent review: pass.
- Exact copied lifecycle: 2/2 pass.
- Complete immutable `npm.cmd run verify`: pass.
- Disposable exact-candidate rehearsal: pass with identical pre/post source digest.
- Hosted run `30207051835`: Template Check, Node 22 Windows, and Node 24 Windows all pass.
- Both hosted kernels report 482/482 core tests passing.

## Sole Canonical Attempt

The protected gate was invoked once. Its external shell result was:

- Duration: approximately 539.5 seconds.
- Exit status: decimal `1073807364`, hexadecimal `0x40010004`,
  `DBG_TERMINATE_PROCESS`.
- Wrapper output: none.
- Published receipt: absent.
- Raw stdout: 38,625 bytes,
  `sha256:14a24014ee8158675a9ab0a1d0c1cf16684030e2850f1f0240a7b9a98714c9e4`.
- Raw stderr: 19,096 bytes,
  `sha256:4d597e3a9f43acbe878966423f4251d762b2537d21f5f6cfcc9b0e93417de929`.
- Stdout reached 482/482 core pass and began copied lifecycle.
- Matching processes after observation: zero.
- Owned scratch root after observation: absent.

## Outcome

`block`.

The candidate did not produce a pass receipt. The one-shot invariant forbids retrying an exact
candidate after partial execution, including when the terminating actor is the external host.
R72 is permanently retired and may never be invoked again.

## Successor

R73 preserves the exact R72 evidence and changes only trace/status/test artifacts. Its external
Windows host will launch the long-running gate as one hidden background process, persist launch
identity, exit the launching shell, and poll without reinvocation.

An attempted exact-R72 clone replay mechanically completed but violated the commit-level one-shot
rule. It is preserved only as an invalid failed attempt and cannot prove or qualify transport,
R72, or R73. The dedicated candidate-neutral fixture is the sole transport proof. The real R72
slot remains unchanged and receipt-free.

`releaseReady: false`.
