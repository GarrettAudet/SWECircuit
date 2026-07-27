# Adaptive Run run.v14.impact-planner.medium.r2

Status: Needs attention; stage: needs_attention.
Next action: create_successor_run.
Assignment: sha256:0dd10500e4b4101d25287e6692b7677cc1a28bde261e4b2c84b85d635fd3ce28.

## Assignments
| Agent | Profile | Effort | Native status | Truth |
|---|---|---|---|---|
| agent.0708f119bcd868c6288d7ac612fd7b0ba9c23133ea7ef53380e7cabca55e097a | profile.codex.sol | effort.high | settled | specialist_verified |
| agent.5d4356c22352c49f7fbf62ef14e9b6cd3e7e278821337bc9bbc0a963c38f30bf | profile.codex.gpt55 | effort.high | settled | specialist_verified |
| agent.5dac52676545c6525a7a600380bfd9d5af9c09ccfa6f57b381897212bbb96f0e | profile.codex.terra | effort.high | settled | specialist_verified |

## Routing Detail
- agent.0708f119bcd868c6288d7ac612fd7b0ba9c23133ea7ef53380e7cabca55e097a: 0 feasible alternative(s), 4 rejected.
  - row.gpt55.high: quality_tier, required_skill.
  - row.luna.medium: quality_tier, reasoning_tier, required_tool, required_skill.
  - row.terra.high: quality_tier, required_skill.
  - row.terra.medium: quality_tier, reasoning_tier, required_tool, required_skill.
- agent.5d4356c22352c49f7fbf62ef14e9b6cd3e7e278821337bc9bbc0a963c38f30bf: 1 feasible alternative(s), 3 rejected.
  - row.luna.medium: quality_tier, reasoning_tier, required_tool.
  - row.terra.high: quality_tier.
  - row.terra.medium: quality_tier, reasoning_tier, required_tool.
- agent.5dac52676545c6525a7a600380bfd9d5af9c09ccfa6f57b381897212bbb96f0e: 2 feasible alternative(s), 2 rejected.
  - row.luna.medium: quality_tier, reasoning_tier.
  - row.terra.medium: reasoning_tier.

## Routes And Evidence
- Route: fix (specialist_verified).
- Accepted artifact: impact-successor-integration-handoff.md (sha256:f3542223f0d54d755494ca3b643667aa2f282e39f4b090a14b3b2afae46f7af2).
- Accepted artifact: impact-successor-review.md (sha256:9d01516ef6bb9eb51f0ded74e2f4e0f306217b15fee398810b099072d073ebf2).
- Accepted artifact: impact-graph-recovery-handoff.md (sha256:2ea74ffcc50865c4fa8654f237e428200a776d183ebea99fc28deadc873e63ca).

Source inspection: sha256:0362214f572a2fb6e5f40ef39f2ab8fd3c662a80eaf373577871d4456d5276fc. Host-reported status is not kernel proof.