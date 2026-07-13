# Pack Lifecycle

## Purpose

Define how a pack moves from idea to recommendation without weakening SWECircuit core.

## Lifecycle

| Stage | Meaning | Promotion Gate |
| --- | --- | --- |
| Idea | A useful extension has been proposed. | Source scan exists. |
| Community | A third party or local project defines the pack. | Pack template is complete. |
| Experimental | Pack is being dogfooded. | Evidence from real use exists. |
| Official | SWECircuit maintainers curate the pack. | Maintenance ownership and permission review are accepted. |
| Recommended | Pack passed conformance and solves a repeated failure mode. | Repeated dogfooding evidence, rollback, and maintainer are clear. |
| Core candidate | Pack behavior may belong in core. | Multiple projects need it and it remains simple. |
| Core | Capability is part of the baseline. | Checker and handbook support it. |
| Retired | Pack is obsolete or harmful. | Migration or removal note exists. |

## Promotion Criteria

- Clear problem solved.
- Common module interface.
- Evidence and artifacts preserved.
- Permissions are narrow.
- Verification is defined.
- Rollback is documented.
- Maintainer exists.
- Security and privacy risks are reviewed.

## Demotion Criteria

- Adds ceremony without preventing failures.
- Breaks traceability.
- Stores sensitive data without clear controls.
- Requires broad permissions without strong value.
- Has no maintainer.
- Conflicts with core circuits.

## Recommendation Rule

Official means maintained by SWECircuit. Recommended means useful, conformant, and proven through repeated dogfooding. Neither status makes a pack required core behavior.
