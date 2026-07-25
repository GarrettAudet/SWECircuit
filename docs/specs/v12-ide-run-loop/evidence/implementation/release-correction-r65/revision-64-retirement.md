# Revision 64 Retirement

## Exact Candidate

- Commit: `7d30a276d547cd501d93e6a698c84fff111bd8a4`
- Tree: `741eb3b94bb313b63c61ea2bbcbc6da5c8a3242c`
- Source: 4,085 files and 127,955,958 bytes
- Source digest:
  `sha256:f2a59600711575c77985799cc2a987b88d72537dcb314b53bdbe8f14b5e1a5d4`

## Outcomes

- Exact copied lifecycle: `pass` in 526.6 seconds.
- Exact complete verifier: `pass` in 630.6 seconds.
- Hosted run `30159538275`: all seven jobs `pass`.
- Non-consuming exact-candidate rehearsal: `fail` after about 1,914.2 seconds.
- Bounded diagnostic replay: `fail` after 1,898,645 ms with the exact assertion
  `copied production canonical gate timed out`.
- One-shot canonical gate: not invoked.

## Disposition

Revision 64 is permanently retired. No later replay can restore its eligibility, and its
canonical gate must never be invoked. Revision 65 is the only active successor.
