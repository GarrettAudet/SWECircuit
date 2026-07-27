# Adaptive Run run.v14.impact-planner.medium

Status: Needs attention; stage: needs_attention.
Next action: create_successor_run.
Assignment: sha256:1f4d3afb49ea280f35dad7a905e3a29848d1d0568405761d878fe1905dbd5d9b.

## Assignments
| Agent | Profile | Effort | Native status | Truth |
|---|---|---|---|---|
| agent.0708f119bcd868c6288d7ac612fd7b0ba9c23133ea7ef53380e7cabca55e097a | profile.codex.sol | effort.high | unresolved | unresolved |
| agent.07613e646cfa8543c304a420d97456c1bcd0b0ca1c7387fe9bce0949b6961f00 | profile.codex.terra | effort.medium | settled | specialist_verified |
| agent.38e222c902c45d5719849945570fcf6ca6f293434f31bcb0722fba0fb6c3d975 | profile.codex.luna | effort.medium | settled | specialist_verified |
| agent.5d4356c22352c49f7fbf62ef14e9b6cd3e7e278821337bc9bbc0a963c38f30bf | profile.codex.gpt55 | effort.high | unresolved | unresolved |
| agent.9150f32977cbe68915155d99b73818003d6d1d1540bb7f6d8b5e409011d882b5 | profile.codex.terra | effort.high | settled | specialist_verified |

## Routing Detail
- agent.0708f119bcd868c6288d7ac612fd7b0ba9c23133ea7ef53380e7cabca55e097a: 0 feasible alternative(s), 4 rejected.
  - row.gpt55.high: quality_tier, required_skill.
  - row.luna.medium: quality_tier, reasoning_tier, required_tool, required_skill.
  - row.terra.high: quality_tier, required_skill.
  - row.terra.medium: quality_tier, reasoning_tier, required_tool, required_skill.
- agent.07613e646cfa8543c304a420d97456c1bcd0b0ca1c7387fe9bce0949b6961f00: 3 feasible alternative(s), 1 rejected.
  - row.luna.medium: quality_tier.
- agent.38e222c902c45d5719849945570fcf6ca6f293434f31bcb0722fba0fb6c3d975: 4 feasible alternative(s), 0 rejected.
- agent.5d4356c22352c49f7fbf62ef14e9b6cd3e7e278821337bc9bbc0a963c38f30bf: 1 feasible alternative(s), 3 rejected.
  - row.luna.medium: quality_tier, reasoning_tier, required_tool.
  - row.terra.high: quality_tier.
  - row.terra.medium: quality_tier, reasoning_tier, required_tool.
- agent.9150f32977cbe68915155d99b73818003d6d1d1540bb7f6d8b5e409011d882b5: 2 feasible alternative(s), 2 rejected.
  - row.luna.medium: quality_tier, reasoning_tier.
  - row.terra.medium: reasoning_tier.

## Routes And Evidence
- Route: fix (specialist_verified).
- Accepted artifact: impact-codec-handoff.md (sha256:a0e1e70d19b2552bea91106300f6954c129ec49fe971b1d710fbb4c20b67989b).
- Accepted artifact: impact-interface-handoff.md (sha256:fda2efb31fdbdf3ab0ca0b2ecc0fbc44bad734c1670602f7b4a184bb12149494).
- Accepted artifact: impact-graph-handoff.md (sha256:c4ac0c3454bfac03ff394d8c0927ef720d1e4054f2cc1de0b25b97632a40e243).

Source inspection: sha256:7fceda9ca7955f56981667c6be227a3fbb4d56e0bc5ddbcc2b875cb9bef96521. Host-reported status is not kernel proof.