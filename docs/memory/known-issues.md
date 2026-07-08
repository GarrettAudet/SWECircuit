# Known Issues

## Current Limitations

| Date | Issue | Impact | Current Handling | Source |
| --- | --- | --- | --- | --- |
| 2026-07-08 | V2 does not automatically capture full chat transcripts. | Some conversational nuance may be lost if it is not promoted into artifacts. | Preserve feature packages, history ledger entries, retrieval index pointers, and memory updates; evaluate external memory tools later. | `docs/specs/v2-dogfood-parallel-agents/` |
| 2026-07-08 | The checker verifies section presence more than guidance quality. | A shallow section could pass validation. | Use review and dogfooding notes to catch quality gaps; V6 now adds deeper official-pack conformance checks. | `scripts/check-template.ps1`; `docs/specs/v6-pack-conformance-checker/` |
| 2026-07-08 | V5 module and adapter registries are manually maintained. | Registry decisions can drift from current ecosystem reality if snapshots are not refreshed. | Require dated research snapshots and adapter evaluation before tool installation. | `docs/specs/v5-modular-orchestration-framework/` |
| 2026-07-08 | V6 defines pack governance but has no pack installer. | Packs must be copied or adopted manually for now. | Use the manual `tracepack-orchestration-readiness` pilot before adding tooling. | `docs/specs/v6-module-rail-catalog/`; `docs/specs/v6-official-orchestration-pack/` |
| 2026-07-08 | `tracepack-orchestration-readiness` has only read-only multi-agent dogfood evidence, not implementation fan-out evidence. | It should not be treated as recommended yet. | Keep status official but not recommended; require repeated dogfooding and write-enabled implementation evidence before promotion. | `docs/packs/official/tracepack-orchestration-readiness/`; `docs/specs/v6-orchestration-readiness-dogfood/` |
| 2026-07-08 | Historical approval gates for V1-V5 are retrospective. | They do not preserve original PR metadata. | Keep them concise and use future milestone gates prospectively. | `docs/specs/v6-approval-gate-hardening/` |
| 2026-07-08 | Command output is summarized in review artifacts, not saved as durable logs. | Future agents can see what passed but cannot replay exact terminal output from source files alone. | Keep local validation commands simple for V6; consider saved validation logs only if audit needs increase. | `docs/specs/v6-orchestration-readiness-dogfood/` |
| 2026-07-08 | License has not been selected. | Public reuse terms remain unclear for external contributors or package consumers. | Keep license choice as an explicit owner decision before broad public reuse. | `docs/specs/v6-repo-professionalization/` |
