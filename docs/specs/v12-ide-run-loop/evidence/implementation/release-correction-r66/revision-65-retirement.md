# Revision 65 Retirement

## Exact Candidate

- Commit: `e1b2c38b3c794fc3d4d8a967a20305885baa8662`
- Tree: `1c9cec27c6f4ef3270c810bbe01a850251296cc3`
- Source: 4,094 files and 128,052,727 bytes
- Source digest:
  `sha256:b1d0e747901f8c53c8a529504e5f34fdcbcb842cea6231e65eaf23cc24b681ba`

## Outcomes

- Exact copied lifecycle: `pass`, 2/2 in 602,769.7766 ms.
- Exact complete verifier: `pass` in about 701.2 seconds.
- Non-consuming exact-candidate rehearsal: `fail` after 65,164 ms.
- Core at failure: 467 pass, 1 fail.
- Failure: `release gate scratch namespace preserves nested Windows install headroom`.
- Projected leaf: 283 characters with four `swc-v12-g` occurrences.
- One-shot canonical gate: not invoked.

## Disposition

Revision 65 is permanently retired. It passed the standalone topology but failed the required
exact-candidate rehearsal. No later replay can restore eligibility, and its canonical gate must
never be invoked.
