# Adapter Rail

## Purpose

Use the adapter rail when an external tool, framework, plugin, MCP server, service, or community pack is proposed.

## Composition

```txt
candidate | source_scan | adapter_evaluation | practice_register | module_registry | pilot | review | memory
```

## Modules

| Module | Input | Output | Gate |
| --- | --- | --- | --- |
| Source scan | Candidate | Dated source snapshot | Source is current enough or route to `block`. |
| Adapter evaluation | Snapshot | Fit assessment | Value beats complexity or route to `deferred`, `watch`, or `rejected`. |
| Practice register | Decision | Accepted, optional, watch, deferred, or rejected entry | Decision is recorded. |
| Module registry | Accepted or optional capability | Module or adapter entry | Contract is discoverable. |
| Pilot | Optional adapter | Small trial plan | Success and rollback are defined. |
| Review | Pilot evidence | Recommendation | Promote, defer, reject, or continue pilot. |
| Memory | Decision | Durable pointers | Future agents can retrieve the rationale. |

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
