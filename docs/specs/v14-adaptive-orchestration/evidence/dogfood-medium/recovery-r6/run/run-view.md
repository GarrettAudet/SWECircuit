# Adaptive Run run.v14.impact-planner.medium.r6

Status: Ready to integrate; stage: integration_ready.
Next action: integrate_and_verify.
Assignment: sha256:621c263f03d87bbfb09aad1643a8f5ae3df427569f0b1123da5430ce5d50431e.

## Assignments
| Agent | Profile | Effort | Native status | Truth |
|---|---|---|---|---|
| agent.7f2dd382095753b9cd6f754faaa9fd41ec9f916a3aa841c4d6aa5fec1ff23f15 | profile.codex.gpt55 | effort.high | settled | specialist_verified |
| agent.fab1780533167118ec8ed511ca19837e69a7c0dc4f67876a2180941c670c3449 | profile.codex.sol | effort.high | settled | specialist_verified |

## Routing Detail
- agent.7f2dd382095753b9cd6f754faaa9fd41ec9f916a3aa841c4d6aa5fec1ff23f15: 1 feasible alternative(s), 3 rejected.
  - row.luna.medium: quality_tier, reasoning_tier, required_tool.
  - row.terra.high: quality_tier.
  - row.terra.medium: quality_tier, reasoning_tier, required_tool.
- agent.fab1780533167118ec8ed511ca19837e69a7c0dc4f67876a2180941c670c3449: 0 feasible alternative(s), 4 rejected.
  - row.gpt55.high: quality_tier, required_skill.
  - row.luna.medium: quality_tier, reasoning_tier, required_tool, required_skill.
  - row.terra.high: quality_tier, required_skill.
  - row.terra.medium: quality_tier, reasoning_tier, required_tool, required_skill.

## Routes And Evidence
- Route: pass (specialist_verified).
- Accepted artifact: impact-rebound-review.md (sha256:6ae51ed02e98a92699ea99b027b78b2cd95b88c74c169a483ff26363f071c76e).
- Accepted artifact: impact-rebound-verification.md (sha256:6bdd9bdab5dd0acb754e477468fd76c97b291c1a33a792b98e9843f930c61c36).

Source inspection: sha256:47c0b96966debbfe6c610d9f142790467984a90a04abb6aced7ae01160435e97. Host-reported status is not kernel proof.