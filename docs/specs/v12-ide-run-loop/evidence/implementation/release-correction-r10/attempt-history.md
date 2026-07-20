# R10 Host Attempt History

## Contract

- Compilation: `sha256:383a9ee2d20773c8608f7da195f9e7ea5212838dc7d82f0865bc1cefd38e2400`.
- Package: `sha256:985a85fe77b507088cde4df3d0352c21b142fe09541cf4d5295a5869b28cf075`.
- Agent: `agent.01bebea4cedebc757d3d9891799351cb34d830ae83529ab5cbe417de68d8604f`.
- Exact contract: 19,694 bytes at `sha256:12eb8e0f2caa8ef7af0d55e5fea4a1161a01b4210b1ecc7913b383da1e228d81`.

## Attempts

| Attempt | Host observation | Accepted evidence |
| --- | --- | --- |
| 1 | The inherited runtime authenticated the correct worktree and began the harness edit, but exceeded the bounded checkpoint twice without completing the write scope or returning a handoff. It was stopped with status `running`. | None. Its partial output remained untrusted and was completed only after a later specialist authenticated the original checkpoint. |
| 2 | A fresh runtime received the exact contract without an explicit worktree translation and resolved repository locators against an older checkout. It returned a 2,592-byte `block` handoff at raw SHA-256 `d1f59ac8a04bf5a629bdff36b0268a02cc9e1a4c03222e40db39a9ea793bde8d`. | None. Package verification rejected `SC4310` at `/evidence/0/status` because the handoff used the noncanonical value `fail`. The exact rejected bytes remain preserved. |
| 3 | Attempt 1 was resumed with the exact worktree identity and a bounded completion instruction, but again exceeded the checkpoint without returning a handoff. It was stopped with status `running`. | None. |
| 4 | The host retained the same approved specialist contract, supplied the exact worktree and checkpoint, and manually selected `gpt-5.6-sol` with `high` reasoning after the repeated liveness failures and the 77 KB lifecycle-harness scope. | Accepted `pass`: 5,595 raw bytes at `sha256:3e58dddde82171b5090debc1ea76a29298fe7a7e0f9a27dd39fd1f826350e543`; semantic digest `sha256:97c8a4773ca81c0985dc812ecf05036cc6359eece9b743d1e28647de97ebe394`; content digest `sha256:a59d513dff42a8c33cacd66c24e6500df064c99cc1692a0f693d1a4db637f089`. |

## Learning

The specialist contract remained stable while host delivery and runtime supply changed. V12 does not automate that choice. The run supports the post-V12 design direction recorded in `docs/research/snapshots/2026-07-20-codex-subagent-profile-routing-scan.md`: bind an exact worktree and context delivery receipt, derive portable runtime demand, match it against the IDE's current capability inventory, and preserve the selected model and effort with the launch trace.
