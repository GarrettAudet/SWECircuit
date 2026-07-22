# Revision 29 Aggregate Verification

## Bound Input

- Checkpoint: `f1d4fd0eaca89803d9779a07e790ff6b9dd266ab`.
- Tree: `26f5feac994d6edc3ee057840cbea9ba754e90b4`.
- Command: `npm.cmd run verify`.
- The source worktree was clean before and after execution.

## Result

- Outcome: `pass`, exit code 0.
- Elapsed time: 2,635.4 seconds, or 43 minutes 55.4 seconds.
- External log: `C:\tmp\r29-full-verify-20260722.log`.
- Log binding: 329,179 bytes, `sha256:f11468cc0a9a172dd340155b66f7b33831e5f5648121cf327171576f00263ff9`.

## Gate Evidence

- Format, lint, authenticated TypeScript 7.0.2 typecheck, and build: `pass`.
- Core suite: `pass`, 439 of 439; runner duration 361,556.2337 ms.
- Exact copied-production lifecycle: `pass`, 1 of 1; test duration 2,238,466.8237 ms and runner duration 2,238,567.2231 ms, or 37 minutes 18.6 seconds.
- Specialist example: `pass`; package verification passed and runtime was not invoked.
- V10, V11 Revision 43, and V12 dogfood: `pass`.
- Package dry run: `pass`, 148 files, 160.6 kB packed and 938.7 kB unpacked.
- Offline installed-consumer compatibility gate: `pass`, including public TypeScript host compilation, rendering, handoff, run restore, fan-in, and approval-bound verification.

## Route

Outcome: `pass` to fresh immutable package-bound independent review. Candidate 13 remains unconsumed; this repeatable aggregate gate is not its one-shot canonical release gate.
