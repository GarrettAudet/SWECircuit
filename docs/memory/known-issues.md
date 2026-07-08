# Known Issues

## Current Limitations

| Date | Issue | Impact | Current Handling | Source |
| --- | --- | --- | --- | --- |
| 2026-07-08 | V2 does not automatically capture full chat transcripts. | Some conversational nuance may be lost if it is not promoted into artifacts. | Preserve feature packages, history ledger entries, retrieval index pointers, and memory updates; evaluate external memory tools later. | `docs/specs/v2-dogfood-parallel-agents/` |
| 2026-07-08 | The checker verifies section presence more than guidance quality. | A shallow section could pass validation. | Use review and dogfooding notes to catch quality gaps. | `scripts/check-template.ps1` |
| 2026-07-08 | V5 module and adapter registries are manually maintained. | Registry decisions can drift from current ecosystem reality if snapshots are not refreshed. | Require dated research snapshots and adapter evaluation before tool installation. | `docs/specs/v5-modular-orchestration-framework/` |
| 2026-07-08 | V6 defines pack governance but has no pack installer. | Packs must be copied or adopted manually for now. | Use the manual `tracepack-orchestration-readiness` pilot before adding tooling. | `docs/specs/v6-module-rail-catalog/`; `docs/specs/v6-official-orchestration-pack/` |
| 2026-07-08 | `tracepack-orchestration-readiness` has not been dogfooded on real multi-agent implementation work. | It should not be treated as recommended yet. | Keep status official but not recommended; require real run evidence before promotion. | `docs/packs/official/tracepack-orchestration-readiness/` |
| 2026-07-08 | Historical approval gates for V1-V5 are retrospective. | They do not preserve original PR metadata. | Keep them concise and use future milestone gates prospectively. | `docs/specs/v6-approval-gate-hardening/` |
