# Pack Lifecycle

## Purpose

Define how a pack moves from idea to recommendation without weakening TraceRail core.

## Lifecycle

| Stage | Meaning | Promotion Gate |
| --- | --- | --- |
| Idea | A useful extension has been proposed. | Source scan exists. |
| Community | A third party or local project defines the pack. | Pack template is complete. |
| Experimental | Pack is being dogfooded. | Evidence from real use exists. |
| Recommended | Pack passed conformance and solves a repeated failure mode. | Maintainer and rollback path are clear. |
| Official | TraceRail maintainers curate the pack. | Long-term maintenance is accepted. |
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
- Conflicts with core rails.

## Recommendation Rule

Recommended means useful and conformant. It does not mean required.
