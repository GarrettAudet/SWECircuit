# Known Issues

## Current Limitations

| Date | Issue | Impact | Current Handling | Source |
| --- | --- | --- | --- | --- |
| 2026-07-08 | V2 does not automatically capture full chat transcripts. | Some conversational nuance may be lost if it is not promoted into artifacts. | Preserve feature packages, history ledger entries, retrieval index pointers, and memory updates; evaluate external memory tools later. | `docs/specs/v2-dogfood-parallel-agents/` |
| 2026-07-08 | The checker verifies section presence more than guidance quality. | A shallow section could pass validation. | Use review and dogfooding notes to catch quality gaps. | `scripts/check-template.ps1` |
| 2026-07-08 | V5 module and adapter registries are manually maintained. | Registry decisions can drift from current ecosystem reality if snapshots are not refreshed. | Require dated research snapshots and adapter evaluation before tool installation. | `docs/specs/v5-modular-orchestration-framework/` |

