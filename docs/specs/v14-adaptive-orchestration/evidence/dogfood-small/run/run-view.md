# Adaptive Run run.v14.release-board.small

Goal: v14.dogfood.release-board r1; owner: codex.main.
Run revision: 1; workspace version: sha256:5ec2530421b39d079397c2d50f7bffd85ef92c449aec669739b947d9ea815a55.
Host: codex-desktop.windows via codex-desktop@v14-alpha.
Status: Ready to integrate; stage: integration_ready; next: integrate_and_verify.
Predecessor: none.

## Execution Mode
Selected team.c773f72cc9ded5b29f24db957e26f65e4f24ed5c56ec9c24e1ee89f7d5c6c13a with 2 agent(s).
Projected makespan: 7 vs serial 12; peak concurrency: 2.
Selection: lower_metric via projectedMakespan.

## Assignments
| Agent | Modules | Work units | Dependencies | Runtime | Status | Truth |
|---|---|---|---|---|---|---|
| agent.712f06d08aac6fc693f821f2da168519dc1cd9a9634ebfa71a0982a90fef7228 | implement.release-board-interface | implement.release-board-interface | none | profile.codex.luna/effort.medium | settled | specialist_verified |
| agent.d63c2e4b6b5fdb8e38be291aa333911568baf0153af172581562c967a0bd2063 | implement.release-board-domain | implement.release-board-domain | none | profile.codex.terra/effort.high | settled | specialist_verified |

## Agent Contracts
### agent.712f06d08aac6fc693f821f2da168519dc1cd9a9634ebfa71a0982a90fef7228
- Read scope: AGENTS.md, docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/app-contract.md, docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/goal.md, examples/triage-board/index.html, examples/triage-board/styles.css.
- Write scope: examples/release-board/index.html, examples/release-board/styles.css.
- Context: context.agent-contract (path:AGENTS.md), context.app-contract (path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/app-contract.md), context.goal (path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/goal.md), context.interface-pattern (path:examples/triage-board/index.html), context.style-pattern (path:examples/triage-board/styles.css).
- Delivered context: context.agent-contract:authorized_filesystem_read, context.app-contract:authorized_filesystem_read, context.goal:authorized_filesystem_read, context.interface-pattern:authorized_filesystem_read, context.style-pattern:authorized_filesystem_read.
- Evidence duties: evidence.interface.artifact:produce.
- Decision: lowest_exact_vector; 3 feasible alternative(s), 0 rejected; override none.
### agent.d63c2e4b6b5fdb8e38be291aa333911568baf0153af172581562c967a0bd2063
- Read scope: AGENTS.md, docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/app-contract.md, docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/goal.md, examples/triage-board/src/model.js, examples/triage-board/src/storage.js, examples/triage-board/test/model.test.mjs, examples/triage-board/test/storage.test.mjs.
- Write scope: examples/release-board/src/model.js, examples/release-board/src/storage.js, examples/release-board/test/model.test.mjs, examples/release-board/test/storage.test.mjs.
- Context: context.agent-contract (path:AGENTS.md), context.app-contract (path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/app-contract.md), context.domain-pattern (path:examples/triage-board/src/model.js), context.domain-test-pattern (path:examples/triage-board/test/model.test.mjs), context.goal (path:docs/specs/v14-adaptive-orchestration/evidence/dogfood-small/goal.md), context.storage-pattern (path:examples/triage-board/src/storage.js), context.storage-test-pattern (path:examples/triage-board/test/storage.test.mjs).
- Delivered context: context.agent-contract:authorized_filesystem_read, context.app-contract:authorized_filesystem_read, context.domain-pattern:authorized_filesystem_read, context.domain-test-pattern:authorized_filesystem_read, context.goal:authorized_filesystem_read, context.storage-pattern:authorized_filesystem_read, context.storage-test-pattern:authorized_filesystem_read.
- Evidence duties: evidence.domain.tests:produce.
- Decision: lowest_exact_vector; 1 feasible alternative(s), 2 rejected; override none.
  - row.luna.medium: quality_tier, reasoning_tier.
  - row.terra.medium: reasoning_tier.

## Steering
- None.

## Routes And Evidence
- run: pass because all_handoffs_pass (specialist_verified).
- Accepted artifact: release-board-interface-handoff.md (sha256:fc408a70a0878fad52f44daf982a750e5900901786e51337b4905ab4c1ab74d7).
- Accepted artifact: release-board-domain-handoff.md (sha256:2bdf078229ad976325c508070584e2541065b072483ea3ca6d5083d15d7f0ff0).

## Next Actions
- integrate_and_verify: enabled for integration_owner (all_exact_pass_handoffs).

Assignment: sha256:79d960f5b41366f01ac762fe5b487cfd2947d8ac802b4e2b6116da7346e2e635. Source inspection: sha256:0781ab279dc9609f4cf0ea443fd7a72b3f0a13ef06dc1e17e96c8a25456a79a6.
Host-reported status and materialization are attestations, not kernel proof.