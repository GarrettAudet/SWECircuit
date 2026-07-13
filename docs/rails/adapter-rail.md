# Adapter Circuit

## Purpose

Use the adapter circuit when an external tool, framework, plugin, MCP server, service, or community pack is proposed.

## Composition

```txt
candidate | source_scan | adapter_evaluation | practice_register | module_registry | pilot | review | memory
```

## Modules

| Module | Input | Action | Output | Gate | Outcomes | Artifacts |
| --- | --- | --- | --- | --- | --- | --- |
| Source scan | Candidate | Research current primary sources and preserve a dated snapshot. | Dated source snapshot | Evidence is current and authoritative enough to evaluate. | `pass`, `clarify`, `block` | Research snapshot |
| Adapter evaluation | Snapshot | Compare value, complexity, security, portability, rollback, and current alternative. | Fit assessment and governance recommendation | Recommendation is evidence-backed. | `pass`, `clarify`, `block`, `learn` | Adapter evaluation |
| Practice register | Recommendation | Record accepted, optional, watch, deferred, or rejected governance status. | Practice-register entry | Decision and rationale are source-linked. | `pass`, `learn`, `block` | Practice register |
| Module registry | Accepted or optional capability | Normalize the capability as a module, circuit, adapter, or pack entry. | Discoverable registry entry | Contract and status are explicit. | `pass`, `clarify`, `learn` | Module registry |
| Pilot | Optional adapter | Define a bounded trial, permissions, success evidence, and rollback. | Trial plan and evidence | Pilot is safe and measurable. | `pass`, `fix`, `diagnose`, `block` | Pilot notes |
| Review | Pilot evidence | Decide whether to promote, continue, defer, or reject in governance artifacts. | Recommendation and status update | Evidence supports the governance decision. | `pass`, `clarify`, `learn`, `block` | Review, register update |
| Memory | Decision | Preserve source links, rationale, risks, and revisit trigger. | Durable pointers | Future agents can retrieve the decision. | `pass`, `learn`, `block` | Decision and retrieval entries |

## Artifacts

- Research snapshot.
- Adapter evaluation.
- Practice register entry.
- Module registry entry.
- Pilot notes.
- Memory update.

## Stop Conditions

- Security or privacy behavior is unclear.
- Tool requires broad permissions without clear value.
- Rollback path is missing.
- Maintenance owner is unclear.
