# Revision 66 Hosted Run Manifest

Primary evidence in this directory:

- `run.json`: 12,873 bytes,
  `sha256:bd4476ed830faa515b04a29c3ee16a9be97dbf4b50a7936ccf980a227a7aba93`.
- `jobs.json`: 16,514 bytes,
  `sha256:ba549f18648ac4b2e02d1bdbdcc20bb5c681c62485772b630b16a10ab7f63da1`.
- `ubuntu-node22.log`: 222,082 bytes,
  `sha256:e1c7d6f74a9111f27184f8ad11530c8e386039bf88bb0ac2f30ca2933f5c9633`.
- `ubuntu-node24.log`: 102,760 bytes,
  `sha256:38b83750d3f7e9a2f598a2bc9ebe42b744b2678b7566dfe076d067f13b551b5b`.

The exact run targets commit `33dbd5c9829446b51b04d589fc963f8b7095d442`. Five of seven
jobs pass. Both Ubuntu jobs fail `Verify kernel` on the same synthetic long-path fixture assertion.
The R66 one-shot canonical gate was not invoked.
