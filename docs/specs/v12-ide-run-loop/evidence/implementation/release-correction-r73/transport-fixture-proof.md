# Candidate-Neutral Transport Fixture

## Purpose

Prove the Windows launch-and-poll transport without invoking any release candidate or canonical
gate.

## Identity

- Probe: `5ab49c21-83e2-48d7-98a1-f065d69e47b2`.
- Worker PID: `16232`.
- Worker start: `2026-07-27T04:08:53.9003888Z`.
- Request:
  `sha256:f30abc8d6a33f93a97cf27bb1ae6d3741c61c202ed8f7f8f44c195611f244aff`.
- Launch:
  `sha256:193448485a9fb000fb6feef2b2f298d5e8f0440c9a0b62ad70dbd3e5aa9c6266`.

The request binds exact fixture sources:

- Runner: 12,864 bytes,
  `sha256:fdc1309d94ed63be4f4c1fe9aed36cfd234136f094537baf9a6285c15b11699b`.
- Launcher: 3,000 bytes,
  `sha256:f3c8721247dbde561b25f2066c5502caffdccaf4ab7af80faa9fea763c522c17`.
- Worker: 3,655 bytes,
  `sha256:59b5bfcd1ce125c963039513bb8a27a40116a9a42c4022632f8d14631f66b8e8`.

## Observed Boundary

- Launcher started: `2026-07-27T04:08:53.467Z`.
- Launcher exited: `2026-07-27T04:08:53.974Z`, about 507 ms later.
- Receipt at launcher exit: absent.
- First post-exit receipt-free poll: `2026-07-27T04:08:54.035Z`.
- Post-exit heartbeat: `2026-07-27T04:08:54.027Z`.
- Preserved polls: 21, including 20 receipt-free polls and one final poll.
- Receipt completed: `2026-07-27T04:08:58.127Z`.
- Worker result: `pass`.
- Worker exit: zero.

The nonce, PID, process start time, request digest, and launch digest match across launch, launcher
exit, polls, heartbeat, receipt, and completion. No second launch occurred.

## Exact Evidence

- Launcher exit:
  `sha256:12bc8db9c6e6e2e33d9da7271311e66330f865a17eb6e9985f0868d1aae7f233`.
- Polls:
  `sha256:b60b75d0b5b4ce497ad05f3ce3928c8648c2d93d801480d0f1477212f9ead736`.
- Receipt:
  `sha256:4857f0bd5fb65d14e154126f94f29341cc87cb204908457335b06a650e45c613`.
- Completion:
  `sha256:9660c84fc2a1dd1fcc875fd739d1b1590e41a1d3d08791de4780fa54379e4e57`.
- Launcher stdout: 122 captured LF-stable bytes containing the exact process identity,
  `sha256:d602b7e1ee5fdee56f375837adc4b5bcc144f59cd90cfdeb9aa741fb13f2a14c`.
- Launcher stderr and worker stdout/stderr: zero captured bytes.

`inputs/transport-fixture-proof/` preserves all 11 files byte-for-byte.

## Failed Attempt

The first runner captured inherited pipe handles, so the supervising call remained open until the
worker completed. That attempt failed to prove detachment. The corrected runner captures launcher
output in dedicated files while the worker owns separate output files; this result and the live
regression prove the intended boundary without discarding streams.

## Outcome

`pass`.

This fixture qualifies only the transport. It does not qualify or consume a release candidate.
