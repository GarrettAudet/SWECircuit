# Rail Catalog

## Purpose

Rails are reusable compositions of modules, gates, artifacts, and outcomes. They are the high-level flows that make TraceRail feel simple while keeping work traceable.

## Catalog

| Rail | Use For | Composition |
| --- | --- | --- |
| Feature rail | Normal feature, docs, refactor, or process work. | `goal | clarify | spec | plan | implement | verify | review | memory` |
| Diagnosis rail | Unknown, recurring, flaky, or cascading failures. | `failure | reproduce | evidence | hypotheses | root_cause | fix | regression | memory` |
| Decomposition rail | Multi-agent or multi-work-unit execution. | `goal | retrieve | decompose | contract | fanout | synthesize | integrate | verify` |
| Adapter rail | Tool, framework, plugin, MCP, or service adoption. | `candidate | source_scan | evaluate | register | pilot | review | memory` |
| Release rail | TraceRail versions and milestone-driven work. | `version_goal | package | verify | review | milestone | approval | merge | memory` |

## Selection Rule

Use the smallest rail that can complete the work with evidence. Do not use a larger rail because it feels more complete.

## Common Interface

Every rail records:

- Input artifact.
- Ordered modules.
- Gates.
- Branching or fan-out rules.
- Output artifacts.
- Verification.
- Review.
- Memory updates.

## Extension Rule

New rails should start as project-local or pack-provided rails. Promote to core only after repeated use shows that the rail solves a stable failure mode.
