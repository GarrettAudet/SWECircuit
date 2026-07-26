# Revision 71 Retirement

## Candidate

- Commit: `841b38a1430ec9b7845dcb11e1104ecbf7f1d75d`
- Tree: `4f0d242099983e1dda06a103ab9d5ab07dc6e5a9`
- Hosted run: `30203059470`

## Passed Before Hosted Qualification

- Complete mutable qualification and independent review.
- Exact copied lifecycle: 2/2 pass.
- Complete immutable `npm run verify`: pass.
- Disposable exact-candidate release-gate rehearsal: pass.
- Rehearsed source: 4,648 files, 159,345,137 bytes,
  `sha256:86f040f0de0c62dca10202dbf5ba089b3e11b3ce6925c58b08f018192d24895f`.

## Hosted Stop

The hosted matrix exposed one shared harness failure:

- Node 22 job `89796267518`: 479/480 core tests pass.
- Node 24 job `89796267520`: 479/480 core tests pass.
- Both fail only the ordinary-Windows-PowerShell snapshot alias regression because
  `Get-FileHash` is unavailable in the spawned host.

Template Check passed. Exact hosted evidence is preserved at `inputs/r71-hosted/`:

- `run.json`: 14,210 bytes,
  `sha256:802cd4044c900b110aa469f22e3ebde5976010cf35cbc5ffc23214cbc205135c`.
- `jobs.json`: 10,010 bytes,
  `sha256:9604ff154bee3c5be5e1066afe290964d7e4cf3d400680d5701e3bd1f4928f76`.
- `node22.log.base64.json`: 629,560 stored bytes,
  `sha256:96153615cfbd4258d6a918ad60df51ca2065548a4e82f07a6ed7a7ef29564eba`;
  471,910 raw bytes,
  `sha256:077c61f8364f94502e87c2fe9d0d2a11a4388c60d0758a33e710d4e9e2475e83`.
- `node24.log.base64.json`: 458,220 stored bytes,
  `sha256:7f9e19070f4a06cd9354b55a1b77d3462aca9d98e90528575691e57c58ba7fb5`;
  343,406 raw bytes,
  `sha256:e4f788eac8ac0404311ba2b98bbb0efacfc5d48e354bdd307835494b1d9851ef`.

This is a valid pre-canonical stop. The protected R71 canonical gate was never invoked, and no
fresh R71 R2 package was compiled or launched.

## Outcome

`fix`. Revision 71 is permanently retired. Revision 72 preserves the accepted alias behavior and
replaces only the regression's undeclared PowerShell module dependency.
