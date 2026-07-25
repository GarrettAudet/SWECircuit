# Revision 66 Retirement

## Exact Candidate

- Commit: `33dbd5c9829446b51b04d589fc963f8b7095d442`
- Tree: `e0e208988d04bcf4a7f53d9ec525574e8b47ff2f`
- Source: 4,101 files and 128,150,487 bytes
- Source digest:
  `sha256:6167c842ce09625f9d2ddaad45ffb6801726477c5a0118779949fc96725d8e8c`

## Local Outcomes

- Exact copied lifecycle: `pass`, 2/2 in 594,548.9419 ms.
- Exact complete verifier: `pass` in about 683.1 seconds.
- Non-consuming exact-candidate rehearsal: `pass`, status 0 and null signal in 715,458 ms.
- Rehearsal stdout: 305,667 bytes,
  `sha256:f990df59db4358ef5651eed850a795a9cd765791ddc149ae53da8b82528eedc0`.
- Rehearsal stderr: 25,923 bytes,
  `sha256:916ed20ef7b4f5bb27887bbfdf6eb2c7182eaf5313ead05a8acc4a98e7f7c791`.
- Independent exact-evidence follow-up: no findings.

## Hosted Outcome

GitHub Actions run `30166591953` completed `failure`.

- Template Check: `success`.
- Windows Node 22 and 24: `success`.
- macOS Node 22 and 24: `success`.
- Ubuntu Node 22 and 24: `failure`.
- Both Ubuntu jobs failed the same test:
  `candidate Git context is disposable, exact, and usable from the materialization`.
- Exact assertion:
  `causal tracked entry did not cross the Windows long-path boundary`.
- Node 22 reached 468/469 before stopping.
- One-shot canonical gate: not invoked; evidence slot absent.

## Disposition

Revision 66 is permanently retired. Its runtime correction passed the exact nested topology and
both hosted Windows versions, but the required seven-job matrix exposed a cross-platform fixture
assumption. No later replay can restore eligibility, and its canonical gate must never be invoked.
