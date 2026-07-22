# V11 Revision 42 Replay

## Source Refresh

- GoalContract revision: 42.
- Repository contexts: `pass`, 58 of 58 exact byte and SHA-256 matches.
- Refreshed sources: `.gitattributes` and `scripts/check-packed-consumer.mjs`.
- Revision 41 is preserved under `runs/attempt-41/`; its 8,296-byte archive manifest covers 28 files and has digest `sha256:457f70265da89831becfe501812b7fd7cf47894b8d355f5ef8f64087a3305d3b`.

## Compilation

- Candidate A: `sha256:7c8e142daf69975ad6a2304842fbd8e7fa66a745504a85e3896f15622b310867` / `sha256:5f5c4c6b41d1911a6c1d3f3e0cd132a82bac1b3c5dc03bc074208db65d09dfb9`.
- Exact search: 203 evaluated partitions, 52 eligible; claim `exhaustive_partition_search_fixed_scheduler`.
- Serial baseline: ineligible for `evidence_independence`, projected makespan 40.
- Selected partition: six bounded specialists, projected makespan 23, peak concurrency 4.
- Audit B: `sha256:d31d6c34c2c5ee4ecb07ce4d108f50010191f7e6089209775d332cfcf013bf42` / `sha256:d9ad9befb8af509cba8e7be6ccaa0d22073d30cea760640721fe2b20823f8770`.

## Host Routing

- Mechanical binding specialist: `gpt-5.6-terra`, high effort.
- Independent semantic reviewer: `gpt-5.6-sol`, ultra effort.
- These are host runtime choices, not compiler or package identities; the generated contracts remain IDE-, model-, and provider-neutral.

## Trust Chain

- External receipt: 2,255 bytes, `sha256:052a88c5e461731b9b5e5b96719c8c15c5c36727831f1f0e542e560303bfd3d2`, outcome `pass`.
- Binder: 4,742 exact raw bytes ending at `}`, raw digest `sha256:8d042f2dc8e732e2cdb9209ccc1ee45bc8d52a53d0d94f5c888766460a890a84`, semantic digest `sha256:866540f1cc9203cf3b99a8f1a4a8f3debb22edb66433c7e3f0788c5aba958671`.
- Binder fan-in assessment: `integrationReady: true`, content digest `sha256:f836b17a8ec24510b65914bfee80c290eee1e9cc94356483268280bf31c32b3e`.
- Semantic Audit B handoff: 7,938 exact raw bytes ending at `}`, digest `sha256:689c32918c3d9d2a0f28ddeb21157dea66e5617b44647e0fdc37e581c0f225c6`, outcome `pass`.
- Cross-package launch authorization: 984 bytes, `sha256:5688da52749875200508c890a894f62c3184f5b1efc6012d7a7182287ab88543`.
- Canonical `node scripts/run-v11-dogfood.mjs --check-evidence`: `pass`.

## Route

Outcome: `pass` to aggregate verification and fresh immutable package-bound review. This replay does not authorize Candidate 13 or claim external host effects were performed by the kernel.
