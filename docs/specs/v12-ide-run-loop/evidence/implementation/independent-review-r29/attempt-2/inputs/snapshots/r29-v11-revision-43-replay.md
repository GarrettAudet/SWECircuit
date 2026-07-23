# V11 Revision 43 Replay

## Source Refresh

- GoalContract revision: 43.
- Repository contexts: `pass`, 58 of 58 exact byte and SHA-256 matches.
- Refreshed source: `.gitattributes` only, from 625 bytes / `sha256:f125118db8c3313b2591ca18f56d7595ba5c9c915af15324f730c2b179a881e8` to 749 bytes / `sha256:8d0ac86b6407f4e8fd439c964560ad76b62c8506b2d218894a938e5b9c02da3a`.
- Revision 42 is preserved under `runs/attempt-42/`; its manifest covers 27 exact source-evidence files and has content digest `sha256:a72b10b1d85e9bd257d05df4c24bad0f0d6f783e721faef8f6766e68a17461f7`.

## Compilation

- Candidate A: `sha256:ed88b5f8f1991ea49e4fc0928fbbb35673399125293062c9f143a1113625c819` / `sha256:59c890b194f22e5297d68639b1c7ec59b9f1fcf1961271b52e80acf94610a480`.
- Exact search: 203 evaluated partitions, 52 eligible; claim `exhaustive_partition_search_fixed_scheduler`.
- Serial baseline: ineligible for `evidence_independence`, projected makespan 40.
- Selected partition: six bounded specialists, projected makespan 23.
- Audit B: `sha256:ee381b407c6cce2a48171617079ef80cca7e99f1e8c5745a7d6fa80731eda998` / `sha256:3926e14b49194f64ad8e764ba41e4afa2434258cf2fcab9b06c55560ad7b4492`.

## Host Routing

- Mechanical binding specialist: `gpt-5.6-terra`, high effort.
- Independent semantic reviewer: `gpt-5.6-sol`, ultra effort.
- These are host runtime choices, not compiler or package identities; the generated contracts remain IDE-, model-, and provider-neutral.

## Trust Chain

- The first semantic Audit B attempt is preserved at 6,540 exact raw bytes / `sha256:9e1f8f92ec2c7c34da01d90cd860177ea2d6bd14de279a7ab0711376862bcef0`, outcome `fix`, after the reviewer reported four undeclared reads.
- A later semantic `pass` was also preserved, but approval-line normalization changed its bound receipt. Canonical replay rejected the stale receipt before launch, so that chain is historical and not used for authorization.
- Commit-bound external receipt: 2,255 bytes, `sha256:8b5f2dcf8fbd8d4c9435ba2c56439ea4d547b606964c56fa1a14e265566944c4`, outcome `pass`, `candidateLaunchApproved: false`.
- Commit-bound binder: 6,600 exact raw bytes ending at `}`, raw digest `sha256:4f55e937cef60e38819a3764258b48b3998391d481d8efac6432842d191bce89`, semantic digest `sha256:d69f7a7420ed7252380c7388b9d4dd0861e333456bb5b0ccd998f75a60211708`.
- Binder fan-in assessment: `integrationReady: true`, content digest `sha256:02aae32283be7b58109f76f42215b1c3cda883b74c77150c52a6f46ff3a1ab2d`.
- Fresh semantic Audit B handoff: 8,713 exact raw bytes ending at `}`, digest `sha256:c311266621d73fae30ea83399434117402bbb35b6641d601e7ab85349843a2c0`, outcome `pass`. It authenticated all 60 contexts and both runtime inputs, reproduced all 203 partitions and 52 eligible candidates, matched both Candidate A identities, and reported no undeclared reads or forbidden effects.
- Cross-package launch authorization: 985 bytes, `sha256:9635eba70581ddd334f03bb6b1c739e4f6bdc6fc2ac32ccde791bef340516ec1`.
- Canonical `node scripts/run-v11-dogfood.mjs --check-evidence`: `pass` against the exact commit-bound bytes.

## Route

Outcome: `pass` to aggregate verification and fresh immutable package-bound review. This replay does not authorize Candidate 13 or claim external host effects were performed by the kernel.
