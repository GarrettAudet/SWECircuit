# Circuit Catalog

## Purpose

Circuits are reusable compositions of modules, gates, artifacts, and outcomes. They are the high-level flows that make SWECircuit feel simple while keeping work traceable.

## Catalog

| Circuit | Use For | Composition |
| --- | --- | --- |
| Feature circuit | Normal feature, docs, refactor, or process work. | `goal | clarify | spec | plan | implement | verify | review | memory` |
| Diagnosis circuit | Unknown, recurring, flaky, or cascading failures. | `failure | reproduce | evidence | hypotheses | root_cause | fix | regression | memory` |
| Decomposition circuit | Multi-agent or multi-work-unit execution. | `goal | retrieve | decompose | contract | fanout | synthesize | integrate | verify` |
| Adapter circuit | Tool, framework, plugin, MCP, or service adoption. | `candidate | source_scan | evaluate | register | pilot | review | memory` |
| Release circuit | SWECircuit versions and milestone-driven work. | `version_goal | package | verify | review | milestone | approval | merge | memory` |

## Selection Rule

Use the smallest circuit that can complete the work with evidence. Do not use a larger circuit because it feels more complete.

## Common Interface

Every circuit records:

- Input artifact.
- Ordered modules.
- Gates.
- Branching or fan-out rules.
- Output artifacts.
- Verification.
- Review.
- Memory updates.

Every row in a circuit's Modules table defines either a catalog module or a circuit-local module and must include module, input, action, output, gate, outcomes, and artifacts. Circuit-local modules are promoted to standalone catalog files when repeated use proves they are reusable.

## Extension Rule

New circuits should start as project-local or pack-provided circuits. Promote to core only after repeated use shows that the circuit solves a stable failure mode.
